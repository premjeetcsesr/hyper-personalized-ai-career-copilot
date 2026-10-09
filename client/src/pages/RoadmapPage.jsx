import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle,
  Clock,
  ExternalLink,
  BookOpen,
  Code2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { roadmapAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';

export default function RoadmapPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [recalculating, setRecalculating] = useState(false);
  const [expandedMilestones, setExpandedMilestones] = useState({});

  useEffect(() => {
    loadRoadmap();
  }, [profile?.targetRole]);

  const loadRoadmap = async () => {
    setLoading(true);
    try {
      const res = await roadmapAPI.getRoadmap();
      setRoadmap(res.data.roadmap);
      // Expand first milestone by default
      if (res.data.roadmap?.phases?.[0]?.milestones?.[0]) {
        setExpandedMilestones({
          [res.data.roadmap.phases[0].milestones[0].milestoneId]: true
        });
      }
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (milestoneId, newStatus) => {
    setUpdatingId(milestoneId);
    try {
      const res = await roadmapAPI.updateStatus({ milestoneId, status: newStatus });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const res = await roadmapAPI.recalculate();
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error('Failed to recalculate roadmap:', err);
    } finally {
      setRecalculating(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Generating personalized 5-stage learning roadmap...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Personalized Learning Roadmap</h1>
          <p className="text-xs text-slate-500 mt-1">
            Engineered using the 5-phase execution cycle: <strong className="text-blue-700">LEARN → PRACTICE → BUILD → VALIDATE → IMPROVE</strong>.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRecalculate}
          loading={recalculating}
          icon={RotateCcw}
          className="border-slate-300"
        >
          Regenerate from Latest Evidence
        </Button>
      </div>

      {/* Overall Progress Gauge */}
      <Card className="bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border-blue-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
              Curriculum Trajectory
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Target Track: {roadmap?.targetRole || 'Full-Stack Developer'}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Completing milestones directly advances your skill evidence ratings from Claimed to Verified.
            </p>
          </div>

          <div className="sm:w-64 w-full">
            <ProgressBar
              value={roadmap?.overallProgress || 0}
              label="Overall Completion"
              size="md"
              color="blue"
            />
          </div>
        </div>
      </Card>

      {/* Phases and Milestones */}
      <div className="space-y-6">
        {roadmap?.phases?.map((phase) => (
          <div key={phase.phaseNumber} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[#102A43] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {phase.phaseNumber}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{phase.title}</h3>
                <span className="text-[11px] text-slate-500">
                  Focus: {phase.focus} • Estimated Duration: {phase.durationWeeks} weeks
                </span>
              </div>
            </div>

            <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-200 ml-3">
              {phase.milestones?.map((m) => {
                const isExpanded = expandedMilestones[m.milestoneId];
                return (
                  <Card key={m.milestoneId} className="!p-4 sm:!p-5 bg-white border-slate-200 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(m.milestoneId)}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900">{m.skill}</h4>
                          <Badge variant={m.priority} size="sm">{m.priority}</Badge>
                          <Badge variant={m.status} size="sm">{m.status}</Badge>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{m.objective}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Status Switcher Buttons */}
                        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
                          <button
                            onClick={() => handleStatusChange(m.milestoneId, 'pending')}
                            disabled={updatingId === m.milestoneId}
                            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                              m.status === 'pending' ? 'bg-white shadow-xs font-bold text-slate-800' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => handleStatusChange(m.milestoneId, 'in_progress')}
                            disabled={updatingId === m.milestoneId}
                            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                              m.status === 'in_progress' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => handleStatusChange(m.milestoneId, 'completed')}
                            disabled={updatingId === m.milestoneId}
                            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                              m.status === 'completed' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Completed
                          </button>
                        </div>

                        <button
                          onClick={() => toggleExpand(m.milestoneId)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded 5-Stage Cycle Breakdown */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                        {/* 5-Step Cycle */}
                        <div>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                            The 5-Step Verification Cycle
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                              <span className="font-bold text-blue-800 block text-[10px] uppercase">1. Learn</span>
                              <p className="text-slate-600 text-[11px] mt-1">{m.cycle?.learn}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100">
                              <span className="font-bold text-indigo-800 block text-[10px] uppercase">2. Practice</span>
                              <p className="text-slate-600 text-[11px] mt-1">{m.cycle?.practice}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                              <span className="font-bold text-amber-800 block text-[10px] uppercase">3. Build</span>
                              <p className="text-slate-600 text-[11px] mt-1">{m.cycle?.build}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-teal-50/60 border border-teal-100">
                              <span className="font-bold text-teal-800 block text-[10px] uppercase">4. Validate</span>
                              <p className="text-slate-600 text-[11px] mt-1">{m.cycle?.validate}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <span className="font-bold text-emerald-800 block text-[10px] uppercase">5. Improve</span>
                              <p className="text-slate-600 text-[11px] mt-1">{m.cycle?.improve}</p>
                            </div>
                          </div>
                        </div>

                        {/* Resources */}
                        {m.resources?.length > 0 && (
                          <div>
                            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                              Recommended Resources
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {m.resources.map((res, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>{res.title}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                          <span>
                            <strong>Validation Criteria:</strong> {m.completionCriteria}
                          </span>
                          <span className="text-slate-400 shrink-0">Est. {m.estimatedHours} hrs</span>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
