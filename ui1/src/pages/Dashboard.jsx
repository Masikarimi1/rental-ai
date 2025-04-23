// /gebral-Estate/ui/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { usePersona } from '@hooks/usePersona';
import { useData } from '@hooks/useData';
import InvestorDashboard from './personas/InvestorDashboard';
import ManagerDashboard from './personas/ManagerDashboard';
import DeveloperDashboard from './personas/DeveloperDashboard';
import LiveUpdateNotification from '../components/common/LiveUpdateNotification';

const Dashboard = () => {
  const { currentPersona } = usePersona();
  const { lastUpdated, isLoading } = useData();
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [previousUpdate, setPreviousUpdate] = useState(null);
  
  // Show notification when data is updated
  useEffect(() => {
    if (previousUpdate && lastUpdated && lastUpdated > previousUpdate) {
      setShowUpdateNotification(true);
      
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowUpdateNotification(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
    
    // Update previous timestamp
    if (lastUpdated) {
      setPreviousUpdate(lastUpdated);
    }
  }, [lastUpdated, previousUpdate]);
  
  // Render different dashboard based on persona
  const renderPersonaDashboard = () => {
    switch (currentPersona.id) {
      case 'investor':
        return <InvestorDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'developer':
        return <DeveloperDashboard />;
      default:
        return <ManagerDashboard />; // Default to manager dashboard
    }
  };

  return (
    <>
      {showUpdateNotification && (
        <LiveUpdateNotification
          message={`Dashboard data has been updated with the latest information for ${currentPersona.name} (${currentPersona.role}).`}
          type="success"
          duration={5000}
          onClose={() => setShowUpdateNotification(false)}
        />
      )}
      
      {isLoading && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary/90 text-white text-sm py-1 px-3 rounded-full flex items-center backdrop-blur-lg shadow-lg">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
          <span>Updating dashboard data...</span>
        </div>
      )}
      
      {renderPersonaDashboard()}
    </>
  );
};

export default Dashboard;