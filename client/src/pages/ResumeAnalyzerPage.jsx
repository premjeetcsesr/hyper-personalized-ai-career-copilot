import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  FileCheck2,
  Trash2,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resumeAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ResumeAnalyzerPage() {
  const { profile } = useAuth();
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
      const ext = selected.name.split('.').pop().toLowerCase();

      if (!validExtensions.includes(ext)) {
        setErrorMsg('Invalid file format. Please upload a PDF or DOCX file.');
        return;
      }

      if (selected.size > 5 * 1024 * 1024) {
        setErrorMsg('File size exceeds 5MB limit.');
        return;
      }

      setErrorMsg('');
      setFile(selected);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setErrorMsg('');
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await resumeAPI.uploadResume(formData);
      setAnalysisResult(res.data.analysis);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to analyze resume.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Sample student resume for instant hackathon demonstration
  const handleLoadSampleResume = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        candidateName: 'Candidate Developer',
        education: {
          institution: 'Institute of Engineering & Technology',
          degree: 'B.Tech in Computer Science and Engineering',
          year: '2026'
        },
        observedSkills: [
          {
            skill: 'JavaScript',
            category: 'Language',
            evidenceQuote: 'Built fullstack responsive web application using JavaScript ES6+ features.',
            estimatedProficiency: 82,
            state: 'Probable',
            confidence: 80
          },
          {
            skill: 'React.js',
            category: 'Frontend',
            evidenceQuote: 'Developed interactive Single Page Application with React hooks, Context API, and Tailwind CSS.',
            estimatedProficiency: 80,
            state: 'Probable',
            confidence: 80
          },
          {
            skill: 'Node.js',
            category: 'Backend',
            evidenceQuote: 'Architected REST APIs with Express.js backend and JWT authentication.',
            estimatedProficiency: 78,
            state: 'Probable',
            confidence: 75
          },
          {
            skill: 'MongoDB',
            category: 'Database',
            evidenceQuote: 'Designed normalized schemas and performed aggregations for student portal database.',
            estimatedProficiency: 74,
            state: 'Probable',
            confidence: 75
          },
          {
            skill: 'Git',
            category: 'DevOps',
            evidenceQuote: 'Collaborated using Git branch workflows and hosted codebases on GitHub.',
            estimatedProficiency: 80,
            state: 'Probable',
            confidence: 78
          }
        ],
        projectSummaries: [
          {
            title: 'Campus Grievance & Facility Portal',
            techStack: ['React.js', 'Node.js', 'Express', 'MongoDB'],
            description: 'Automated campus complaint filing, status tracking, and admin resolution metrics.'
          },
          {
            title: 'Collaborative Markdown Workspace',
            techStack: ['JavaScript', 'WebSockets', 'Tailwind CSS'],
            description: 'Live collaborative text editor with synchronized preview and markdown exporter.'
          }
        ],
        resumeCritique: {
          missingSignals: [
            'Containerization (Docker/Kubernetes)',
            'Automated Unit/Integration Testing (Jest/Supertest)',
            'System Architecture / Scalability Metrics'
          ],
          strengths: [
            'Clean full-stack web stack alignment for target role',
            'Demonstrated hands-on academic project depth',
            'Clear evidence of end-to-end client-server development'
          ],
          improvementSuggestions: [
            'Quantify project impact with explicit throughput or response latency metrics',
            'Include direct hyperlinks to live demo deployments and test coverage reports',
            'Explicitly list CI/CD pipelines used (e.g., GitHub Actions)'
          ]
        },
        targetRoleAlignmentScore: 82,
        engine: 'Deterministic Semantic Analysis Engine (Hackathon Safe Mode)'
      });
      setAnalyzing(false);
    }, 1200);
  };

  const handleConfirmAndSave = async () => {
    if (!analysisResult) return;
    setConfirming(true);
    try {
      await resumeAPI.confirmExtraction({
        confirmedSkills: analysisResult.observedSkills,
        confirmedProjects: analysisResult.projectSummaries,
        education: analysisResult.education
      });
      setSuccessMsg('Resume skills and project evidence successfully incorporated into your career profile!');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to commit extracted evidence.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resume & Project Analyzer</h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload PDF or DOCX resume to extract evidence-backed technical skills, project citations, and gap signals.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Upload Box */}
      <Card
        title="Upload Resume Document"
        subtitle="Accepted formats: PDF, DOCX (Max 5MB). Processed strictly in sandboxed memory."
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={handleLoadSampleResume}
            icon={Sparkles}
            className="!text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Load Sample Resume
          </Button>
        }
      >
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center transition-colors bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            {file ? file.name : 'Select or drag your resume document here'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            PDF or DOCX • Untrusted binary execution disabled for security
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs">
                Browse Files
              </span>
            </label>

            {file && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleUploadAndAnalyze}
                loading={analyzing}
                icon={Sparkles}
              >
                Analyze Document
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Extracted Analysis Section */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Header pill */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Analysis Pipeline Completed for {analysisResult.candidateName}
                </span>
                <span className="text-[11px] text-slate-600">
                  Target Role Alignment: <strong className="text-blue-700">{analysisResult.targetRoleAlignmentScore}%</strong> • Engine: {analysisResult.engine || 'AI Parser'}
                </span>
              </div>
            </div>

            <Button
              variant="success"
              size="sm"
              onClick={handleConfirmAndSave}
              loading={confirming}
              icon={CheckCircle}
            >
              Confirm & Save Extracted Evidence
            </Button>
          </div>

          {/* Observed Skills Evidence Cards */}
          <Card
            title="Detected Skill Evidence (Quotes & Context)"
            subtitle="Skills verified with sentence-level citations from the candidate resume"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysisResult.observedSkills?.map((skill, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{skill.skill}</span>
                    <Badge variant={skill.state} size="sm">{skill.state}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-100">
                    "{skill.evidenceQuote}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Proficiency: <strong className="text-slate-700">{skill.estimatedProficiency}%</strong></span>
                    <span>Confidence: <strong className="text-slate-700">{skill.confidence}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Missing Signals & Critique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Missing Or Unclear Signals"
              subtitle="Competencies expected for target role with no observed resume citations"
            >
              <ul className="space-y-2">
                {analysisResult.resumeCritique?.missingSignals?.map((missing, idx) => (
                  <li key={idx} className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{missing}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Improvement Suggestions"
              subtitle="Actionable recommendations to strengthen resume technical credibility"
            >
              <ul className="space-y-2">
                {analysisResult.resumeCritique?.improvementSuggestions?.map((tip, idx) => (
                  <li key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
