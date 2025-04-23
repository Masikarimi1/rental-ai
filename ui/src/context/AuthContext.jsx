// /gebral-Estate/ui/src/context/AuthContext.jsx
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { login, logout, checkAuthStatus } from '@utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const userData = await checkAuthStatus();
        
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const handleLogin = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Logout function
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout();
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};