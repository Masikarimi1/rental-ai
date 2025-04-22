// /gebral-Estate/ui/src/components/common/GlassCard.jsx
import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  hoverable = false, 
  onClick = null,
  variant = 'default' // 'default', 'dark', 'light'
}) => {
  const baseClasses = 'glass-card p-4 rounded-lg';
  
  const variantClasses = {
    default: '',
    dark: 'glass-dark',
    light: 'bg-white/10'
  };
  
  const hoverClasses = hoverable ? 'transform transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
