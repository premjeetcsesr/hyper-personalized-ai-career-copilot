import React, { useState } from 'react';
import {
  Github,
  Search,
  ExternalLink,
  Code,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Sparkles,
  GitCommit,
  Layers,
  Terminal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { githubAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function GitHubAnalyzerPage() {
  const { profile } = useAuth();
  const [username, setUsername] = useState(profile?.githubUsername || 'aarav-kit-dev');
  const [analyzing, setAnalyzing] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState('');

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!username.trim()) return;

    setAnalyzing(true);
    setSyncSuccess('');
    try {
      const res = await githubAPI.analyzeProfile(username);
      setGithubData(res.data.data);
    } catch (err) {
      console.error('GitHub analysis failed:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSyncSkills = async () => {
    if (!githubData) return;
    setSyncing(true);
    try {
      await githubAPI.syncSkills({
        username: githubData.username,
        extractedSkills: githubData.extractedSkills
      });
      setSyncSuccess(`Synchronized ${githubData.extractedSkills?.length || 0} code-backed skills into your career profile!`);
      setTimeout(() => setSyncSuccess(''), 5000);
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">GitHub Code Intelligence</h1>
        <p className="text-xs text-slate-500 mt-1">
          Scans public repositories for technology stack usage, test suites, container manifests, and architecture complexity.
        </p>
      </div>

      {syncSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{syncSuccess}</span>
        </div>
      )}

      {/* Search Input Card */}
      <Card>
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter public GitHub username (e.g. aarav-kit-dev or torvalds)"
              className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="navy"
            size="md"
            loading={analyzing}
            icon={Search}
          >
            Analyze Repositories
          </Button>
        </form>

        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Rate-limit safe: Respects GitHub API quotas and privacy permissions.</span>
        </p>
      </Card>

      {/* GitHub Results Display */}
      {githubData && (
        <div className="space-y-6">
          {/* User profile overview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={githubData.avatarUrl}
                alt={githubData.username}
                className="w-14 h-14 rounded-full border-2 border-slate-200 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{githubData.username}</h3>
                  <a
                    href={`https://github.com/${githubData.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{githubData.bio}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{githubData.publicReposCount} Public Repos</span>
                  <span>•</span>
                  <span>{githubData.followers} Followers</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSyncSkills}
              loading={syncing}
              icon={CheckCircle2}
            >
              Sync Skills to Career Profile
            </Button>
          </div>

          {/* Observed Code Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="!p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Docker Usage</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                githubData.observedSignals?.dockerDetected
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {githubData.observedSignals?.dockerDetected ? '✓ Detected' : '✕ Not Detected'}
              </span>
            </Card>

            <Card className="!p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Testing Suites</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                githubData.observedSignals?.testingDetected
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {githubData.observedSignals?.testingDetected ? '✓ Tests Found' : '✕ No Test Suites'}
              </span>
            </Card>

            <Card className="!p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">CI/CD Workflows</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                githubData.observedSignals?.ciCdDetected
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {githubData.observedSignals?.ciCdDetected ? '✓ CI Configured' : '⚠ No CI/CD'}
              </span>
            </Card>

            <Card className="!p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Architecture Depth</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                githubData.observedSignals?.microservicesArchitecture
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {githubData.observedSignals?.microservicesArchitecture ? '✓ Multi-Tiered' : 'Modular Web'}
              </span>
            </Card>
          </div>

          {/* Repositories Scanned */}
          <Card
            title="Scanned Repositories & Engineering Signals"
            subtitle="Analyzed code repositories and associated technology flags"
          >
            <div className="space-y-3">
              {githubData.repositories?.map((repo) => (
                <div
                  key={repo.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-slate-900 hover:text-blue-600 truncate flex items-center gap-1"
                      >
                        {repo.name} <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {repo.description}
                    </p>
                  </div>

                  {/* Signals pills */}
                  <div className="flex items-center gap-2 shrink-0 text-[10px]">
                    {repo.signals?.hasDocker && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        Docker
                      </span>
                    )}
                    {repo.signals?.hasTesting && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                        Tested
                      </span>
                    )}
                    {repo.signals?.hasArchitectureSignals && (
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
                        Architecture
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
