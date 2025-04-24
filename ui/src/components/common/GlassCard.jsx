// ui/src/components/common/GlassCard.jsx
import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  hoverable = false, 
  onClick = null,
  variant = 'default', // 'default', 'dark', 'light'
  isInteractive = false,
  isLoading = false,
  headerContent = null,
  footerContent = null,
  animateEntry = false
}) => {
  const baseClasses = 'glass-card p-4 rounded-lg relative overflow-hidden';
  
  const variantClasses = {
    default: '',
    dark: 'glass-dark',
    light: 'bg-white/10'
  };
  
  const hoverClasses = hoverable ? 'transform transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '';
  const interactiveClass = isInteractive ? 'interactive' : '';
  const animateEntryClass = animateEntry ? 'animate-fade-in' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${interactiveClass} ${animateEntryClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Optional loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-deeper/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
            <span className="text-sm text-gray-light">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Optional header content */}
      {headerContent && (
        <div className="px-1 py-2 mb-3 border-b border-white/10">
          {headerContent}
        </div>
      )}
      
      {/* Main content */}
      <div className={`${headerContent || footerContent ? 'px-1' : ''}`}>
        {children}
      </div>
      
      {/* Optional footer content */}
      {footerContent && (
        <div className="px-1 py-2 mt-3 border-t border-white/10">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default GlassCard;