import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  GraduationCap,
  Briefcase,
  Clock,
  Github,
  Linkedin,
  Globe,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck
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

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    college: '',
    degree: '',
    branch: '',
    graduationYear: 2026,
    currentSemester: '',
    targetRole: 'Full-Stack Developer',
    weeklyLearningHours: 15,
    bio: '',
    githubUsername: '',
    linkedinUrl: '',
    portfolioUrl: '',
    claimedSkills: [],
    projects: []
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || user?.name || '',
        college: profile.college || 'Kanpur Institute of Technology',
        degree: profile.degree || 'B.Tech',
        branch: profile.branch || 'Computer Science and Engineering',
        graduationYear: profile.graduationYear || 2026,
        currentSemester: profile.currentSemester || 'Semester 7',
        targetRole: profile.targetRole || 'Full-Stack Developer',
        weeklyLearningHours: profile.weeklyLearningHours || 15,
        bio: profile.bio || '',
        githubUsername: profile.githubUsername || '',
        linkedinUrl: profile.linkedinUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        claimedSkills: profile.claimedSkills || [],
        projects: profile.projects || []
      });
    }
  }, [profile, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const res = await profileAPI.updateProfile(form);
      refreshProfile(res.data.profile);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !form.claimedSkills.includes(newSkill.trim())) {
      setForm({ ...form, claimedSkills: [...form.claimedSkills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({
      ...form,
      claimedSkills: form.claimedSkills.filter(s => s !== skill)
    });
  };

  const handleAddProject = () => {
    setForm({
      ...form,
      projects: [
        ...form.projects,
        { title: '', description: '', technologies: [], repoUrl: '', liveUrl: '' }
      ]
    });
  };

  const handleRemoveProject = (index) => {
    const updated = form.projects.filter((_, idx) => idx !== index);
    setForm({ ...form, projects: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Career Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain your student credentials, academic standing, and demonstrated portfolio artifacts.
          </p>
        </div>

        {successMsg && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Academic Credentials Card */}
        <Card title="Academic Identity" subtitle="Institution and enrollment records at Kanpur Institute of Technology">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Specialization</label>
              <input
                type="text"
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
              <input
                type="number"
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Term</label>
              <select
                value={form.currentSemester}
                onChange={(e) => setForm({ ...form, currentSemester: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Graduated'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Target Role & Social Links */}
        <Card title="Career Ambition & Social Links" subtitle="Benchmark settings and external portfolio anchors">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
              <select
                value={form.targetRole}
                onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Learning Hours Per Week: <strong className="text-blue-600">{form.weeklyLearningHours} hrs</strong>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={form.weeklyLearningHours}
                onChange={(e) => setForm({ ...form, weeklyLearningHours: e.target.value })}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer mt-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Username</label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={form.githubUsername}
                  onChange={(e) => setForm({ ...form, githubUsername: e.target.value })}
                  placeholder="e.g. aarav-kit-dev"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Bio / Summary</label>
            <textarea
              rows="3"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Brief summary of engineering interests and project work..."
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>
        </Card>

        {/* Claimed Skills */}
        <Card
          title="Self-Reported Claimed Skills"
          subtitle="Skills declared by candidate. Under the 'Evidence Before Inference' rule, these remain 'Claimed' until substantiated."
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {form.claimedSkills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-800 border border-amber-200"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-amber-600 hover:text-amber-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Add another skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
            />
            <Button size="sm" variant="outline" onClick={handleAddSkill} icon={Plus}>
              Add
            </Button>
          </div>
        </Card>

        {/* Projects Showcase */}
        <Card
          title="Demonstrated Projects & Repositories"
          subtitle="Concrete software artifacts supporting your career readiness"
          action={
            <Button size="sm" variant="ghost" onClick={handleAddProject} icon={Plus} className="!text-xs">
              Add Project
            </Button>
          }
        >
          <div className="space-y-4">
            {form.projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                    className="text-xs font-semibold p-2 border border-slate-300 rounded-lg bg-white flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  rows="2"
                  placeholder="Detailed description of features, problem solved, and technical architecture..."
                  value={proj.description}
                  onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="url"
                    placeholder="GitHub Repository URL"
                    value={proj.repoUrl || ''}
                    onChange={(e) => handleProjectChange(idx, 'repoUrl', e.target.value)}
                    className="text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="url"
                    placeholder="Live Deployment URL (optional)"
                    value={proj.liveUrl || ''}
                    onChange={(e) => handleProjectChange(idx, 'liveUrl', e.target.value)}
                    className="text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={saving}
            icon={Save}
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
