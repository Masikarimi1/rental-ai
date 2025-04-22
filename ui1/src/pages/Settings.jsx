// /gebral-Estate/ui/src/pages/Settings.jsx
import React, { useState } from 'react';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import { 
  BellIcon, 
  UserCircleIcon, 
  ClockIcon,
  CogIcon, 
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pollingInterval, setPollingInterval] = useState('300000'); // 5 minutes in ms
  
  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-light mt-1">Configure your Gebral Estate experience</p>
      </div>
      
      <GlassCard>
        <div className="flex items-center mb-6">
          <UserCircleIcon className="w-6 h-6 text-primary-light mr-3" />
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                value="user@example.com"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                value="user123"
                readOnly
              />
            </div>
          </div>
          
          <div>
            <Button variant="outline" size="md">
              Change Password
            </Button>
          </div>
        </div>
      </GlassCard>
      
      <GlassCard>
        <div className="flex items-center mb-6">
          <BellIcon className="w-6 h-6 text-primary-light mr-3" />
          <h2 className="text-xl font-semibold">Notification Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-gray-light">Receive alerts for important updates</p>
            </div>
            <div>
              <div
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notificationsEnabled ? 'bg-primary' : 'bg-gray-dark'
                }`}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-light">Receive important alerts via email</p>
            </div>
            <div>
              <div
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailNotifications ? 'bg-primary' : 'bg-gray-dark'
                }`}
                onClick={() => setEmailNotifications(!emailNotifications)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      
      <GlassCard>
        <div className="flex items-center mb-6">
          <ClockIcon className="w-6 h-6 text-primary-light mr-3" />
          <h2 className="text-xl font-semibold">Data Polling Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-light mb-2">
              Data Refresh Interval
            </label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              value={pollingInterval}
              onChange={(e) => setPollingInterval(e.target.value)}
            >
              <option value="60000">1 minute</option>
              <option value="300000">5 minutes</option>
              <option value="600000">10 minutes</option>
              <option value="1800000">30 minutes</option>
              <option value="3600000">1 hour</option>
            </select>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-gray-light">
              This setting controls how frequently Gebral checks and updates data from external sources.
              More frequent updates provide more real-time data but may use more resources.
            </p>
          </div>
        </div>
      </GlassCard>
      
      <GlassCard>
        <div className="flex items-center mb-6">
          <CogIcon className="w-6 h-6 text-primary-light mr-3" />
          <h2 className="text-xl font-semibold">System Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-light">Use dark theme across the application</p>
            </div>
            <div>
              <Button variant="outline" size="sm" icon={EyeIcon}>
                Enable
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Automatic Data Backup</h3>
              <p className="text-sm text-gray-light">Backup your data to the cloud periodically</p>
            </div>
            <div>
              <Button variant="outline" size="sm" icon={ShieldCheckIcon}>
                Configure
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;