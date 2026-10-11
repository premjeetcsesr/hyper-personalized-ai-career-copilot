import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GitPullRequestDraft,
  CheckCircle2,
  Plus,
  ArrowRight,
  ChevronRight,
  X
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import './SkillGapPage.css';

export default function SkillGapPage() {
  const { profile, skills, skillGaps, addSelfReportedSkill } = useCareerData();

  const [activeTab, setActiveTab] = useState('gaps'); // 'gaps' | 'all-skills'
  const [filterState, setFilterState] = useState('ALL');
  const [selectedGap, setSelectedGap] = useState(skillGaps[0] || null);
  const [mobileExpandedId, setMobileExpandedId] = useState(skillGaps[0]?.id || null);

  // Add Skill Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillForm, setNewSkillForm] = useState({
    name: '',
    category: 'Frontend',
    state: 'Claimed',
    description: '',
    relatedProject: ''
  });
  const [notification, setNotification] = useState(null);

  // Filter skills
  const filteredSkills = skills.filter(s => {
    if (filterState === 'ALL') return true;
    return s.state.toUpperCase() === filterState.toUpperCase();
  });

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;

    addSelfReportedSkill({
      name: newSkillForm.name.trim(),
      category: newSkillForm.category,
      state: newSkillForm.state,
      description: newSkillForm.description || `Self-reported ${newSkillForm.name}.`,
      relatedProject: newSkillForm.relatedProject || 'Self-reported'
    });

    setIsAddModalOpen(false);
    setNewSkillForm({ name: '', category: 'Frontend', state: 'Claimed', description: '', relatedProject: '' });
    setNotification(`Skill "${newSkillForm.name}" added as Claimed. Complete a project mission to earn Demonstrated status.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const renderGapBreakdown = (gap) => (
    <div className="skill-gap-page__breakdown">
      <div>
        <span className="skill-gap-page__breakdown-label">
          1. Competency Definition
        </span>
        <p className="skill-gap-page__breakdown-box">
          {gap.whatItMeans}
        </p>
      </div>

      <div>
        <span className="skill-gap-page__breakdown-label">
          2. Relevance for {profile.targetRole}
        </span>
        <p className="skill-gap-page__breakdown-box">
          {gap.whyItMatters}
        </p>
      </div>

      <div>
        <span className="skill-gap-page__breakdown-label">
          3. Existing Evidence on Record
        </span>
        <p className="skill-gap-page__breakdown-box">
          {gap.existingEvidence}
        </p>
      </div>

      <div>
        <span className="skill-gap-page__breakdown-label">
          4. What Is Missing
        </span>
        <p className="skill-gap-page__breakdown-box skill-gap-page__breakdown-box--danger">
          {gap.whatIsMissing}
        </p>
      </div>

      <div>
        <span className="skill-gap-page__breakdown-label">
          5. Recommended Next Practical Action
        </span>
        <p className="skill-gap-page__breakdown-box skill-gap-page__breakdown-box--highlight">
          {gap.nextAction}
        </p>
      </div>

      <div>
        <span className="skill-gap-page__breakdown-label">
          6. Transparent Assessment Rubric
        </span>
        <p className="skill-gap-page__breakdown-box">
          {gap.howAssessed}
        </p>
      </div>

      <div className="skill-gap-page__breakdown-action">
        <span className="skill-gap-page__breakdown-action-note">
          Requires verified code artifact in Project Lab
        </span>
        <Link to="/app/projects">
          <Button size="sm" variant="primary" icon={ArrowRight}>
            Start Related Project Mission
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="skill-gap-page">
      {/* Toast Notification */}
      {notification && (
        <div className="skill-gap-page__toast" role="status">
          <div className="skill-gap-page__toast-content">
            <CheckCircle2 size={16} className="skill-gap-page__toast-icon" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="skill-gap-page__toast-close" aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="skill-gap-page__header">
        <div>
          <div className="skill-gap-page__badge">
            <GitPullRequestDraft size={14} className="skill-gap-page__badge-icon" />
            <span>Evidence Before Inference Engine</span>
          </div>
          <h1 className="skill-gap-page__title">
            My Skills & Prioritized Gap Analysis
          </h1>
          <p className="skill-gap-page__subtitle">
            Compare target competencies for <strong className="skill-gap-page__target-role-strong">{profile.targetRole}</strong> against your current evidence. Differentiates verified abilities from self-reported claims.
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Self-Reported Skill
          </Button>
        </div>
      </div>

      {/* 4 Evidentiary States Legend */}
      <div className="skill-gap-page__legend-grid">
        <div className="skill-gap-page__legend-card skill-gap-page__legend-card--demonstrated">
          <div>
            <Badge variant="Demonstrated" size="sm">Demonstrated</Badge>
          </div>
          <p className="skill-gap-page__legend-desc">
            Practical evidence or completed project deliverable supports the competency.
          </p>
        </div>

        <div className="skill-gap-page__legend-card skill-gap-page__legend-card--probable">
          <div>
            <Badge variant="Probable" size="sm">Probable</Badge>
          </div>
          <p className="skill-gap-page__legend-desc">
            Partial exercises or code signals exist, but not conclusively verified.
          </p>
        </div>

        <div className="skill-gap-page__legend-card skill-gap-page__legend-card--claimed">
          <div>
            <Badge variant="Claimed" size="sm">Claimed</Badge>
          </div>
          <p className="skill-gap-page__legend-desc">
            Learner stated they know it; insufficient supporting project evidence.
          </p>
        </div>

        <div className="skill-gap-page__legend-card skill-gap-page__legend-card--unknown">
          <div>
            <Badge variant="Unknown" size="sm">Unknown</Badge>
          </div>
          <p className="skill-gap-page__legend-desc">
            Not yet assessed. Never penalized as zero; baseline potential.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="skill-gap-page__tabs">
        <button
          onClick={() => setActiveTab('gaps')}
          className={`skill-gap-page__tab-btn ${activeTab === 'gaps' ? 'skill-gap-page__tab-btn--active' : ''}`}
        >
          Prioritized Skill Gaps ({skillGaps.length})
        </button>
        <button
          onClick={() => setActiveTab('all-skills')}
          className={`skill-gap-page__tab-btn ${activeTab === 'all-skills' ? 'skill-gap-page__tab-btn--active' : ''}`}
        >
          My Full Skills Record ({skills.length})
        </button>
      </div>

      {/* TAB 1: PRIORITIZED SKILL GAPS */}
      {activeTab === 'gaps' && (
        <div className="skill-gap-page__gaps-layout">
          {/* Gaps List Column */}
          <div className="skill-gap-page__gaps-list">
            <span className="skill-gap-page__breakdown-label">
              Gaps for {profile.targetRole}
            </span>

            {skillGaps.map((gap) => {
              const isSelected = selectedGap?.id === gap.id;
              const isMobileExpanded = mobileExpandedId === gap.id;

              return (
                <div
                  key={gap.id}
                  className={`skill-gap-page__gap-card ${isSelected ? 'skill-gap-page__gap-card--selected' : ''}`}
                >
                  <div
                    onClick={() => {
                      setSelectedGap(gap);
                      setMobileExpandedId(isMobileExpanded ? null : gap.id);
                    }}
                    className="skill-gap-page__gap-card-header"
                  >
                    <div className="skill-gap-page__gap-header-top">
                      <span className="skill-gap-page__gap-skill-name">{gap.skillName}</span>
                      <Badge variant={gap.priority} size="sm">
                        {gap.priority} Priority
                      </Badge>
                    </div>

                    <div className="skill-gap-header-meta skill-gap-page__gap-header-meta">
                      <div className="skill-gap-page__gap-current-wrap">
                        <span className="skill-gap-page__gap-current-label">Current:</span>
                        <Badge variant={gap.state} size="sm">{gap.state}</Badge>
                      </div>
                      <span className="skill-gap-page__gap-current-state">
                        Target: Core Requirement
                      </span>
                    </div>

                    <p className="skill-gap-page__gap-desc">
                      {gap.whatIsMissing}
                    </p>

                    {/* Mobile expansion hint */}
                    <div className="skill-gap-page__gap-mobile-toggle lg-hidden-block">
                      <span>{isMobileExpanded ? 'Hide Details' : 'View Full Gap Breakdown'}</span>
                      <ChevronRight size={14} className={isMobileExpanded ? 'skill-gap-page__chevron--expanded' : 'skill-gap-page__chevron'} />
                    </div>
                  </div>

                  {/* Inline Expanded Mobile Breakdown */}
                  {isMobileExpanded && (
                    <div className="skill-gap-page__gap-mobile-breakdown">
                      {renderGapBreakdown(gap)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Gap Detail Explanation Column (Desktop) */}
          <div className="skill-gap-page__inspector">
            {selectedGap ? (
              <div className="skill-gap-page__inspector-inner">
                <div className="skill-gap-page__inspector-header">
                  <div>
                    <div className="skill-gap-page__inspector-meta">
                      <span className="skill-gap-page__inspector-category">
                        Skill Gap Analysis
                      </span>
                      <Badge variant={selectedGap.priority} size="sm">
                        {selectedGap.priority} Priority
                      </Badge>
                    </div>
                    <h3 className="skill-gap-page__inspector-title">{selectedGap.skillName}</h3>
                  </div>

                  <Badge variant={selectedGap.state} size="md">
                    {selectedGap.state}
                  </Badge>
                </div>

                {renderGapBreakdown(selectedGap)}
              </div>
            ) : (
              <p className="skill-gap-page__empty-inspector-text">Select a gap from the left to view details.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ALL USER SKILLS RECORD */}
      {activeTab === 'all-skills' && (
        <div className="skill-gap-page__gaps-list">
          {/* Filters */}
          <div className="skill-gap-page__filter-row">
            {['ALL', 'DEMONSTRATED', 'PROBABLE', 'CLAIMED', 'UNKNOWN'].map((state) => (
              <button
                key={state}
                onClick={() => setFilterState(state)}
                className={`skill-gap-page__filter-pill ${filterState === state ? 'skill-gap-page__filter-pill--active' : ''}`}
              >
                {state}
              </button>
            ))}
          </div>

          <div className="skill-gap-page__skills-grid">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-gap-page__skill-card"
              >
                <div className="skill-gap-page__skill-card-top">
                  <div>
                    <span className="skill-gap-page__skill-card-category">
                      {skill.category}
                    </span>
                    <h4 className="skill-gap-page__skill-card-title">{skill.name}</h4>
                  </div>
                  <Badge variant={skill.state} size="sm">
                    {skill.state}
                  </Badge>
                </div>

                <p className="skill-gap-page__skill-card-desc">{skill.description}</p>

                <div className="skill-gap-page__evidence-box">
                  <div>
                    <strong className="skill-gap-page__target-role-strong">Evidence Source:</strong> {skill.source} ({skill.date})
                  </div>
                  {skill.relatedProject && (
                    <div>
                      <strong className="skill-gap-page__target-role-strong">Related Project:</strong> {skill.relatedProject}
                    </div>
                  )}
                  {skill.limitations && (
                    <div>
                      <strong className="skill-gap-page__target-role-strong">Known Limitations:</strong> {skill.limitations}
                    </div>
                  )}
                  <div className="skill-gap-page__evidence-highlight">
                    <strong>Recommended Action:</strong> {skill.nextAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Self-Reported Skill Modal */}
      {isAddModalOpen && (
        <div className="skill-gap-page__modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="skill-gap-page__modal" onClick={(e) => e.stopPropagation()}>
            <div className="skill-gap-page__modal-header">
              <h3 className="skill-gap-page__modal-title">Add or Correct Self-Reported Skill</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="skill-gap-page__modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSkillSubmit} className="skill-gap-page__modal-form">
              <div>
                <label className="skill-gap-page__modal-label">Skill Name</label>
                <input
                  type="text"
                  value={newSkillForm.name}
                  onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                  placeholder="e.g. Docker, TypeScript, PostgreSQL..."
                  className="skill-gap-page__input"
                  required
                />
              </div>

              <div className="skill-gap-page__modal-grid">
                <div>
                  <label className="skill-gap-page__modal-label">Category</label>
                  <select
                    value={newSkillForm.category}
                    onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                    className="skill-gap-page__input"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Language">Language</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Testing">Testing</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="skill-gap-page__modal-label">Evidence Status</label>
                  <select
                    value={newSkillForm.state}
                    onChange={(e) => setNewSkillForm({ ...newSkillForm, state: e.target.value })}
                    className="skill-gap-page__input"
                  >
                    <option value="Claimed">Claimed (Self-reported)</option>
                    <option value="Probable">Probable (Partial exercises)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="skill-gap-page__modal-label">Brief Description</label>
                <textarea
                  rows={2}
                  value={newSkillForm.description}
                  onChange={(e) => setNewSkillForm({ ...newSkillForm, description: e.target.value })}
                  placeholder="Describe your current exposure or experience with this skill..."
                  className="skill-gap-page__input"
                />
              </div>

              <div className="skill-gap-page__modal-notice">
                <strong style={{ display: 'block' }}>Evidence Principle Reminder:</strong>
                Adding a skill as self-reported creates a Claimed entry. To upgrade to Demonstrated, you must build and submit a Project Lab deliverable or complete an assessment.
              </div>

              <div className="skill-gap-page__modal-actions">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add to My Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
