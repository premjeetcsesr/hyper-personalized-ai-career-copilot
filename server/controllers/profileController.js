const { Profile, SkillEvidence, AuditLog } = require('../models');

exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      profile = await Profile.create({
        userId: req.userId,
        fullName: req.user.name,
        college: '',
        targetRole: 'Full-Stack Developer'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      profile = await Profile.create({ userId: req.userId, ...updates });
    } else {
      // Calculate completeness score
      let score = 20;
      if (updates.fullName || profile.fullName) score += 10;
      if (updates.college || profile.college) score += 10;
      if (updates.targetRole || profile.targetRole) score += 15;
      if (updates.bio || profile.bio) score += 10;
      if (updates.githubUsername || profile.githubUsername) score += 15;
      if ((updates.claimedSkills && updates.claimedSkills.length > 0) || (profile.claimedSkills && profile.claimedSkills.length > 0)) score += 10;
      if ((updates.projects && updates.projects.length > 0) || (profile.projects && profile.projects.length > 0)) score += 10;

      updates.completenessScore = Math.min(100, score);
      profile = await Profile.findByIdAndUpdate(profile._id, updates, { new: true });
    }

    // Record audit log
    await AuditLog.create({
      userId: req.userId,
      action: 'PROFILE_UPDATED',
      details: { fieldsUpdated: Object.keys(updates) }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      profile
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTargetRole = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ success: false, message: 'targetRole is required.' });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { targetRole },
      { new: true }
    );

    res.json({
      success: true,
      message: `Target role changed to "${targetRole}".`,
      profile
    });
  } catch (err) {
    next(err);
  }
};

exports.completeOnboarding = async (req, res, next) => {
  try {
    const {
      fullName,
      college,
      degree,
      branch,
      graduationYear,
      currentSemester,
      targetRole,
      weeklyLearningHours,
      claimedSkills = [],
      projects = []
    } = req.body;

    let completeness = 40;
    if (fullName) completeness += 10;
    if (college) completeness += 10;
    if (claimedSkills.length > 0) completeness += 20;
    if (projects.length > 0) completeness += 20;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      {
        fullName,
        college,
        degree,
        branch,
        graduationYear,
        currentSemester,
        targetRole,
        weeklyLearningHours,
        claimedSkills,
        projects,
        completenessScore: Math.min(100, completeness)
      },
      { new: true, upsert: true }
    );

    // Register initial Claimed skills in SkillEvidence if not existing
    for (const skill of claimedSkills) {
      const existing = await SkillEvidence.findOne({ userId: req.userId, skillName: skill.trim() });
      if (!existing) {
        await SkillEvidence.create({
          userId: req.userId,
          skillName: skill.trim(),
          category: 'Claimed Competency',
          proficiencyLevel: 45,
          state: 'Claimed',
          confidence: 40,
          source: 'self_report',
          evidenceDetails: {
            excerpt: 'Self-reported in initial onboarding profile wizard.'
          }
        });
      }
    }

    res.json({
      success: true,
      message: 'Onboarding completed successfully!',
      profile
    });
  } catch (err) {
    next(err);
  }
};
