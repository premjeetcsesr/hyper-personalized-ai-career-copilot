const { fetchGitHubUserRepos } = require('../services/githubService');
const { Profile, SkillEvidence, AuditLog } = require('../models');

exports.analyzeGitHubProfile = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Please provide a valid GitHub username or repository URL.' });
    }

    const analysis = await fetchGitHubUserRepos(username);

    // Audit log
    await AuditLog.create({
      userId: req.userId,
      action: 'GITHUB_ANALYZED',
      details: { username, repoCount: analysis.repositories?.length || 0 }
    });

    res.json({
      success: true,
      message: 'GitHub intelligence analysis completed.',
      data: analysis
    });
  } catch (err) {
    next(err);
  }
};

exports.syncGitHubSkills = async (req, res, next) => {
  try {
    const { username, extractedSkills = [] } = req.body;

    if (username) {
      await Profile.findOneAndUpdate(
        { userId: req.userId },
        { githubUsername: username, completenessScore: 75 }
      );
    }

    // Ingest extracted skills
    for (const skill of extractedSkills) {
      const existing = await SkillEvidence.findOne({
        userId: req.userId,
        skillName: skill.skillName
      });

      const payload = {
        userId: req.userId,
        skillName: skill.skillName,
        category: skill.category || 'Language',
        proficiencyLevel: skill.proficiencyLevel || 70,
        state: skill.state || 'Probable',
        confidence: skill.confidence || 75,
        source: 'github',
        evidenceDetails: {
          excerpt: skill.evidenceDetails?.excerpt || `Observed across public GitHub repositories.`,
          verifiedAt: new Date()
        }
      };

      if (existing) {
        await SkillEvidence.findByIdAndUpdate(existing._id, payload);
      } else {
        await SkillEvidence.create(payload);
      }
    }

    res.json({
      success: true,
      message: `Successfully synchronized ${extractedSkills.length} code-backed skills from GitHub.`
    });
  } catch (err) {
    next(err);
  }
};
