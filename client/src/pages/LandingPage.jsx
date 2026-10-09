import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Github,
  Compass,
  Target,
  BarChart3,
  GraduationCap,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

export default function LandingPage() {
  const { isAuthenticated, loadDemoAccount } = useAuth();
  const navigate = useNavigate();

  const handleLaunchDemo = async () => {
    await loadDemoAccount();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#102A43] text-white text-xs py-2 px-4 text-center border-b border-slate-700 flex items-center justify-center gap-2">
        <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded text-[11px] font-semibold">
          HACKATHON SHOWCASE
        </span>
        <span>Team Technova001 • Kanpur Institute of Technology (KIT)</span>
      </div>

      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold text-lg">
              🧭
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight">
                AI Career Co-Pilot
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider block">
                Evidence Before Inference
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/app')}
                icon={ArrowRight}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLaunchDemo}
                  icon={Sparkles}
                >
                  Quick Demo
                </Button>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="navy" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Hyper-Personalized AI Career Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Stop Guessing Your Career Readiness. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Prove It With Evidence.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Generic roadmaps don’t cut it. Our AI extracts verifiable skill evidence from your resumes and GitHub code, compares your abilities with target industry benchmarks, prioritizes gaps, and trains you with adaptive mock interviews.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={handleLaunchDemo}
              className="shadow-lg shadow-blue-500/25"
              icon={Sparkles}
            >
              Launch Live Hackathon Demo
            </Button>
            <Link to="/register">
              <Button size="lg" variant="outline" icon={GraduationCap}>
                Student Registration
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Evidence System
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Adaptive AI Mock Interviewer
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Kanpur Institute of Technology
            </span>
          </div>
        </div>
      </section>

      {/* Core Principle: Evidence Before Inference */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-wider text-blue-600 mb-2">
              Foundational Architecture
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Core Principle: Evidence Before Inference
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              We never treat a self-reported claim as a verified competency. Every skill transitions through a four-tier evidentiary verification pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h4 className="font-bold text-emerald-900 text-sm">Verified</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Demonstrated via completed practical missions, multi-repo code analysis, or passed technical mock interview evaluations (Score ≥ 75%).
              </p>
            </div>

            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h4 className="font-bold text-blue-900 text-sm">Probable</h4>
              <p className="text-xs text-blue-700 mt-1">
                Observed in public GitHub repositories, project dependency manifests, or detailed project case studies with concrete implementation context.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h4 className="font-bold text-amber-900 text-sm">Claimed</h4>
              <p className="text-xs text-amber-700 mt-1">
                Self-reported in the student profile or listed in a resume skills section without supporting code or assessment evidence.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-slate-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Unknown</h4>
              <p className="text-xs text-slate-600 mt-1">
                Not yet assessed. Crucially, unknown is never penalized as zero ability—it represents unverified potential ready to be calibrated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              End-to-End Career Intelligence Pipeline
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              UNDERSTAND → VERIFY → COMPARE → IMPROVE → VALIDATE → ADAPT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Resume & Project Analyzer</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Parse PDF and DOCX documents with text sanitization. Extract verified skills, project tech stacks, and receive targeted resume improvement suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Github className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">GitHub Intelligence</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect public repositories to detect language frequency, testing practices, Docker usage, and architectural signals—without inferring skill from raw commit counts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Skill Gap Engine</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Benchmark against 6 curated roles. Calculate deficiency priorities deterministically and understand exactly why each gap matters in the real market.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Personalized Roadmap</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Follow the 5-step cycle: LEARN → PRACTICE → BUILD → VALIDATE → IMPROVE. Complete milestones with verified code deliverables.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Adaptive AI Mock Interview</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Simulate technical, project, and system design interviews. Receive instant feedback across correctness, reasoning, architecture, and communication.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Career Readiness Engine</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Multidimensional radar scoring across 6 key pillars. Fully transparent formulas with recommended high-impact next actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#102A43] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready for the Live Hackathon Demonstration?
          </h2>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Experience the complete student journey with pre-seeded demo artifacts for Kanpur Institute of Technology or start fresh with your own credentials.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={handleLaunchDemo}
              icon={Sparkles}
            >
              Start One-Click Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
