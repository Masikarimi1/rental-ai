// /gebral-Estate/ui/src/components/common/Stat.jsx
import React from 'react';

const Stat = ({ 
  value, 
  label, 
  icon: Icon,
  trend = null, // Can be a number indicating percentage change
  trendDirection = null, // 'up' or 'down'
  size = 'md', // 'sm', 'md', 'lg'
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };
  
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const getTrendColor = () => {
    if (!trendDirection) return 'text-gray-light';
    return trendDirection === 'up' ? 'text-success' : 'text-danger';
  };
  
  const getTrendIcon = () => {
    if (!trendDirection) return null;
    return trendDirection === 'up' ? '↑' : '↓';
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center mb-1">
        {Icon && <Icon className="w-5 h-5 mr-2 text-gray-light" aria-hidden="true" />}
        <span className={`font-medium ${labelSizeClasses[size]} text-gray-light`}>{label}</span>
      </div>
      <div className="flex items-end">
        <span className={`font-bold ${sizeClasses[size]}`}>{value}</span>
        {trend !== null && (
          <span className={`ml-2 text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Stat;
