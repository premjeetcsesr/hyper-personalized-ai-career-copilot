const mongoose = require('mongoose');
const { Schema } = mongoose;
const { createModelWrapper } = require('./storage');

// 1. User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  isDemoUser: { type: Boolean, default: false },
}, { timestamps: true });

// 2. Profile Schema
const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, default: '' },
  college: { type: String, default: 'Kanpur Institute of Technology' },
  degree: { type: String, default: 'B.Tech' },
  branch: { type: String, default: 'Computer Science and Engineering' },
  graduationYear: { type: Number, default: 2026 },
  currentSemester: { type: String, default: 'Semester 7' },
  targetRole: { type: String, default: 'Full-Stack Developer' },
  weeklyLearningHours: { type: Number, default: 15 },
  bio: { type: String, default: '' },
  githubUsername: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  portfolioUrl: { type: String, default: '' },
  claimedSkills: [{ type: String }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    repoUrl: String,
    liveUrl: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: Number
  }],
  completenessScore: { type: Number, default: 35 },
  lastIngestedAt: { type: Date }
}, { timestamps: true });

// 3. SkillEvidence Schema (Core principle: Evidence Before Inference)
// States: Verified, Probable, Claimed, Unknown
const skillEvidenceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  skillName: { type: String, required: true },
  category: { type: String, default: 'General' },
  proficiencyLevel: { type: Number, min: 0, max: 100, default: 0 }, // 0 to 100
  state: {
    type: String,
    enum: ['Verified', 'Probable', 'Claimed', 'Unknown'],
    default: 'Claimed'
  },
  confidence: { type: Number, min: 0, max: 100, default: 50 }, // 0 to 100
  source: {
    type: String,
    enum: ['resume', 'github', 'interview', 'mission', 'self_report'],
    default: 'self_report'
  },
  evidenceDetails: {
    excerpt: String,
    repoName: String,
    commitCount: Number,
    fileSignals: [String],
    assessmentScore: Number,
    verifiedAt: Date,
    explanation: String
  }
}, { timestamps: true });

// 4. SkillGap Schema
const skillGapSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetRole: { type: String, required: true },
  skillName: { type: String, required: true },
  category: { type: String, default: 'General' },
  currentLevel: { type: Number, default: 0 },
  targetLevel: { type: Number, required: true },
  deficiency: { type: Number, default: 0 }, // targetLevel - currentLevel
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  importanceWeight: { type: Number, default: 1.0 },
  state: { type: String, default: 'Unknown' },
  rationale: { type: String, default: '' },
  recommendedActions: [{ type: String }]
}, { timestamps: true });

// 5. Personalized Roadmap Schema (LEARN -> PRACTICE -> BUILD -> VALIDATE -> IMPROVE)
const roadmapSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetRole: { type: String, required: true },
  overallProgress: { type: Number, default: 0 },
  phases: [{
    phaseNumber: Number,
    title: String,
    focus: String,
    durationWeeks: Number,
    milestones: [{
      milestoneId: String,
      skill: String,
      objective: String,
      priority: String,
      estimatedHours: Number,
      prerequisites: [String],
      resources: [{
        title: String,
        url: String,
        type: { type: String, default: 'Documentation' }
      }],
      cycle: {
        learn: String,
        practice: String,
        build: String,
        validate: String,
        improve: String
      },
      completionCriteria: String,
      validationAssessment: String,
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      completedAt: Date
    }]
  }]
}, { timestamps: true });

// 6. ProjectMission Schema (Turn gaps into actionable missions)
const projectMissionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  skillTargeted: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  estimatedHours: { type: Number, default: 4 },
  category: { type: String, default: 'Architecture' },
  description: { type: String, required: true },
  objectives: [{ type: String }],
  stepByStepGuide: [{ type: String }],
  acceptanceCriteria: [{ type: String }],
  verificationPrompt: { type: String },
  status: { type: String, enum: ['available', 'in_progress', 'submitted', 'verified'], default: 'available' },
  submission: {
    githubRepo: String,
    liveUrl: String,
    reflectionNotes: String,
    submittedAt: Date,
    feedback: String
  },
  reward: {
    skillGain: Number,
    evidenceBonus: String
  }
}, { timestamps: true });

