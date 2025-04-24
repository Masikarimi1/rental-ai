// ui/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@config/routes';
import AppLayout from '@components/layout/AppLayout';

// Context providers
import { AuthProvider } from '@context/AuthContext';
import { DataProvider } from '@context/DataContext';
import { NotificationProvider } from '@context/NotificationContext';
import { PersonaProvider } from '@context/PersonaContext';

// Pages
import Dashboard from '@pages/Dashboard';
import MarketIntelligence from '@pages/MarketIntelligence';
import PropertyAnalysis from '@pages/PropertyAnalysis';
import StrategyChat from '@pages/StrategyChat';
import Settings from '@pages/Settings';

// Theme detector and network detection
import { useThemeDetector } from '@hooks/useThemeDetector';
import { initNetworkDetection } from '@utils/networkDetection';

// Preloading component for better UX
const PreloadingScreen = ({ onLoadComplete }) => {
  useEffect(() => {
    // Simulate loading key resources
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [onLoadComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-deeper z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-primary-light">Gebral</span> Estate
        </h2>
        <p className="text-gray-light animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isDarkMode = useThemeDetector();
  
  // Mobile viewport height fix
  useEffect(() => {
    const setVhProperty = () => {
      // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial value
    setVhProperty();

    // Update the height on window resize or orientation change
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);

    return () => {
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('orientationchange', setVhProperty);
    };
  }, []);
  
  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  
  // Handle initial loading screen
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  if (isLoading) {
    return <PreloadingScreen onLoadComplete={handleLoadComplete} />;
  }
  
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <PersonaProvider>
            <Router>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="market-intelligence" element={<MarketIntelligence />} />
                  <Route path="property-analysis" element={<PropertyAnalysis />} />
                  <Route path="strategy-chat" element={<StrategyChat />} />
                  <Route path="settings" element={<Settings />} />
                  {/* Redirect any unknown paths to dashboard */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </Router>
          </PersonaProvider>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;