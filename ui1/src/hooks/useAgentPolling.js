// /gebral-Estate/ui/src/hooks/useAgentPolling.js
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
      
      const result = await fetchAgentData(agentType);
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error(`Error fetching data for ${agentType}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [agentType]);
  
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
