import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  FileText,
  Github,
  GitPullRequestDraft,
  Compass,
  Target,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, profile, logout } = useAuth();

  const navigationItems = [
    { name: 'Overview', path: '/app', icon: LayoutDashboard },
    { name: 'My Career Profile', path: '/app/profile', icon: UserCheck },
    { name: 'Resume Analyzer', path: '/app/resume', icon: FileText },
    { name: 'GitHub Intelligence', path: '/app/github', icon: Github },
    { name: 'Skill Gap Analysis', path: '/app/skills', icon: GitPullRequestDraft },
    { name: 'Personalized Roadmap', path: '/app/roadmap', icon: Compass },
    { name: 'Project Missions', path: '/app/missions', icon: Target },
    { name: 'AI Mock Interview', path: '/app/interview', icon: Sparkles },
    { name: 'Career Readiness', path: '/app/readiness', icon: BarChart3 },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1D30] text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 font-bold text-lg">
              🧭
            </div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-tight leading-tight">
                Career Co-Pilot
              </h1>
              <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold block mt-0.5">
                Technova001 • KIT
              </span>
            </div>
          </div>

          {/* Target Role Tag */}
          <div className="mt-4 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Target Role</span>
              <span className="text-xs font-semibold text-slate-100 truncate block">
                {profile?.targetRole || 'Full-Stack Developer'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/app'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
                {item.name === 'AI Mock Interview' && (
                  <span className="ml-auto bg-blue-500/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border border-blue-400/20">
                    AI
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Institution / Student footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-semibold text-white truncate">{user?.name || 'Aarav Sharma'}</div>
              <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-blue-400 shrink-0" />
                <span>Kanpur Inst. of Tech</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 py-1.5 rounded-lg transition-colors border border-transparent hover:border-rose-900/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
