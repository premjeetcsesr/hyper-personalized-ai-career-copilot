import React, { useState } from 'react';
import { Menu, ChevronDown, CheckCircle2, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { profileAPI } from '../../services/api';

const AVAILABLE_ROLES = [
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Data Analyst',
  'AI/ML Engineer'
];

export default function Navbar({ setMobileOpen }) {
  const { user, profile, refreshProfile } = useAuth();
  const [roleUpdating, setRoleUpdating] = useState(false);

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setRoleUpdating(true);
    try {
      const res = await profileAPI.updateTargetRole(newRole);
      refreshProfile({ targetRole: newRole });
      // Trigger a page refresh so all gap computations and roadmaps sync
      window.location.reload();
    } catch (err) {
      console.error('Role update failed', err);
    } finally {
      setRoleUpdating(false);
    }
  };

  const completeness = profile?.completenessScore || 35;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Role Quick Switcher */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs text-slate-500 font-medium">Target Competency:</span>
          <select
            value={profile?.targetRole || 'Full-Stack Developer'}
            onChange={handleRoleChange}
            disabled={roleUpdating}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer disabled:opacity-50"
          >
            {AVAILABLE_ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Profile Completeness Pill */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-full px-3 py-1">
          <span className="text-[11px] text-slate-500 font-medium">Profile Score:</span>
          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700">{completeness}%</span>
        </div>

        {/* Evidence Engine status badge */}
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full px-3 py-1 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Principle:</span>
          <span className="font-semibold">Evidence First</span>
        </div>

        {/* User initials */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-semibold text-slate-800 block leading-tight">{user?.name || 'Aarav'}</span>
            <span className="text-[10px] text-slate-400 block leading-tight">Student • KIT</span>
          </div>
        </div>
      </div>
    </header>
  );
}
