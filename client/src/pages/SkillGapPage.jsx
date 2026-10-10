import React, { useState, useEffect } from 'react';
import {
  GitPullRequestDraft,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Plus,
  ArrowRight,
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { skillAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import SkillComparisonChart from '../components/charts/SkillComparisonChart';

export default function SkillGapPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [stateFilter, setStateFilter] = useState('ALL');
  const [selectedGap, setSelectedGap] = useState(null);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [proofSkill, setProofSkill] = useState('');
  const [proofProficiency, setProofProficiency] = useState(75);
  const [proofReason, setProofReason] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [submittingProof, setSubmittingProof] = useState(false);
  const [successNote, setSuccessNote] = useState('');

  useEffect(() => {
    loadGaps();
  }, [profile?.targetRole]);

  const loadGaps = async () => {
    setLoading(true);
    try {
      const res = await skillAPI.getGaps();
      setData(res.data);
      if (res.data.gaps?.length > 0) {
        setSelectedGap(res.data.gaps[0]);
      }
    } catch (err) {
      console.error('Failed to load skill gaps:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEvidenceModal = (gap) => {
    setProofSkill(gap.skillName);
    setProofProficiency(Math.min(95, gap.targetLevel));
    setProofReason('');
    setProofLink('');
    setEvidenceModalOpen(true);
  };

  const handleSubmitEvidence = async (e) => {
    e.preventDefault();
    setSubmittingProof(true);
    try {
      await skillAPI.updateEvidence({
        skillName: proofSkill,
        proficiencyLevel: proofProficiency,
        state: 'Verified',
        reason: proofReason || 'Candidate submitted verifiable code proof link.',
        proofLink
      });
      setEvidenceModalOpen(false);
      setSuccessNote(`Evidence recorded! "${proofSkill}" has been updated.`);
      setTimeout(() => setSuccessNote(''), 4000);
      loadGaps();
    } catch (err) {
      console.error('Proof submission failed:', err);
    } finally {
      setSubmittingProof(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Calculating deterministic competency matrix...</p>
      </div>
    );
  }

  const allGaps = data?.gaps || [];
  const filteredGaps = stateFilter === 'ALL'
    ? allGaps
    : allGaps.filter(g => g.state.toUpperCase() === stateFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Skill Gap Analysis</h1>
          <p className="text-xs text-slate-500 mt-1">
            Comparing demonstrated abilities against the <strong className="text-slate-700">{data?.targetRole}</strong> competency profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter by State:</span>
          {['ALL', 'VERIFIED', 'PROBABLE', 'CLAIMED', 'UNKNOWN'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStateFilter(filter)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                stateFilter === filter
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {successNote && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Bar Chart Comparison */}
      <Card
        title="Competency Deficiencies: Current vs Target Benchmark"
        subtitle={data?.benchmarkType || 'Industry Standard Competency Benchmark (Team Technovoo1)'}
      >
        <SkillComparisonChart data={allGaps} />
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            Decision-support model: Unknown is never scored as zero ability.
          </span>
          <span className="text-[11px] text-slate-400">Calibration refreshed on evidence updates</span>
        </div>
      </Card>

      {/* Detailed Gaps Table & Explanation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gap list table */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900">
              Evaluated Competencies ({filteredGaps.length})
            </h3>
            <span className="text-xs text-slate-400">Ranked by Priority Score</span>
          </div>

          <div className="space-y-2.5">
            {filteredGaps.map((gap) => {
              const isSelected = selectedGap?.skillName === gap.skillName;
              return (
                <div
                  key={gap.skillName}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{gap.skillName}</span>
                        <Badge variant={gap.priority} size="sm">{gap.priority} Priority</Badge>
                        <Badge variant={gap.state} size="sm">{gap.state}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                        <span>Current: <strong className="text-slate-800">{gap.currentLevel}%</strong></span>
                        <span>Target: <strong className="text-blue-700">{gap.targetLevel}%</strong></span>
                        <span>Deficiency: <strong className={gap.deficiency > 30 ? 'text-rose-600' : 'text-slate-700'}>{gap.deficiency}%</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEvidenceModal(gap);
                        }}
                        className="!text-xs !py-1"
                      >
                        Submit Evidence
                      </Button>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'rotate-90 text-blue-600' : ''}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Gap Deep-Dive Drawer */}
        <div className="space-y-4">
          {selectedGap ? (
            <Card
              title={selectedGap.skillName}
              subtitle={`Competency Category: ${selectedGap.category || 'General'}`}
            >
              <div className="space-y-4">
                {/* Score meters */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Demonstrated Proficiency</span>
                    <span className="font-bold text-slate-800">{selectedGap.currentLevel}%</span>
                  </div>
                  <ProgressBar value={selectedGap.currentLevel} size="sm" color="blue" showValue={false} />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-500">Target Role Requirement</span>
                    <span className="font-bold text-blue-700">{selectedGap.targetLevel}%</span>
                  </div>
                  <ProgressBar value={selectedGap.targetLevel} size="sm" color="purple" showValue={false} />
                </div>

                {/* Why this gap matters */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Why This Gap Matters
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    {selectedGap.rationale || 'Essential competency for production readiness.'}
                  </p>
                </div>

                {/* Market context */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Benchmark Expectation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedGap.marketContext || 'Standard industry requirement for candidates targeting this role.'}
                  </p>
                </div>

                {/* Recommended Actions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Recommended Actions
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedGap.recommendedActions?.map((act, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleOpenEvidenceModal(selectedGap)}
                    icon={FileCheck2}
                  >
                    Submit Proof for {selectedGap.skillName}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <p className="text-xs text-slate-400 text-center py-8">
                Select a competency to view gap rationale and recommended actions.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Supplementary Evidence Modal */}
      {evidenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Submit Supplementary Skill Evidence
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide verifiable proof (e.g. GitHub repo link, project pull request, or assessment notes) to upgrade <strong>{proofSkill}</strong>.
            </p>

            <form onSubmit={handleSubmitEvidence} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Claimed Proficiency Level ({proofProficiency}%)
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={proofProficiency}
                  onChange={(e) => setProofProficiency(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Evidence Proof URL (GitHub Repo / Live PR / Deployment)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={proofLink}
                  onChange={(e) => setProofLink(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Implementation Summary & Reflection Notes
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Detail the specific architectural patterns or features you built to prove this competency..."
                  value={proofReason}
                  onChange={(e) => setProofReason(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEvidenceModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={submittingProof}
                  icon={ShieldCheck}
                >
                  Confirm & Update State to Verified
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
