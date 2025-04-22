// /gebral-Estate/ui/src/components/dashboard/RentalPulseDashboard.jsx
import React, { useState } from 'react';
import VacancyStats from './VacancyStats';
import TrendChart from './TrendChart';
import ActionRecommendations from './ActionRecommendations';
import LiveLogs from './LiveLogs';
import { usePersona } from '@hooks/usePersona';
import Button from '../common/Button';
import { 
  ArrowPathIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import GlassCard from '../common/GlassCard';

const RentalPulseDashboard = () => {
  const { currentPersona } = usePersona();
  const [isAutonomous, setIsAutonomous] = useState(false);
  const [actionApplied, setActionApplied] = useState(false);
  
  const toggleAutonomous = () => {
    setIsAutonomous(!isAutonomous);
  };
  
  const handleApplyAction = () => {
    setActionApplied(true);
    // Reset after 3 seconds for demo purposes
    setTimeout(() => setActionApplied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rental Pulse Dashboard</h1>
          <p className="text-gray-light mt-1">
            Welcome back, {currentPersona?.name} - Here's your {currentPersona?.role} overview
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="text-sm mr-3 text-gray-light">Run autonomous</span>
            <div
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAutonomous ? 'bg-primary' : 'bg-gray-dark'
              }`}
              onClick={toggleAutonomous}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAutonomous ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VacancyStats title="Vacancy Rate" value="12%" />
        <VacancyStats title="Average Trend" value="-6%" trendDirection="down" />
        <VacancyStats title="Days Listing Age" value="18" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Performance Overview</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={ArrowPathIcon}
                >
                  Refresh
                </Button>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={MagnifyingGlassIcon}
                >
                  Filter
                </Button>
              </div>
            </div>
            
            <TrendChart />
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
                <span className="text-gray-light mr-4">Occupancy Rate</span>
                
                <span className="inline-block w-3 h-3 rounded-full bg-warning mr-2"></span>
                <span className="text-gray-light mr-4">Rental Price</span>
                
                <span className="inline-block w-3 h-3 rounded-full bg-success mr-2"></span>
                <span className="text-gray-light">Market Average</span>
              </div>
            </div>
          </GlassCard>
          
          <div className="mt-6">
            <GlassCard className="border-l-4 border-warning">
              <div className="flex items-start">
                <div className="p-2 bg-warning/20 rounded-full mr-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-medium">2BRs in Al Barsha showing extended vacancy</h3>
                  <p className="text-sm text-gray-light mt-1">
                    Two-bedroom apartments in Al Barsha have been vacant for an average of 28 days, which is 40% longer than market average.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <LiveLogs />
          
          <ActionRecommendations 
            onApply={handleApplyAction} 
            actionApplied={actionApplied} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button 
          variant="ghost" 
          className="p-3 h-auto text-left justify-start border border-white/10"
          icon={MagnifyingGlassIcon}
          fullWidth
        >
          <div>
            <span className="block font-medium">Monitor Market</span>
            <span className="text-xs text-gray-light">Track changes in rental listings</span>
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="p-3 h-auto text-left justify-start border border-white/10"
          icon={ChartBarIcon}
          fullWidth
        >
          <div>
            <span className="block font-medium">Analyze Trends</span>
            <span className="text-xs text-gray-light">Deep dive into market patterns</span>
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="p-3 h-auto text-left justify-start border border-white/10"
          icon={ChatBubbleLeftIcon}
          fullWidth
        >
          <div>
            <span className="block font-medium">Recommend Strategy</span>
            <span className="text-xs text-gray-light">Get AI-powered suggestions</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

import { ChatBubbleLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default RentalPulseDashboard;
