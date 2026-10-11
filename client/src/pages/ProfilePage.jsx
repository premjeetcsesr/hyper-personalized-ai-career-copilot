import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  CheckCircle2,
  Edit3,
  X
} from 'lucide-react';
import { useCareerData, CAREER_CATALOGUE } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  const { profile, skills, projects, interviewSessions, updateProfile, setTargetRole } = useCareerData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Edit Form State
  const [editForm, setEditForm] = useState({
    fullName: profile.fullName,
    targetRole: profile.targetRole,
    currentStage: profile.currentStage,
    weeklyLearningHours: profile.weeklyLearningHours,
    bio: profile.bio,
    goals: profile.goals,
    interests: [...profile.interests],
    learningStyle: profile.learningPreferences?.style || 'Hands-on practical projects',
    pacing: profile.learningPreferences?.pacing || 'Self-paced structured',
    feedbackPref: profile.learningPreferences?.feedback || 'Detailed rubrics with transparent criteria'
  });

  const [newInterestInput, setNewInterestInput] = useState('');

  const handleOpenEdit = () => {
    setEditForm({
      fullName: profile.fullName,
      targetRole: profile.targetRole,
      currentStage: profile.currentStage,
      weeklyLearningHours: profile.weeklyLearningHours,
      bio: profile.bio,
      goals: profile.goals,
      interests: [...profile.interests],
      learningStyle: profile.learningPreferences?.style || 'Hands-on practical projects',
      pacing: profile.learningPreferences?.pacing || 'Self-paced structured',
      feedbackPref: profile.learningPreferences?.feedback || 'Detailed rubrics with transparent criteria'
    });
    setIsEditModalOpen(true);
  };

  const handleAddInterest = () => {
    if (newInterestInput.trim() && !editForm.interests.includes(newInterestInput.trim())) {
      setEditForm({ ...editForm, interests: [...editForm.interests, newInterestInput.trim()] });
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setEditForm({ ...editForm, interests: editForm.interests.filter(i => i !== interest) });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: editForm.fullName,
      targetRole: editForm.targetRole,
      currentStage: editForm.currentStage,
      weeklyLearningHours: Number(editForm.weeklyLearningHours),
      bio: editForm.bio,
      goals: editForm.goals,
      interests: editForm.interests,
      learningPreferences: {
        style: editForm.learningStyle,
        pacing: editForm.pacing,
        feedback: editForm.feedbackPref
      }
    });

    if (editForm.targetRole !== profile.targetRole) {
      setTargetRole(editForm.targetRole);
    }

    setIsEditModalOpen(false);
    setNotification('Career profile and learning preferences updated successfully.');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="profile-page">
      {/* Toast Notice */}
      {notification && (
        <div className="profile-page__toast" role="status">
          <div className="profile-page__toast-content">
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669', flexShrink: 0 }} />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', padding: '0.25rem' }}>
            <X style={{ width: '0.875rem', height: '0.875rem' }} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="profile-page__header">
        <div>
          <div className="profile-page__badge">
            <UserCheck style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
            <span>Learner Central Record</span>
          </div>
          <h1 className="profile-page__title">
            Career Profile & Twin
          </h1>
          <p className="profile-page__subtitle">
            A comprehensive, verifiable record of your goals, verified abilities, project artifacts, and interview history. Transparently differentiates demonstrated competence from self-reported claims.
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            icon={Edit3}
            onClick={handleOpenEdit}
          >
            Edit Profile & Goals
          </Button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="profile-page__overview-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="profile-page__avatar">
            {profile.fullName.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{profile.fullName}</h2>
              <span style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 700, backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                {profile.currentStage}
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: '0.125rem 0' }}>{profile.email} • {profile.college}</p>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '0.5rem', maxWidth: '36rem', lineHeight: 1.6, margin: 0 }}>
              {profile.bio}
            </p>

            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {profile.interests.map((int, i) => (
                <span key={i} style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '11px', backgroundColor: 'var(--color-slate-100)', color: 'var(--color-slate-700)', fontWeight: 500 }}>
                  {int}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Goal & Commitment Widget */}
        <div className="profile-page__goal-widget">
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>Target Career</span>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{profile.targetRole}</span>
          </div>

          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>Weekly Learning Hours</span>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{profile.weeklyLearningHours} hours / week</span>
          </div>

          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>Stated Goal</span>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0.125rem 0 0 0' }}>{profile.goals}</p>
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Learning Preferences</h3>
        <div className="profile-page__preferences-grid">
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)' }}>
            <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: 500 }}>Learning Style</span>
            <strong style={{ color: 'var(--color-text-primary)', marginTop: '0.125rem', display: 'block' }}>{profile.learningPreferences?.style || 'Hands-on practical projects'}</strong>
          </div>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)' }}>
            <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: 500 }}>Pacing Preference</span>
            <strong style={{ color: 'var(--color-text-primary)', marginTop: '0.125rem', display: 'block' }}>{profile.learningPreferences?.pacing || 'Self-paced structured'}</strong>
          </div>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)' }}>
            <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: 500 }}>Feedback Preference</span>
            <strong style={{ color: 'var(--color-text-primary)', marginTop: '0.125rem', display: 'block' }}>{profile.learningPreferences?.feedback || 'Detailed rubrics with transparent criteria'}</strong>
          </div>
        </div>
      </div>

      {/* Skills & Evidence Status */}
      <div className="profile-page__section-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>Skills & Evidentiary Classification</h3>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Every skill is grounded by verifiable sources.</span>
          </div>
          <Link to="/app/skills">
            <Button size="xs" variant="outline">
              Manage in My Skills
            </Button>
          </Link>
        </div>

        <div className="profile-page__skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="profile-page__skill-item"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>{skill.name}</strong>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: skill.state === 'Demonstrated' ? '#d1fae5' : skill.state === 'Probable' ? '#dbeafe' : skill.state === 'Claimed' ? '#fef3c7' : '#e2e8f0',
                    color: skill.state === 'Demonstrated' ? '#065f46' : skill.state === 'Probable' ? '#1e40af' : skill.state === 'Claimed' ? '#92400e' : '#334155',
                    border: `1px solid ${skill.state === 'Demonstrated' ? '#a7f3d0' : skill.state === 'Probable' ? '#bfdbfe' : skill.state === 'Claimed' ? '#fde68a' : '#cbd5e1'}`
                  }}
                >
                  {skill.state}
                </span>
              </div>

              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{skill.description}</p>

              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(226, 232, 240, 0.8)', fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div>Source: <strong style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{skill.source}</strong> ({skill.date})</div>
                {skill.limitations && (
                  <div>Limitations: <span style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>{skill.limitations}</span></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects & Code Deliverables */}
      <div className="profile-page__section-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>Project Deliverables & Artifacts</h3>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Real projects demonstrating technical capabilities.</span>
          </div>
          <Link to="/app/projects">
            <Button size="xs" variant="primary">
              Open Project Lab
            </Button>
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>{proj.title}</strong>
                <span
                  style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: proj.status === 'completed' ? '#ecfdf5' : proj.status === 'in-progress' ? '#eff6ff' : 'var(--color-slate-100)',
                    color: proj.status === 'completed' ? '#047857' : proj.status === 'in-progress' ? '#1d4ed8' : 'var(--color-slate-600)',
                    border: `1px solid ${proj.status === 'completed' ? '#a7f3d0' : proj.status === 'in-progress' ? '#bfdbfe' : 'var(--color-border)'}`
                  }}
                >
                  {proj.status === 'completed' ? 'Verified Submission' : proj.status === 'in-progress' ? 'In Progress' : 'Available Mission'}
                </span>
              </div>

              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>{proj.projectObjective}</p>

              {proj.submission && (
                <div style={{ padding: '0.625rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-slate-50)', border: '1px solid rgba(226, 232, 240, 0.8)', fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Code Artifact:</strong>{' '}
                    <a href={proj.submission.repoUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-blue)', textDecoration: 'underline' }}>
                      {proj.submission.repoUrl}
                    </a>
                  </div>
                  {proj.feedback && (
                    <div style={{ color: '#065f46', fontWeight: 500 }}>
                      Rubric Feedback: {proj.feedback.summary} (Score: {proj.feedback.score}%)
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interview Practice History */}
      <div className="profile-page__section-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>Interview Arena Practice History</h3>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Record of simulated technical evaluations.</span>
          </div>
          <Link to="/app/interview">
            <Button size="xs" variant="primary">
              Start New Mock Interview
            </Button>
          </Link>
        </div>

        {interviewSessions.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>No interview sessions recorded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {interviewSessions.map((session) => (
              <div key={session.id} style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', backgroundColor: 'rgba(248, 250, 252, 0.5)', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: 'var(--font-size-xs)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{session.topic}</strong>
                  <span style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#f3e8ff', color: '#6b21a8', fontWeight: 700, fontSize: '11px' }}>
                    Score: {session.overallScore}%
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Date: {session.date} • Questions Answered: {session.questionsAnswered}
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <strong>Top Strengths:</strong> {session.strengths?.join('; ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="profile-page__modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="profile-page__modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-page__modal-header">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Edit Career Profile & Goals</h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-page__form">
              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="profile-page__input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Target Career</label>
                  <select
                    value={editForm.targetRole}
                    onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })}
                    className="profile-page__input"
                  >
                    {CAREER_CATALOGUE.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Weekly Learning Hours</label>
                  <input
                    type="number"
                    value={editForm.weeklyLearningHours}
                    onChange={(e) => setEditForm({ ...editForm, weeklyLearningHours: e.target.value })}
                    className="profile-page__input"
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Current Stage</label>
                <input
                  type="text"
                  value={editForm.currentStage}
                  onChange={(e) => setEditForm({ ...editForm, currentStage: e.target.value })}
                  className="profile-page__input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Bio / Profile Summary</label>
                <textarea
                  rows={2}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="profile-page__input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Career Goal Statement</label>
                <textarea
                  rows={2}
                  value={editForm.goals}
                  onChange={(e) => setEditForm({ ...editForm, goals: e.target.value })}
                  className="profile-page__input"
                />
              </div>

              {/* Interests Tags */}
              <div>
                <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Career Interests</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    placeholder="Add an interest..."
                    className="profile-page__input"
                    style={{ flex: 1 }}
                  />
                  <Button type="button" size="xs" variant="outline" onClick={handleAddInterest}>
                    Add
                  </Button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {editForm.interests.map(int => (
                    <span key={int} style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#eff6ff', color: '#1e40af', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>{int}</span>
                      <button type="button" onClick={() => handleRemoveInterest(int)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 0 }}>
                        <X style={{ width: '0.75rem', height: '0.75rem' }} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="profile-page__form-actions">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
