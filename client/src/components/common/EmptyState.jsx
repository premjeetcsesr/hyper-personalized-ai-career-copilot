import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Button from './Button';
import './EmptyState.css';

export default function EmptyState({
  icon: Icon = HelpCircle,
  title = 'No records found',
  description = 'There is currently no activity recorded for this section.',
  actionLabel,
  onAction,
  actionLink,
  className = ''
}) {
  return (
    <div className={`empty-state ${className}`.trim()}>
      <div className="empty-state__icon-wrap">
        <Icon className="empty-state__icon" aria-hidden="true" />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      
      {actionLabel && (onAction || actionLink) && (
        <div className="empty-state__action">
          {actionLink ? (
            <a href={actionLink}>
              <Button size="sm" variant="primary" icon={ArrowRight}>
                {actionLabel}
              </Button>
            </a>
          ) : (
            <Button size="sm" variant="primary" onClick={onAction} icon={ArrowRight}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
