// /gebral-Estate/ui/src/utils/dataPipeline.js
/**
 * Handles the pipeline for fetching and updating data from external sources
 * This module manages the automatic data polling from Konkan every 5 minutes
 */

import api from './api';

// Configuration for the data pipeline
const CONFIG = {
  DEFAULT_POLLING_INTERVAL: 5 * 60 * 1000, // 5 minutes in ms
  DATA_SOURCES: {
    MARKET_DATA: '/market-data',
    PROPERTY_DATA: '/property-data',
    NEWS_DATA: '/news-data',
    AGENT_DATA: '/agent-data'
  },
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 5000 // 5 seconds
};

// Store for interval IDs
const intervals = {
  marketData: null,
  propertyData: null,
  newsData: null,
  agentData: null
};

/**
 * Starts polling for a specific data type
 * @param {string} dataType - Type of data to poll for
 * @param {number} interval - Polling interval in ms
 * @param {Function} callback - Callback function to handle the data
 * @returns {number} Interval ID
 */
const startPolling = (dataType, interval = CONFIG.DEFAULT_POLLING_INTERVAL, callback) => {
  // Clear any existing interval for this data type
  if (intervals[dataType]) {
    clearInterval(intervals[dataType]);
  }
  
  // Define the fetch function
  const fetchData = async () => {
    try {
      console.log(`Fetching ${dataType} data...`);
      
      let data;
      let endpoint = CONFIG.DATA_SOURCES[dataType.toUpperCase()];
      
      if (!endpoint) {
        throw new Error(`Invalid data type: ${dataType}`);
      }
      
      // Make the API request
      data = await api.get(endpoint);
      
      // Call the callback with the fetched data
      if (typeof callback === 'function') {
        callback(data);
      }
      
      console.log(`Successfully updated ${dataType} data`);
    } catch (error) {
      console.error(`Error fetching ${dataType} data:`, error);
      
      // In a real application, you might want to implement retry logic here
    }
  };
  
  // Fetch immediately on start
  fetchData();
  
  // Set up the interval
  intervals[dataType] = setInterval(fetchData, interval);
  
  return intervals[dataType];
};

/**
 * Stops polling for a specific data type
 * @param {string} dataType - Type of data to stop polling for
 */
const stopPolling = (dataType) => {
  if (intervals[dataType]) {
    clearInterval(intervals[dataType]);
    intervals[dataType] = null;
    console.log(`Stopped polling for ${dataType} data`);
  }
};

/**
 * Stops all active polling
 */
const stopAllPolling = () => {
  Object.keys(intervals).forEach((dataType) => {
    stopPolling(dataType);
  });
  console.log('Stopped all data polling');
};

/**
 * Utility to create a pipeline for automatic data fetching and processing
 * @param {Object} options - Configuration options for the pipeline
 * @returns {Object} Pipeline control functions
 */
export const createDataPipeline = (options = {}) => {
  const {
    onMarketData,
    onPropertyData,
    onNewsData,
    onAgentData,
    pollingInterval = CONFIG.DEFAULT_POLLING_INTERVAL
  } = options;
  
  // Start functions
  const startMarketData = () => startPolling('marketData', pollingInterval, onMarketData);
  const startPropertyData = () => startPolling('propertyData', pollingInterval, onPropertyData);
  const startNewsData = () => startPolling('newsData', pollingInterval, onNewsData);
  const startAgentData = () => startPolling('agentData', pollingInterval, onAgentData);
  
  // Start all polling
  const startAll = () => {
    startMarketData();
    startPropertyData();
    startNewsData();
    startAgentData();
    console.log(`Started all data polling with ${pollingInterval}ms interval`);
  };
  
  return {
    startMarketData,
    startPropertyData,
    startNewsData,
    startAgentData,
    startAll,
    stopPolling,
    stopAllPolling
  };
};

export default {
  createDataPipeline,
  startPolling,
  stopPolling,
  stopAllPolling
};