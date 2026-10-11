import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, GitPullRequestDraft, Milestone, Target, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DemoBanner from '../common/DemoBanner';
import './AppLayout.css';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Prototype Status Banner */}
      <DemoBanner />

      <div className="app-shell__body">
        {/* Sidebar Navigation */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Content Shell */}
        <div className="app-shell__content">
          <Navbar setMobileOpen={setMobileOpen} />

          <main className="app-shell__main">
            <Outlet />
          </main>

          <footer className="app-shell__footer">
            <span>AI Career Co-Pilot • Evidence-Based Career Intelligence • </span>
            <strong style={{ color: 'var(--color-text-primary)' }}>Prototype Workspace</strong>
          </footer>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile Navigation" className="app-mobile-nav">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            `app-mobile-nav__item ${isActive ? 'app-mobile-nav__item--active' : ''}`
          }
        >
          <LayoutDashboard className="app-mobile-nav__icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/app/skills"
          className={({ isActive }) =>
            `app-mobile-nav__item ${isActive ? 'app-mobile-nav__item--active' : ''}`
          }
        >
          <GitPullRequestDraft className="app-mobile-nav__icon" />
          <span>Skills</span>
        </NavLink>

        <NavLink
          to="/app/roadmap"
          className={({ isActive }) =>
            `app-mobile-nav__item ${isActive ? 'app-mobile-nav__item--active' : ''}`
          }
        >
          <Milestone className="app-mobile-nav__icon" />
          <span>Roadmap</span>
        </NavLink>

        <NavLink
          to="/app/projects"
          className={({ isActive }) =>
            `app-mobile-nav__item ${isActive ? 'app-mobile-nav__item--active' : ''}`
          }
        >
          <Target className="app-mobile-nav__icon" />
          <span>Missions</span>
        </NavLink>

        <button
          onClick={() => setMobileOpen(true)}
          className="app-mobile-nav__item"
          aria-label="Open full menu"
        >
          <Menu className="app-mobile-nav__icon" />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
