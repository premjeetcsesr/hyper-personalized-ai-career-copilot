import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { interviewAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import { useCareerData } from '../context/CareerDataContext';
import './InterviewReportPage.css';

export default function InterviewReportPage() {
  const { sessionId } = useParams();
  const { interviewSessions } = useCareerData();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      try {
        const res = await interviewAPI.getSessionReport(sessionId);
        if (res.data?.session) {
          setSession(res.data.session);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to local shared context
      }

      // Check CareerDataContext
      const local = interviewSessions.find(s => s.id === sessionId) || interviewSessions[0];
      if (local) {
        setSession({
          _id: local.id,
          targetRole: local.topic,
          difficulty: local.difficulty || 'Mid',
          createdAt: new Date().toISOString(),
          finalReport: {
            overallScore: local.overallScore,
            dimensionScores: local.dimensionScores || { technical: 86, reasoning: 88, systemDesign: 84, communication: 88 },
            executiveSummary: `Candidate achieved an evaluation score of ${local.overallScore}%. Demonstrated solid competency across prompt dimensions.`,
            topStrengths: local.strengths || ['Clear architectural communication', 'Accurate HTTP method conventions'],
            criticalGaps: local.growthAreas || ['Expand on error handling edge cases'],
            recommendedPracticeMissions: local.recommendedPracticeTopics || ['REST APIs', 'Database Integration']
          },
          questions: [
            {
              questionIndex: 1,
              competency: 'Core Architecture',
              questionText: 'When designing a REST API, how do you decide between using PUT vs PATCH for resource updates, and what HTTP status codes should you return for success versus validation failure?',
              userAnswer: 'PUT is used for idempotent full replacements where sending the payload replaces the entire resource. PATCH is used for partial updates where only specific fields are modified. Success returns 200 OK or 204 No Content, while validation failure returns 400 Bad Request.',
              evaluation: {
                score: 88,
                correctnessScore: 90,
                reasoningScore: 88,
                strengths: ['Accurate definition of idempotent replacement vs partial mutation', 'Proper HTTP status code specification'],
                feedback: 'Clear, technically correct answer satisfying core API design principles.'
              }
            }
          ]
        });
      }
      setLoading(false);
    }
    loadReport();
  }, [sessionId, interviewSessions]);

  const toggleQ = (idx) => {
    setExpandedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div style={{ padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '3px solid var(--color-brand-blue)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Synthesizing interview report telemetry...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <Card>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center', padding: '2.5rem 0' }}>Interview session not found.</p>
      </Card>
    );
  }

  const report = session.finalReport || {};

  return (
    <div className="interview-report-page">
      {/* Header */}
      <div className="interview-report-page__header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="interview-report-page__badge">
              Evaluation Completed
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>• Mode: {session.mode || 'Standard'}</span>
          </div>
          <h1 className="interview-report-page__title">Technical Interview Assessment Report</h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            Calibrated for role: <strong style={{ color: 'var(--color-text-primary)' }}>{session.targetRole}</strong>
          </p>
        </div>

        <Link to="/app/interview">
          <Button variant="outline" size="sm">
            Conduct Another Session
          </Button>
        </Link>
      </div>

      {/* Executive Scorecard */}
      <div className="interview-report-page__executive-card">
        <div>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#93c5fd', display: 'block', marginBottom: '0.25rem' }}>
            Overall Calibrated Score
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
              {report.overallScore || 85}
            </span>
            <span style={{ fontSize: '1rem', color: '#cbd5e1' }}>/ 100</span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#cbd5e1', marginTop: '0.5rem', maxWidth: '36rem', lineHeight: 1.6, margin: 0 }}>
            {report.executiveSummary || 'Demonstrated reliable technical mastery and strong communication.'}
          </p>
        </div>

        <div className="interview-report-page__score-bars">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '0.25rem' }}>
              <span style={{ color: '#cbd5e1' }}>Technical Depth</span>
              <strong style={{ color: '#ffffff' }}>{report.dimensionScores?.technical || 88}%</strong>
            </div>
            <ProgressBar value={report.dimensionScores?.technical || 88} showValue={false} size="sm" color="blue" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '0.25rem' }}>
              <span style={{ color: '#cbd5e1' }}>Reasoning & Logic</span>
              <strong style={{ color: '#ffffff' }}>{report.dimensionScores?.reasoning || 85}%</strong>
            </div>
            <ProgressBar value={report.dimensionScores?.reasoning || 85} showValue={false} size="sm" color="purple" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '0.25rem' }}>
              <span style={{ color: '#cbd5e1' }}>System Architecture</span>
              <strong style={{ color: '#ffffff' }}>{report.dimensionScores?.systemDesign || 84}%</strong>
            </div>
            <ProgressBar value={report.dimensionScores?.systemDesign || 84} showValue={false} size="sm" color="emerald" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '0.25rem' }}>
              <span style={{ color: '#cbd5e1' }}>Communication</span>
              <strong style={{ color: '#ffffff' }}>{report.dimensionScores?.communication || 90}%</strong>
            </div>
            <ProgressBar value={report.dimensionScores?.communication || 90} showValue={false} size="sm" color="amber" />
          </div>
        </div>
      </div>

      {/* Verified Skills Gained Pill */}
      {report.skillsVerified?.length > 0 && (
        <Card title="Skills Verified by This Assessment" subtitle="Directly promoted to 'Verified' state in your Skill Evidence Graph">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {report.skillsVerified.map((sk, idx) => (
              <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-xs)', fontWeight: 600, backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                <ShieldCheck style={{ width: '1rem', height: '1rem', color: '#059669' }} />
                <span>{sk}</span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Strengths and Critical Gaps */}
      <div className="interview-report-page__two-col">
        <Card title="Observed Strengths" subtitle="Positive patterns identified in technical responses">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {report.topStrengths?.map((str, idx) => (
              <li key={idx} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-slate-700)', backgroundColor: 'rgba(236, 253, 245, 0.5)', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid #d1fae5', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669', flexShrink: 0, marginTop: '0.125rem' }} />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Critical Gaps to Address" subtitle="Key deficiencies to resolve before live industry interviews">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {report.criticalGaps?.map((gap, idx) => (
              <li key={idx} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-slate-700)', backgroundColor: 'rgba(255, 241, 242, 0.5)', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid #ffe4e6', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '10px', flexShrink: 0, marginTop: '0.125rem' }}>
                  !
                </span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Question-by-Question Transcript */}
      <Card title="Question Transcript & Detailed Critiques" subtitle="Review your exact submissions and the underlying scoring rationale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {session.questions?.map((q, idx) => {
            const isExp = expandedQuestions[idx] ?? true;
            return (
              <div key={idx} className="interview-report-page__transcript-item">
                <div
                  onClick={() => toggleQ(idx)}
                  className="interview-report-page__transcript-header"
                >
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, paddingRight: '0.75rem' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-brand-blue)', display: 'block' }}>
                      Question {idx + 1} • {q.competency}
                    </span>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.125rem 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.questionText}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-brand-blue)' }}>
                      Score: {q.evaluation?.score || 80}/100
                    </span>
                    {isExp ? <ChevronUp style={{ width: '1rem', height: '1rem', color: 'var(--color-text-muted)' }} /> : <ChevronDown style={{ width: '1rem', height: '1rem', color: 'var(--color-text-muted)' }} />}
                  </div>
                </div>

                {isExp && (
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--font-size-xs)' }}>
                    <div>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Your Submission</span>
                      <p style={{ color: 'var(--color-slate-700)', backgroundColor: 'var(--color-slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-100)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                        "{q.userAnswer}"
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Evaluator Feedback</span>
                      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        {q.evaluation?.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommended Practice Missions */}
      {report.recommendedPracticeMissions?.length > 0 && (
        <Card title="Recommended Practice Missions" subtitle="Targeted hands-on missions to turn these interview gaps into strengths">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {report.recommendedPracticeMissions.map((miss, idx) => (
              <div key={idx} style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', backgroundColor: 'var(--color-surface)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-slate-800)' }}>{miss}</span>
                <Link to="/app/missions">
                  <Button size="sm" variant="outline" icon={ArrowRight}>
                    Go to Mission
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
