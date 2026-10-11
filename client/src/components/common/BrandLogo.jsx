import React from 'react';
import './BrandLogo.css';

/**
 * BrandLogo provides unified rendering of the official AI Career Co-Pilot vector brand assets:
 * - variant="icon": official vector emblem / app icon
 * - variant="full": full horizontal vector logo with emblem + stylized typography
 * - variant="badge": icon badge + text
 */
export default function BrandLogo({
  variant = 'icon',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl' | number
  showText = false,
  subtitle = '',
  className = '',
  onClick,
  style = {}
}) {
  const sizeMap = {
    sm: { icon: 26, height: 28 },
    md: { icon: 34, height: 36 },
    lg: { icon: 42, height: 46 },
    xl: { icon: 54, height: 58 }
  };

  const currentSize = typeof size === 'number' 
    ? { icon: size, height: size } 
    : (sizeMap[size] || sizeMap.md);

  if (variant === 'full') {
    return (
      <div 
        className={`brand-logo brand-logo--full ${className}`} 
        onClick={onClick}
        style={style}
      >
        <img
          src="/logo-dark.svg"
          alt="AI Career Co-Pilot"
          className="brand-logo__full-img"
          style={{ height: currentSize.height, width: 'auto' }}
        />
        {subtitle && (
          <span className="brand-logo__subtitle">{subtitle}</span>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`brand-logo brand-logo--${variant} ${className}`} 
      onClick={onClick}
      style={style}
    >
      <div 
        className="brand-logo__icon-box"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <img
          src="/app-icon.svg"
          alt="AI Career Co-Pilot"
          className="brand-logo__icon-img"
        />
      </div>

      {showText && (
        <div className="brand-logo__text-group">
          <span className="brand-logo__title">AI Career Co-Pilot</span>
          {subtitle && (
            <span className="brand-logo__subtitle">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
