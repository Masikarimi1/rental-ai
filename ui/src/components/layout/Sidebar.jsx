// /gebral-Estate/ui/src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  CogIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import PersonaSelector from './PersonaSelector';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Market Intelligence', path: '/market-intelligence', icon: ChartBarIcon },
    { name: 'Property Analysis', path: '/property-analysis', icon: BuildingOfficeIcon },
    { name: 'Strategy Chat', path: '/strategy-chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
  ];
  
  return (
    <aside className="glass-sidebar w-64 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span className="text-primary-light">Gebral</span> Estate
          </h1>
        </div>
        
        <PersonaSelector />
        
        <nav className="mt-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/20 text-primary-light' 
                        : 'text-gray-light hover:bg-white/10'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="px-4 py-6 mt-auto">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-gray-light mb-2">Dubai AI Week Hackathon</p>
          <p className="text-sm font-medium">Agentic AI for Real Estate</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

