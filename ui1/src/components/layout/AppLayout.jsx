// /gebral-Estate/ui/src/components/layout/AppLayout.jsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useData } from '@hooks/useData';

const AppLayout = () => {
  const { startDataPolling, stopDataPolling } = useData();
  
  // Start data polling when component mounts
  useEffect(() => {
    // Poll for new data every 5 minutes (300000ms)
    startDataPolling(300000);
    
    // Cleanup on unmount
    return () => {
      stopDataPolling();
    };
  }, [startDataPolling, stopDataPolling]);

  return (
    <div className="app-container gradient-bg min-h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="content-container animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;