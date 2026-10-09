const { processResume } = require('../services/resumeParserService');
const { Profile, SkillEvidence, AuditLog } = require('../models');

exports.uploadAndAnalyzeResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file (PDF or DOCX format).' });
    }

    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const result = await processResume(
      req.file.path,
      req.file.mimetype,
      req.file.originalname,
      targetRole
    );

    // Audit log
    await AuditLog.create({
      userId: req.userId,
      action: 'RESUME_ANALYZED',
      details: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        skillsCount: result.observedSkills?.length || 0
      }
    });

    res.json({
      success: true,
      message: 'Resume analyzed successfully. Review and confirm extracted evidence before saving.',
      analysis: result
    });
  } catch (err) {
    next(err);
  }
};

exports.confirmResumeExtraction = async (req, res, next) => {
  try {
    const { confirmedSkills = [], confirmedProjects = [], education } = req.body;

    const profile = await Profile.findOne({ userId: req.userId });

    // 1. Commit skills into SkillEvidence with evidence quote and source 'resume'
    for (const skill of confirmedSkills) {
      const existing = await SkillEvidence.findOne({
        userId: req.userId,
        skillName: skill.skillName || skill.skill
      });

      const skillPayload = {
        userId: req.userId,
        skillName: skill.skillName || skill.skill,
        category: skill.category || 'General',
        proficiencyLevel: skill.estimatedProficiency || skill.proficiencyLevel || 60,
        state: skill.state || 'Probable',
        confidence: skill.confidence || 70,
        source: 'resume',
        evidenceDetails: {
          excerpt: skill.evidenceQuote || `Verified extracted resume citation.`,
          verifiedAt: new Date()
        }
      };

      if (existing) {
        await SkillEvidence.findByIdAndUpdate(existing._id, skillPayload);
      } else {
        await SkillEvidence.create(skillPayload);
      }
    }

    // 2. Append projects if provided
    if (confirmedProjects.length > 0) {
      const currentProjects = profile.projects || [];
      const updatedProjects = [...currentProjects];

      confirmedProjects.forEach(proj => {
        if (!updatedProjects.some(p => p.title?.toLowerCase() === proj.title?.toLowerCase())) {
          updatedProjects.push({
            title: proj.title,
            description: proj.description,
            technologies: Array.isArray(proj.techStack) ? proj.techStack : []
          });
        }
      });

      await Profile.findByIdAndUpdate(profile._id, {
        projects: updatedProjects,
        completenessScore: Math.min(100, (profile.completenessScore || 40) + 15),
        lastIngestedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Extracted resume evidence successfully incorporated into your career profile.'
    });
  } catch (err) {
    next(err);
  }
};
