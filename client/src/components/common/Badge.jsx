import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-medium px-3 py-1.5'
  };

  const variantClasses = {
    // Evidence State Badges
    Verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm',
    Probable: 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm',
    Claimed: 'bg-amber-50 text-amber-700 border border-amber-200/80 shadow-sm',
    Unknown: 'bg-slate-100 text-slate-600 border border-slate-200',

    // Priority Badges
    High: 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold',
    Medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    Low: 'bg-slate-100 text-slate-600 border border-slate-200',

    // Status Badges
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    in_progress: 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse-subtle',
    pending: 'bg-slate-100 text-slate-600 border border-slate-200',
    available: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200',

    // Role / Generic
    primary: 'bg-blue-600 text-white',
    outline: 'border border-slate-300 text-slate-700 bg-white',
    default: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  const resolvedClass = variantClasses[variant] || variantClasses.default;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${resolvedClass} ${className}`}>
      {children}
    </span>
  );
}
