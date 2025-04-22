// /gebral-Estate/ui/src/components/layout/Header.jsx
import React from 'react';
import { BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useData } from '@hooks/useData';
import { useNotifications } from '@hooks/useNotifications';

const Header = () => {
  const { lastUpdated, refreshData, isLoading } = useData();
  const { unreadCount, toggleNotificationCenter } = useNotifications();
  
  const formattedTime = new Date(lastUpdated).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <header className="glass sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Rental Pulse</h2>
          <div className="ml-4 text-sm text-gray-light flex items-center">
            <span>Last updated: {formattedTime}</span>
            <button 
              onClick={refreshData} 
              className="ml-2 text-gray-light hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              disabled={isLoading}
            >
              <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 text-gray-light hover:text-white rounded-full hover:bg-white/10 transition-colors"
            onClick={toggleNotificationCenter}
          >
            <BellIcon className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
