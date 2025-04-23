// /gebral-Estate/ui/src/components/common/LiveUpdateNotification.jsx
import React, { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const LiveUpdateNotification = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const bgColors = {
    info: 'bg-info/20 border-info/50',
    success: 'bg-success/20 border-success/50',
    warning: 'bg-warning/20 border-warning/50',
    error: 'bg-danger/20 border-danger/50'
  };
  
  const iconColors = {
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-danger'
  };
  
  const Icon = type === 'success' ? CheckIcon : null;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg border ${bgColors[type]} backdrop-blur-md animate-slide-up shadow-lg max-w-md`}>
      <div className="flex items-start">
        {Icon && <Icon className={`w-5 h-5 mt-0.5 mr-3 ${iconColors[type]}`} />}
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-3 p-1 rounded-full hover:bg-white/10"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LiveUpdateNotification;