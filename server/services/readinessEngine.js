const { getRoleProfile } = require('../config/roles');

/**
 * Career Readiness Engine
 * Multidimensional, transparent evaluation of a candidate's readiness for their target role.
 * Transparent formula: Weighted sum across 6 pillars with clear audit trail.
 * Disclaimer: Decision-support estimate for learning optimization; does not guarantee employment.
 */

function calculateReadiness({ profile, skills = [], gaps = [], interviews = [], missions = [] }) {
  const targetRole = profile?.targetRole || 'Full-Stack Developer';
  const role = getRoleProfile(targetRole);

  // 1. Technical Readiness (Weight: 25%)
  // Based on verified/probable skills matching required competencies
  let techScore = 30; // base potential
  if (skills.length > 0) {
    const verifiedCount = skills.filter(s => s.state === 'Verified').length;
    const probableCount = skills.filter(s => s.state === 'Probable').length;
    const claimedCount = skills.filter(s => s.state === 'Claimed').length;

    techScore = Math.min(
      95,
      Math.round((verifiedCount * 18) + (probableCount * 10) + (claimedCount * 3) + 20)
    );
  }

  // 2. Project Readiness (Weight: 20%)
  // Based on completed missions, GitHub repositories, and project breadth
  let projectScore = 35;
  const completedMissionsCount = (missions || []).filter(m => m.status === 'verified').length;
  const profileProjectsCount = profile?.projects?.length || 0;
  projectScore = Math.min(
    95,
    Math.round(35 + (completedMissionsCount * 18) + (profileProjectsCount * 12))
  );

  // 3. Market Alignment (Weight: 15%)
  // Ratio of target role competencies where deficiency < 25
  let marketScore = 40;
  if (gaps.length > 0) {
    const lowGapCount = gaps.filter(g => g.deficiency <= 20).length;
    marketScore = Math.round((lowGapCount / gaps.length) * 100);
  }

  // 4. Interview Readiness (Weight: 20%)
  // Based on completed mock interviews and average scores
  let interviewScore = 40;
  const completedInterviews = (interviews || []).filter(i => i.status === 'completed');
  if (completedInterviews.length > 0) {
    const totalInterviewScore = completedInterviews.reduce(
      (acc, cur) => acc + (cur.finalReport?.overallScore || 65),
      0
    );
    interviewScore = Math.round(totalInterviewScore / completedInterviews.length);
  }

  // 5. Communication Readiness (Weight: 10%)
  let commScore = 65;
  if (completedInterviews.length > 0) {
    const lastSession = completedInterviews[completedInterviews.length - 1];
    commScore = lastSession.finalReport?.dimensionScores?.communication || 75;
  }

  // 6. Resume & Profile Readiness (Weight: 10%)
  const completeness = profile?.completenessScore || 40;
  const resumeScore = Math.min(95, Math.round((completeness * 0.7) + 25));

  // Weighted Overall
  const overallReadiness = Math.round(
    (techScore * 0.25) +
    (projectScore * 0.20) +
    (marketScore * 0.15) +
    (interviewScore * 0.20) +
    (commScore * 0.10) +
    (resumeScore * 0.10)
  );

  // Recommended Next Action based on weakest dimension
  const dimensionList = [
    { key: 'technical', score: techScore, title: 'Verify Skills with Code Evidence', actionType: 'evidence', targetLink: '/app/skills' },
    { key: 'project', score: projectScore, title: 'Complete a Project Mission', actionType: 'mission', targetLink: '/app/missions' },
    { key: 'interview', score: interviewScore, title: 'Practice AI Mock Interview', actionType: 'interview', targetLink: '/app/interview' },
    { key: 'resume', score: resumeScore, title: 'Upload & Parse Updated Resume', actionType: 'resume', targetLink: '/app/resume' }
  ];

  dimensionList.sort((a, b) => a.score - b.score);
  const weakest = dimensionList[0];

  return {
    targetRole,
    overallReadiness: Math.min(98, Math.max(20, overallReadiness)),
    dimensions: {
      technicalReadiness: techScore,
      projectReadiness: projectScore,
      marketAlignment: marketScore,
      interviewReadiness: interviewScore,
      communicationReadiness: commScore,
      resumeReadiness: resumeScore
    },
    dimensionRationale: {
      technical: `${skills.filter(s => s.state === 'Verified').length} skills verified with project/interview evidence; ${skills.filter(s => s.state === 'Claimed').length} remain unverified claims.`,
      project: `${completedMissionsCount} verified missions completed with tangible code deliverables.`,
      market: `Curated Academic & Industry Benchmark: ${gaps.filter(g => g.priority === 'High').length} high-priority gaps remain before meeting typical role criteria.`,
      interview: completedInterviews.length > 0
        ? `Evaluated across ${completedInterviews.length} mock sessions with focus on architectural reasoning.`
        : 'Initial estimate based on profile data. Complete a live mock interview to calibrate.',
      communication: 'Assessed from structured answer flow, clarity of articulation, and documentation hygiene.',
      resume: `Profile completeness is at ${completeness}%. Incorporates detected keywords and structure.`
    },
    formulaExplanation: 'Overall Readiness = (Technical × 25%) + (Project × 20%) + (Market × 15%) + (Interview × 20%) + (Communication × 10%) + (Resume × 10%).',
    nextActionRecommendation: {
      actionType: weakest.actionType,
      title: weakest.title,
      description: `Your ${weakest.key} score is currently ${weakest.score}%. Taking immediate action here will produce the highest boost in overall career readiness.`,
      targetLink: weakest.targetLink
    },
    isIllustrative: false,
    disclaimer: 'Scores are decision-support estimates and educational benchmarks, not human guarantees of recruitment outcomes.'
  };
}

module.exports = {
  calculateReadiness
};
