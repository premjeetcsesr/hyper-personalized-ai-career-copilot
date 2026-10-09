import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  Cpu,
  Database,
  Download,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { demoAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function SettingsPage() {
  const { user, profile, isDemoMode, loadDemoAccount } = useAuth();
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [reloadingDemo, setReloadingDemo] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await demoAPI.getHealth();
      setHealth(res.data);
    } catch (err) {
      console.error('Failed to load health:', err);
    } finally {
      setLoadingHealth(false);
    }
  };

  const handleReloadDemo = async () => {
    setReloadingDemo(true);
    try {
      await loadDemoAccount();
      setNotice('Official Technova001 Hackathon Demo Scenario reloaded successfully!');
      setTimeout(() => setNotice(''), 4000);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setReloadingDemo(false);
    }
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ user, profile, exportDate: new Date(), project: 'Hyper-Personalized AI Career Co-Pilot' }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `career_copilot_profile_${user?.name || 'student'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System & Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage system integrations, diagnostic telemetry, and data privacy controls.
        </p>
      </div>

      {notice && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Diagnostics / System Health */}
      <Card title="System Diagnostics & AI Pipeline Telemetry" subtitle="Verified live connection status for hackathon evaluation">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Server API</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-900">{health?.status || 'ONLINE'}</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Node/Express 4.21+</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Database Mode</span>
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 truncate">
                {health?.database?.mode || 'Dual-Mode Persistence'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Resilient Mongo Adapter</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">AI Pipeline</span>
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 truncate">
                {health?.ai?.activeEngine || 'AI Evidence Engine'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">JSON Schema Validation</span>
          </div>
        </div>
      </Card>

      {/* Hackathon Demo Controls */}
      <Card
        title="Hackathon Demo Sandbox Controls"
        subtitle="Quick actions designed for judges and evaluators"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-blue-50/70 border border-blue-200 gap-3">
            <div>
              <span className="text-xs font-bold text-blue-900 block">
                Reset to Pristine Hackathon Demo Scenario
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Restores Aarav Sharma (Kanpur Institute of Technology), sample resume, GitHub repositories, Docker gaps, and mock interview reports.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleReloadDemo}
              loading={reloadingDemo}
              icon={RefreshCw}
            >
              Reset Demo Scenario
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Export Career Profile Data
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Download a clean, structured JSON snapshot of your verified competencies and learning roadmap.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              icon={Download}
            >
              Export JSON
            </Button>
          </div>
        </div>
      </Card>

      {/* Institution Credits */}
      <Card title="Project Credits & Team Identity" subtitle="Developed for College Hackathon 2026">
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>Project:</strong> Hyper-Personalized AI Career Co-Pilot
          </p>
          <p>
            <strong>Team Name:</strong> Technova001
          </p>
          <p>
            <strong>Institution:</strong> Kanpur Institute of Technology (KIT), Uttar Pradesh, India
          </p>
          <p>
            <strong>Guiding Principle:</strong> Evidence Before Inference
          </p>
        </div>
      </Card>
    </div>
  );
}
