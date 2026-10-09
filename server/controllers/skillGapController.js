const { Profile, SkillEvidence, SkillGap } = require('../models');
const { aggregateUserSkills, computeSkillGaps } = require('../services/skillEvidenceEngine');
const { getRoleProfile, getAvailableRoles } = require('../config/roles');

exports.getSkillGaps = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const evidenceList = await SkillEvidence.find({ userId: req.userId });
    const aggregatedSkills = aggregateUserSkills(evidenceList, profile?.claimedSkills || []);

    const gaps = await computeSkillGaps(aggregatedSkills, targetRole);

    // Save computed gaps into DB
    for (const gap of gaps) {
      const existing = await SkillGap.findOne({
        userId: req.userId,
        targetRole,
        skillName: gap.skillName
      });

      const payload = {
        userId: req.userId,
        targetRole,
        skillName: gap.skillName,
        category: gap.category,
        currentLevel: gap.currentLevel,
        targetLevel: gap.targetLevel,
        deficiency: gap.deficiency,
        priority: gap.priority,
        importanceWeight: gap.importanceWeight,
        state: gap.state,
        rationale: gap.rationale,
        recommendedActions: gap.recommendedActions
      };

      if (existing) {
        await SkillGap.findByIdAndUpdate(existing._id, payload);
      } else {
        await SkillGap.create(payload);
      }
    }

    const roleInfo = getRoleProfile(targetRole);

    res.json({
      success: true,
      targetRole,
      roleDescription: roleInfo.description,
      availableRoles: getAvailableRoles(),
      benchmarkType: 'Curated Academic & Industry Benchmark (Technova001 - KIT)',
      skills: aggregatedSkills,
      gaps,
      disclaimer: 'Skill scores and gap priorities are decision-support estimates calibrated against curated industry benchmarks.'
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSkillEvidence = async (req, res, next) => {
  try {
    const { skillName, proficiencyLevel, state, reason, proofLink } = req.body;

    if (!skillName) {
      return res.status(400).json({ success: false, message: 'skillName is required.' });
    }

    const existing = await SkillEvidence.findOne({ userId: req.userId, skillName });

    const payload = {
      userId: req.userId,
      skillName,
      proficiencyLevel: Number(proficiencyLevel) || 60,
      state: state || 'Probable',
      confidence: 80,
      source: proofLink ? 'mission' : 'self_report',
      evidenceDetails: {
        excerpt: reason || 'Candidate submitted verified supplementary proof.',
        repoName: proofLink || '',
        verifiedAt: new Date()
      }
    };

    let updated;
    if (existing) {
      updated = await SkillEvidence.findByIdAndUpdate(existing._id, payload, { new: true });
    } else {
      updated = await SkillEvidence.create(payload);
    }

    res.json({
      success: true,
      message: `Skill evidence for "${skillName}" updated to ${payload.state}.`,
      skill: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.getSkillGraph = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const evidenceList = await SkillEvidence.find({ userId: req.userId });
    const userSkills = aggregateUserSkills(evidenceList, profile?.claimedSkills || []);
    const roleInfo = getRoleProfile(targetRole);

    // Build graph nodes
    const nodes = [
      { id: 'target_role', label: targetRole, type: 'role', category: 'Target Role', level: 100 }
    ];

    const links = [];

    roleInfo.competencies.forEach((comp, idx) => {
      const matched = userSkills.find(
        s => s.skillName.toLowerCase() === comp.skill.toLowerCase()
      );

      const state = matched ? matched.state : 'Unknown';
      const level = matched ? matched.proficiencyLevel : 25;

      nodes.push({
        id: `skill_${idx}`,
        label: comp.skill,
        category: comp.category,
        type: 'competency',
        state,
        level,
        targetLevel: comp.targetLevel,
        weight: comp.weight
      });

      links.push({
        source: 'target_role',
        target: `skill_${idx}`,
        weight: comp.weight
      });
    });

    res.json({
      success: true,
      targetRole,
      nodes,
      links
    });
  } catch (err) {
    next(err);
  }
};
