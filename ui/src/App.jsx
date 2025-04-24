// /gebral-Estate/ui/src/App.jsx
import React from 'react';
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

const App = () => {
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
