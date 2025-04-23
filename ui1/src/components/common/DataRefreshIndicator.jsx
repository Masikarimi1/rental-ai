// /gebral-Estate/ui/src/components/common/DataRefreshIndicator.jsx
import React, { useState, useEffect } from 'react';
import { useData } from '@hooks/useData';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const DataRefreshIndicator = () => {
  const { lastUpdated, refreshData, isLoading } = useData();
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes
  const [showPulse, setShowPulse] = useState(false);
  
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Reset countdown when data is refreshed
  useEffect(() => {
    setCountdown(300);
    
    // Show pulse animation when data refreshes
    if (lastUpdated) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);
  
  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Auto-refresh when countdown reaches zero
  useEffect(() => {
    if (countdown === 0 && !isLoading) {
      refreshData();
    }
  }, [countdown, refreshData, isLoading]);

  return (
    <div className="flex items-center text-sm text-gray-light">
      <div className={`mr-2 flex items-center ${showPulse ? 'text-primary-light' : ''}`}>
        <ArrowPathIcon 
          className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''} ${showPulse ? 'animate-pulse' : ''}`} 
        />
        <span>
          {isLoading ? 'Updating...' : `Next update in ${formatTime(countdown)}`}
        </span>
      </div>
      
      <button 
        onClick={refreshData} 
        disabled={isLoading}
        className="text-xs px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        Refresh Now
      </button>
    </div>
  );
};

export default DataRefreshIndicator;