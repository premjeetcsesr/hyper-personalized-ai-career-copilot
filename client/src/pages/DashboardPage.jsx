import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Target,
  FileText,
  Github,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { skillAPI, roadmapAPI, missionAPI, interviewAPI, readinessAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import SkillComparisonChart from '../components/charts/SkillComparisonChart';
import ReadinessRadarChart from '../components/charts/ReadinessRadarChart';

export default function DashboardPage() {
  const { user, profile, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [skillsData, setSkillsData] = useState([]);
  const [gapsData, setGapsData] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [missions, setMissions] = useState([]);
  const [readiness, setReadiness] = useState(null);
  const [recentInterview, setRecentInterview] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [gapsRes, roadmapRes, missionsRes, interviewRes, readinessRes] = await Promise.allSettled([
          skillAPI.getGaps(),
          roadmapAPI.getRoadmap(),
          missionAPI.getMissions(),
          interviewAPI.getHistory(),
          readinessAPI.getSnapshot()
        ]);

        if (gapsRes.status === 'fulfilled') {
          setSkillsData(gapsRes.value.data.skills || []);
          setGapsData(gapsRes.value.data.gaps || []);
        }
        if (roadmapRes.status === 'fulfilled') {
          setRoadmap(roadmapRes.value.data.roadmap);
        }
        if (missionsRes.status === 'fulfilled') {
          setMissions(missionsRes.value.data.missions || []);
        }
        if (interviewRes.status === 'fulfilled') {
          const sessions = interviewRes.value.data.sessions || [];
          if (sessions.length > 0) {
            setRecentInterview(sessions[sessions.length - 1]);
          }
        }
        if (readinessRes.status === 'fulfilled') {
          setReadiness(readinessRes.value.data.readiness);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [profile?.targetRole]);

  // Skill counts by state
  const verifiedCount = skillsData.filter(s => s.state === 'Verified').length;
  const probableCount = skillsData.filter(s => s.state === 'Probable').length;
  const claimedCount = skillsData.filter(s => s.state === 'Claimed').length;
  const unknownCount = skillsData.filter(s => s.state === 'Unknown').length;

  const topGaps = gapsData.slice(0, 5);
  const activeMission = missions.find(m => m.status === 'in_progress') || missions[0];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Calibrating career intelligence pipeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Target Role & Profile Hero Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#1B3A5A] to-[#243B53] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {profile?.college ? (
                <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {profile.college}
                </span>
              ) : (
                <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  Active Career Profile
                </span>
              )}
              {isDemoMode && (
                <span className="bg-amber-500/30 text-amber-200 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  Sample Sandbox Mode
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name || 'Student'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Target Career Role: <strong className="text-blue-300">{profile?.targetRole || 'Full-Stack Developer'}</strong>. 
              Your profile is verified through continuous code scanning, project missions, and adaptive interview calibration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/app/interview">
              <Button variant="primary" size="md" icon={Sparkles} className="shadow-lg shadow-blue-500/30">
                Mock Interview
              </Button>
            </Link>
            <Link to="/app/resume">
              <Button variant="navy" size="md" icon={FileText} className="border border-slate-600 bg-slate-800/80 hover:bg-slate-700">
                Scan Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Verified Skills */}
        <Card hoverEffect className="!p-4 sm:!p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Verified Skills</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{verifiedCount}</span>
            <span className="text-xs text-slate-500">skills</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Backed by code & test evidence
          </p>
        </Card>

        {/* Metric 2: Claimed & Probable */}
        <Card hoverEffect className="!p-4 sm:!p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Probable / Claimed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{probableCount + claimedCount}</span>
            <span className="text-xs text-slate-500">pending verification</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {probableCount} probable • {claimedCount} claimed
          </p>
        </Card>

        {/* Metric 3: Critical Gaps */}
        <Card hoverEffect className="!p-4 sm:!p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">High-Priority Gaps</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {gapsData.filter(g => g.priority === 'High').length}
            </span>
            <span className="text-xs text-slate-500">priority areas</span>
          </div>
          <p className="text-[11px] text-rose-600 font-medium mt-1">
            Requires focused project action
          </p>
        </Card>

        {/* Metric 4: Overall Readiness Score */}
        <Card hoverEffect className="!p-4 sm:!p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Career Readiness</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {readiness?.overallReadiness || 68}%
            </span>
            <span className="text-xs text-slate-500">index</span>
          </div>
          <ProgressBar
            value={readiness?.overallReadiness || 68}
            showValue={false}
            size="sm"
            color="blue"
            className="mt-2"
          />
        </Card>
      </div>

      {/* Grid: Skill Gaps Comparison & Readiness Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Skill Level vs Target Comparison */}
        <Card
          className="lg:col-span-2"
          title="Demonstrated vs Target Competencies"
          subtitle="Transparent comparison of observed skills against curated benchmark standards"
          action={
            <Link to="/app/skills" className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View All Gaps <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <SkillComparisonChart data={gapsData} />
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Source: Curated Academic & Industry Benchmark
            </span>
            <span className="text-[11px] text-slate-400">Estimates are for decision support</span>
          </div>
        </Card>

        {/* Right 1 col: Career Readiness Radar */}
        <Card
          title="Multidimensional Readiness"
          subtitle="6-Pillar balance across technical, project, and interview readiness"
          action={
            <Link to="/app/readiness" className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <ReadinessRadarChart dimensions={readiness?.dimensions} />
          
          {readiness?.nextActionRecommendation && (
            <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                Recommended Next Step
              </span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">
                {readiness.nextActionRecommendation.title}
              </p>
              <Link to={readiness.nextActionRecommendation.targetLink}>
                <Button size="sm" variant="primary" className="w-full mt-2 !py-1 text-xs" icon={ArrowRight}>
                  Take Action
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Grid: Top 5 Skill Gaps Table & Active Mission / Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Prioritized Skill Gaps */}
        <Card
          title="Top 5 Skill Gaps & Deficiencies"
          subtitle="Deterministically ranked by role weight and missing evidence confidence"
          action={
            <Link to="/app/skills" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              Deep Dive
            </Link>
          }
        >
          <div className="space-y-3">
            {topGaps.map((gap) => (
              <div
                key={gap.skillName}
                className="p-3 rounded-xl border border-slate-200/90 hover:border-slate-300 transition-colors bg-white flex items-center justify-between gap-3"
              >
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 truncate">{gap.skillName}</span>
                    <Badge variant={gap.priority} size="sm">{gap.priority}</Badge>
                    <Badge variant={gap.state} size="sm">{gap.state}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    Deficiency: {gap.deficiency}% • Target: {gap.targetLevel}%
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <Link to="/app/missions">
                    <Button size="sm" variant="outline" className="!py-1 !px-2.5 !text-xs">
                      Fix Gap
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Active Mission & Roadmap Tracker */}
        <div className="space-y-6">
          {/* Active Mission */}
          {activeMission && (
            <Card
              title="Current Practical Mission"
              subtitle="Convert theoretical knowledge into verifiable code deliverables"
              action={
                <Badge variant={activeMission.status} size="sm">
                  {activeMission.status}
                </Badge>
              }
            >
              <h4 className="text-sm font-bold text-slate-900">{activeMission.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeMission.description}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>Target Skill: <strong className="text-slate-700">{activeMission.skillTargeted}</strong></span>
                <span>•</span>
                <span>Reward: <strong className="text-emerald-600">+{activeMission.reward?.skillGain || 25}%</strong></span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Est. Time: {activeMission.estimatedHours} hrs</span>
                <Link to="/app/missions">
                  <Button size="sm" variant="primary" icon={ArrowRight}>
                    Open Mission Workspace
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Recent Mock Interview Snapshot */}
          {recentInterview && (
            <Card
              title="Recent Mock Interview Results"
              subtitle={`Role: ${recentInterview.targetRole} • Mode: ${recentInterview.mode}`}
              action={
                <Link to={`/app/interview/${recentInterview._id}`} className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  Full Report <ArrowUpRight className="w-3 h-3" />
                </Link>
              }
            >
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Overall Score</span>
                  <span className="text-xl font-extrabold text-blue-600">
                    {recentInterview.finalReport?.overallScore || 85}/100
                  </span>
                </div>

                <div className="flex gap-4 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Technical</span>
                    <span className="font-semibold text-slate-800">
                      {recentInterview.finalReport?.dimensionScores?.technical || 88}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Reasoning</span>
                    <span className="font-semibold text-slate-800">
                      {recentInterview.finalReport?.dimensionScores?.reasoning || 85}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Communication</span>
                    <span className="font-semibold text-slate-800">
                      {recentInterview.finalReport?.dimensionScores?.communication || 90}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
