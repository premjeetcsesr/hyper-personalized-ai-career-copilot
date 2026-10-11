import React from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

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
  const sizeClass = `app-button--${size}`;
  const variantClass = `app-button--${variant}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`app-button ${sizeClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {loading ? (
        <Loader2 className="app-button__icon animate-spin" />
      ) : Icon ? (
        <Icon className="app-button__icon" />
      ) : null}
      {children}
    </button>
  );
}
