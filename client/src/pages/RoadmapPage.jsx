import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Milestone,
  CheckCircle2,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import './RoadmapPage.css';

export default function RoadmapPage() {
  const { profile, roadmap, updateRoadmapStepStatus } = useCareerData();

  const [expandedSteps, setExpandedSteps] = useState({ 'step-3': true });
  const [notification, setNotification] = useState(null);

  const toggleExpand = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleStatusUpdate = (stepId, newStatus, stepTitle) => {
    updateRoadmapStepStatus(stepId, newStatus);
    setNotification(
      newStatus === 'completed'
        ? `Milestone "${stepTitle}" marked completed. Note: Practical competencies remain Claimed until project deliverable is verified in Project Lab.`
        : `Milestone "${stepTitle}" updated to ${newStatus}.`
    );
    setTimeout(() => setNotification(null), 5000);
  };

  const completedCount = roadmap.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="roadmap-page">
      {/* Toast Notification */}
      {notification && (
        <div className="roadmap-page__toast" role="status">
          <div className="roadmap-page__toast-content">
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: 'var(--color-brand-blue)', flexShrink: 0 }} />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="roadmap-page__toast-dismiss" aria-label="Dismiss">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="roadmap-page__header">
        <div>
          <div className="roadmap-page__badge">
            <Milestone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
            <span>Rule-Based Adaptive Roadmap</span>
          </div>
          <h1 className="roadmap-page__title">
            Personalized Learning Roadmap
          </h1>
          <p className="roadmap-page__subtitle">
            Tied directly to your target role (<strong style={{ color: 'var(--color-text-primary)' }}>{profile.targetRole}</strong>) and identified skill deficiencies. Each milestone pairs theoretical objectives with practical evidence tasks.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="roadmap-page__progress-widget">
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>Roadmap Completion</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{completedCount} of {roadmap.length} Milestones</span>
          </div>
          <div className="roadmap-page__progress-circle">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Rule-Based Adaptation Transparency Banner */}
      <div className="roadmap-page__disclosure">
        <HelpCircle style={{ width: '1rem', height: '1rem', color: 'var(--color-text-muted)', flexShrink: 0, marginTop: '0.125rem' }} />
        <div>
          <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Rule-Based Adaptation Disclosure:</strong>
          <span>
            This roadmap is calibrated using transparent rule-based adaptation. As you complete project submissions and mock interview evaluations, corresponding steps mark complete, and subsequent prerequisite milestones unlock automatically.
          </span>
        </div>
      </div>

      {/* Roadmap Steps Accordion */}
      <div className="roadmap-page__steps">
        {roadmap.map((step, index) => {
          const isExpanded = !!expandedSteps[step.id];
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in-progress';
          const isPaused = step.status === 'paused';

          const badgeVariant = isCompleted ? 'completed' : isInProgress ? 'in_progress' : isPaused ? 'warning' : 'default';
          const badgeLabel = isCompleted ? 'Completed' : isInProgress ? 'In Progress' : isPaused ? 'Paused' : 'Not Started';

          const indexClass = isCompleted
            ? 'roadmap-page__step-index--completed'
            : isInProgress
            ? 'roadmap-page__step-index--in-progress'
            : isPaused
            ? 'roadmap-page__step-index--paused'
            : 'roadmap-page__step-index--default';

          const cardClass = isInProgress
            ? 'roadmap-page__step-card--in-progress'
            : isCompleted
            ? 'roadmap-page__step-card--completed'
            : '';

          return (
            <div
              key={step.id}
              className={`roadmap-page__step-card ${cardClass}`}
            >
              {/* Step Header Bar */}
              <div
                onClick={() => toggleExpand(step.id)}
                className="roadmap-page__step-header"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div className={`roadmap-page__step-index ${indexClass}`}>
                    {isCompleted ? <CheckCircle2 style={{ width: '1rem', height: '1rem' }} /> : index + 1}
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
                        Step {index + 1} • {step.estimatedEffort}
                      </span>
                      <Badge variant={badgeVariant} size="sm">
                        {badgeLabel}
                      </Badge>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '0.25rem' }}>
                    {isExpanded ? <ChevronUp style={{ width: '1.25rem', height: '1.25rem' }} /> : <ChevronDown style={{ width: '1.25rem', height: '1.25rem' }} />}
                  </button>
                </div>
              </div>

              {/* Step Body (Expanded) */}
              {isExpanded && (
                <div className="roadmap-page__step-body">
                  {/* Objective & Why it matters */}
                  <div className="roadmap-page__step-grid">
                    <div className="roadmap-page__step-box">
                      <span style={{ fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', display: 'block', marginBottom: '0.25rem' }}>
                        Learning Objective
                      </span>
                      <p style={{ color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5 }}>{step.learningObjective}</p>
                    </div>

                    <div className="roadmap-page__step-box roadmap-page__step-box--blue">
                      <span style={{ fontWeight: 700, color: 'var(--color-brand-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', display: 'block', marginBottom: '0.25rem' }}>
                        Why It Matters for {profile.targetRole}
                      </span>
                      <p style={{ color: '#172554', margin: 0, lineHeight: 1.5 }}>{step.whyItMatters}</p>
                    </div>
                  </div>

                  {/* Prerequisites & Instructions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Prerequisites:</strong>
                      <span>{step.prerequisites}</span>
                    </div>

                    <div className="roadmap-page__step-box">
                      <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.25rem' }}>Guidance & Learning Instructions:</strong>
                      <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{step.instructions}</p>
                    </div>
                  </div>

                  {/* Practice Activity & Evidence Task */}
                  <div className="roadmap-page__step-grid">
                    <div className="roadmap-page__step-box roadmap-page__step-box--card">
                      <strong style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                        <BookOpen style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
                        Practice Activity
                      </strong>
                      <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{step.practiceActivity}</p>
                    </div>

                    <div className="roadmap-page__step-box roadmap-page__step-box--card">
                      <strong style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                        <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: '#059669' }} />
                        Evidence Deliverable Task
                      </strong>
                      <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{step.evidenceTask}</p>
                    </div>
                  </div>

                  {/* Completion Criteria */}
                  <div className="roadmap-page__step-criteria">
                    <span style={{ fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#065f46', fontSize: '11px', marginBottom: '0.125rem' }}>
                      Completion Criteria:
                    </span>
                    {step.completionCriteria}
                  </div>

                  {/* Interactive Status Controls */}
                  <div className="roadmap-page__step-actions">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {step.status !== 'in-progress' && !isCompleted && (
                        <Button
                          size="xs"
                          variant="primary"
                          onClick={() => handleStatusUpdate(step.id, 'in-progress', step.title)}
                          icon={Play}
                        >
                          Start Step
                        </Button>
                      )}

                      {step.status === 'in-progress' && (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleStatusUpdate(step.id, 'paused', step.title)}
                          icon={Pause}
                        >
                          Pause Step
                        </Button>
                      )}

                      {step.status === 'paused' && (
                        <Button
                          size="xs"
                          variant="primary"
                          onClick={() => handleStatusUpdate(step.id, 'in-progress', step.title)}
                          icon={Play}
                        >
                          Resume Step
                        </Button>
                      )}

                      {!isCompleted ? (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleStatusUpdate(step.id, 'completed', step.title)}
                          icon={CheckCircle2}
                        >
                          Mark as Completed
                        </Button>
                      ) : (
                        <button
                          onClick={() => handleStatusUpdate(step.id, 'in-progress', step.title)}
                          style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Reopen Step
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Link to="/app/projects">
                        <Button size="xs" variant="primary" icon={ArrowRight}>
                          Open Associated Practice Task
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
