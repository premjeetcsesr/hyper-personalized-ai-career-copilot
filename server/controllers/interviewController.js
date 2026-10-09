const { InterviewSession, Profile, SkillEvidence, AuditLog } = require('../models');
const { generateInterviewQuestion, evaluateInterviewAnswer, generateInterviewReport } = require('../services/aiService');
const { getRoleProfile } = require('../config/roles');

exports.startInterview = async (req, res, next) => {
  try {
    const { mode = 'technical', competency, difficulty = 'Mid' } = req.body;
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const roleProfile = getRoleProfile(targetRole);
    const selectedCompetency = competency || roleProfile.interviewCompetencies[0];

    // Generate the initial question
    const firstQ = await generateInterviewQuestion({
      role: targetRole,
      competency: selectedCompetency,
      difficulty,
      history: []
    });

    const session = await InterviewSession.create({
      userId: req.userId,
      targetRole,
      mode,
      difficulty,
      status: 'in_progress',
      questions: [
        {
          questionIndex: 1,
          competency: selectedCompetency,
          questionText: firstQ.questionText,
          askedAt: new Date()
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Mock interview session initiated.',
      sessionId: session._id,
      session: {
        id: session._id,
        targetRole,
        mode,
        difficulty,
        currentQuestionIndex: 1,
        question: firstQ.questionText,
        competency: selectedCompetency,
        engine: firstQ.engine
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.submitAnswerAndGetNext = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    if (!answer || answer.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide a meaningful answer to the question.' });
    }

    const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userId });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Interview session is already completed.' });
    }

    const currentQuestions = session.questions || [];
    const currentQ = currentQuestions[currentQuestions.length - 1];

    // 1. Evaluate candidate answer
    const evaluation = await evaluateInterviewAnswer({
      question: currentQ.questionText,
      answer,
      role: session.targetRole,
      competency: currentQ.competency
    });

    currentQ.userAnswer = answer;
    currentQ.evaluation = evaluation;
    currentQ.answeredAt = new Date();

    // If evaluated highly, update skill evidence
    if (evaluation.verifiedSkillEvidence) {
      await recordSkillEvidenceFromInterview(req.userId, evaluation.verifiedSkillEvidence, evaluation.score);
    }

    // 2. Decide if session has reached completion (e.g. 3 questions) or ask next question
    const MAX_QUESTIONS = 3;
    let nextQuestion = null;
    let isCompleted = false;

    if (currentQuestions.length >= MAX_QUESTIONS) {
      isCompleted = true;
      session.status = 'completed';

      // Generate final report
      const finalReport = await generateInterviewReport({
        questionsAndAnswers: currentQuestions,
        role: session.targetRole
      });
      session.finalReport = finalReport;
    } else {
      // Adaptive difficulty adjustment:
      // If previous score >= 80, bump to Senior; if < 60, adjust to Junior
      let nextDifficulty = session.difficulty;
      if (evaluation.score >= 80) nextDifficulty = 'Senior';
      else if (evaluation.score <= 55) nextDifficulty = 'Junior';

      const roleProfile = getRoleProfile(session.targetRole);
      const nextCompetency = roleProfile.interviewCompetencies[currentQuestions.length % roleProfile.interviewCompetencies.length];

      const qGen = await generateInterviewQuestion({
        role: session.targetRole,
        competency: nextCompetency,
        difficulty: nextDifficulty,
        history: currentQuestions
      });

      nextQuestion = {
        questionIndex: currentQuestions.length + 1,
        competency: nextCompetency,
        questionText: qGen.questionText,
        askedAt: new Date()
      };

      currentQuestions.push(nextQuestion);
    }

    session.questions = currentQuestions;
    const updated = await InterviewSession.findByIdAndUpdate(session._id, session, { new: true });

    res.json({
      success: true,
      isCompleted,
      evaluation,
      nextQuestion: nextQuestion ? {
        questionIndex: nextQuestion.questionIndex,
        question: nextQuestion.questionText,
        competency: nextQuestion.competency
      } : null,
      finalReport: isCompleted ? session.finalReport : null
    });
  } catch (err) {
    next(err);
  }
};

exports.getSessionReport = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userId });

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    res.json({
      success: true,
      session
    });
  } catch (err) {
    next(err);
  }
};

exports.getInterviewHistory = async (req, res, next) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.userId });
    res.json({
      success: true,
      sessions
    });
  } catch (err) {
    next(err);
  }
};

async function recordSkillEvidenceFromInterview(userId, competencyName, score) {
  const existing = await SkillEvidence.findOne({ userId, skillName: competencyName });
  const payload = {
    userId,
    skillName: competencyName,
    proficiencyLevel: Math.min(95, score),
    state: score >= 75 ? 'Verified' : 'Probable',
    confidence: 88,
    source: 'interview',
    evidenceDetails: {
      excerpt: `Demonstrated in adaptive AI mock interview with score of ${score}/100.`,
      assessmentScore: score,
      verifiedAt: new Date()
    }
  };

  if (existing) {
    await SkillEvidence.findByIdAndUpdate(existing._id, payload);
  } else {
    await SkillEvidence.create(payload);
  }
}
