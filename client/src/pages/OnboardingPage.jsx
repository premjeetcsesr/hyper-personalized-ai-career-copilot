import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { profileAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const ROLES = [
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Data Analyst',
  'AI/ML Engineer'
];

const COMMON_SKILLS = [
  'JavaScript', 'React.js', 'Node.js', 'Express', 'Python', 'SQL',
  'MongoDB', 'Docker', 'Git & GitHub', 'TypeScript', 'Tailwind CSS', 'Java', 'C++'
];

export default function OnboardingPage() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    college: profile?.college || '',
    degree: 'B.Tech',
    branch: 'Computer Science and Engineering',
    graduationYear: 2026,
    currentSemester: 'Semester 7',
    targetRole: 'Full-Stack Developer',
    weeklyLearningHours: 15,
    claimedSkills: ['JavaScript', 'React.js', 'Node.js'],
    newSkillInput: '',
    projects: [
      {
        title: 'Academic Full-Stack Project',
        description: 'MERN stack application for campus management.',
        technologies: ['React.js', 'Node.js', 'MongoDB']
      }
    ]
  });

  const handleSkillToggle = (skill) => {
    if (formData.claimedSkills.includes(skill)) {
      setFormData({
        ...formData,
        claimedSkills: formData.claimedSkills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        claimedSkills: [...formData.claimedSkills, skill]
      });
    }
  };

  const handleAddCustomSkill = () => {
    if (formData.newSkillInput.trim() && !formData.claimedSkills.includes(formData.newSkillInput.trim())) {
      setFormData({
        ...formData,
        claimedSkills: [...formData.claimedSkills, formData.newSkillInput.trim()],
        newSkillInput: ''
      });
    }
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: '', description: '', technologies: [] }
      ]
    });
  };

  const handleRemoveProject = (index) => {
    const updated = formData.projects.filter((_, idx) => idx !== index);
    setFormData({ ...formData, projects: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName,
        college: formData.college,
        degree: formData.degree,
        branch: formData.branch,
        graduationYear: Number(formData.graduationYear),
        currentSemester: formData.currentSemester,
        targetRole: formData.targetRole,
        weeklyLearningHours: Number(formData.weeklyLearningHours),
        claimedSkills: formData.claimedSkills,
        projects: formData.projects.filter(p => p.title.trim())
      };

      const res = await profileAPI.completeOnboarding(payload);
      refreshProfile(res.data.profile);
      navigate('/app');
    } catch (err) {
      console.error('Onboarding submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Profile Calibration Wizard</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Personalize Your Career Journey
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Team Technovoo1 • Profile Calibration Wizard
          </p>
        </div>

        {/* Stepper indicator */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-8 px-4">
          {[
            { num: 1, label: 'Education' },
            { num: 2, label: 'Target Role' },
            { num: 3, label: 'Skills & Projects' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s.num
                    ? 'bg-blue-600 text-white'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs font-medium ${step === s.num ? 'text-slate-900' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Card className="shadow-lg border-slate-200">
          {/* STEP 1: Academic details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Academic Background</h2>
                <p className="text-xs text-slate-500">Provide your current institution and degree program.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Major</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester</label>
                  <select
                    value={formData.currentSemester}
                    onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Graduated'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" onClick={() => setStep(2)} icon={ArrowRight}>
                  Next: Target Role
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Target Role & Hours */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Career Ambition & Commitment</h2>
                <p className="text-xs text-slate-500">Select the target job role and weekly time you can invest.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Target Career Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROLES.map((role) => (
                    <div
                      key={role}
                      onClick={() => setFormData({ ...formData, targetRole: role })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.targetRole === role
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 font-semibold text-blue-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{role}</span>
                        {formData.targetRole === role && <CheckCircle className="w-4 h-4 text-blue-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Learning Hours Per Week: <span className="font-bold text-blue-600">{formData.weeklyLearningHours} hrs/week</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={formData.weeklyLearningHours}
                  onChange={(e) => setFormData({ ...formData, weeklyLearningHours: e.target.value })}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>5 hrs (Casual)</span>
                  <span>15-20 hrs (Recommended)</span>
                  <span>40 hrs (Intensive)</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} icon={ArrowLeft}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)} icon={ArrowRight}>
                  Next: Skills & Projects
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Self-Reported Skills & Experience */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Claimed Skills & Project History</h2>
                <p className="text-xs text-slate-500">
                  Select skills you have worked with. Note: These are recorded initially as <strong>Claimed</strong> until verified by evidence.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Technical Skills (Self-Reported)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {COMMON_SKILLS.map((skill) => {
                    const isSelected = formData.claimedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{skill}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add other skill (e.g. Next.js, Redis)"
                    value={formData.newSkillInput}
                    onChange={(e) => setFormData({ ...formData, newSkillInput: e.target.value })}
                    className="flex-1 text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomSkill(); } }}
                  />
                  <Button size="sm" variant="outline" onClick={handleAddCustomSkill} icon={Plus}>
                    Add
                  </Button>
                </div>
              </div>

              {/* Projects section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700">Project Highlights</label>
                  <Button size="sm" variant="ghost" onClick={handleAddProject} icon={Plus} className="!text-xs">
                    Add Project
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                          className="text-xs font-semibold p-1.5 border border-slate-300 rounded bg-white w-full mr-2"
                        />
                        {formData.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows="2"
                        placeholder="Brief project description & technical stack"
                        value={proj.description}
                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                        className="text-xs p-1.5 border border-slate-300 rounded bg-white w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  icon={Sparkles}
                >
                  Complete Onboarding & View Dashboard
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
