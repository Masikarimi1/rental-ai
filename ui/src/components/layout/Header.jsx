// /gebral-Estate/ui/src/components/layout/Header.jsx
import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '@hooks/useNotifications';
import DataRefreshIndicator from '../common/DataRefreshIndicator';

const Header = () => {
  const { unreadCount, toggleNotificationCenter } = useNotifications();

  return (
    <header className="glass sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Rental Pulse</h2>
          <div className="ml-4">
            <DataRefreshIndicator />
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