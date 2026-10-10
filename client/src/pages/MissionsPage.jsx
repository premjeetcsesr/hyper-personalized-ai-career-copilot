import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Github,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
  Send,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { missionAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function MissionsPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState([]);
  const [activeMission, setActiveMission] = useState(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [successNote, setSuccessNote] = useState('');

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    setLoading(true);
    try {
      const res = await missionAPI.getMissions();
      setMissions(res.data.missions || []);
      if (res.data.missions?.length > 0) {
        setActiveMission(res.data.missions[0]);
      }
    } catch (err) {
      console.error('Failed to load missions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = async (missionId) => {
    try {
      const res = await missionAPI.startMission(missionId);
      loadMissions();
    } catch (err) {
      console.error('Failed to start mission:', err);
    }
  };

  const handleOpenSubmit = (mission) => {
    setActiveMission(mission);
    setRepoUrl('');
    setReflectionNotes('');
    setSubmissionModalOpen(true);
  };

  const handleSubmitMission = async (e) => {
    e.preventDefault();
    if (!activeMission) return;
    setSubmitting(true);
    try {
      const res = await missionAPI.submitMission(activeMission._id, {
        githubRepo: repoUrl,
        reflectionNotes
      });

      // Confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmissionModalOpen(false);
      setSuccessNote(res.data.message);
      setTimeout(() => setSuccessNote(''), 6000);
      loadMissions();
    } catch (err) {
      console.error('Mission submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Loading hands-on engineering missions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Mission Engine</h1>
        <p className="text-xs text-slate-500 mt-1">
          Turn theoretical gaps into verified engineering code deliverables. Each verified mission directly upgrades your skill state.
        </p>
      </div>

      {successNote && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 font-medium shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mission Cards Column */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Missions ({missions.length})
          </h3>

          {missions.map((m) => {
            const isSelected = activeMission?._id === m._id;
            return (
              <div
                key={m._id}
                onClick={() => setActiveMission(m)}
                className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge variant={m.status} size="sm">{m.status}</Badge>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {m.estimatedHours} hrs
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">{m.title}</h4>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-blue-700 font-semibold">{m.skillTargeted}</span>
                  <span className="text-emerald-600 font-bold">+{m.reward?.skillGain || 25}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Mission Detailed Workspace */}
        <div className="lg:col-span-2">
          {activeMission ? (
            <Card
              title={activeMission.title}
              subtitle={`Target Competency: ${activeMission.skillTargeted} • Level: ${activeMission.difficulty}`}
              action={
                <Badge variant={activeMission.status} size="md">
                  {activeMission.status}
                </Badge>
              }
            >
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Mission Brief
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    {activeMission.description}
                  </p>
                </div>

                {/* Objectives */}
                {activeMission.objectives?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Technical Objectives
                    </h4>
                    <ul className="space-y-1.5">
                      {activeMission.objectives.map((obj, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step-by-Step Guide */}
                {activeMission.stepByStepGuide?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Implementation Steps
                    </h4>
                    <div className="space-y-2">
                      {activeMission.stepByStepGuide.map((step, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acceptance Criteria */}
                {activeMission.acceptanceCriteria?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Verification Acceptance Criteria
                    </h4>
                    <ul className="space-y-1.5">
                      {activeMission.acceptanceCriteria.map((crit, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Evidence Reward Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Evidentiary Reward
                    </span>
                    <span className="text-xs text-emerald-900 font-semibold">
                      {activeMission.reward?.evidenceBonus || 'Upgrades skill to Verified state'}
                    </span>
                  </div>

                  <span className="text-sm font-extrabold text-emerald-700">
                    +{activeMission.reward?.skillGain || 25}% Proficiency
                  </span>
                </div>

                {/* Submission status or CTA */}
                {activeMission.status === 'verified' ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Deliverable Verified</span>
                    </div>
                    <p className="text-xs text-emerald-700">
                      {activeMission.submission?.feedback || 'Code submission verified. Skill evidence logged.'}
                    </p>
                    {activeMission.submission?.githubRepo && (
                      <a
                        href={activeMission.submission.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-800 underline font-mono"
                      >
                        <Github className="w-3.5 h-3.5" /> {activeMission.submission.githubRepo}
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                    {activeMission.status === 'available' && (
                      <Button
                        variant="navy"
                        size="md"
                        onClick={() => handleStartMission(activeMission._id)}
                      >
                        Start Working on Mission
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleOpenSubmit(activeMission)}
                      icon={Send}
                    >
                      Submit Deliverable for Verification
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card>
              <p className="text-xs text-slate-400 text-center py-12">
                Select a project mission to open its implementation workspace.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Deliverable Submission Modal */}
      {submissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Submit Mission Deliverable
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mission: <strong>{activeMission?.title}</strong>
            </p>

            <form onSubmit={handleSubmitMission} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Deliverable Repository URL
                </label>
                <div className="relative">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    placeholder="https://github.com/your-username/mission-solution"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Engineering Reflection Notes & Test Output
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Detail how you satisfied the acceptance criteria, what commands were executed, and how edge cases were handled..."
                  value={reflectionNotes}
                  onChange={(e) => setReflectionNotes(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmissionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submitting}
                  icon={ShieldCheck}
                >
                  Verify Deliverable & Award Evidence
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
