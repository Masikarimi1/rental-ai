// /gebral-Estate/ui/src/components/common/Alert.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { 
  InformationCircleIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

const Alert = ({ 
  children, 
  title,
  variant = 'info', // 'info', 'success', 'warning', 'error'
  dismissible = false,
  onClose,
  className = ''
}) => {
  const variantClasses = {
    info: 'bg-info/10 text-info border-info/30',
    success: 'bg-success/10 text-success border-success/30',
    warning: 'bg-warning/10 text-warning border-warning/30',
    error: 'bg-danger/10 text-danger border-danger/30'
  };
  
  const variantIcon = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon
  };
  
  const Icon = variantIcon[variant];

  return (
    <div className={`
      rounded-lg border-l-4 p-4 flex items-start
      ${variantClasses[variant]}
      ${className}
    `}>
      <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
      
      <div className="flex-1">
        {title && <div className="font-medium">{title}</div>}
        <div className={title ? 'mt-1 text-sm opacity-90' : ''}>{children}</div>
      </div>
      
      {dismissible && (
        <button 
          type="button" 
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-white/10 focus:outline-none"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
