import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'blue',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`progress-bar-wrap ${className}`.trim()}>
      {(label || showValue) && (
        <div className="progress-bar-wrap__label-row">
          {label && <span>{label}</span>}
          {showValue && <span className="progress-bar-wrap__value">{percentage}%</span>}
        </div>
      )}
      <div className={`progress-bar-track progress-bar-track--${size}`}>
        <div
          className={`progress-bar-fill progress-bar-fill--${color}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
