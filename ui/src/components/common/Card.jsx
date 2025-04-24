// ui/src/components/common/Card.jsx
import React, { useState } from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  icon: Icon,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  headerContent = null,
  footerContent = null,
  onClick = null,
  hoverable = false,
  loading = false,
  collapsible = false,
  initiallyCollapsed = false,
  animateEntry = false,
  elevation = null, // 1-5 for different elevation levels
  glowOnHover = false,
  glowColor = 'primary'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);

  // Elevations classes
  const elevationClasses = {
    1: 'elevation-1',
    2: 'elevation-2',
    3: 'elevation-3',
    4: 'elevation-4',
    5: 'elevation-5'
  };

  // Glow classes
  const glowClasses = {
    primary: 'hover:glow-primary',
    success: 'hover:glow-success',
    warning: 'hover:glow-warning',
    danger: 'hover:glow-danger',
    info: 'hover:glow-info'
  };

  const cardClasses = `
    glass-card overflow-hidden relative
    ${hoverable ? 'cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-lg' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${elevation ? elevationClasses[elevation] : ''}
    ${glowOnHover ? glowClasses[glowColor] : ''}
    ${animateEntry ? 'animate-fade-in' : ''}
    ${className}
  `;

  const handleToggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleCardClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-dark-deeper/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
            <span className="text-sm text-gray-light">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Card header */}
      {(title || subtitle || headerContent) && (
        <div className={`px-4 py-3 border-b border-white/10 ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {Icon && <Icon className="w-5 h-5 mr-2 text-primary-light" />}
              <div>
                {title && (
                  <h3 className="text-base font-semibold">{title}</h3>
                )}
                {subtitle && (
                  <p className="text-xs text-gray-light mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              {headerContent}
              
              {collapsible && (
                <button 
                  onClick={handleToggleCollapse}
                  className="ml-2 p-1 text-gray-light hover:text-white rounded-full 
                            hover:bg-white/10 transition-colors duration-200"
                  aria-label={isCollapsed ? "Expand" : "Collapse"}
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Card body */}
      <div 
        className={`
          p-4 
          ${bodyClassName} 
          ${isCollapsed ? 'h-0 p-0 overflow-hidden' : ''} 
          transition-all duration-300
        `}
      >
        {children}
      </div>
      
      {/* Card footer */}
      {footerContent && !isCollapsed && (
        <div className="px-4 py-3 border-t border-white/10 bg-white/5">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;