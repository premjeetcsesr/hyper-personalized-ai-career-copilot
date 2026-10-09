const { getRoleProfile } = require('../config/roles');
const { generateGapExplanation } = require('./aiService');

/**
 * Skill Evidence Engine
 * Core philosophy: "Evidence Before Inference"
 * States:
 * - Verified: Validated via automated test/interview score >= 75% or multi-repo execution
 * - Probable: Concrete code repository signals or verifiable resume project context
 * - Claimed: Self-reported in profile or listed in resume skills section without project context
 * - Unknown: No signal yet recorded (never penalized as 0, defaults to unassessed baseline ~30)
 */

const EVIDENCE_WEIGHTS = {
  interview: 1.0,     // Direct conversational validation
  mission: 0.95,      // Project build validation
  github: 0.85,       // Concrete code artifacts
  resume: 0.65,       // Unverified resume text
  self_report: 0.45   // Profile claims
};

/**
 * Normalize and merge skill evidences for a user into a coherent skills map
 */
function aggregateUserSkills(evidenceRecords = [], profileClaimed = []) {
  const aggregated = new Map();

  // 1. Process profile claims first
  (profileClaimed || []).forEach(skillName => {
    const key = normalizeSkillName(skillName);
    aggregated.set(key, {
      skillName: skillName.trim(),
      proficiencyLevel: 45, // default Claimed baseline
      state: 'Claimed',
      confidence: 40,
      source: 'self_report',
      evidenceCount: 1,
      lastValidationDate: new Date(),
      explanation: 'Self-reported in student profile. Pending project or assessment evidence.'
    });
  });

  // 2. Process recorded evidence
  (evidenceRecords || []).forEach(record => {
    const key = normalizeSkillName(record.skillName);
    const existing = aggregated.get(key);

    const sourceWeight = EVIDENCE_WEIGHTS[record.source] || 0.5;
    const incomingScore = record.proficiencyLevel || 50;

    if (!existing) {
      aggregated.set(key, {
        skillName: record.skillName,
        category: record.category || 'General',
        proficiencyLevel: incomingScore,
        state: record.state || 'Claimed',
        confidence: record.confidence || 50,
        source: record.source,
        evidenceCount: 1,
        lastValidationDate: record.updatedAt || new Date(),
        explanation: record.evidenceDetails?.excerpt || `Detected via ${record.source}.`
      });
    } else {
      // Merge: Higher evidence states take precedence: Verified > Probable > Claimed > Unknown
      const statePrecedence = { Verified: 4, Probable: 3, Claimed: 2, Unknown: 1 };
      const currentRank = statePrecedence[existing.state] || 1;
      const incomingRank = statePrecedence[record.state] || 1;

      const newState = incomingRank > currentRank ? record.state : existing.state;
      const newConfidence = Math.min(98, Math.max(existing.confidence, record.confidence));
      
      // Weighted proficiency combination
      const newProficiency = Math.round(
        (existing.proficiencyLevel * 0.4) + (incomingScore * 0.6)
      );

      aggregated.set(key, {
        ...existing,
        category: record.category || existing.category,
        proficiencyLevel: newProficiency,
        state: newState,
        confidence: newConfidence,
        source: incomingRank >= currentRank ? record.source : existing.source,
        evidenceCount: existing.evidenceCount + 1,
        lastValidationDate: new Date(),
        explanation: record.evidenceDetails?.excerpt || existing.explanation
      });
    }
  });

  return Array.from(aggregated.values());
}

/**
 * Compare aggregated user skills against the target role's competencies.
 * Deterministically computes gaps and priorities.
 */
async function computeSkillGaps(userSkills, targetRoleName) {
  const role = getRoleProfile(targetRoleName);
  const gaps = [];

  for (const comp of role.competencies) {
    const matchedUserSkill = userSkills.find(
      s => normalizeSkillName(s.skillName) === normalizeSkillName(comp.skill)
    );

    let currentLevel = 0;
    let state = 'Unknown';
    let confidence = 20;
    let source = 'none';

    if (matchedUserSkill) {
      currentLevel = matchedUserSkill.proficiencyLevel;
      state = matchedUserSkill.state;
      confidence = matchedUserSkill.confidence;
      source = matchedUserSkill.source;
    } else {
      // "Unknown must not be treated as zero ability"
      // We set baseline unassessed potential at 25-30
      currentLevel = 25;
      state = 'Unknown';
    }

    const deficiency = Math.max(0, comp.targetLevel - currentLevel);

    // Deterministic priority calculation formula:
    // Priority Score = (Deficiency * 0.5) + (Comp.Weight * 30) + (100 - Confidence) * 0.2
    const priorityScore = (deficiency * 0.5) + (comp.weight * 30) + ((100 - confidence) * 0.2);

    let priority = 'Low';
    if (priorityScore >= 60 || deficiency >= 35) {
      priority = 'High';
    } else if (priorityScore >= 35 || deficiency >= 15) {
      priority = 'Medium';
    }

    // Explanation
    const explanationData = await generateGapExplanation({
      skillName: comp.skill,
      currentLevel,
      targetLevel: comp.targetLevel,
      targetRole: targetRoleName,
      state
    });

    gaps.push({
      skillName: comp.skill,
      category: comp.category,
      currentLevel,
      targetLevel: comp.targetLevel,
      deficiency,
      priority,
      priorityScore: Math.round(priorityScore),
      importanceWeight: comp.weight,
      state,
      confidence,
      source,
      rationale: explanationData.rationale,
      marketContext: explanationData.marketContext,
      recommendedActions: explanationData.actionSteps
    });
  }

  // Sort by priorityScore descending
  gaps.sort((a, b) => b.priorityScore - a.priorityScore);

  return gaps;
}

function normalizeSkillName(name) {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

module.exports = {
  aggregateUserSkills,
  computeSkillGaps,
  normalizeSkillName
};
