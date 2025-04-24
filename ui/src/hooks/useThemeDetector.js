// ui/src/hooks/useThemeDetector.js
import { useState, useEffect } from 'react';

/**
 * A hook that detects whether the user's system prefers dark mode
 * @returns {boolean} True if dark mode is preferred
 */
export const useThemeDetector = () => {
  // Default to true since our app is dark mode by default
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if the browser supports matchMedia
    if (!window.matchMedia) {
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Add listener for theme changes
    const handler = (e) => setIsDarkMode(e.matches);
    
    // Use addEventListener if supported, otherwise use deprecated addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isDarkMode;
};

export default useThemeDetector;