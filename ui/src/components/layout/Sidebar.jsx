// ui/src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  CogIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import PersonaSelector from './PersonaSelector';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Check if mobile based on screen width
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Market Intelligence', path: '/market-intelligence', icon: ChartBarIcon },
    { name: 'Property Analysis', path: '/property-analysis', icon: BuildingOfficeIcon },
    { name: 'Strategy Chat', path: '/strategy-chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
  ];
  
  // Mobile menu button - fixed position
  const mobileMenuButton = (
    <button
      className={`md:hidden fixed top-4 left-4 z-30 p-2 rounded-full 
                 ${mobileOpen ? 'bg-white/20' : 'bg-dark-deeper/80'} 
                 backdrop-blur-md shadow-md`}
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
    >
      {mobileOpen ? (
        <XMarkIcon className="w-6 h-6 text-white" />
      ) : (
        <Bars3Icon className="w-6 h-6 text-white" />
      )}
    </button>
  );
  
  // Determine sidebar classes based on state
  const sidebarClasses = `
    glass-sidebar h-screen overflow-y-auto transition-all duration-300
    ${collapsed ? 'w-16' : 'w-64'} 
    ${isMobile ? 'fixed top-0 left-0 z-20' : 'sticky top-0'} 
    ${isMobile && !mobileOpen ? '-left-20' : ''} 
    ${mobileOpen ? 'left-0' : ''}
  `;
  
  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && mobileMenuButton}
      
      {/* Overlay for mobile sidebar */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <aside className={sidebarClasses}>
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
                      onClick={() => isMobile && setMobileOpen(false)}
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
    </>
  );
};

export default Sidebar;