// ui/src/components/common/Button.jsx
import React, { useState } from 'react';

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
  type = 'button',
  activeState = false,
  animationEffect = 'ripple' // 'ripple', 'scale', 'none'
}) => {
  const [isRippling, setIsRippling] = useState(false);
  const [rippleX, setRippleX] = useState(0);
  const [rippleY, setRippleY] = useState(0);

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white active:bg-primary-dark/90',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white active:bg-secondary-dark/90',
    success: 'bg-success hover:bg-success/90 text-white active:bg-success/80',
    danger: 'bg-danger hover:bg-danger/90 text-white active:bg-danger/80',
    warning: 'bg-warning hover:bg-warning/90 text-white active:bg-warning/80',
    info: 'bg-info hover:bg-info/90 text-white active:bg-info/80',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-light hover:text-white active:bg-white/15',
    outline: 'bg-transparent border border-gray-light hover:border-white text-gray-light hover:text-white active:bg-white/5',
    glass: 'glass text-white hover:bg-white/10 active:bg-white/15',
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
  const activeClass = activeState ? 'ring-2 ring-primary ring-opacity-50' : '';
  
  // Animation classes
  const animationClass = animationEffect === 'scale' ? 'transform transition-transform active:scale-95' : '';
  
  const handleRipple = (e) => {
    if (animationEffect !== 'ripple' || disabled || isLoading) return;
    
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    setRippleX(e.clientX - buttonRect.left);
    setRippleY(e.clientY - buttonRect.top);
    
    setIsRippling(true);
    
    setTimeout(() => {
      setIsRippling(false);
    }, 600);
  };
  
  const handleClick = (e) => {
    handleRipple(e);
    if (onClick && !disabled && !isLoading) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden inline-flex items-center justify-center font-medium transition-colors duration-200
        focus:outline-none ${activeClass}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${widthClass}
        ${disabledClass}
        ${animationClass}
        ${className}
      `}
      onClick={handleClick}
    >
      {isRippling && animationEffect === 'ripple' && (
        <span 
          className="absolute bg-white/20 rounded-full animate-ripple" 
          style={{
            left: rippleX,
            top: rippleY,
            width: '200%',
            height: '200%',
            marginLeft: '-100%',
            marginTop: '-100%',
          }}
        />
      )}
      
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