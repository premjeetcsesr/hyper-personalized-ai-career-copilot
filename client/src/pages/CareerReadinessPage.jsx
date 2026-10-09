import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Target,
  ArrowRight,
  Info,
  Scale,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { readinessAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import ReadinessRadarChart from '../components/charts/ReadinessRadarChart';

export default function CareerReadinessPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [readiness, setReadiness] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await readinessAPI.getSnapshot();
        setReadiness(res.data.readiness);
      } catch (err) {
        console.error('Failed to load readiness:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profile?.targetRole]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Calculating 6-dimensional career readiness model...</p>
      </div>
    );
  }

  const dims = readiness?.dimensions || {};
  const rationale = readiness?.dimensionRationale || {};

  const dimensionsList = [
    {
      key: 'technical',
      name: 'Technical Competency',
      weight: '25%',
      score: dims.technicalReadiness || 50,
      color: 'blue',
      rationale: rationale.technical || 'Evaluated across verified vs claimed skills matching target role competencies.'
    },
    {
      key: 'project',
      name: 'Project & Portfolio Breadth',
      weight: '20%',
      score: dims.projectReadiness || 55,
      color: 'purple',
      rationale: rationale.project || 'Calculated from completed practical missions and scanned GitHub repos.'
    },
    {
      key: 'interview',
      name: 'Mock Interview Performance',
      weight: '20%',
      score: dims.interviewReadiness || 45,
      color: 'emerald',
      rationale: rationale.interview || 'Average scoring across multi-turn technical and architectural evaluations.'
    },
    {
      key: 'market',
      name: 'Curated Market Benchmark Alignment',
      weight: '15%',
      score: dims.marketAlignment || 45,
      color: 'amber',
      rationale: rationale.market || 'Proportion of essential industry competencies met with acceptable deficiency.'
    },
    {
      key: 'communication',
      name: 'Technical Communication & Logic',
      weight: '10%',
      score: dims.communicationReadiness || 70,
      color: 'teal',
      rationale: rationale.communication || 'Assessed from structured answer flow, clarity, and documentation hygiene.'
    },
    {
      key: 'resume',
      name: 'Resume & Profile Completeness',
      weight: '10%',
      score: dims.resumeReadiness || 60,
      color: 'rose',
      rationale: rationale.resume || 'Derived from student profile data density and parsed resume signals.'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Career Readiness Engine</h1>
        <p className="text-xs text-slate-500 mt-1">
          Multidimensional readiness index for <strong className="text-slate-800">{readiness?.targetRole}</strong>.
        </p>
      </div>

      {/* Primary Readiness Index Banner */}
      <Card className="bg-gradient-to-r from-[#102A43] via-[#1B3A5A] to-[#243B53] text-white !p-6 sm:!p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 block">
              Aggregate Career Readiness Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white">
                {readiness?.overallReadiness || 65}%
              </span>
              <span className="text-sm text-slate-300">Composite Readiness</span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Formula: {readiness?.formulaExplanation || 'Weighted sum across 6 evidentiary pillars.'}
            </p>
          </div>

          {readiness?.nextActionRecommendation && (
            <div className="md:w-80 w-full p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Highest-Impact Next Action
              </span>
              <h4 className="text-xs font-bold text-white">
                {readiness.nextActionRecommendation.title}
              </h4>
              <p className="text-[11px] text-slate-200">
                {readiness.nextActionRecommendation.description}
              </p>
              <Link to={readiness.nextActionRecommendation.targetLink}>
                <Button size="sm" variant="primary" className="w-full mt-2 !py-1 text-xs" icon={ArrowRight}>
                  Execute Action
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>

      {/* Radar Chart & Dimension Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart Card */}
        <Card
          title="6-Pillar Competency Radar"
          subtitle="Visualizing balance across technical, delivery, and communication pillars"
        >
          <ReadinessRadarChart dimensions={dims} />
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">
              Balanced profiles demonstrate reduced technical interview drop-off.
            </span>
          </div>
        </Card>

        {/* Dimension Breakdown Cards */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Component Pillar Scorecards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dimensionsList.map((dim) => (
              <Card key={dim.key} className="!p-4 bg-white border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">{dim.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Weight: {dim.weight}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-extrabold text-slate-900">{dim.score}%</span>
                  <span className="text-[11px] text-slate-400">Score</span>
                </div>

                <ProgressBar value={dim.score} size="sm" color={dim.color} showValue={false} />

                <p className="text-[11px] text-slate-500 mt-2.5 line-clamp-2">
                  {dim.rationale}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Transparent Calculation Documentation & Legal Disclaimer */}
      <Card
        title="Scoring Methodology & Transparency Disclosures"
        subtitle="Detailed accountability and design philosophy"
      >
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>How Overall Readiness is Calculated:</strong> The index is a transparent, deterministic weighted average calculated by the backend readiness engine:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <li>Technical Readiness: 25% (verified & probable skills vs required competency profile)</li>
            <li>Project Readiness: 20% (verified practical missions & GitHub repository depth)</li>
            <li>Market Alignment: 15% (percentage of benchmark competencies met with deficiency &lt; 20%)</li>
            <li>Mock Interview Performance: 20% (calibrated average score across conducted AI mock interviews)</li>
            <li>Technical Communication: 10% (reasoning clarity, documentation hygiene, and answer articulation)</li>
            <li>Resume & Profile Readiness: 10% (information completeness and keyword alignment)</li>
          </ul>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-[11px]">
              <strong>Academic & Educational Disclaimer:</strong> Career readiness scores are decision-support estimates engineered for self-assessment and learning optimization. They do not constitute a guarantee of employment, salary offer, interview shortlisting, or recruitment placement.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
