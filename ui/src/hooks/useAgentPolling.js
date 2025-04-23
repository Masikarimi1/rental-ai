// ui1/src/hooks/useAgentPolling.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAgentData } from '@utils/api';

export const useAgentPolling = (agentType, intervalMs = 300000) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isPolling, setIsPolling] = useState(true);
  const intervalRef = useRef(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Map agent types to correct API endpoints
      const endpoint = getAgentEndpoint(agentType);
      const result = await fetchAgentData(endpoint);
      
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error(`Error fetching data for ${agentType}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [agentType]);
  
  // Helper to map agent types to API endpoints
  const getAgentEndpoint = (type) => {
    const mapping = {
      'trend-spotter': '/results?agent=TrendSpotter',
      'roi-forecaster': '/results?agent=ROI%20Forecaster',
      'price-advisor': '/results?agent=Action%20Brief%20Generator',
      'news-intelligence': '/results?agent=The%20Real%20Estate%20News%20Intelligence%20Analyst',
      'vacancy-metrics': '/results?agent=Vacancy%20Analyst',
      'chat': '/query'
    };
    
    return mapping[type] || type;
  };
  
  const startPolling = useCallback(() => {
    if (!isPolling) {
      setIsPolling(true);
    }
  }, [isPolling]);
  
  const stopPolling = useCallback(() => {
    if (isPolling) {
      setIsPolling(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isPolling]);
  
  useEffect(() => {
    // Initial data fetch
    fetchData();
    
    // Set up polling interval
    if (isPolling) {
      intervalRef.current = setInterval(fetchData, intervalMs);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, intervalMs, isPolling]);
  
  return {
    data,
    isLoading,
    error,
    lastUpdated,
    fetchData,
    startPolling,
    stopPolling,
    isPolling,
  };
};