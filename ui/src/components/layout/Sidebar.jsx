// ui/src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  CogIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import PersonaSelector from './PersonaSelector';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Market Intelligence', path: '/market-intelligence', icon: ChartBarIcon },
    { name: 'Property Analysis', path: '/property-analysis', icon: BuildingOfficeIcon },
    { name: 'Strategy Chat', path: '/strategy-chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
  ];
  
  return (
    <aside 
      className={`glass-sidebar h-screen sticky top-0 overflow-y-auto transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className={`flex items-center justify-${collapsed ? 'center' : 'between'} mb-8 mt-4`}>
            {!collapsed && (
              <h1 className="text-2xl font-bold text-white tracking-tight">
                <span className="text-primary-light">Gebral</span> Estate
              </h1>
            )}
            
            {collapsed && (
              <div className="text-2xl font-bold text-primary-light">G</div>
            )}
            
            <button 
              className="ml-auto p-1 text-gray-light hover:text-white rounded-full hover:bg-white/10 
                        transition-colors duration-200 focus:outline-none"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? 
                <ChevronRightIcon className="w-4 h-4" /> : 
                <ChevronLeftIcon className="w-4 h-4" />
              }
            </button>
          </div>
          
          {!collapsed && <PersonaSelector />}
          
          <nav className="mt-8">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/20 text-primary-light' 
                          : 'text-gray-light hover:bg-white/10 hover:text-white'
                      }`
                    }
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className={`px-4 py-6 mt-auto ${collapsed ? 'hidden' : ''}`}>
          <div className="glass-card p-4 text-center">
            <p className="text-xs text-gray-light mb-2">Dubai AI Week Hackathon</p>
            <p className="text-sm font-medium">Agentic AI for Real Estate</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;