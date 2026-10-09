import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { interviewAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';

export default function InterviewReportPage() {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      try {
        const res = await interviewAPI.getSessionReport(sessionId);
        setSession(res.data.session);
      } catch (err) {
        console.error('Failed to load session report:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [sessionId]);

  const toggleQ = (idx) => {
    setExpandedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Synthesizing interview report telemetry...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <Card>
        <p className="text-xs text-slate-500 text-center py-10">Interview session not found.</p>
      </Card>
    );
  }

  const report = session.finalReport || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Evaluation Completed
            </span>
            <span className="text-xs text-slate-400">• Mode: {session.mode}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Interview Assessment Report</h1>
          <p className="text-xs text-slate-500 mt-1">
            Calibrated for role: <strong className="text-slate-800">{session.targetRole}</strong>
          </p>
        </div>

        <Link to="/app/interview">
          <Button variant="outline" size="sm">
            Conduct Another Session
          </Button>
        </Link>
      </div>

      {/* Executive Scorecard */}
      <Card className="bg-gradient-to-r from-[#102A43] to-[#243B53] text-white !p-6 sm:!p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 block mb-1">
              Overall Calibrated Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                {report.overallScore || 85}
              </span>
              <span className="text-base text-slate-300">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
              {report.executiveSummary || 'Demonstrated reliable technical mastery and strong communication.'}
            </p>
          </div>

          <div className="sm:w-72 w-full space-y-2.5 bg-white/10 p-4 rounded-xl border border-white/10">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Technical Depth</span>
                <span className="font-bold text-white">{report.dimensionScores?.technical || 88}%</span>
              </div>
              <ProgressBar value={report.dimensionScores?.technical || 88} showValue={false} size="sm" color="blue" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Reasoning & Logic</span>
                <span className="font-bold text-white">{report.dimensionScores?.reasoning || 85}%</span>
              </div>
              <ProgressBar value={report.dimensionScores?.reasoning || 85} showValue={false} size="sm" color="purple" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">System Architecture</span>
                <span className="font-bold text-white">{report.dimensionScores?.systemDesign || 84}%</span>
              </div>
              <ProgressBar value={report.dimensionScores?.systemDesign || 84} showValue={false} size="sm" color="emerald" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Communication</span>
                <span className="font-bold text-white">{report.dimensionScores?.communication || 90}%</span>
              </div>
              <ProgressBar value={report.dimensionScores?.communication || 90} showValue={false} size="sm" color="amber" />
            </div>
          </div>
        </div>
      </Card>

      {/* Verified Skills Gained Pill */}
      {report.skillsVerified?.length > 0 && (
        <Card title="Skills Verified by This Assessment" subtitle="Directly promoted to 'Verified' state in your Skill Evidence Graph">
          <div className="flex flex-wrap gap-2">
            {report.skillsVerified.map((sk, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{sk}</span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Strengths and Critical Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Observed Strengths" subtitle="Positive patterns identified in technical responses">
          <ul className="space-y-2">
            {report.topStrengths?.map((str, idx) => (
              <li key={idx} className="text-xs text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Critical Gaps to Address" subtitle="Key deficiencies to resolve before live industry interviews">
          <ul className="space-y-2">
            {report.criticalGaps?.map((gap, idx) => (
              <li key={idx} className="text-xs text-slate-700 bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  !
                </span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Question-by-Question Transcript */}
      <Card title="Question Transcript & Detailed Critiques" subtitle="Review your exact submissions and the underlying scoring rationale">
        <div className="space-y-4">
          {session.questions?.map((q, idx) => {
            const isExp = expandedQuestions[idx] ?? true;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div
                  onClick={() => toggleQ(idx)}
                  className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors"
                >
                  <div className="truncate flex-1 pr-3">
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">
                      Question {idx + 1} • {q.competency}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
                      {q.questionText}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-blue-700">
                      Score: {q.evaluation?.score || 80}/100
                    </span>
                    {isExp ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExp && (
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Your Submission</span>
                      <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed font-sans">
                        "{q.userAnswer}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Evaluator Feedback</span>
                      <p className="text-slate-600 leading-relaxed">
                        {q.evaluation?.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommended Practice Missions */}
      {report.recommendedPracticeMissions?.length > 0 && (
        <Card title="Recommended Practice Missions" subtitle="Targeted hands-on missions to turn these interview gaps into strengths">
          <div className="space-y-2">
            {report.recommendedPracticeMissions.map((miss, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-white">
                <span className="text-xs font-bold text-slate-800">{miss}</span>
                <Link to="/app/missions">
                  <Button size="sm" variant="outline" className="!text-xs !py-1" icon={ArrowRight}>
                    Go to Mission
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
