import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm font-medium px-4 py-2.2 rounded-lg gap-2',
    lg: 'text-base font-medium px-5 py-2.5 rounded-xl gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 active:bg-blue-800 disabled:bg-blue-300',
    navy: 'bg-[#102A43] hover:bg-[#243B53] text-white shadow-sm active:bg-[#0B1D30] disabled:bg-slate-300',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 active:bg-slate-300 disabled:bg-slate-50',
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 active:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm disabled:bg-rose-300',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm disabled:bg-emerald-300',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
