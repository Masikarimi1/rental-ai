// /gebral-Estate/ui/src/components/common/Badge.jsx
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', // 'default', 'success', 'warning', 'danger', 'info'
  size = 'md', // 'sm', 'md', 'lg'
  rounded = 'md', // 'sm', 'md', 'lg', 'full'
  className = '',
  icon: Icon
}) => {
  const variantClasses = {
    default: 'bg-gray-dark/30 text-gray-light',
    primary: 'bg-primary/20 text-primary-light',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
    info: 'bg-info/20 text-info',
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

  return (
    <span className={`inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 mr-1" />}
      {children}
    </span>
  );
};

export default Badge;
