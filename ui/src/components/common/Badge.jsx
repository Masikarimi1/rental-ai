// ui/src/components/common/Badge.jsx
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', // 'default', 'success', 'warning', 'danger', 'info', 'primary'
  size = 'md', // 'sm', 'md', 'lg'
  rounded = 'md', // 'sm', 'md', 'lg', 'full'
  className = '',
  icon: Icon,
  onClick = null,
  isInteractive = false,
  pulse = false,
  glow = false
}) => {
  const variantClasses = {
    default: 'bg-gray-dark/40 text-gray-light border border-gray-dark/60',
    primary: 'bg-primary/20 text-primary-light border border-primary/30',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    danger: 'bg-danger/20 text-danger border border-danger/30',
    info: 'bg-info/20 text-info border border-info/30',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  const interactiveClasses = isInteractive || onClick 
    ? 'cursor-pointer transition-transform hover:scale-105 active:scale-95 hover:shadow-md'
    : '';
  
  const pulseClass = pulse ? 'animate-pulse' : '';
  const glowClass = glow ? `shadow-${variant}-glow` : '';

  return (
    <span 
      onClick={onClick}
      className={`
        inline-flex items-center font-medium
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${roundedClasses[rounded]} 
        ${interactiveClasses}
        ${pulseClass}
        ${glowClass}
        transition-all duration-200
        ${className}
      `}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {Icon && <Icon className={`w-3.5 h-3.5 mr-1 ${pulse ? 'animate-pulse' : ''}`} />}
      {children}
      
      {/* Pulsing glow effect when badge has pulse={true} */}
      {pulse && variant !== 'default' && (
        <span className={`absolute inset-0 rounded-${rounded} bg-${variant === 'primary' ? 'primary' : variant}/10 animate-ping opacity-75`}></span>
      )}
    </span>
  );
};

export default Badge;