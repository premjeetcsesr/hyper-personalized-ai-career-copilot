import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DemoBanner from '../common/DemoBanner';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Hackathon banner pinned at the very top */}
      <DemoBanner />

      <div className="flex-1 flex">
        {/* Professional Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <Navbar setMobileOpen={setMobileOpen} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          <footer className="py-4 px-6 border-t border-slate-200/80 text-center text-xs text-slate-500 bg-white/50">
            <span>Hyper-Personalized AI Career Co-Pilot • Developed by </span>
            <span className="font-semibold text-slate-700">Team Technovoo1</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
