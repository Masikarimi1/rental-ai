// /gebral-Estate/ui/src/utils/apiUtils.js

/**
 * Ensures a URL uses the same protocol as the current page
 * This helps prevent mixed content errors when loading HTTP resources on HTTPS pages
 * 
 * @param {string} url - The URL to normalize
 * @returns {string} The URL with matching protocol
 */
export const normalizeUrl = (url) => {
    if (!url) return url;
    
    // If we're in a browser context
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol;
      
      // If the URL starts with 'http://' or '//', replace with current protocol
      return url.replace(/^(http:)?\/\//, `${protocol}//`);
    }
    
    // For SSR or non-browser contexts, return the original URL
    return url;
  };
  
  /**
   * Builds a complete API URL with the correct protocol
   * 
   * @param {string} baseUrl - The base URL from environment
   * @param {object} params - Optional query parameters
   * @returns {string} Complete API URL
   */
  export const buildApiUrl = (baseUrl, params = {}) => {
    // First normalize the protocol
    const normalizedUrl = normalizeUrl(baseUrl);
    
    // If no params, return normalized URL
    if (Object.keys(params).length === 0) {
      return normalizedUrl;
    }
    
    // Convert params to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, value);
      }
    });
    
    // Combine URL and parameters
    return `${normalizedUrl}${normalizedUrl.includes('?') ? '&' : '?'}${searchParams.toString()}`;
  };
  
  /**
   * Handles API errors with consistent formatting
   * 
   * @param {Error} error - The error object
   * @param {string} fallbackMessage - Fallback message if error is not formatted
   * @returns {object} Formatted error object
   */
  export const handleApiError = (error, fallbackMessage = 'An unexpected error occurred') => {
    // If it's an Axios error
    if (error.response) {
      return {
        message: error.response.data?.message || error.response.statusText || fallbackMessage,
        status: error.response.status,
        data: error.response.data
      };
    }
    
    // Network error
    if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        isNetworkError: true
      };
    }
    
    // Other errors
    return {
      message: error.message || fallbackMessage,
      isUnexpectedError: true
    };
  };
  
  export default {
    normalizeUrl,
    buildApiUrl,
    handleApiError
  };