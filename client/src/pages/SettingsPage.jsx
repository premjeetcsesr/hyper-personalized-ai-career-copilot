import React, { useState } from 'react';
import {
  Settings,
  User,
  Globe,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useCareerData, CAREER_CATALOGUE } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './SettingsPage.css';

export default function SettingsPage() {
  const { profile, skills, roadmap, projects, interviewSessions, settings, updateProfile, setTargetRole, updateSettings, resetDemoData } = useCareerData();

  // Profile Form
  const [fullName, setFullName] = useState(profile.fullName);
  const [currentStage, setCurrentStage] = useState(profile.currentStage);
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyLearningHours);
  const [selectedRole, setSelectedRole] = useState(profile.targetRole);
  const [goalText, setGoalText] = useState(profile.goals);

  // Settings State
  const [language, setLanguage] = useState(settings.language || 'en');
  const [reducedMotion, setReducedMotion] = useState(settings.reducedMotion || false);
  const [highContrast, setHighContrast] = useState(settings.highContrast || false);
  const [textSize, setTextSize] = useState(settings.textSize || 'normal');

  // Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSaveProfileSettings = (e) => {
    e.preventDefault();
    updateProfile({
      fullName,
      currentStage,
      weeklyLearningHours: Number(weeklyHours),
      goals: goalText,
      targetRole: selectedRole
    });

    if (selectedRole !== profile.targetRole) {
      setTargetRole(selectedRole);
    }

    updateSettings({
      language,
      reducedMotion,
      highContrast,
      textSize
    });

    setNotification('Settings and preferences saved successfully.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
    setNotification('Demo profile restored to default initial state for Aarav Sharma.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportData = () => {
    const exportPayload = {
      exportDate: new Date().toISOString(),
      platform: 'AI Career Co-Pilot',
      profile,
      skills,
      roadmap,
      projects,
      interviewSessions
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `career_copilot_${profile.fullName.toLowerCase().replace(/\s+/g, '_')}_data.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  return (
    <div className="settings-page">
      {/* Toast Notification */}
      {notification && (
        <div style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: 'var(--font-size-xs)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#059669', flexShrink: 0 }} />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', padding: '0.25rem' }}>
            <X style={{ width: '0.875rem', height: '0.875rem' }} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="settings-page__header">
        <div className="settings-page__badge">
          <Settings style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-brand-blue)' }} />
          <span>Platform Preferences & Controls</span>
        </div>
        <h1 className="settings-page__title">
          Settings & Profile Controls
        </h1>
        <p className="settings-page__subtitle">
          Customize your learner details, target career goal, language preferences, accessibility display modes, or reset the prototype demo state. Every control here is functional.
        </p>
      </div>

      <form onSubmit={handleSaveProfileSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 1. Profile & Career Goal Editing */}
        <div className="settings-page__section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
            <User style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-brand-blue)' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Learner Profile & Career Target</h2>
          </div>

          <div className="settings-page__grid-2">
            <div>
              <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="settings-page__input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Target Career Goal</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="settings-page__input"
              >
                {CAREER_CATALOGUE.map(c => (
                  <option key={c.id} value={c.title}>{c.title} ({c.category})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Current Education / Stage</label>
              <input
                type="text"
                value={currentStage}
                onChange={(e) => setCurrentStage(e.target.value)}
                className="settings-page__input"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Weekly Learning Hours Commitment</label>
              <input
                type="number"
                min="1"
                max="60"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="settings-page__input"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Primary Goal Statement</label>
              <textarea
                rows={2}
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                className="settings-page__input"
              />
            </div>
          </div>
        </div>

        {/* 2. Language Preference */}
        <div className="settings-page__section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
            <Globe style={{ width: '1.25rem', height: '1.25rem', color: '#6366f1' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Language Preference</h2>
          </div>

          <div style={{ fontSize: 'var(--font-size-xs)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600 }}>User Interface Language</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <label
                className={`settings-page__radio-card ${language === 'en' ? 'settings-page__radio-card--active' : ''}`}
              >
                <input
                  type="radio"
                  name="lang"
                  checked={language === 'en'}
                  onChange={() => setLanguage('en')}
                />
                <span>English (US / Global Standard)</span>
              </label>

              <label
                className={`settings-page__radio-card ${language === 'hi' ? 'settings-page__radio-card--active' : ''}`}
              >
                <input
                  type="radio"
                  name="lang"
                  checked={language === 'hi'}
                  onChange={() => setLanguage('hi')}
                />
                <span>Hindi (हिंदी UI Labels Preview)</span>
              </label>
            </div>
          </div>
        </div>

        {/* 3. Accessibility & Display Settings */}
        <div className="settings-page__section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem' }}>
            <Eye style={{ width: '1.25rem', height: '1.25rem', color: '#059669' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Accessibility & Display Settings</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--font-size-xs)' }}>
            <label className="settings-page__switch-row">
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Reduced Motion</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>Minimize micro-animations and transitions (prefers-reduced-motion)</span>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
            </label>

            <label className="settings-page__switch-row">
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Enhanced High Contrast Mode</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>Strengthen border definitions and contrast ratios for maximum readability</span>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
            </label>

            <div className="settings-page__switch-row">
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Text Sizing</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>Adjust standard interface font size</span>
              </div>
              <select
                value={textSize}
                onChange={(e) => setTextSize(e.target.value)}
                style={{ padding: '0.375rem 0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-surface)' }}
              >
                <option value="normal">Standard (Default)</option>
                <option value="large">Large (+15% Scaling)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="primary" size="md">
            Save All Preferences
          </Button>
        </div>
      </form>

      {/* 4. Data Export & Demo Reset Section */}
      <div className="settings-page__section-card" style={{ paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '0.75rem', margin: 0 }}>
          Data Management & Demo Reset
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-slate-50)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)' }}>
          <div>
            <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>Export Career Twin Data</strong>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>Download your verified skill evidences, project submissions, and interview reports as JSON.</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportData}
            icon={Download}
          >
            Export JSON
          </Button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #fecdd3', backgroundColor: 'rgba(255, 241, 242, 0.4)', fontSize: 'var(--font-size-xs)' }}>
          <div>
            <strong style={{ color: '#881337', display: 'block' }}>Reset Demo State</strong>
            <span style={{ color: '#be123c', fontSize: '11px' }}>Restores default sample learner Aarav Sharma with initial evidentiary states.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            style={{ padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', fontWeight: 700, backgroundColor: '#e11d48', color: '#ffffff', border: 'none', cursor: 'pointer' }}
          >
            Reset Demo Data...
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="settings-page__dialog-overlay" onClick={() => setIsResetConfirmOpen(false)}>
          <div className="settings-page__dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e11d48' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#e11d48' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Confirm Reset of Demo Data</h3>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Restore default initial state</span>
              </div>
            </div>

            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>This action will remove:</strong>
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: 0 }}>
                <li>Any custom skills added during your session</li>
                <li>Submitted project lab deliverables and rubric scores</li>
                <li>Completed mock interview evaluations</li>
                <li>Changes made to profile goals or target career</li>
              </ul>
              <p style={{ paddingTop: '0.25rem', color: 'var(--color-text-primary)', fontWeight: 500, margin: 0 }}>
                The platform will return to Aarav Sharma's default state: Target role Full-Stack Developer, HTML & CSS demonstrated, JavaScript probable, and REST APIs claimed.
              </p>
            </div>

            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button size="xs" variant="outline" onClick={() => setIsResetConfirmOpen(false)}>
                Cancel
              </Button>
              <button
                type="button"
                onClick={handleConfirmReset}
                style={{ padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', fontWeight: 700, backgroundColor: '#e11d48', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
