// /gebral-Estate/ui/src/context/DataContext.jsx
import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { fetchMarketData, fetchPropertyData, fetchNewsData } from '@utils/api';

export const DataContext = createContext();

// Default polling interval: 5 minutes
const DEFAULT_POLLING_INTERVAL = 300000;

export const DataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [pollingInterval, setPollingInterval] = useState(DEFAULT_POLLING_INTERVAL);
  const [isPollingActive, setIsPollingActive] = useState(true);
  const pollingIntervalRef = useRef(null);
  
  // Function to fetch all data
  const fetchAllData = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous fetches
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching all data...');
      const [market, property, news] = await Promise.all([
        fetchMarketData(),
        fetchPropertyData(),
        fetchNewsData()
      ]);
      
      console.log('Data fetched successfully');
      setMarketData(market);
      setPropertyData(property);
      setNewsData(news);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data');
      // Show error notification here if needed
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to refresh data manually
  const refreshData = useCallback(() => {
    return fetchAllData();
  }, [fetchAllData]);
  
  // Function to start data polling
  const startDataPolling = useCallback((intervalMs = DEFAULT_POLLING_INTERVAL) => {
    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    setPollingInterval(intervalMs);
    setIsPollingActive(true);
    
    // Set up new polling interval
    pollingIntervalRef.current = setInterval(() => {
      console.log(`Polling data at ${new Date().toLocaleTimeString()}`);
      fetchAllData();
    }, intervalMs);
    
    // Initial fetch
    fetchAllData();
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchAllData]);
  
  // Function to stop data polling
  const stopDataPolling = useCallback(() => {
    setIsPollingActive(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);
  
  // Function to change polling interval
  const changePollingInterval = useCallback((newIntervalMs) => {
    setPollingInterval(newIntervalMs);
    if (isPollingActive) {
      stopDataPolling();
      startDataPolling(newIntervalMs);
    }
  }, [isPollingActive, startDataPolling, stopDataPolling]);
  
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
        pollingInterval,
        isPollingActive,
        refreshData,
        startDataPolling,
        stopDataPolling,
        changePollingInterval
      }}
    >
      {children}
    </DataContext.Provider>
  );
};