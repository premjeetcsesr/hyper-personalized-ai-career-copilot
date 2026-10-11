import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useCareerData, CAREER_CATALOGUE } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './MockInterviewPage.css';

const SAMPLE_QUESTION_BANK = {
  'Full-Stack Developer': [
    {
      id: 'fs-1',
      competency: 'REST API Design & Architecture',
      questionText: 'When designing a REST API, how do you decide between using PUT vs PATCH for resource updates, and what HTTP status codes should you return for success versus validation failure?',
      hint: 'Think about idempotent full replacements versus partial updates, and consider 200, 204, 400, and 422 codes.'
    },
    {
      id: 'fs-2',
      competency: 'State & Database Concurrency',
      questionText: 'How would you handle asynchronous state synchronization between a React client and a Node.js backend when multiple users might update the same task simultaneously?',
      hint: 'Consider optimistic UI updates, version numbers/ETags, rollback strategies, and WebSocket notifications.'
    },
    {
      id: 'fs-3',
      competency: 'Security & Token Placement',
      questionText: 'Where should authentication tokens (JWTs) be stored in a web application to protect against both XSS and CSRF attacks, and how do you handle token revocation?',
      hint: 'Contrast HttpOnly cookies with browser local storage, and discuss token expiration and refresh token rotation.'
    }
  ],
  'Frontend Developer': [
    {
      id: 'fe-1',
      competency: 'Virtual DOM & React Lifecycle',
      questionText: 'How does React’s reconciliation algorithm work, and what role do keys play in preventing unnecessary re-renders in dynamic lists?',
      hint: 'Discuss the diffing algorithm, fiber tree, and stable identity across renders.'
    },
    {
      id: 'fe-2',
      competency: 'Web Performance & Core Vitals',
      questionText: 'Explain how you would diagnose and fix high Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) on a responsive web page.',
      hint: 'Consider image preloading, critical CSS, explicit aspect ratios, and dynamic fonts.'
    },
    {
      id: 'fe-3',
      competency: 'Accessibility & Keyboard Navigation',
      questionText: 'What techniques and ARIA attributes would you implement to make a custom modal dialog fully accessible to keyboard users and screen readers?',
      hint: 'Focus trapping, escape key handler, role="dialog", aria-modal="true", and aria-labelledby.'
    }
  ],
  'Backend Developer': [
    {
      id: 'be-1',
      competency: 'Database Indexing & Query Tuning',
      questionText: 'How does a B-tree index accelerate database queries, and what are the trade-offs of adding too many indexes to a high-write table?',
      hint: 'Discuss search time complexity O(log N), write overhead on inserts/updates, and memory usage.'
    },
    {
      id: 'be-2',
      competency: 'Rate Limiting & Denial of Service Defense',
      questionText: 'Describe how you would implement a token bucket rate limiter in a Node.js API to protect sensitive endpoints from abuse.',
      hint: 'Discuss sliding windows, Redis counters with TTL, and returning HTTP 429 Too Many Requests.'
    },
    {
      id: 'be-3',
      competency: 'Error Handling & Resilience',
      questionText: 'How do you structure centralized error handling in an Express application so that unexpected exceptions do not leak stack traces or crash the server process?',
      hint: 'Discuss Express (err, req, res, next) middleware, unhandledRejections, and standardized error envelopes.'
    }
  ]
};

