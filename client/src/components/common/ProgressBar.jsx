import React from 'react';

export default function ProgressBar({ value = 0, max = 100, label, showValue = true, size = 'md', color = 'blue', className = '' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorGradients = {
    blue: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-500',
    rose: 'bg-gradient-to-r from-rose-500 to-pink-600',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showValue && <span className="font-semibold text-slate-800">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorGradients[color] || colorGradients.blue}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
