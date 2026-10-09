import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Layers,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { interviewAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';

const INTERVIEW_MODES = [
  { id: 'technical', title: 'Technical Interview', desc: 'Core CS concepts, API design, algorithms, and languages.' },
  { id: 'system_design', title: 'System Design', desc: 'Distributed caching, scalability, databases, and microservices.' },
  { id: 'project', title: 'Project-Based', desc: 'Deep dive into architecture decisions in your portfolio.' },
  { id: 'behavioral', title: 'Behavioral & Ownership', desc: 'Engineering trade-offs, collaboration, and resolving conflict.' },
];

export default function MockInterviewPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('technical');
  const [difficulty, setDifficulty] = useState('Mid');
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [starting, setStarting] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStartSession = async () => {
    setStarting(true);
    setEvaluation(null);
    setUserAnswer('');
    setIsCompleted(false);

    try {
      const res = await interviewAPI.startSession({
        mode,
        difficulty
      });
      setSession(res.data.session);
      setCurrentQuestion({
        index: 1,
        question: res.data.session.question,
        competency: res.data.session.competency
      });
    } catch (err) {
      console.error('Failed to start interview:', err);
    } finally {
      setStarting(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setEvaluating(true);
    try {
      const res = await interviewAPI.submitAnswer(session.id, {
        answer: userAnswer
      });

      setEvaluation(res.data.evaluation);

      if (res.data.isCompleted) {
        setIsCompleted(true);
      } else if (res.data.nextQuestion) {
        // Store next question ready for next step
        setCurrentQuestion({
          index: res.data.nextQuestion.questionIndex,
          question: res.data.nextQuestion.question,
          competency: res.data.nextQuestion.competency
        });
      }
    } catch (err) {
      console.error('Failed to evaluate answer:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleProceedToNext = () => {
    setUserAnswer('');
    setEvaluation(null);
  };

  const handleFinishAndReport = () => {
    navigate(`/app/interview/${session.id}`);
  };

  // Demo helper: Fill realistic high-quality answer for hackathon live demo
  const handleFillDemoAnswer = () => {
    setUserAnswer(
      "To architect real-time collaborative editing, I would use persistent WebSockets for low-latency bidirectional messaging. On the client, I'd implement Conflict-Free Replicated Data Types (CRDTs) like Yjs or Automerge so peer nodes converge on identical state deterministically without locking. In the backend, Node.js servers would coordinate with Redis Pub/Sub to broadcast operation deltas across distributed server nodes. Critical database transactions will run atomically with optimistic concurrency control."
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Adaptive AI Mock Interview</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time technical interviewer evaluating correctness, engineering reasoning, system design, and communication.
        </p>
      </div>

      {!session ? (
        /* Configuration / Start View */
        <Card title="Interview Configuration" subtitle="Configure interview mode and starting difficulty">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Select Interview Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERVIEW_MODES.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      mode === m.id
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{m.title}</span>
                      {mode === m.id && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                  {profile?.targetRole || 'Full-Stack Developer'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Difficulty</label>
                <div className="flex gap-2">
                  {['Junior', 'Mid', 'Senior'].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                        difficulty === diff
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartSession}
                loading={starting}
                icon={Sparkles}
              >
                Begin Adaptive Mock Interview
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Active Interview Workspace */
        <div className="space-y-6">
          {/* Question Card */}
          <Card
            title={`Question ${currentQuestion?.index || 1} of 3`}
            subtitle={`Target Competency: ${currentQuestion?.competency} • Current Track: ${session.targetRole}`}
            action={
              <Badge variant="Probable" size="sm">
                Mode: {session.mode}
              </Badge>
            }
          >
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80">
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                "{currentQuestion?.question}"
              </p>
            </div>

            {/* Answer form if not yet evaluated for this turn */}
            {!evaluation && (
              <form onSubmit={handleSubmitAnswer} className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Your Technical Response
                    </label>
                    <button
                      type="button"
                      onClick={handleFillDemoAnswer}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Auto-fill Demo Response
                    </button>
                  </div>

                  <textarea
                    rows="6"
                    required
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Structure your answer: 1. Core architecture & primitives 2. Tradeoffs & concurrency 3. Edge-case handling..."
                    className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Be specific about data flow, security, and scalability tradeoffs.</span>
                    <span>{userAnswer.length} chars</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={evaluating}
                    disabled={!userAnswer.trim()}
                    icon={Send}
                  >
                    Submit Answer for AI Evaluation
                  </Button>
                </div>
              </form>
            )}

            {/* Turn Evaluation Feedback Drawer */}
            {evaluation && (
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Evaluation Score</span>
                    <span className="text-2xl font-extrabold text-blue-600">{evaluation.score}/100</span>
                  </div>

                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Correctness</span>
                      <span className="font-bold text-slate-800">{evaluation.correctnessScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Reasoning</span>
                      <span className="font-bold text-slate-800">{evaluation.reasoningScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Architecture</span>
                      <span className="font-bold text-slate-800">{evaluation.systemDesignScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Communication</span>
                      <span className="font-bold text-slate-800">{evaluation.communicationScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
                    AI Mentor Feedback
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {evaluation.feedback}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      Demonstrated Strengths
                    </span>
                    <ul className="space-y-1">
                      {evaluation.strengths?.map((s, idx) => (
                        <li key={idx} className="text-xs text-emerald-900">• {s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Growth */}
                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40">
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                      <ThumbsDown className="w-3.5 h-3.5 text-amber-600" />
                      Refinement Opportunities
                    </span>
                    <ul className="space-y-1">
                      {evaluation.weaknesses?.map((w, idx) => (
                        <li key={idx} className="text-xs text-amber-900">• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {evaluation.suggestedAnswerStructure && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Optimal Answer Architecture
                    </span>
                    <p className="text-xs font-mono text-slate-700">
                      {evaluation.suggestedAnswerStructure}
                    </p>
                  </div>
                )}

                {/* Navigation CTA */}
                <div className="flex justify-end gap-3 pt-3">
                  {isCompleted ? (
                    <Button
                      variant="success"
                      size="md"
                      onClick={handleFinishAndReport}
                      icon={Award}
                    >
                      View Comprehensive Interview Report
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleProceedToNext}
                      icon={ArrowRight}
                    >
                      Proceed to Question {(currentQuestion?.index || 1)}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
