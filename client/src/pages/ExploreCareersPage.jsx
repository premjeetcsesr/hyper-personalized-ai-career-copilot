import React, { useState } from 'react';
import {
  Compass,
  Search,
  CheckCircle2,
  Scale,
  X,
  Target,
  ChevronRight,
  BookOpen,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useCareerData } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './ExploreCareersPage.css';

export default function ExploreCareersPage() {
  const { careerCatalogue, profile, setTargetRole } = useCareerData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCareerDetail, setActiveCareerDetail] = useState(null);
  const [compareCareerA, setCompareCareerA] = useState(null);
  const [compareCareerB, setCompareCareerB] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = ['All', 'Engineering', 'Data', 'Security', 'Design'];

  // Filter careers
  const filteredCareers = careerCatalogue.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.coreSkills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectTarget = (careerTitle) => {
    setTargetRole(careerTitle);
    setNotification(`Target career updated to "${careerTitle}". Your roadmap and skill-gap benchmarks have adapted.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const openCompareModal = (initialCareer = null) => {
    if (initialCareer) {
      setCompareCareerA(initialCareer);
      const other = careerCatalogue.find(c => c.id !== initialCareer.id) || careerCatalogue[1];
      setCompareCareerB(other);
    } else {
      setCompareCareerA(careerCatalogue[0]);
      setCompareCareerB(careerCatalogue[1]);
    }
    setIsCompareModalOpen(true);
  };

  return (
    <div className="explore-careers-page">
      {/* Toast Notification */}
      {notification && (
        <div className="explore-careers-page__toast" role="status">
          <div className="explore-careers-page__toast-content">
            <CheckCircle2 className="explore-careers-page__toast-icon" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="explore-careers-page__toast-close"
            aria-label="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="explore-careers-page__header">
        <div>
          <div className="explore-careers-page__badge">
            <Compass size={14} className="explore-careers-page__badge-icon" />
            <span>Career Discovery & Verification</span>
          </div>
          <h1 className="explore-careers-page__title">
            Explore Careers
          </h1>
          <p className="explore-careers-page__subtitle">
            Examine verified role competencies, real-world tasks, and learning prerequisites. Selecting a target role adapts your skill-gap benchmarks, roadmap, and project recommendations.
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            icon={Scale}
            onClick={() => openCompareModal(careerCatalogue[0])}
          >
            Compare Careers
          </Button>
        </div>
      </div>

      {/* Current Selection Banner */}
      <div className="explore-careers-page__target-banner">
        <div className="explore-careers-page__target-info">
          <div className="explore-careers-page__target-icon">
            <Target size={20} />
          </div>
          <div>
            <span className="explore-careers-page__target-caption">Your Active Target Career</span>
            <span className="explore-careers-page__target-role">{profile.targetRole}</span>
          </div>
        </div>
        <div className="explore-careers-page__target-note">
          All skill gaps, roadmap milestones, and project missions currently benchmark against <strong className="explore-careers-page__target-bold">{profile.targetRole}</strong>.
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="explore-careers-page__filters">
        <div className="explore-careers-page__search-wrap">
          <Search size={16} className="explore-careers-page__search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role title, overview, or skill (e.g. React, SQL, Security)..."
            className="explore-careers-page__search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="explore-careers-page__search-clear"
            >
              Clear
            </button>
          )}
        </div>

        <div className="explore-careers-page__categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`explore-careers-page__category-pill ${selectedCategory === cat ? 'explore-careers-page__category-pill--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="explore-careers-page__empty">
          <div className="explore-careers-page__empty-icon">
            <Search size={24} />
          </div>
          <h3 className="explore-careers-page__empty-title">No careers matched your search</h3>
          <p className="explore-careers-page__empty-text">
            We couldn't find any career matching "{searchTerm}". Try clearing your filters or search for another technology.
          </p>
          <div className="explore-careers-page__empty-action">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Reset Search & Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="explore-careers-page__grid">
          {filteredCareers.map((career) => {
            const isTarget = profile.targetRole === career.title;

            return (
              <div
                key={career.id}
                className={`explore-careers-page__card ${isTarget ? 'explore-careers-page__card--target' : ''}`}
              >
                <div>
                  <div className="explore-careers-page__card-top">
                    <span className="explore-careers-page__card-category">
                      {career.category}
                    </span>
                    {isTarget && (
                      <span className="explore-careers-page__card-target-badge">
                        <CheckCircle2 size={12} />
                        Target Role
                      </span>
                    )}
                  </div>

                  <h3 className="explore-careers-page__card-title">
                    {career.title}
                  </h3>

                  <p className="explore-careers-page__card-overview">
                    {career.overview}
                  </p>

                  {/* Core Competencies Preview */}
                  <div className="explore-careers-page__card-skills-section">
                    <span className="explore-careers-page__skills-label">
                      Key Competencies
                    </span>
                    <div className="explore-careers-page__skills-chips">
                      {career.coreSkills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="explore-careers-page__skill-chip"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {career.coreSkills.length > 4 && (
                        <span className="explore-careers-page__skill-more">
                          +{career.coreSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="explore-careers-page__card-actions">
                  <button
                    onClick={() => setActiveCareerDetail(career)}
                    className="explore-careers-page__view-details-btn"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </button>

                  <div className="explore-careers-page__card-buttons">
                    <button
                      onClick={() => openCompareModal(career)}
                      className="explore-careers-page__compare-btn"
                      title="Compare this career with another"
                    >
                      Compare
                    </button>
                    {!isTarget ? (
                      <Button
                        size="xs"
                        variant="primary"
                        onClick={() => handleSelectTarget(career.title)}
                      >
                        Set as Target
                      </Button>
                    ) : (
                      <span className="explore-careers-page__selected-label">Selected</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Career Detail Modal */}
      {activeCareerDetail && (
        <div className="explore-careers-page__modal-overlay" onClick={() => setActiveCareerDetail(null)}>
          <div className="explore-careers-page__modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="explore-careers-page__modal-header">
              <div>
                <div className="explore-careers-page__modal-badge-group">
                  <span className="explore-careers-page__card-category explore-careers-page__card-category--blue">
                    {activeCareerDetail.category}
                  </span>
                  <span className="explore-careers-page__modal-level">
                    {activeCareerDetail.level}
                  </span>
                </div>
                <h2 className="explore-careers-page__modal-heading">
                  {activeCareerDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCareerDetail(null)}
                className="explore-careers-page__modal-close"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="explore-careers-page__modal-body">
              {/* Overview */}
              <div>
                <div className="explore-careers-page__modal-section-title">Overview</div>
                <p className="explore-careers-page__modal-desc">{activeCareerDetail.overview}</p>
              </div>

              {/* Typical Responsibilities */}
              <div>
                <div className="explore-careers-page__modal-section-title">Typical Responsibilities</div>
                <ul className="explore-careers-page__modal-list">
                  {activeCareerDetail.typicalResponsibilities.map((resp, i) => (
                    <li key={i} className="explore-careers-page__modal-list-item">
                      <span className="explore-careers-page__modal-bullet" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Competencies & Benchmark Levels */}
              <div>
                <div className="explore-careers-page__modal-section-title">Required Core Competencies</div>
                <div className="explore-careers-page__modal-grid-2">
                  {activeCareerDetail.coreSkills.map((skill, i) => (
                    <div key={i} className="explore-careers-page__skill-card">
                      <span className="explore-careers-page__skill-name">{skill.name}</span>
                      <span className="explore-careers-page__skill-target-badge">
                        Target: {skill.targetProficiency}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Work Tasks */}
              <div>
                <div className="explore-careers-page__modal-section-title">Example Practical Work Tasks</div>
                <ul className="explore-careers-page__modal-list">
                  {activeCareerDetail.exampleTasks.map((task, i) => (
                    <li key={i} className="explore-careers-page__modal-list-item">
                      <span className="explore-careers-page__modal-bullet explore-careers-page__modal-bullet--green" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Projects */}
              <div>
                <div className="explore-careers-page__modal-section-title">Suggested Practical Projects</div>
                <div className="explore-careers-page__modal-list">
                  {activeCareerDetail.suggestedProjects.map((proj, i) => (
                    <div key={i} className="explore-careers-page__project-card">
                      <Briefcase size={16} className="explore-careers-page__project-icon" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Interview Topics */}
              <div>
                <div className="explore-careers-page__modal-section-title">Common Technical Interview Topics</div>
                <div className="explore-careers-page__modal-grid-2">
                  {activeCareerDetail.commonInterviewTopics.map((topic, i) => (
                    <div key={i} className="explore-careers-page__interview-card">
                      <BookOpen size={14} className="explore-careers-page__interview-icon" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured Learning Route */}
              <div>
                <div className="explore-careers-page__modal-section-title">Structured Learning Route</div>
                <div className="explore-careers-page__modal-list">
                  {activeCareerDetail.learningRoutes.map((stage, i) => (
                    <div key={i} className="explore-careers-page__route-step">
                      <span className="explore-careers-page__route-num">
                        {i + 1}
                      </span>
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Disclaimer Note */}
              <div className="explore-careers-page__disclaimer">
                <AlertCircle size={16} className="explore-careers-page__disclaimer-icon" />
                <div>
                  <strong className="explore-careers-page__disclaimer-title">Illustrative Sample Benchmark</strong>
                  <span>{activeCareerDetail.sampleSalaryRange}. Note: Compensation figures are sample demo ranges and should not be relied upon as live market guarantees. Career trajectories vary by geography, portfolio evidence, and hiring criteria.</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="explore-careers-page__modal-footer">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  openCompareModal(activeCareerDetail);
                  setActiveCareerDetail(null);
                }}
                icon={Scale}
              >
                Compare with Another Role
              </Button>

              <div className="explore-careers-page__modal-footer-actions">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCareerDetail(null)}
                >
                  Close
                </Button>
                {profile.targetRole !== activeCareerDetail.title ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Target}
                    onClick={() => {
                      handleSelectTarget(activeCareerDetail.title);
                      setActiveCareerDetail(null);
                    }}
                  >
                    Select as My Target Career
                  </Button>
                ) : (
                  <span className="explore-careers-page__active-badge">
                    Active Target Role
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Careers Modal */}
      {isCompareModalOpen && compareCareerA && compareCareerB && (
        <div className="explore-careers-page__modal-overlay" onClick={() => setIsCompareModalOpen(false)}>
          <div className="explore-careers-page__modal explore-careers-page__modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="explore-careers-page__modal-header">
              <div className="explore-careers-page__modal-badge-group">
                <Scale size={20} className="explore-careers-page__badge-icon" />
                <h3 className="explore-careers-page__modal-heading">Side-by-Side Career Comparison</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="explore-careers-page__modal-close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Comparison Controls */}
            <div className="explore-careers-page__compare-controls">
              <div>
                <label className="explore-careers-page__compare-label">
                  Career 1
                </label>
                <select
                  value={compareCareerA.id}
                  onChange={(e) => {
                    const found = careerCatalogue.find(c => c.id === e.target.value);
                    if (found) setCompareCareerA(found);
                  }}
                  className="explore-careers-page__search-input"
                >
                  {careerCatalogue.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="explore-careers-page__compare-label">
                  Career 2
                </label>
                <select
                  value={compareCareerB.id}
                  onChange={(e) => {
                    const found = careerCatalogue.find(c => c.id === e.target.value);
                    if (found) setCompareCareerB(found);
                  }}
                  className="explore-careers-page__search-input"
                >
                  {careerCatalogue.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="explore-careers-page__compare-grid">
              {/* Career A Column */}
              <div className="explore-careers-page__compare-col">
                <div>
                  <span className="explore-careers-page__card-category explore-careers-page__card-category--blue">
                    {compareCareerA.category}
                  </span>
                  <h4 className="explore-careers-page__compare-title">{compareCareerA.title}</h4>
                  <p className="explore-careers-page__compare-desc">{compareCareerA.overview}</p>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Core Competencies</div>
                  <div className="explore-careers-page__modal-list">
                    {compareCareerA.coreSkills.map((s, i) => (
                      <div key={i} className="explore-careers-page__skill-card">
                        <span className="explore-careers-page__skill-name">{s.name}</span>
                        <span className="explore-careers-page__skill-target-badge">{s.targetProficiency}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Example Work Tasks</div>
                  <ul className="explore-careers-page__modal-list">
                    {compareCareerA.exampleTasks.map((t, i) => (
                      <li key={i} className="explore-careers-page__modal-list-item">
                        <span className="explore-careers-page__modal-bullet" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Prerequisites</div>
                  <p className="explore-careers-page__compare-prereq">{compareCareerA.prerequisites.join(' • ')}</p>
                </div>

                <div>
                  <Button
                    variant={profile.targetRole === compareCareerA.title ? 'outline' : 'primary'}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      handleSelectTarget(compareCareerA.title);
                      setIsCompareModalOpen(false);
                    }}
                  >
                    {profile.targetRole === compareCareerA.title ? 'Currently Selected Target' : `Choose ${compareCareerA.title}`}
                  </Button>
                </div>
              </div>

              {/* Career B Column */}
              <div className="explore-careers-page__compare-col">
                <div>
                  <span className="explore-careers-page__card-category explore-careers-page__card-category--indigo">
                    {compareCareerB.category}
                  </span>
                  <h4 className="explore-careers-page__compare-title">{compareCareerB.title}</h4>
                  <p className="explore-careers-page__compare-desc">{compareCareerB.overview}</p>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Core Competencies</div>
                  <div className="explore-careers-page__modal-list">
                    {compareCareerB.coreSkills.map((s, i) => (
                      <div key={i} className="explore-careers-page__skill-card">
                        <span className="explore-careers-page__skill-name">{s.name}</span>
                        <span className="explore-careers-page__skill-target-badge">{s.targetProficiency}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Example Work Tasks</div>
                  <ul className="explore-careers-page__modal-list">
                    {compareCareerB.exampleTasks.map((t, i) => (
                      <li key={i} className="explore-careers-page__modal-list-item">
                        <span className="explore-careers-page__modal-bullet explore-careers-page__modal-bullet--indigo" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="explore-careers-page__modal-section-title">Prerequisites</div>
                  <p className="explore-careers-page__compare-prereq">{compareCareerB.prerequisites.join(' • ')}</p>
                </div>

                <div>
                  <Button
                    variant={profile.targetRole === compareCareerB.title ? 'outline' : 'primary'}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      handleSelectTarget(compareCareerB.title);
                      setIsCompareModalOpen(false);
                    }}
                  >
                    {profile.targetRole === compareCareerB.title ? 'Currently Selected Target' : `Choose ${compareCareerB.title}`}
                  </Button>
                </div>
              </div>
            </div>

            <div className="explore-careers-page__modal-footer">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCompareModalOpen(false)}
              >
                Done Comparing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
