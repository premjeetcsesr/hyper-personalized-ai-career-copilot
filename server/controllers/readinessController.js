const { Profile, SkillEvidence, SkillGap, InterviewSession, ProjectMission, ReadinessSnapshot } = require('../models');
const { calculateReadiness } = require('../services/readinessEngine');
const { aggregateUserSkills } = require('../services/skillEvidenceEngine');

exports.getReadinessSnapshot = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const evidenceList = await SkillEvidence.find({ userId: req.userId });
    const userSkills = aggregateUserSkills(evidenceList, profile?.claimedSkills || []);
    const gaps = await SkillGap.find({ userId: req.userId, targetRole });
    const interviews = await InterviewSession.find({ userId: req.userId });
    const missions = await ProjectMission.find({ userId: req.userId });

    const readiness = calculateReadiness({
      profile,
      skills: userSkills,
      gaps,
      interviews,
      missions
    });

    // Save snapshot
    const snapshot = await ReadinessSnapshot.create({
      userId: req.userId,
      targetRole,
      overallReadiness: readiness.overallReadiness,
      dimensions: readiness.dimensions,
      dimensionRationale: readiness.dimensionRationale,
      nextActionRecommendation: readiness.nextActionRecommendation
    });

    res.json({
      success: true,
      readiness,
      snapshotId: snapshot._id
    });
  } catch (err) {
    next(err);
  }
};
