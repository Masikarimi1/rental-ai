// /gebral-Estate/ui/src/utils/formatting.js
/**
 * Formats a currency value with the specified currency symbol
 * @param {number} value - The value to format
 * @param {string} currency - The currency code (default: AED)
 * @param {string} locale - The locale to use for formatting (default: en-AE)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'AED', locale = 'en-AE') => {
    if (currency === 'AED') {
      // For AED, format without currency symbol first, then add AED
      return `AED ${value.toLocaleString(locale)}`;
    }
    
    return value.toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  /**
   * Formats a date object to a readable string
   * @param {Date} date - The date to format
   * @param {string} format - Format option ('short', 'medium', 'long', 'relative')
   * @returns {string} Formatted date string
   */
  export const formatDate = (date, format = 'medium') => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    switch (format) {
      case 'short':
        return date.toLocaleDateString('en-AE');
        
      case 'long':
        return date.toLocaleDateString('en-AE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
      case 'relative':
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHour = Math.round(diffMin / 60);
        const diffDay = Math.round(diffHour / 24);
        
        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
        if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
        if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
        return date.toLocaleDateString('en-AE');
        
      case 'medium':
      default:
        return date.toLocaleDateString('en-AE', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    }
  };
  
  /**
   * Formats a percentage value
   * @param {number} value - The value to format
   * @param {number} decimals - Number of decimal places
   * @param {boolean} showPlus - Whether to show '+' for positive values
   * @returns {string} Formatted percentage string
   */
  export const formatPercentage = (value, decimals = 1, showPlus = false) => {
    const formatted = value.toFixed(decimals);
    if (value > 0 && showPlus) {
      return `+${formatted}%`;
    }
    return `${formatted}%`;
  };
  
  /**
   * Formats a number with thousand separators
   * @param {number} value - The value to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number string
   */
  export const formatNumber = (value, decimals = 0) => {
    return value.toLocaleString('en-AE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Truncates text to a specified length with ellipsis
   * @param {string} text - The text to truncate
   * @param {number} length - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  };
  