import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Milestone
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import './DashboardPage.css';

export default function DashboardPage() {
  const { profile, skills, skillGaps, roadmap, projects, activityLogs } = useCareerData();
  const navigate = useNavigate();

  // Find active roadmap step (Step 3 by default: Create a REST API)
  const activeRoadmapStep = roadmap.find(s => s.status === 'in-progress') || roadmap.find(s => s.status === 'not-started');
  const completedRoadmapSteps = roadmap.filter(s => s.status === 'completed');

  // Find active project mission (Task Manager REST API by default)
  const activeMission = projects.find(p => p.status === 'in-progress') || projects.find(p => p.status === 'not-started');

  // Find top priority skill gap
  const topGap = skillGaps.find(g => g.priority === 'High' && g.state !== 'Demonstrated') || skillGaps[0];

  return (
    <div className="dashboard-page">
      {/* 1. Welcome Message & Current Career Goal */}
      <div className="dashboard-page__welcome-card">
        <div>
          <div className="dashboard-page__stage-row">
            <span className="dashboard-page__stage-label">
              Personalized Career Workspace
            </span>
            <span className="dashboard-page__stage-badge">
              {profile.currentStage}
            </span>
          </div>
          <h1 className="dashboard-page__welcome-title">
            Welcome back, {profile.fullName}
          </h1>
          <p className="dashboard-page__welcome-desc">
            Target Career Goal: <span className="dashboard-page__welcome-target">{profile.targetRole}</span>
          </p>
        </div>

        {/* Quick Context Card */}
        <div className="dashboard-page__context-card">
          <span className="dashboard-page__context-title">Current Demo Profile Context:</span>
          <p>
            Existing evidence: <strong style={{ color: 'var(--color-text-primary)' }}>{profile.existingEvidence}</strong>. Challenge: <strong style={{ color: 'var(--color-text-primary)' }}>{profile.currentChallenge}</strong>.
          </p>
        </div>
      </div>

      {/* 2. Primary Highlight: "What Should I Do Next?" (Principle C: One Useful Next Action) */}
      <div className="dashboard-page__next-action">
        <div className="dashboard-page__next-action-body">
          <div className="dashboard-page__action-pill">
            <Target style={{ width: 14, height: 14, color: 'var(--color-brand-accent)' }} />
            <span>Recommended Next Action</span>
          </div>

          <h2 className="dashboard-page__action-title">
            Next Action: Build a Small REST API
          </h2>

          <p className="dashboard-page__action-desc">
            Your target role requires backend development evidence. Currently, your profile has limited practical proof of API architecture. Complete this mission to demonstrate REST route design, error handling, and upgrade REST APIs from Claimed to Demonstrated.
          </p>

          <div className="dashboard-page__action-buttons">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/app/projects')}
              icon={ArrowRight}
            >
              Start Mission: Task Manager REST API
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/app/skills')}
              style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              Inspect Skill Gaps
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Grid */}
      <div className="dashboard-page__grid">
        {/* Left Column (2 Cols): Active Roadmap & Project Mission */}
        <div className="dashboard-page__column">
          {/* Current Roadmap Activity */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <div className="dashboard-card__header-left">
                <Milestone style={{ width: 20, height: 20, color: 'var(--color-brand-blue)' }} />
                <h3 className="dashboard-card__title">Current Roadmap Activity</h3>
              </div>
              <Link
                to="/app/roadmap"
                className="dashboard-card__link"
              >
                <span>View Full Roadmap ({completedRoadmapSteps.length}/{roadmap.length})</span>
                <ChevronRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>

            {activeRoadmapStep ? (
              <div className="dashboard-roadmap-box">
                <div className="dashboard-roadmap-box__tag-row">
                  <span className="dashboard-roadmap-box__step-badge">
                    Step {roadmap.findIndex(s => s.id === activeRoadmapStep.id) + 1} of {roadmap.length} • {activeRoadmapStep.status === 'in-progress' ? 'In Progress' : 'Next Up'}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Est. Effort: {activeRoadmapStep.estimatedEffort}
                  </span>
                </div>

                <h4 className="dashboard-roadmap-box__title">
                  {activeRoadmapStep.title}
                </h4>

                <p className="dashboard-roadmap-box__desc">
                  {activeRoadmapStep.learningObjective}
                </p>

                <div className="dashboard-roadmap-box__footer">
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Prerequisites: <strong style={{ color: 'var(--color-text-primary)' }}>{activeRoadmapStep.prerequisites}</strong>
                  </span>
                  <Link to="/app/roadmap">
                    <Button size="xs" variant="outline" icon={ArrowRight}>
                      Continue Step
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>All roadmap steps marked complete.</p>
            )}
          </div>

          {/* Active Project Mission */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <div className="dashboard-card__header-left">
                <Briefcase style={{ width: 20, height: 20, color: '#4F46E5' }} />
                <h3 className="dashboard-card__title">Active Project Mission</h3>
              </div>
              <Link
                to="/app/projects"
                className="dashboard-card__link"
              >
                <span>Project Lab</span>
                <ChevronRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>

            {activeMission ? (
              <div className="dashboard-mission-box">
                <div className="dashboard-roadmap-box__tag-row">
                  <span className="dashboard-mission-box__mode-badge">
                    {activeMission.mode === 'guided' ? 'Guided Mode' : 'Challenge Mode'} • {activeMission.status === 'in-progress' ? 'Active' : 'Available'}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    Skills: {activeMission.intendedSkills.join(', ')}
                  </span>
                </div>

                <h4 className="dashboard-mission-box__title">
                  {activeMission.title}
                </h4>

                <p className="dashboard-mission-box__desc">
                  {activeMission.projectObjective}
                </p>

                <div className="dashboard-mission-box__footer">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Deliverable: {activeMission.deliverables}</span>
                  <Link to="/app/projects">
                    <Button size="xs" variant="primary" icon={ArrowRight}>
                      Open Project Workspace
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>No active mission at the moment.</p>
            )}
          </div>
        </div>

        {/* Right Column: Relevant Skill Gaps & Meaningful Progress */}
        <div className="dashboard-page__column">
          {/* Relevant Skill Gaps */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h3 className="dashboard-card__title">Target Role Skill Gaps</h3>
              <Link to="/app/skills" className="dashboard-card__link">
                View All Gaps
              </Link>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Gaps prioritized based on {profile.targetRole} role requirements and your current verified evidence:
            </p>

            <div>
              {skillGaps.slice(0, 4).map((gap) => (
                <div key={gap.id} className="dashboard-gap-item">
                  <div className="dashboard-gap-item__top">
                    <span className="dashboard-gap-item__name">{gap.skillName}</span>
                    <Badge variant={gap.priority} size="sm">
                      {gap.priority} Priority
                    </Badge>
                  </div>

                  <div className="dashboard-gap-item__meta">
                    <span>Evidence State: <strong style={{ color: 'var(--color-text-primary)' }}>{gap.state}</strong></span>
                    <span>Target: Core Requirement</span>
                  </div>

                  <p className="dashboard-gap-item__action">
                    {gap.nextAction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Meaningful Progress */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h3 className="dashboard-card__title">Recent Meaningful Progress</h3>
              <Link to="/app/progress" className="dashboard-card__link">
                Progress Details
              </Link>
            </div>

            <div>
              {activityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="dashboard-activity-item">
                  <span className="dashboard-activity-dot" />
                  <div>
                    <span className="dashboard-activity-title">{log.title}</span>
                    <span className="dashboard-activity-detail">{log.detail}</span>
                    <span className="dashboard-activity-time">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Workflows Navigation */}
          <div className="dashboard-shortcuts-card">
            <span className="dashboard-shortcuts-title">
              Quick Workflow Shortcuts
            </span>
            <div className="dashboard-shortcuts-grid">
              <Link to="/app/explore" className="dashboard-shortcut-btn">
                Explore Careers
              </Link>
              <Link to="/app/interview" className="dashboard-shortcut-btn">
                Interview Arena
              </Link>
              <Link to="/app/skills" className="dashboard-shortcut-btn">
                My Skills
              </Link>
              <Link to="/app/profile" className="dashboard-shortcut-btn">
                Career Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
