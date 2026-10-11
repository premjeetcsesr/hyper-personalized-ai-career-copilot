import React from 'react';
import './Card.css';

export default function Card({
  children,
  title,
  subtitle,
  action,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  hoverEffect = false
}) {
  const hoverClass = hoverEffect ? 'app-card--hover' : '';

  return (
    <div className={`app-card ${hoverClass} ${className}`.trim()}>
      {(title || subtitle || action) && (
        <div className={`app-card__header ${headerClassName}`.trim()}>
          <div>
            {title && <h3 className="app-card__title">{title}</h3>}
            {subtitle && <p className="app-card__subtitle">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`app-card__body ${bodyClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