// 7. InterviewSession Schema
const interviewSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetRole: { type: String, required: true },
  mode: {
    type: String,
    enum: ['technical', 'project', 'system_design', 'behavioral', 'role_specific'],
    default: 'technical'
  },
  difficulty: { type: String, enum: ['Junior', 'Mid', 'Senior'], default: 'Mid' },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  questions: [{
    questionIndex: Number,
    competency: String,
    questionText: String,
    userAnswer: String,
    evaluation: {
      score: Number,
      correctnessScore: Number,
      reasoningScore: Number,
      projectUnderstandingScore: Number,
      systemDesignScore: Number,
      communicationScore: Number,
      strengths: [String],
      weaknesses: [String],
      feedback: String,
      suggestedAnswerStructure: String
    },
    answeredAt: Date
  }],
  finalReport: {
    overallScore: Number,
    dimensionScores: {
      technical: Number,
      reasoning: Number,
      systemDesign: Number,
      communication: Number
    },
    executiveSummary: String,
    topStrengths: [String],
    criticalGaps: [String],
    recommendedPracticeMissions: [String],
    skillsVerified: [String]
  }
}, { timestamps: true });

// 8. ReadinessSnapshot Schema
const readinessSnapshotSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetRole: { type: String, required: true },
  overallReadiness: { type: Number, default: 0 }, // 0 to 100
  dimensions: {
    technicalReadiness: { type: Number, default: 0 },
    projectReadiness: { type: Number, default: 0 },
    marketAlignment: { type: Number, default: 0 },
    interviewReadiness: { type: Number, default: 0 },
    communicationReadiness: { type: Number, default: 0 },
    resumeReadiness: { type: Number, default: 0 }
  },
  dimensionRationale: {
    technical: String,
    project: String,
    market: String,
    interview: String,
    communication: String,
    resume: String
  },
  nextActionRecommendation: {
    actionType: String,
    title: String,
    description: String,
    targetLink: String
  },
  isIllustrative: { type: Boolean, default: false }
}, { timestamps: true });

// 9. AuditLog Schema
const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// Compile Mongoose models if not already compiled
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
const SkillEvidenceModel = mongoose.models.SkillEvidence || mongoose.model('SkillEvidence', skillEvidenceSchema);
const SkillGapModel = mongoose.models.SkillGap || mongoose.model('SkillGap', skillGapSchema);
const RoadmapModel = mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
const ProjectMissionModel = mongoose.models.ProjectMission || mongoose.model('ProjectMission', projectMissionSchema);
const InterviewSessionModel = mongoose.models.InterviewSession || mongoose.model('InterviewSession', interviewSessionSchema);
const ReadinessSnapshotModel = mongoose.models.ReadinessSnapshot || mongoose.model('ReadinessSnapshot', readinessSnapshotSchema);
const AuditLogModel = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

// Export dual-mode proxies for immediate resilience
module.exports = {
  User: createModelWrapper('User', 'users', UserModel),
  Profile: createModelWrapper('Profile', 'profiles', ProfileModel),
  SkillEvidence: createModelWrapper('SkillEvidence', 'skillEvidences', SkillEvidenceModel),
  SkillGap: createModelWrapper('SkillGap', 'skillGaps', SkillGapModel),
  Roadmap: createModelWrapper('Roadmap', 'roadmaps', RoadmapModel),
  ProjectMission: createModelWrapper('ProjectMission', 'projectMissions', ProjectMissionModel),
  InterviewSession: createModelWrapper('InterviewSession', 'interviewSessions', InterviewSessionModel),
  ReadinessSnapshot: createModelWrapper('ReadinessSnapshot', 'readinessSnapshots', ReadinessSnapshotModel),
  AuditLog: createModelWrapper('AuditLog', 'auditLogs', AuditLogModel),
};
