// ui/src/components/common/DataRefreshIndicator.jsx
import React, { useState, useEffect } from 'react';
import { useData } from '@hooks/useData';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const DataRefreshIndicator = () => {
  const { lastUpdated, refreshData, isLoading } = useData();
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes
  const [showPulse, setShowPulse] = useState(false);
  const [hasRecentUpdate, setHasRecentUpdate] = useState(false);
  
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
      setHasRecentUpdate(true);
      
      const pulseTimer = setTimeout(() => setShowPulse(false), 2000);
      const recentUpdateTimer = setTimeout(() => setHasRecentUpdate(false), 5000);
      
      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(recentUpdateTimer);
      };
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

  // Progress calculation for the indicator
  const progress = Math.max(0, (countdown / 300) * 100);

  return (
    <div className="flex items-center text-sm">
      <div className={`mr-3 flex items-center transition-colors duration-300 ${
        showPulse ? 'text-primary-light' : isLoading ? 'text-warning' : ''
      }`}>
        <ArrowPathIcon 
          className={`w-4 h-4 mr-1.5 transition-all ${
            isLoading ? 'animate-spin text-warning' : 
            showPulse ? 'animate-pulse text-primary-light' : 'text-gray-light'
          }`} 
        />
        <span className={`transition-colors duration-300 ${hasRecentUpdate ? 'text-primary-light' : ''}`}>
          {isLoading ? 'Updating...' : `Next update in ${formatTime(countdown)}`}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="relative w-32 bg-white/5 h-1.5 rounded-full overflow-hidden mr-3 hidden md:block">
        <div 
          className="absolute top-0 left-0 h-full bg-primary/70 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <button 
        onClick={refreshData} 
        disabled={isLoading}
        className="text-xs px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 active:bg-white/15
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                  focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50
                  transform active:scale-95"
      >
        Refresh Now
      </button>
    </div>
  );
};

export default DataRefreshIndicator;