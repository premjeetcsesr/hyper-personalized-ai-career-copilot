import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, HelpCircle, Tag, AlertTriangle } from 'lucide-react';
import './Badge.css';

export default function Badge({ children, variant = 'default', size = 'md', icon: CustomIcon, className = '' }) {
  const defaultIcons = {
    Verified: ShieldCheck,
    verified: ShieldCheck,
    Demonstrated: CheckCircle2,
    Probable: Clock,
    Claimed: Tag,
    Unknown: HelpCircle,
    High: AlertTriangle,
    completed: CheckCircle2,
    in_progress: Clock
  };

  const IconComponent = CustomIcon !== undefined ? CustomIcon : defaultIcons[variant];
  const sizeClass = `status-badge--${size}`;
  const variantClass = `status-badge--${variant}`;

  return (
    <span className={`status-badge ${sizeClass} ${variantClass} ${className}`.trim()}>
      {IconComponent && <IconComponent className="status-badge__icon" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
