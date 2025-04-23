// /gebral-Estate/ui/src/components/common/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  icon: Icon,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerContent,
  onClick,
  hoverable = false
}) => {
  const cardClasses = `
    glass-card overflow-hidden
    ${hoverable ? 'cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-lg' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className={`px-4 py-3 border-b border-white/10 ${headerClassName}`}>
          <div className="flex items-center">
            {Icon && <Icon className="w-5 h-5 mr-2 text-primary-light" />}
            <div>
              {title && <h3 className="text-base font-semibold">{title}</h3>}
              {subtitle && <p className="text-xs text-gray-light mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footerContent && (
        <div className="px-4 py-3 border-t border-white/10 bg-white/5">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;