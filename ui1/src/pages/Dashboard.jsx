// /gebral-Estate/ui/src/pages/Dashboard.jsx
import React, { useState } from 'react';
import RentalPulseDashboard from '../components/dashboard/RentalPulseDashboard';
import { usePersona } from '@hooks/usePersona';
import InvestorDashboard from './personas/InvestorDashboard';
import ManagerDashboard from './personas/ManagerDashboard';
import DeveloperDashboard from './personas/DeveloperDashboard';

const Dashboard = () => {
  const { currentPersona } = usePersona();
  
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
        return <RentalPulseDashboard />;
    }
  };

  return renderPersonaDashboard();
};

export default Dashboard;
