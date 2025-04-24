// /gebral-Estate/ui/src/utils/networkDetection.js
/**
 * Utility for detecting and managing network connectivity
 * Helps handle offline mode gracefully on mobile devices
 */

// Create notification element
const createNetworkStatusElement = () => {
    if (document.getElementById('network-status')) {
      return;
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.id = 'network-status';
    statusDiv.className = 'network-status';
    document.body.appendChild(statusDiv);
  };
  
  // Update online status
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    
    // Add class to body
    if (isOnline) {
      document.body.classList.remove('offline');
      document.body.classList.add('online');
    } else {
      document.body.classList.remove('online');
      document.body.classList.add('offline');
    }
    
    // Update notification
    const statusElement = document.getElementById('network-status');
    if (statusElement) {
      statusElement.className = `network-status ${isOnline ? 'online' : 'offline'}`;
      statusElement.textContent = isOnline 
        ? 'Connection restored' 
        : 'No internet connection. Some features may not work.';
      
      // Hide "online" message after a few seconds
      if (isOnline) {
        setTimeout(() => {
          statusElement.className = 'network-status online';
        }, 3000);
      }
    }
    
    return isOnline;
  };
  
  // Initialize network detection
  export const initNetworkDetection = () => {
    createNetworkStatusElement();
    
    // Set initial status
    updateOnlineStatus();
    
    // Add event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  };
  
  // Check if we're currently online
  export const isOnline = () => navigator.onLine;
  
  // API request wrapper that handles offline scenario
  export const offlineAwareRequest = async (requestFn, fallbackData = null) => {
    if (!navigator.onLine) {
      console.warn('Offline mode: using fallback data');
      return fallbackData;
    }
    
    try {
      return await requestFn();
    } catch (error) {
      if (!navigator.onLine) {
        console.warn('Network appears to be offline during request');
        return fallbackData;
      }
      throw error;
    }
  };
  
  export default {
    initNetworkDetection,
    isOnline,
    offlineAwareRequest
  };