// ui/src/components/layout/AppLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useData } from '@hooks/useData';
import { useNotifications } from '@hooks/useNotifications';
import LiveUpdateNotification from '../common/LiveUpdateNotification';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const AppLayout = () => {
  const { startDataPolling, stopDataPolling, isPollingActive, refreshData } = useData();
  const { addNotification } = useNotifications();
  const [showPollingStatus, setShowPollingStatus] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile based on screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Start data polling when component mounts
  useEffect(() => {
    console.log('Starting data polling at AppLayout mount...');
    // Default: Poll for new data every 5 minutes (300000ms)
    // On mobile, poll less frequently to save battery/data
    const pollingInterval = isMobile ? 600000 : 300000; // 10 min on mobile, 5 min on desktop
    startDataPolling(pollingInterval);
    
    // Initial data fetch
    refreshData().then(() => {
      addNotification({
        title: 'Data Pipeline Active',
        message: 'Real-time data pipeline is now active. Updates will occur periodically.',
        type: 'info'
      });
      
      // Update first load state
      setIsFirstLoad(false);
    });
    
    // Display polling status briefly
    setShowPollingStatus(true);
    const timer = setTimeout(() => {
      setShowPollingStatus(false);
    }, 5000);
    
    // Cleanup on unmount
    return () => {
      console.log('Stopping data polling at AppLayout unmount...');
      stopDataPolling();
      clearTimeout(timer);
    };
  }, [startDataPolling, stopDataPolling, refreshData, addNotification, isMobile]);

  return (
    <div className="app-container gradient-bg min-h-screen min-h-[calc(var(--vh,1vh)*100)]">
      {showPollingStatus && (
        <LiveUpdateNotification
          message="Real-time data pipeline activated. Updates will occur periodically."
          type="info"
          duration={5000}
          onClose={() => setShowPollingStatus(false)}
          actionText="Refresh Now"
          onAction={refreshData}
        />
      )}
      
      <div className="flex h-full min-h-screen min-h-[calc(var(--vh,1vh)*100)]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="content-container relative">
            {/* Initial loading screen */}
            {isFirstLoad && (
              <div className="absolute inset-0 flex items-center justify-center z-50 bg-dark-deeper/80 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin mb-4"></div>
                  <h3 className="text-lg md:text-xl text-primary-light mb-2">Loading Gebral Estate</h3>
                  <p className="text-gray-light text-xs md:text-sm">Connecting to data pipeline...</p>
                </div>
              </div>
            )}
            
            {!isPollingActive && (
              <div className="bg-warning/90 text-white text-xs md:text-sm py-1 px-3 rounded-md mb-4 flex items-center shadow-md animate-slide-in">
                <div className="p-1 rounded-full bg-warning/30 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">Data polling inactive. Information may not be updated.</div>
                <button 
                  className="ml-2 text-xs bg-white/20 hover:bg-white/30 py-1 px-2 rounded-full 
                            transition-colors duration-200 flex items-center"
                  onClick={() => startDataPolling(isMobile ? 600000 : 300000)}
                >
                  <ArrowPathIcon className="w-3 h-3 mr-1" />
                  Restart
                </button>
              </div>
            )}
            
            <div className="stagger-appear">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;