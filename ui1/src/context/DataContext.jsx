// /gebral-Estate/ui/src/context/DataContext.jsx
import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { fetchMarketData, fetchPropertyData, fetchNewsData } from '@utils/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const pollingIntervalRef = useRef(null);
  
  // Function to fetch all data
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [market, property, news] = await Promise.all([
        fetchMarketData(),
        fetchPropertyData(),
        fetchNewsData()
      ]);
      
      setMarketData(market);
      setPropertyData(property);
      setNewsData(news);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to refresh data manually
  const refreshData = useCallback(() => {
    return fetchAllData();
  }, [fetchAllData]);
  
  // Function to start data polling
  const startDataPolling = useCallback((intervalMs = 300000) => {
    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    // Set up new polling interval
    pollingIntervalRef.current = setInterval(() => {
      fetchAllData();
    }, intervalMs);
    
    // Initial fetch
    fetchAllData();
  }, [fetchAllData]);
  
  // Function to stop data polling
  const stopDataPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <DataContext.Provider
      value={{
        marketData,
        propertyData,
        newsData,
        isLoading,
        error,
        lastUpdated,
        refreshData,
        startDataPolling,
        stopDataPolling
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

