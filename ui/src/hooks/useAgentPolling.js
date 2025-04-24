// /gebral-Estate/ui/src/hooks/useAgentPolling.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchInsights } from '@utils/api';

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
      
      // Fetch from insights API - this endpoint returns all agent data
      const insights = await fetchInsights(agentType);
      
      // Process insights based on the agent type
      if (insights) {
        if (Array.isArray(insights)) {
          // Find the matching agent if we have an array of agents
          const agentData = insights.find(item => 
            item.agent.toLowerCase().includes(agentType.toLowerCase())
          );
          
          if (agentData) {
            setData(agentData.output);
          } else {
            // If no specific agent data found, but we have insights data
            setData(insights[0]?.output || null);
          }
        } else {
          // If insights is not an array, use it directly
          setData(insights.output || insights);
        }
        
        setLastUpdated(new Date());
      }
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

export default useAgentPolling;