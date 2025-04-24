// ui/src/components/common/LiveUpdateNotification.jsx
import React, { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const LiveUpdateNotification = ({ 
  message, 
  type = 'info', // 'info', 'success', 'warning', 'error'
  duration = 5000, 
  onClose,
  actionText = null,
  onAction = null 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  
  // Background and icon colors for each notification type
  const typeConfig = {
    info: {
      bgClass: 'bg-info/20 border-info/50',
      iconColor: 'text-info',
      icon: InformationCircleIcon
    },
    success: {
      bgClass: 'bg-success/20 border-success/50',
      iconColor: 'text-success',
      icon: CheckIcon
    },
    warning: {
      bgClass: 'bg-warning/20 border-warning/50',
      iconColor: 'text-warning',
      icon: ExclamationTriangleIcon
    },
    error: {
      bgClass: 'bg-danger/20 border-danger/50',
      iconColor: 'text-danger',
      icon: ExclamationTriangleIcon
    }
  };
  
  const { bgClass, iconColor, icon: Icon } = typeConfig[type] || typeConfig.info;
  
  // Timer for notification auto-close
  useEffect(() => {
    if (!isVisible || isPaused) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    
    // Progress bar timer
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 1000) / 10);
        return newProgress > 0 ? newProgress : 0;
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose, isVisible, isPaused]);
  
  // Reset progress when paused state changes
  useEffect(() => {
    if (!isPaused) {
      setProgress(100);
    }
  }, [isPaused]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg border ${bgClass} backdrop-blur-md shadow-lg max-w-md
                animate-slide-up transition-all duration-300 transform 
                hover:translate-y-[-2px] hover:shadow-xl`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg transition-all duration-100" style={{ width: `${progress}%` }}></div>
      
      <div className="flex items-start">
        <div className={`p-1.5 rounded-full ${bgClass} ${iconColor} mr-3`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm">{message}</p>
          
          {/* Optional action button */}
          {actionText && onAction && (
            <button 
              onClick={onAction}
              className={`mt-2 text-xs py-1 px-2 rounded ${
                type === 'info' ? 'bg-info/30 hover:bg-info/40' :
                type === 'success' ? 'bg-success/30 hover:bg-success/40' :
                type === 'warning' ? 'bg-warning/30 hover:bg-warning/40' :
                'bg-danger/30 hover:bg-danger/40'
              } transition-colors duration-200`}
            >
              {actionText}
            </button>
          )}
        </div>
        
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-3 p-1 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors duration-200"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LiveUpdateNotification;