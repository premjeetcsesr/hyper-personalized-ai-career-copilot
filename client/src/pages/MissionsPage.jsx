import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Send,
  X
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import './MissionsPage.css';

export default function MissionsPage() {
  const { profile, projects, submitProjectMission } = useCareerData();

  const [activeMissionId, setActiveMissionId] = useState('mission-rest-api');
  const [selectedMode, setSelectedMode] = useState('guided'); // 'guided' | 'challenge'
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submission Form State
  const [repoUrl, setRepoUrl] = useState('https://github.com/aarav-sharma-dev/task-manager-api');
  const [demoUrl, setDemoUrl] = useState('https://aarav-task-api.onrender.com');
  const [architectureNotes, setArchitectureNotes] = useState('Modular Express router with GET, POST, PUT, DELETE /api/tasks endpoints, JSON validation middleware, and standard 200, 201, 400, 404 HTTP status codes.');
  const [reflection, setReflection] = useState('Separated controllers from routes, handled query parameters for task filtering, and added payload validation rejecting empty task titles.');

  const [notification, setNotification] = useState(null);

  const activeMission = projects.find(p => p.id === activeMissionId) || projects[1] || projects[0];

  const handleOpenSubmit = (mission) => {
    setActiveMissionId(mission.id);
    setIsSubmitModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProjectMission(activeMission.id, {
      repoUrl,
      demoUrl,
      architectureNotes,
      reflection
    });

    setIsSubmitModalOpen(false);
    setNotification(`Project mission "${activeMission.title}" submitted successfully! Evaluated on transparent rubric: Demonstrated evidence recorded.`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="missions-page">
      {/* Toast Notification */}
      {notification && (
        <div className="missions-page__toast" role="status">
          <div className="missions-page__toast-content">
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669', flexShrink: 0 }} />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="missions-page__toast-close" aria-label="Dismiss">
            <X style={{ width: '0.875rem', height: '0.875rem' }} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="missions-page__header">
        <div>
          <div className="missions-page__badge">
            <Target style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
            <span>Evidence-Generating Workspace</span>
          </div>
          <h1 className="missions-page__title">
            Project Lab
          </h1>
          <p className="missions-page__subtitle">
            Practical project missions that convert self-reported claims into verified, demonstrated competencies. Work through step-by-step Guided Mode or test your problem-solving in Challenge Mode.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="missions-page__mode-switch">
          <button
            onClick={() => setSelectedMode('guided')}
            className={`missions-page__mode-btn ${selectedMode === 'guided' ? 'missions-page__mode-btn--guided-active' : ''}`}
          >
            Guided Mode
          </button>
          <button
            onClick={() => setSelectedMode('challenge')}
            className={`missions-page__mode-btn ${selectedMode === 'challenge' ? 'missions-page__mode-btn--challenge-active' : ''}`}
          >
            Challenge Mode
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="missions-page__notice">
        <HelpCircle style={{ width: '1rem', height: '1rem', color: 'var(--color-text-muted)', flexShrink: 0, marginTop: '0.125rem' }} />
        <div>
          <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Execution Transparency Notice:</strong>
          <span>
            In this prototype, submissions are evaluated against structured rubric criteria via deterministic simulation. The platform never executes untrusted code on the main application server. Submissions generate verified evidence entries in your Career Profile.
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="missions-page__grid">
        {/* Missions Selection Column */}
        <div className="missions-page__list">
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', display: 'block' }}>
            Practical Missions ({projects.length})
          </span>

          {projects.map((mission) => {
            const isSelected = activeMission.id === mission.id;
            const isCompleted = mission.status === 'completed';
            const isInProgress = mission.status === 'in-progress';

            return (
              <div
                key={mission.id}
                onClick={() => setActiveMissionId(mission.id)}
                className={`missions-page__item-card ${isSelected ? 'missions-page__item-card--active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <Badge variant={isCompleted ? 'Demonstrated' : isInProgress ? 'in_progress' : 'default'} size="sm">
                    {isCompleted ? 'Demonstrated' : isInProgress ? 'Active Recommendation' : 'Available'}
                  </Badge>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {mission.mode === 'guided' ? 'Guided' : 'Challenge'}
                  </span>
                </div>

                <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', margin: 0, lineHeight: 1.4 }}>
                  {mission.title}
                </h3>

                <div style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>Intended:</span>
                  <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{mission.intendedSkills.join(', ')}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Mission Workspace Detail */}
        <div className="missions-page__workspace">
          {/* Top Mission Meta */}
          <div className="missions-page__workspace-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="missions-page__meta-pill">
                  {selectedMode === 'guided' ? 'Guided Mode' : 'Challenge Mode'}
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  Intended Skills: {activeMission.intendedSkills.join(' • ')}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                {activeMission.title}
              </h2>
            </div>

            <Badge variant={activeMission.status === 'completed' ? 'Demonstrated' : 'in_progress'} size="md">
              {activeMission.status === 'completed' ? 'Demonstrated / Verified' : 'In Progress'}
            </Badge>
          </div>

          {/* Objective */}
          <div>
            <span className="missions-page__section-title">
              Project Objective
            </span>
            <p className="missions-page__objective-box">
              {activeMission.projectObjective}
            </p>
          </div>

          {/* Requirements & Milestones */}
          <div className="missions-page__two-col">
            {/* Requirements */}
            <div className="missions-page__box-card">
              <strong style={{ color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                Requirements & Constraints
              </strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem', color: 'var(--color-text-secondary)' }}>
                {activeMission.requirements.map((req, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-brand-blue)', marginTop: '0.375rem', flexShrink: 0 }} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestones */}
            <div className="missions-page__box-card">
              <strong style={{ color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                {selectedMode === 'guided' ? 'Step-by-Step Milestones' : 'Challenge Mode Constraints'}
              </strong>
              {selectedMode === 'guided' ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem', color: 'var(--color-text-secondary)' }}>
                  {activeMission.milestones.map((ms, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 700, fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                        {i + 1}
                      </span>
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ margin: 0 }}>In Challenge Mode, step-by-step guidance is disabled. Implement the solution independently satisfying all constraints and error bounds.</p>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Deliverable: {activeMission.deliverables}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Evaluation Rubric */}
          <div>
            <strong style={{ color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px', display: 'block', marginBottom: '0.5rem' }}>
              Evaluation Rubric Criteria
            </strong>
            <div className="missions-page__rubric-grid">
              {activeMission.evaluationRubric.map((r, i) => (
                <div key={i} className="missions-page__rubric-card">
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>{r.criterion}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '0.125rem' }}>{r.target}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#eff6ff', color: '#1e40af', flexShrink: 0 }}>
                    {r.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Feedback (if completed) */}
          {activeMission.feedback && (
            <div className="missions-page__feedback">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#064e3b' }}>
                  <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669' }} />
                  Demonstrated Deliverable Verified (Score: {activeMission.feedback.score}%)
                </strong>
                <span style={{ fontSize: '10px', color: '#047857', fontWeight: 600, textTransform: 'uppercase' }}>
                  Simulated Rubric Evaluation
                </span>
              </div>

              <p style={{ margin: 0, lineHeight: 1.6 }}>{activeMission.feedback.summary}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', paddingTop: '0.25rem' }}>
                {activeMission.feedback.criteriaScores.map((c, i) => (
                  <div key={i} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', border: '1px solid #d1fae5', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, color: '#064e3b' }}>
                      <span>{c.criterion}</span>
                      <span>{c.score}%</span>
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.125rem' }}>{c.comment}</span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                <strong style={{ color: '#065f46' }}>{activeMission.feedback.evidenceImpact}</strong>
                <button
                  onClick={() => handleOpenSubmit(activeMission)}
                  style={{ background: 'none', border: 'none', color: '#065f46', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <RotateCcw style={{ width: '0.75rem', height: '0.75rem' }} />
                  Retry / Resubmit Deliverable
                </button>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              Deliverable format: Structured repository and implementation notes
            </span>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenSubmit(activeMission)}
              icon={Send}
            >
              {activeMission.status === 'completed' ? 'Resubmit Deliverable' : 'Submit Mission for Rubric Evaluation'}
            </Button>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="missions-page__modal-overlay" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="missions-page__modal" onClick={(e) => e.stopPropagation()}>
            <div className="missions-page__modal-header">
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-brand-blue)', letterSpacing: '0.05em' }}>Mission Submission</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.125rem 0 0 0' }}>{activeMission.title}</h3>
              </div>
              <button onClick={() => setIsSubmitModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="missions-page__form">
              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>GitHub Repository URL</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="missions-page__input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Live Demo or Endpoint URL (Optional)</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app or https://api.onrender.com"
                  className="missions-page__input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Architecture & Technical Implementation Notes</label>
                <textarea
                  rows={3}
                  value={architectureNotes}
                  onChange={(e) => setArchitectureNotes(e.target.value)}
                  placeholder="Explain your routing, data models, error handling, or key design decisions..."
                  className="missions-page__input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Reflection: Challenges Overcome & Lessons Learned</label>
                <textarea
                  rows={2}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="What was the most challenging part of this mission?"
                  className="missions-page__input"
                  required
                />
              </div>

              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', fontSize: '11px' }}>
                <strong style={{ display: 'block' }}>Simulation Transparency:</strong>
                Submissions are graded using deterministic rubric evaluation. Submitting will immediately update your skills record in My Skills to Demonstrated and mark Roadmap Step 3 completed!
              </div>

              <div className="missions-page__form-actions">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={CheckCircle2}>
                  Confirm & Submit Deliverable
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
