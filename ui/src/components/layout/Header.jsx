// ui/src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '@hooks/useNotifications';
import DataRefreshIndicator from '../common/DataRefreshIndicator';

const Header = () => {
  const { unreadCount, toggleNotificationCenter } = useNotifications();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to enhance the header appearance when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`glass-header sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'shadow-md bg-dark-deeper/85' : ''
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Rental Pulse</h2>
          <div className="ml-4">
            <DataRefreshIndicator />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 text-gray-light hover:text-white rounded-full hover:bg-white/10 transition-all duration-200
                       active:bg-white/15 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            onClick={toggleNotificationCenter}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
          >
            <BellIcon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full
                               animate-pulse-subtle transform transition-transform group-hover:scale-110">
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