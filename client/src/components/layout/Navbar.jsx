import React, { useState } from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { useCareerData } from '../../context/CareerDataContext';
import { useAuth } from '../../context/AuthContext';
import { profileAPI } from '../../services/api';
import './Navbar.css';

export default function Navbar({ setMobileOpen }) {
  const { user } = useAuth();
  const { profile, setTargetRole, careerCatalogue, roadmap, skills } = useCareerData();
  const [roleUpdating, setRoleUpdating] = useState(false);

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setRoleUpdating(true);
    setTargetRole(newRole);
    try {
      await profileAPI.updateTargetRole(newRole);
    } catch (err) {
      // Local fallback in CareerDataContext
    } finally {
      setRoleUpdating(false);
    }
  };

  const completedSteps = roadmap.filter(s => s.status === 'completed').length;
  const verifiedCount = skills.filter(s => s.state === 'Demonstrated').length;

  return (
    <header className="app-navbar">
      <div className="app-navbar__left">
        <button
          onClick={() => setMobileOpen(true)}
          className="app-navbar__menu-btn"
          aria-label="Open mobile navigation"
        >
          <Menu style={{ width: 20, height: 20 }} />
        </button>

        <div className="app-navbar__mobile-brand" aria-label="AI Career Co-Pilot">
          <img src="/app-icon.svg" alt="AI Career Co-Pilot" className="app-navbar__mobile-logo" />
        </div>

        {/* Target Career Quick Switcher */}
        <div className="app-navbar__role-wrap">
          <span className="app-navbar__role-label">Target Career:</span>
          <select
            value={profile.targetRole}
            onChange={handleRoleChange}
            disabled={roleUpdating}
            className="app-navbar__role-select"
          >
            {careerCatalogue.map(c => (
              <option key={c.id} value={c.title}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="app-navbar__right">
        {/* Evidence Status Pill */}
        <div className="app-navbar__evidence-pill">
          <span className="app-navbar__pill-label">Verified Evidence:</span>
          <span className="app-navbar__pill-verified">{verifiedCount} Skills</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span className="app-navbar__pill-milestones">{completedSteps}/{roadmap.length} Milestones</span>
        </div>

        {/* Core Principle Tag */}
        <div className="app-navbar__principle-tag">
          <ShieldCheck style={{ width: 14, height: 14, color: '#2454E8', flexShrink: 0 }} />
          <span>Evidence Before Inference</span>
        </div>

        {/* Learner Avatar */}
        <div className="app-navbar__user">
          <div className="app-navbar__avatar">
            {profile.fullName.charAt(0)}
          </div>
          <div className="app-navbar__user-details">
            <span className="app-navbar__user-name">{profile.fullName}</span>
            <span className="app-navbar__user-stage">{profile.currentStage}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
