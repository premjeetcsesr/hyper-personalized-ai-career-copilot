import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, AlertCircle, Cpu, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoAPI } from '../../services/api';
import Button from './Button';

export default function DemoBanner() {
  const { isDemoMode, loadDemoAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await demoAPI.getHealth();
        setHealth(res.data);
      } catch (e) {
        // silent fail
      }
    }
    checkHealth();
  }, []);

  const handleReload = async () => {
    setLoading(true);
    await loadDemoAccount();
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#102A43] to-slate-900 text-white text-xs px-4 py-2.5 shadow-inner border-b border-slate-700/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-blue-300">Team Technovoo1</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 font-medium">Live API Intelligence</span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-200">
              {health?.ai?.activeEngine || 'AI Evidence Pipeline Active'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isDemoMode ? (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Illustrative Demo Data Mode
            </span>
          ) : (
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-blue-400" />
              Live User Profile Mode
            </span>
          )}

          <Button
            size="sm"
            variant="navy"
            onClick={handleReload}
            loading={loading}
            className="!py-1 !px-2.5 !text-xs bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-100"
            icon={RefreshCw}
          >
            Reset Demo Scenario
          </Button>
        </div>
      </div>
    </div>
  );
}
