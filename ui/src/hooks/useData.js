// ui1/src/hooks/useData.js
import { useContext, useCallback } from 'react';
import { DataContext } from '@context/DataContext';

export const useData = () => {
  const context = useContext(DataContext);
  
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  // Add a helper function to get agent-specific data
  const getAgentData = useCallback((agentType) => {
    switch (agentType) {
      case 'trend-spotter':
        return context.marketData?.trends || [];
      case 'roi-forecaster':
        return context.propertyData?.topListings || [];
      case 'price-advisor':
        return context.propertyData?.recommendations || [];
      case 'news-intelligence':
        return context.newsData?.newsItems || [];
      default:
        return null;
    }
  }, [context.marketData, context.propertyData, context.newsData]);

  return {
    ...context,
    getAgentData,
  };
};