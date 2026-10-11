import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Target,
  AlertCircle,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './ProgressPage.css';

export default function ProgressPage() {
  const { profile, skills, roadmap, projects, interviewSessions, activityLogs } = useCareerData();

  // Derived metrics directly from shared application state
  const completedRoadmapSteps = roadmap.filter(s => s.status === 'completed');
  const inProgressRoadmapSteps = roadmap.filter(s => s.status === 'in-progress');
  const roadmapCompletionPercent = Math.round((completedRoadmapSteps.length / roadmap.length) * 100);

  const submittedProjects = projects.filter(p => p.status === 'completed');
  const inProgressProjects = projects.filter(p => p.status === 'in-progress');

  const verifiedSkills = skills.filter(s => s.state === 'Demonstrated');
  const probableSkills = skills.filter(s => s.state === 'Probable');
  const claimedSkills = skills.filter(s => s.state === 'Claimed');
  const unknownSkills = skills.filter(s => s.state === 'Unknown');

  const totalInterviewSessions = interviewSessions.length;
  const averageInterviewScore = totalInterviewSessions > 0
    ? Math.round(interviewSessions.reduce((acc, s) => acc + (s.overallScore || 0), 0) / totalInterviewSessions)
    : 0;

  // Active recommended next practice derived from current state
  const activeRoadmapStep = inProgressRoadmapSteps[0] || roadmap.find(s => s.status === 'not-started');
  const activeMission = inProgressProjects[0] || projects.find(p => p.status === 'not-started');

  return (
    <div className="progress-page">
      {/* Header */}
      <div className="progress-page__header">
        <div className="progress-page__badge">
          <TrendingUp style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
          <span>Evidence-Based Progress Tracking</span>
        </div>
        <h1 className="progress-page__title">
          Learning & Evidence Progress
        </h1>
        <p className="progress-page__subtitle">
          All progress metrics displayed below are derived directly from your completed milestones, verified code artifacts, and recorded assessment sessions. No arbitrary vanity scores or simulated streaks.
        </p>
      </div>

      {/* Target Role & Stage Summary */}
      <div className="progress-page__summary-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700 }}>Learner</span>
            <span style={{ fontSize: 'var(--font-size-xs)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 600 }}>{profile.currentStage}</span>
          </div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.25rem 0 0 0' }}>{profile.fullName} • Targeting {profile.targetRole}</h2>
        </div>
        <div className="progress-page__summary-actions">
          <Link to="/app/roadmap">
            <Button size="sm" variant="outline">
              View Roadmap
            </Button>
          </Link>
          <Link to="/app/projects">
            <Button size="sm" variant="primary">
              Continue Mission
            </Button>
          </Link>
        </div>
      </div>

      {/* Key State Metrics Grid */}
      <div className="progress-page__metrics-grid">
        {/* Roadmap Activities */}
        <div className="progress-page__metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Roadmap Steps</span>
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{completedRoadmapSteps.length}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>of {roadmap.length} completed</span>
          </div>
          <div style={{ marginTop: '0.75rem', width: '100%', backgroundColor: 'var(--color-slate-100)', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{ backgroundColor: '#10b981', height: '100%', borderRadius: '9999px', width: `${roadmapCompletionPercent}%`, transition: 'width 0.3s ease' }}
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>
            {roadmapCompletionPercent}% roadmap milestone progress
          </span>
        </div>

        {/* Project Submissions */}
        <div className="progress-page__metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Missions</span>
            <Briefcase style={{ width: '1rem', height: '1rem', color: 'var(--color-brand-blue)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{submittedProjects.length}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>of {projects.length} verified</span>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brand-blue)' }} />
            <span>{inProgressProjects.length} in progress</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>
            Rubric-graded practical code deliverables
          </span>
        </div>

        {/* Verified Skills */}
        <div className="progress-page__metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demonstrated Skills</span>
            <ShieldCheck style={{ width: '1rem', height: '1rem', color: '#6366f1' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{verifiedSkills.length}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>of {skills.length} skills</span>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px' }}>
            <span style={{ padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 600 }}>{probableSkills.length} Probable</span>
            <span style={{ padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 600 }}>{claimedSkills.length} Claimed</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>
            Evidence Before Inference verification
          </span>
        </div>

        {/* Mock Interviews */}
        <div className="progress-page__metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interview Sessions</span>
            <Sparkles style={{ width: '1rem', height: '1rem', color: '#8b5cf6' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{totalInterviewSessions}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>sessions completed</span>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Avg Evaluation: <strong style={{ color: '#6d28d9' }}>{averageInterviewScore}%</strong>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>
            Deterministic rubric scored
          </span>
        </div>
      </div>

      {/* Recommended Next Practice */}
      <div className="progress-page__next-card">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-brand-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            <Target style={{ width: '0.875rem', height: '0.875rem' }} />
            <span>Prioritized Next Step to Advance Evidence</span>
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            {activeRoadmapStep ? activeRoadmapStep.title : 'All Current Roadmap Steps Completed'}
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '0.25rem', maxWidth: '42rem', lineHeight: 1.5 }}>
            {activeRoadmapStep
              ? activeRoadmapStep.whyItMatters
              : 'You have completed all initial roadmap milestones. Select a new career target or practice mock interview questions in Interview Arena.'}
          </p>
        </div>

        <div style={{ flexShrink: 0 }}>
          {activeMission ? (
            <Link to="/app/projects">
              <Button size="sm" variant="primary" icon={ArrowRight}>
                Open Mission Lab
              </Button>
            </Link>
          ) : (
            <Link to="/app/roadmap">
              <Button size="sm" variant="primary" icon={ArrowRight}>
                Open Roadmap
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Skills Evidence Status Breakdown */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Current Skill Evidence Breakdown</span>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 400 }}>Real state data</span>
        </h3>

        <div className="progress-page__evidence-grid">
          {/* Demonstrated */}
          <div className="progress-page__evidence-col progress-page__evidence-col--demonstrated">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: 'var(--font-size-xs)', color: '#064e3b' }}>Demonstrated ({verifiedSkills.length})</strong>
              <CheckCircle2 style={{ width: '0.875rem', height: '0.875rem', color: '#059669' }} />
            </div>
            <p style={{ fontSize: '11px', color: '#065f46', margin: '0 0 0.75rem 0' }}>Supported by verified practical project deliverable or assessment.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {verifiedSkills.map(s => (
                <div key={s.id} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', border: '1px solid #d1fae5', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{s.name}</span>
                  <span style={{ fontSize: '10px', color: '#059669', fontWeight: 700 }}>{s.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Probable */}
          <div className="progress-page__evidence-col progress-page__evidence-col--probable">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: 'var(--font-size-xs)', color: '#1e3a8a' }}>Probable ({probableSkills.length})</strong>
              <Clock style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
            </div>
            <p style={{ fontSize: '11px', color: '#1d4ed8', margin: '0 0 0.75rem 0' }}>Observed in partial exercises, but lacking full end-to-end evidence.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {probableSkills.map(s => (
                <div key={s.id} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', border: '1px solid #dbeafe', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{s.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-brand-blue)', fontWeight: 700 }}>{s.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Claimed */}
          <div className="progress-page__evidence-col progress-page__evidence-col--claimed">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: 'var(--font-size-xs)', color: '#78350f' }}>Claimed ({claimedSkills.length})</strong>
              <AlertCircle style={{ width: '0.875rem', height: '0.875rem', color: '#d97706' }} />
            </div>
            <p style={{ fontSize: '11px', color: '#b45309', margin: '0 0 0.75rem 0' }}>Self-reported without verified code artifact or practical evaluation.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {claimedSkills.map(s => (
                <div key={s.id} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', border: '1px solid #fef3c7', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#78350f', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{s.name}</span>
                  <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 700 }}>{s.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unknown */}
          <div className="progress-page__evidence-col progress-page__evidence-col--unknown">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-primary)' }}>Unknown ({unknownSkills.length})</strong>
              <HelpCircle style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-text-muted)' }} />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem 0' }}>Not yet assessed. Baseline potential ready for calibration.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {unknownSkills.map(s => (
                <div key={s.id} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{s.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 700 }}>Unassessed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Meaningful Activity Timeline */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
          Meaningful Activity History
        </h3>

        {activityLogs.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>No activity recorded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activityLogs.map((log) => (
              <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brand-blue)', marginTop: '0.375rem', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{log.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{log.timestamp}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.125rem', margin: 0 }}>{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
