import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Code2,
  Layers,
  Plus,
  X
} from 'lucide-react';
import { useCareerData, CAREER_CATALOGUE } from '../context/CareerDataContext';
import Button from '../components/common/Button';
import './OnboardingPage.css';

export default function OnboardingPage() {
  const { profile, updateProfile, setTargetRole, addSelfReportedSkill } = useCareerData();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Onboarding answers state with sensible defaults preserved across steps
  const [stage, setStage] = useState(profile.currentStage || 'Undergraduate Student (CS / IT / Engineering)');
  const [selectedInterests, setSelectedInterests] = useState(profile.interests || ['Web Development', 'Backend & APIs']);
  const [currentGoal, setCurrentGoal] = useState(profile.goals || 'Build practical portfolio projects and prepare for technical interviews');
  const [chosenCareer, setChosenCareer] = useState(profile.targetRole || 'Full-Stack Developer');
  const [sharedSkills, setSharedSkills] = useState(['HTML & CSS', 'JavaScript']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const stageOptions = [
    'High School / Secondary School',
    'Undergraduate Student (CS / IT / Engineering)',
    'Non-Tech Degree Student / Career Switcher',
    'Bootcamp Learner / Self-Taught Developer',
    'Early-Career Junior Professional',
    'I’m not sure yet'
  ];

  const fieldOptions = [
    'Web Development',
    'Backend & APIs',
    'Frontend & UI/UX',
    'Databases & Data Engineering',
    'Data Science & Analytics',
    'Mobile App Development',
    'Cybersecurity & Network Security',
    'Cloud & DevOps',
    'I’m not sure yet'
  ];

  const goalOptions = [
    'Land an entry-level software or data role',
    'Build verified portfolio projects with code artifacts',
    'Identify and fix my technical skill gaps',
    'Prepare for technical interviews and coding rounds',
    'Explore different paths to see what fits my interests',
    'I’m not sure yet'
  ];

  const toggleInterest = (interest) => {
    if (interest === 'I’m not sure yet') {
      setSelectedInterests(['I’m not sure yet']);
      return;
    }
    const filtered = selectedInterests.filter(i => i !== 'I’m not sure yet');
    if (filtered.includes(interest)) {
      setSelectedInterests(filtered.filter(i => i !== interest));
    } else {
      setSelectedInterests([...filtered, interest]);
    }
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !sharedSkills.includes(newSkillInput.trim())) {
      setSharedSkills([...sharedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSharedSkills(sharedSkills.filter(s => s !== skillToRemove));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const finalStage = stage === 'I’m not sure yet' ? 'Exploring Career Paths' : stage;
    const finalRole = chosenCareer === 'I’m not sure yet' ? 'Full-Stack Developer' : chosenCareer;

    updateProfile({
      currentStage: finalStage,
      interests: selectedInterests,
      goals: currentGoal,
      targetRole: finalRole
    });

    setTargetRole(finalRole);

    sharedSkills.forEach(s => {
      addSelfReportedSkill({
        name: s,
        category: 'General',
        state: 'Claimed',
        description: 'Shared during onboarding questionnaire.'
      });
    });

    navigate('/app');
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="onboarding-page">
      {/* Top Header */}
      <header className="onboarding-page__header">
        <div className="onboarding-page__brand">
          <div className="onboarding-page__logo">
            <img src="/app-icon.svg" alt="AI Career Co-Pilot" className="onboarding-page__logo-img" />
          </div>
          <span className="onboarding-page__brand-title">AI Career Co-Pilot</span>
        </div>

        <button
          onClick={() => navigate('/app')}
          className="onboarding-page__skip-btn"
        >
          Skip to Dashboard
        </button>
      </header>

      {/* Main Questionnaire Box */}
      <main className="onboarding-page__main">
        {/* Progress Bar */}
        <div className="onboarding-page__progress-wrap">
          <div className="onboarding-page__progress-header">
            <span>Step {step} of {totalSteps}</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="onboarding-page__progress-track">
            <div
              className="onboarding-page__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="onboarding-page__card">
          {/* STEP 1: Education / Stage */}
          {step === 1 && (
            <div>
              <div className="onboarding-page__question-header">
                <span className="onboarding-page__question-badge">
                  Question 1
                </span>
                <h2 className="onboarding-page__question-title">
                  What is your current education or experience stage?
                </h2>
                <p className="onboarding-page__question-desc">
                  This helps calibrate your initial roadmap difficulty and prerequisite depth.
                </p>
              </div>

              <div className="onboarding-page__options-list">
                {stageOptions.map((opt) => (
                  <label
                    key={opt}
                    onClick={() => setStage(opt)}
                    className={`onboarding-page__option-item ${stage === opt ? 'onboarding-page__option-item--active' : ''}`}
                  >
                    <span>{opt}</span>
                    <input
                      type="radio"
                      name="stage"
                      checked={stage === opt}
                      onChange={() => setStage(opt)}
                      style={{ accentColor: 'var(--color-brand-blue)' }}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fields of Interest */}
          {step === 2 && (
            <div>
              <div className="onboarding-page__question-header">
                <span className="onboarding-page__question-badge">
                  Question 2
                </span>
                <h2 className="onboarding-page__question-title">
                  Which fields interest you?
                </h2>
                <p className="onboarding-page__question-desc">
                  Select one or more areas you are curious about exploring.
                </p>
              </div>

              <div className="onboarding-page__grid-options">
                {fieldOptions.map((field) => {
                  const isChecked = selectedInterests.includes(field);
                  return (
                    <button
                      key={field}
                      type="button"
                      onClick={() => toggleInterest(field)}
                      className={`onboarding-page__grid-btn ${isChecked ? 'onboarding-page__grid-btn--active' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{field}</span>
                        {isChecked && <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--color-brand-blue)' }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Current Goal */}
          {step === 3 && (
            <div>
              <div className="onboarding-page__question-header">
                <span className="onboarding-page__question-badge">
                  Question 3
                </span>
                <h2 className="onboarding-page__question-title">
                  What is your primary goal right now?
                </h2>
                <p className="onboarding-page__question-desc">
                  We will prioritize recommendations that align directly with your immediate objective.
                </p>
              </div>

              <div className="onboarding-page__options-list">
                {goalOptions.map((goal) => (
                  <label
                    key={goal}
                    onClick={() => setCurrentGoal(goal)}
                    className={`onboarding-page__option-item ${currentGoal === goal ? 'onboarding-page__option-item--active' : ''}`}
                  >
                    <span>{goal}</span>
                    <input
                      type="radio"
                      name="goal"
                      checked={currentGoal === goal}
                      onChange={() => setCurrentGoal(goal)}
                      style={{ accentColor: 'var(--color-brand-blue)' }}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Target Career Selection */}
          {step === 4 && (
            <div>
              <div className="onboarding-page__question-header">
                <span className="onboarding-page__question-badge">
                  Question 4
                </span>
                <h2 className="onboarding-page__question-title">
                  Do you have a target career in mind?
                </h2>
                <p className="onboarding-page__question-desc">
                  Choose your target or pick "I'm not sure yet" to explore recommended paths.
                </p>
              </div>

              <div className="onboarding-page__options-list">
                {CAREER_CATALOGUE.map((career) => (
                  <label
                    key={career.id}
                    onClick={() => setChosenCareer(career.title)}
                    className={`onboarding-page__option-item ${chosenCareer === career.title ? 'onboarding-page__option-item--active' : ''}`}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', display: 'block' }}>{career.title}</span>
                      <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-secondary)' }}>{career.category} • {career.overview.slice(0, 75)}...</span>
                    </div>
                    <input
                      type="radio"
                      name="career"
                      checked={chosenCareer === career.title}
                      onChange={() => setChosenCareer(career.title)}
                      style={{ accentColor: 'var(--color-brand-blue)' }}
                    />
                  </label>
                ))}
                <label
                  onClick={() => setChosenCareer('I’m not sure yet')}
                  className={`onboarding-page__option-item ${chosenCareer === 'I’m not sure yet' ? 'onboarding-page__option-item--active' : ''}`}
                >
                  <div>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>I’m not sure yet</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-secondary)' }}>We'll recommend foundational full-stack milestones you can change later</span>
                  </div>
                  <input
                    type="radio"
                    name="career"
                    checked={chosenCareer === 'I’m not sure yet'}
                    onChange={() => setChosenCareer('I’m not sure yet')}
                    style={{ accentColor: 'var(--color-brand-blue)' }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Existing Skills / Experience */}
          {step === 5 && (
            <div>
              <div className="onboarding-page__question-header">
                <span className="onboarding-page__question-badge">
                  Question 5
                </span>
                <h2 className="onboarding-page__question-title">
                  Which skills or tools have you worked with so far?
                </h2>
                <p className="onboarding-page__question-desc">
                  Self-reported skills start as Claimed in your profile and can be proven through Project Lab missions.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="e.g. React, Python, Git, SQL..."
                  />
                  <Button variant="outline" size="sm" onClick={handleAddSkill} icon={Plus}>
                    Add
                  </Button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)', minHeight: '40px' }}>
                  {sharedSkills.map((sk) => (
                    <span
                      key={sk}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-surface-subtle)',
                        border: '1px solid var(--color-border)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '500'
                      }}
                    >
                      <span>{sk}</span>
                      <button
                        onClick={() => handleRemoveSkill(sk)}
                        style={{ color: 'var(--color-text-muted)', cursor: 'pointer', padding: 0 }}
                        aria-label={`Remove ${sk}`}
                      >
                        <X style={{ width: 12, height: 12 }} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="onboarding-page__footer">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={step === 1}
              icon={ArrowLeft}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              icon={step === totalSteps ? CheckCircle2 : ArrowRight}
            >
              {step === totalSteps ? 'Complete & Enter Workspace' : 'Continue'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
