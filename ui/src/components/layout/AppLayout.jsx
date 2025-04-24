// /gebral-Estate/ui/src/components/layout/AppLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useData } from '@hooks/useData';
import { useNotifications } from '@hooks/useNotifications';
import LiveUpdateNotification from '../common/LiveUpdateNotification';

const AppLayout = () => {
  const { startDataPolling, stopDataPolling, isPollingActive, refreshData } = useData();
  const { addNotification } = useNotifications();
  const [showPollingStatus, setShowPollingStatus] = useState(false);
  
  // Start data polling when component mounts
  useEffect(() => {
    console.log('Starting data polling at AppLayout mount...');
    // Default: Poll for new data every 5 minutes (300000ms)
    startDataPolling(300000);
    
    // Initial data fetch
    refreshData().then(() => {
      addNotification({
        title: 'Data Pipeline Active',
        message: 'Real-time data pipeline is now active. Updates will occur every 5 minutes.',
        type: 'info'
      });
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
  }, [startDataPolling, stopDataPolling, refreshData, addNotification]);

  return (
    <div className="app-container gradient-bg min-h-screen">
      {showPollingStatus && (
        <LiveUpdateNotification
          message="Real-time data pipeline activated. Updates will occur every 5 minutes."
          type="info"
          duration={5000}
          onClose={() => setShowPollingStatus(false)}
        />
      )}
      
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="content-container animate-fade-in relative">
            {!isPollingActive && (
              <div className="bg-warning/90 text-white text-sm py-1 px-3 rounded-md mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Data polling is currently inactive. Some information may not be updated.
                <button 
                  className="ml-2 text-xs bg-white/20 hover:bg-white/30 py-1 px-2 rounded-full"
                  onClick={() => startDataPolling(300000)}
                >
                  Restart
                </button>
              </div>
            )}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;