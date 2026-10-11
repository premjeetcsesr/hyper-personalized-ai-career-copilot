import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Milestone,
  Target,
  Sparkles,
  Layers,
  ChevronRight,
  HelpCircle,
  FileCheck,
  Search,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './LandingPage.css';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/onboarding');
  };

  const handleExploreCareers = () => {
    navigate('/app/explore');
  };

  return (
    <div className="landing-page">
      {/* Top Prototype Transparency Notice */}
      <div className="landing-page__top-notice">
        <span className="landing-page__notice-tag">
          PROTOTYPE WORKSPACE
        </span>
        <span>Evidence-Based Career Intelligence • Grounded in empirical code artifacts and transparent rubrics</span>
      </div>

      {/* Navigation */}
      <header className="landing-page__header">
        <div className="landing-page__header-inner">
          <div className="landing-page__brand">
            <div className="landing-page__logo">
              <img src="/app-icon.svg" alt="AI Career Co-Pilot" className="landing-page__logo-img" />
            </div>
            <div>
              <span className="landing-page__brand-text">
                AI Career Co-Pilot
              </span>
              <span className="landing-page__brand-sub">
                Evidence Before Inference
              </span>
            </div>
          </div>

          <div className="landing-page__header-actions">
            <Link to="/app/explore">
              <Button variant="ghost" size="sm">
                Explore Careers
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/app')}
                icon={ArrowRight}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleStartJourney}
                  icon={ArrowRight}
                >
                  Start My Career Journey
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-page__hero">
        <div className="landing-page__hero-inner">
          <div className="landing-page__hero-pill">
            <ShieldCheck style={{ width: 16, height: 16, color: 'var(--color-brand-blue)' }} />
            <span>Evidence-Based Career Intelligence</span>
          </div>

          <h1 className="landing-page__hero-title">
            Build skills. Prove your abilities. <br className="hidden sm:inline" />
            <span className="landing-page__hero-highlight">
              Move toward your career.
            </span>
          </h1>

          <p className="landing-page__hero-desc">
            Discover career paths, understand your skill gaps, practise real-world projects, and prepare for interviews through one evidence-based career development workspace.
          </p>

          <div className="landing-page__hero-buttons">
            <Button
              size="lg"
              variant="primary"
              onClick={handleStartJourney}
              icon={ArrowRight}
            >
              Start My Career Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleExploreCareers}
              icon={Compass}
            >
              Explore Careers
            </Button>
          </div>

          <div className="landing-page__hero-badges">
            <span className="landing-page__hero-badge-item">
              <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--color-success)' }} />
              Verified Project Artifacts
            </span>
            <span className="landing-page__hero-badge-item">
              <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--color-brand-blue)' }} />
              Prioritized Skill Gaps
            </span>
            <span className="landing-page__hero-badge-item">
              <CheckCircle2 style={{ width: 16, height: 16, color: '#4F46E5' }} />
              Adaptive Roadmap
            </span>
            <span className="landing-page__hero-badge-item">
              <CheckCircle2 style={{ width: 16, height: 16, color: '#7C3AED' }} />
              Transparent Rubric Feedback
            </span>
          </div>
        </div>
      </section>

      {/* The 7-Step Core Workflow Explanation */}
      <section className="landing-page__cycle">
        <div className="app-container">
          <div className="landing-page__section-header">
            <div className="landing-page__section-eyebrow">
              <Layers style={{ width: 14, height: 14 }} />
              <span>Connected Product Architecture</span>
            </div>
            <h2 className="landing-page__section-title">
              The 7-Step Evidence Lifecycle
            </h2>
            <p className="landing-page__section-desc">
              Rather than isolated tools, our platform powers a unified cycle: from discovering a career through building code evidence, filling gaps, and practicing interviews.
            </p>
          </div>

          <div className="landing-page__cycle-grid">
            {[
              {
                step: '1',
                title: 'Discover',
                subtitle: 'Possible Career Paths',
                desc: 'Explore curated career catalogues with real industry competencies and example tasks.'
              },
              {
                step: '2',
                title: 'Verify',
                subtitle: 'Existing Evidence',
                desc: 'Differentiate demonstrated skills from probable and self-reported claims.'
              },
              {
                step: '3',
                title: 'Compare',
                subtitle: 'Prioritize Gaps',
                desc: 'Benchmark your demonstrated level against role targets to isolate missing requirements.'
              },
              {
                step: '4',
                title: 'Improve',
                subtitle: 'Practical Roadmap',
                desc: 'Follow actionable milestones tied to your specific career deficiencies.'
              },
              {
                step: '5',
                title: 'Demonstrate',
                subtitle: 'Project Lab Missions',
                desc: 'Build hands-on guided and challenge deliverables with clear acceptance criteria.'
              },
              {
                step: '6',
                title: 'Validate',
                subtitle: 'Interview Arena',
                desc: 'Practice role-specific questions graded against transparent technical rubrics.'
              },
              {
                step: '7',
                title: 'Adapt',
                subtitle: 'Dynamic Evolution',
                desc: 'As projects and interview sessions complete, your roadmap and gaps update automatically.'
              }
            ].map((item) => (
              <div key={item.step} className="landing-page__cycle-card">
                <div>
                  <div className="landing-page__cycle-step-num">
                    {item.step}
                  </div>
                  <h3 className="landing-page__cycle-title">{item.title}</h3>
                  <span className="landing-page__cycle-sub">{item.subtitle}</span>
                  <p className="landing-page__cycle-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realistic Product Preview Section */}
      <section className="landing-page__preview">
        <div className="app-container">
          <div className="landing-page__section-header">
            <span className="landing-page__section-eyebrow">
              Integrated Workspace Preview
            </span>
            <h2 className="landing-page__section-title">
              Realistic Walkthrough with Demo Learner Aarav Sharma
            </h2>
            <p className="landing-page__section-desc">
              Sample profile targeting Full-Stack Developer: HTML/CSS verified, JavaScript probable, REST APIs claimed, and databases unassessed.
            </p>
          </div>

          <div className="landing-page__preview-grid">
            {/* Preview 1: Skill Evidentiary Status */}
            <div className="landing-page__preview-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--spacing-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <ShieldCheck style={{ width: 20, height: 20, color: 'var(--color-brand-blue)' }} />
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Evidentiary Skill Breakdown</h3>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info-text)' }}>
                  Target: Full-Stack Developer
                </span>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                Skills are never assumed verified based on keywords alone. Every skill is placed into a transparent evidentiary state:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2-5)' }}>
                <div style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-success-border)', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-success-text)', display: 'block' }}>HTML & CSS</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-success)' }}>Source: Completed Responsive Portfolio project</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#D1FAE5', color: '#065F46' }}>
                    Demonstrated (85%)
                  </span>
                </div>

                <div style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-probable-border)', backgroundColor: 'var(--color-probable-bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-probable-text)', display: 'block' }}>JavaScript</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-brand-blue)' }}>Source: Partial DOM exercises & async scripts</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
                    Probable (68%)
                  </span>
                </div>

                <div style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-claimed-border)', backgroundColor: 'var(--color-claimed-bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-claimed-text)', display: 'block' }}>REST APIs</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-warning)' }}>Source: Self-reported (No completed API project in profile)</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
                    Claimed (40%)
                  </span>
                </div>

                <div style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-text-primary)', display: 'block' }}>Database Integration</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }}>Source: Not yet assessed</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#E2E8F0', color: '#475569' }}>
                    Unknown (25%)
                  </span>
                </div>
              </div>
            </div>

            {/* Preview 2: Next Action & Project Mission */}
            <div className="landing-page__preview-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--spacing-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <Target style={{ width: 20, height: 20, color: '#4F46E5' }} />
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Prioritized Next Action</h3>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EEF2FF', color: '#4338CA' }}>
                  Step 3 of 8
                </span>
              </div>

              <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  Top Recommended Gap
                </span>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  Build a small REST API for a Task Manager
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-2)', lineHeight: 'var(--leading-relaxed)' }}>
                  "Your target role involves backend development, but your current demo profile has limited practical evidence of API design. Complete this exercise to strengthen that evidence."
                </p>

                <div style={{ marginTop: 'var(--spacing-4)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-secondary)' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Expected Outcome:</strong> Upgrades REST APIs from Claimed to Demonstrated.
                  </div>
                  <Button
                    size="xs"
                    variant="primary"
                    onClick={() => navigate('/app/projects')}
                    icon={ArrowRight}
                  >
                    View Mission
                  </Button>
                </div>
              </div>

              {/* Roadmap Snapshot */}
              <div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 'var(--spacing-2)' }}>
                  Adaptive Roadmap Progression
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1-5)', fontSize: 'var(--text-xs)' }}>
                  <div style={{ padding: 'var(--spacing-2)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', color: 'var(--color-success-text)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>1. Strengthen JavaScript Fundamentals</span>
                    <span style={{ fontWeight: '600' }}>Completed</span>
                  </div>
                  <div style={{ padding: 'var(--spacing-2)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', color: 'var(--color-success-text)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>2. Build a Responsive Frontend</span>
                    <span style={{ fontWeight: '600' }}>Completed</span>
                  </div>
                  <div style={{ padding: 'var(--spacing-2)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)', color: 'var(--color-info-text)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>3. Create a REST API</span>
                    <span style={{ color: 'var(--color-brand-blue)' }}>In Progress</span>
                  </div>
                  <div style={{ padding: 'var(--spacing-2)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>4. Connect the API to a Database</span>
                    <span>Upcoming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Simulation Transparency Section */}
      <section className="landing-page__trust">
        <div className="landing-page__trust-inner">
          <div className="landing-page__trust-icon">
            <HelpCircle style={{ width: 20, height: 20 }} />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            Trust & Evidence Transparency
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', maxWidth: '42rem' }}>
            We distinguish self-reported claims from demonstrated practical evidence. Course badges, connected profiles, or resume keywords alone are never treated as proof of competence. In this prototype, mock interview assessments and project rubric evaluations run using transparent, deterministic simulation rules rather than untrusted live external agents.
          </p>

          <div style={{ paddingTop: 'var(--spacing-4)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button
              variant="primary"
              size="md"
              onClick={handleStartJourney}
              icon={ArrowRight}
            >
              Start My Career Journey
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/app')}
            >
              Explore Sample Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-page__footer">
        <div className="landing-page__footer-inner">
          <p style={{ color: '#E2E8F0', fontWeight: '600' }}>AI Career Co-Pilot • Evidence-Based Career Intelligence</p>
          <p>Curated competencies, transparent rubrics, and adaptive roadmaps for early-career learners.</p>
        </div>
      </footer>
    </div>
  );
}
