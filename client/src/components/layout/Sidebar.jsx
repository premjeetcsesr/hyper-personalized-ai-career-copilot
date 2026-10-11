import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  UserCheck,
  GitPullRequestDraft,
  Milestone,
  Target,
  Sparkles,
  TrendingUp,
  Settings,
  LogOut,
  GraduationCap,
  Briefcase,
  FileText,
  Github,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerData } from '../../context/CareerDataContext';
import './Sidebar.css';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { logout } = useAuth();
  const { profile } = useCareerData();

  const navigationItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Explore Careers', path: '/app/explore', icon: Compass },
    { name: 'Career Profile', path: '/app/profile', icon: UserCheck },
    { name: 'My Skills & Evidence', path: '/app/skills', icon: GitPullRequestDraft },
    { name: 'My Roadmap', path: '/app/roadmap', icon: Milestone },
    { name: 'Project Lab', path: '/app/projects', icon: Target },
    { name: 'Interview Arena', path: '/app/interview', icon: Sparkles },
    { name: 'Progress', path: '/app/progress', icon: TrendingUp },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="app-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${mobileOpen ? 'app-sidebar--open' : ''}`}>
        {/* Brand Header */}
        <div className="app-sidebar__header">
          <div className="app-sidebar__brand-row">
            <div className="app-sidebar__brand">
              <div className="app-sidebar__logo">
                <img src="/app-icon.svg" alt="AI Career Co-Pilot" className="app-sidebar__logo-img" />
              </div>
              <div>
                <h1 className="app-sidebar__title">
                  AI Career Co-Pilot
                </h1>
                <span className="app-sidebar__subtitle">
                  Evidence-Based Intelligence
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="app-sidebar__close-btn"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Target Role Tag */}
          <div className="app-sidebar__target-card">
            <Briefcase style={{ width: 14, height: 14, color: '#60A5FA', flexShrink: 0 }} />
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span className="app-sidebar__target-label">Target Career</span>
              <span className="app-sidebar__target-value">
                {profile.targetRole}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="app-sidebar__nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/app'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
                }
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{item.name}</span>
                {item.name === 'Interview Arena' && (
                  <span className="app-sidebar__badge-live">
                    Live
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Evidence Tools Sub-section */}
          <div className="app-sidebar__section-divider">
            <span className="app-sidebar__section-title">
              Evidence Importers
            </span>
            <NavLink
              to="/app/resume"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
              }
            >
              <FileText style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span>Resume Signal Parser</span>
            </NavLink>
            <NavLink
              to="/app/github"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
              }
            >
              <Github style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span>GitHub Code Scanner</span>
            </NavLink>
          </div>
        </nav>

        {/* Learner profile footer */}
        <div className="app-sidebar__footer">
          <div className="app-sidebar__profile-row">
            <div className="app-sidebar__avatar">
              {profile.fullName.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
              <div className="app-sidebar__user-name">{profile.fullName}</div>
              <div className="app-sidebar__user-college">
                <GraduationCap style={{ width: 12, height: 12, color: '#60A5FA', flexShrink: 0 }} />
                <span>{profile.college || 'Learner'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="app-sidebar__signout-btn"
          >
            <LogOut style={{ width: 14, height: 14 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
