// /gebral-Estate/ui/src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  rounded = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white',
    success: 'bg-success hover:bg-success/90 text-white',
    danger: 'bg-danger hover:bg-danger/90 text-white',
    warning: 'bg-warning hover:bg-warning/90 text-white',
    info: 'bg-info hover:bg-info/90 text-white',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-light hover:text-white',
    outline: 'bg-transparent border border-gray-light hover:border-white text-gray-light hover:text-white',
    glass: 'glass text-white hover:bg-white/10',
  };
  
  const sizeClasses = {
    xs: 'text-xs py-1 px-2',
    sm: 'text-sm py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
    xl: 'text-lg py-3 px-6'
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      onClick={onClick}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className="w-5 h-5 mr-2 -ml-1" />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className="w-5 h-5 ml-2 -mr-1" />
      )}
    </button>
  );
};

export default Button;