export default function MockInterviewPage() {
  const { profile, interviewSessions, saveInterviewSession } = useCareerData();

  // Session Setup State
  const [targetTopic, setTargetTopic] = useState(profile.targetRole || 'Full-Stack Developer');
  const [interviewType, setInterviewType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Mid');
  const [sessionLength, setSessionLength] = useState(3);

  // Active Session State
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [finalReport, setFinalReport] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Load question bank for selected topic or fallback
  const questions = SAMPLE_QUESTION_BANK[targetTopic] || SAMPLE_QUESTION_BANK['Full-Stack Developer'];
  const activeQuestion = questions[currentQuestionIndex] || questions[0];

  const handleStartInterview = () => {
    setSessionActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setCurrentEvaluation(null);
    setSessionAnswers([]);
    setFinalReport(null);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    // Simulated transparent rubric evaluation
    const wordCount = userAnswer.trim().split(/\s+/).length;
    const hasCodeOrKeywords = /endpoint|status|http|react|database|index|token|cache|state|error/i.test(userAnswer);

    const relevanceScore = Math.min(95, Math.max(70, wordCount > 25 ? 88 : 75));
    const correctnessScore = Math.min(94, Math.max(72, hasCodeOrKeywords ? 89 : 78));
    const explanationScore = Math.min(92, Math.max(70, wordCount > 40 ? 86 : 76));
    const structureScore = Math.min(90, Math.max(70, userAnswer.includes('.') ? 85 : 74));
    const examplesScore = Math.min(92, Math.max(68, wordCount > 30 ? 84 : 72));

    const questionOverall = Math.round((relevanceScore + correctnessScore + explanationScore + structureScore + examplesScore) / 5);

    const evalResult = {
      overallScore: questionOverall,
      relevance: relevanceScore,
      technicalCorrectness: correctnessScore,
      explanationQuality: explanationScore,
      structure: structureScore,
      examplesAndReasoning: examplesScore,
      feedback: `Good technical answer (${wordCount} words). Articulated relevant concepts for ${activeQuestion.competency}.`,
      strengths: ['Addressed the main architectural prompt directly', 'Used appropriate technical vocabulary'],
      growthArea: wordCount < 30 ? 'Provide a more detailed concrete code example or edge-case consideration.' : 'Mention monitoring or failure rollback implications.'
    };

    setCurrentEvaluation(evalResult);

    setSessionAnswers(prev => [
      ...prev,
      {
        question: activeQuestion.questionText,
        competency: activeQuestion.competency,
        userAnswer,
        evaluation: evalResult
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < Math.min(sessionLength, questions.length)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setCurrentEvaluation(null);
    } else {
      handleFinishSession();
    }
  };

  const handleFinishSession = () => {
    // Compile final session report
    const allAnswers = [...sessionAnswers];
    const avgScore = allAnswers.length > 0
      ? Math.round(allAnswers.reduce((acc, a) => acc + a.evaluation.overallScore, 0) / allAnswers.length)
      : 84;

    const report = {
      topic: `${targetTopic} (${interviewType})`,
      overallScore: avgScore,
      questionsAnswered: allAnswers.length,
      difficulty,
      dimensionScores: {
        relevance: 86,
        technicalCorrectness: 88,
        explanationQuality: 84,
        structure: 82,
        examplesAndReasoning: 85
      },
      strengths: [
        `Clear technical articulation on ${targetTopic} core competencies`,
        'Structured responses with appropriate reasoning steps'
      ],
      growthAreas: [
        'Consider expanding on error handling and asynchronous edge cases',
        'Reference specific HTTP status codes and database index structures where relevant'
      ],
      recommendedPracticeTopics: [
        'REST API status codes and idempotent methods',
        'Database connection pool management',
        'Secure authentication token lifecycles'
      ]
    };

    setFinalReport(report);
    setSessionActive(false);

    // Save to shared application state
    saveInterviewSession(report);
  };

  const handleExitSession = () => {
    setSessionActive(false);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setCurrentEvaluation(null);
    setShowExitConfirm(false);
  };

  return (
    <div className="mock-interview-page">
      {/* Header */}
      <div className="mock-interview-page__header">
        <div className="mock-interview-page__badge">
          <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
          <span>Interactive Interview Arena</span>
        </div>
        <h1 className="mock-interview-page__title">
          Mock Interview Arena
        </h1>
        <p className="mock-interview-page__subtitle">
          Practice role-relevant technical and architectural questions under realistic mock interview conditions. Evaluated against transparent criteria: Relevance, Correctness, Explanation Quality, Structure, and Reasoning.
        </p>
      </div>

      {/* Disclaimers & Transparency Banner */}
      <div className="mock-interview-page__notice">
        <AlertCircle style={{ width: '1rem', height: '1rem', color: 'var(--color-text-muted)', flexShrink: 0, marginTop: '0.125rem' }} />
        <div>
          <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Simulation & Disclaimer Notice:</strong>
          <span>
            Mock interview evaluations are deterministic simulated feedback designed for learning and self-calibration. This tool does not guarantee interview success, employment, or hiring outcomes.
          </span>
        </div>
      </div>

      {/* VIEW 1: FINAL REPORT */}
      {finalReport && (
        <div className="mock-interview-page__card">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-brand-blue)' }}>Session Complete</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.25rem 0' }}>{finalReport.topic}</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>Difficulty: {finalReport.difficulty} • Questions Answered: {finalReport.questionsAnswered}</p>
            </div>

            <div style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#6d28d9', letterSpacing: '0.05em', display: 'block' }}>Evaluation Score</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4c1d95' }}>{finalReport.overallScore}%</span>
            </div>
          </div>

          {/* Transparent Criteria Scores */}
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              Evaluation Across 5 Transparent Criteria
            </h3>
            <div className="mock-interview-page__criteria-grid">
              {Object.entries(finalReport.dimensionScores).map(([key, val]) => (
                <div key={key} className="mock-interview-page__criteria-card">
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block' }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <strong style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', marginTop: '0.25rem', display: 'block' }}>{val}%</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: 'var(--font-size-xs)' }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #a7f3d0', backgroundColor: 'rgba(236, 253, 245, 0.4)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <strong style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669' }} />
                Demonstrated Strengths
              </strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem', color: '#064e3b' }}>
                {finalReport.strengths.map((str, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669', marginTop: '0.375rem', flexShrink: 0 }} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #fde68a', backgroundColor: 'rgba(254, 243, 199, 0.4)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <strong style={{ color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <AlertCircle style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
                Recommended Growth Areas
              </strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem', color: '#78350f' }}>
                {finalReport.growthAreas.map((area, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d97706', marginTop: '0.375rem', flexShrink: 0 }} />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Practice Topics */}
          <div>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Recommended Next Practice Topics
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {finalReport.recommendedPracticeTopics.map((top, i) => (
                <span key={i} style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>
                  {top}
                </span>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              Session recorded to Career Profile & Twin history.
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setFinalReport(null)}
              icon={RotateCcw}
            >
              Start Another Practice Session
            </Button>
          </div>
        </div>
      )}

      {/* VIEW 2: ACTIVE QUESTION FLOW (ONE QUESTION AT A TIME) */}
      {sessionActive && !finalReport && (
        <div className="mock-interview-page__card">
          {/* Progress Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-brand-blue)' }}>
                Question {currentQuestionIndex + 1} of {Math.min(sessionLength, questions.length)}
              </span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'block' }}>Competency: {activeQuestion.competency}</span>
            </div>

            <button
              onClick={() => setShowExitConfirm(true)}
              style={{ background: 'none', border: 'none', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 600, cursor: 'pointer' }}
            >
              Exit Session
            </button>
          </div>

          {/* Question Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.4 }}>
              {activeQuestion.questionText}
            </h2>
            {activeQuestion.hint && (
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
                Hint: {activeQuestion.hint}
              </p>
            )}
          </div>

          {/* Answer Input */}
          {!currentEvaluation ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Your Answer (Type out your explanation clearly as you would in an interview):
              </label>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Structure your answer: 1. Core concept definition -> 2. Implementation details -> 3. Edge-case handling or tradeoffs..."
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)', fontFamily: 'inherit' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  icon={Send}
                >
                  Submit Answer for Rubric Evaluation
                </Button>
              </div>
            </div>
          ) : (
            /* Current Question Evaluation Feedback */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-slate-200)', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', display: 'block', marginBottom: '0.25rem' }}>
                  Your Answer
                </span>
                <p style={{ color: 'var(--color-slate-800)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>{userAnswer}</p>
              </div>

              {/* Rubric Breakdown */}
              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239, 246, 255, 0.5)', border: '1px solid #bfdbfe', fontSize: 'var(--font-size-xs)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ color: '#1e3a8a', fontSize: 'var(--font-size-sm)' }}>
                    Simulated Rubric Evaluation (Score: {currentEvaluation.overallScore}%)
                  </strong>
                  <span style={{ fontSize: '10px', color: '#1d4ed8', fontWeight: 600, textTransform: 'uppercase' }}>
                    5 Criteria Graded
                  </span>
                </div>

                <div className="mock-interview-page__criteria-grid">
                  <div className="mock-interview-page__criteria-card mock-interview-page__criteria-card--blue">
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>Relevance</span>
                    <strong style={{ color: '#1e3a8a' }}>{currentEvaluation.relevance}%</strong>
                  </div>
                  <div className="mock-interview-page__criteria-card mock-interview-page__criteria-card--blue">
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>Correctness</span>
                    <strong style={{ color: '#1e3a8a' }}>{currentEvaluation.technicalCorrectness}%</strong>
                  </div>
                  <div className="mock-interview-page__criteria-card mock-interview-page__criteria-card--blue">
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>Explanation</span>
                    <strong style={{ color: '#1e3a8a' }}>{currentEvaluation.explanationQuality}%</strong>
                  </div>
                  <div className="mock-interview-page__criteria-card mock-interview-page__criteria-card--blue">
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>Structure</span>
                    <strong style={{ color: '#1e3a8a' }}>{currentEvaluation.structure}%</strong>
                  </div>
                  <div className="mock-interview-page__criteria-card mock-interview-page__criteria-card--blue">
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>Reasoning</span>
                    <strong style={{ color: '#1e3a8a' }}>{currentEvaluation.examplesAndReasoning}%</strong>
                  </div>
                </div>

                <p style={{ color: 'var(--color-slate-800)', lineHeight: 1.6, margin: 0 }}>{currentEvaluation.feedback}</p>

                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(191, 219, 254, 0.8)', fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div><strong style={{ color: '#059669' }}>Strength:</strong> {currentEvaluation.strengths.join(', ')}</div>
                  <div><strong style={{ color: '#d97706' }}>Improvement:</strong> {currentEvaluation.growthArea}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextQuestion}
                  icon={ArrowRight}
                >
                  {currentQuestionIndex + 1 < Math.min(sessionLength, questions.length)
                    ? 'Continue to Next Question'
                    : 'Complete Session & View Report'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: SETUP & HISTORY (Default) */}
      {!sessionActive && !finalReport && (
        <div className="mock-interview-page__setup-grid">
          {/* Setup Form */}
          <div className="mock-interview-page__card">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Configure Practice Session</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Select your focus topic, session type, and target difficulty.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: 'var(--font-size-xs)' }}>
              {/* Target Career / Topic */}
              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Target Career Topic</label>
                <select
                  value={targetTopic}
                  onChange={(e) => setTargetTopic(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)' }}
                >
                  {CAREER_CATALOGUE.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Interview Type */}
              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Interview Type</label>
                <div className="mock-interview-page__type-grid">
                  {['Technical', 'System Design', 'Project-Based', 'Behavioral'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInterviewType(type)}
                      className={`mock-interview-page__type-btn ${interviewType === type ? 'mock-interview-page__type-btn--active' : ''}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty & Length */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)' }}
                  >
                    <option value="Junior">Junior / Entry-Level</option>
                    <option value="Mid">Mid-Level</option>
                    <option value="Senior">Senior / Architecture</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Session Length</label>
                  <select
                    value={sessionLength}
                    onChange={(e) => setSessionLength(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)' }}
                  >
                    <option value={3}>3 Questions (~15 mins)</option>
                    <option value={5}>5 Questions (~25 mins)</option>
                  </select>
                </div>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-slate-100)', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleStartInterview}
                  icon={ArrowRight}
                >
                  Start Practice Session (1 Question at a Time)
                </Button>
              </div>
            </div>
          </div>

          {/* Past Interview History */}
          <div className="mock-interview-page__card">
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              Previous Interview History
            </h3>

            {interviewSessions.length === 0 ? (
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>No past interview sessions recorded.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {interviewSessions.map(session => (
                  <div key={session.id} style={{ padding: '0.875rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-slate-50)', fontSize: 'var(--font-size-xs)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{session.topic}</strong>
                      <span style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#f3e8ff', color: '#6b21a8', fontWeight: 700, fontSize: '11px' }}>
                        {session.overallScore}%
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      Completed: {session.date} • {session.questionsAnswered} Questions
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', paddingTop: '0.25rem', borderTop: '1px solid var(--color-slate-200)' }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Strengths:</strong> {session.strengths?.slice(0, 1).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="mock-interview-page__dialog-overlay" onClick={() => setShowExitConfirm(false)}>
          <div className="mock-interview-page__dialog" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Exit Current Session?</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Your unsubmitted answer for this question will be discarded. You can start a new session at any time.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
              <Button size="xs" variant="outline" onClick={() => setShowExitConfirm(false)}>
                Cancel
              </Button>
              <Button size="xs" variant="primary" onClick={handleExitSession}>
                Yes, Exit Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
