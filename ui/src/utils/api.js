// ui1/src/utils/api.js
import axios from 'axios';

// API URLs from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const CHAT_API_URL = '/query';
const INSIGHTS_API_URL = '/results';
const FEEDBACK_API_URL = import.meta.env.VITE_API_FEEDBACK_URL || 'http://localhost:8003/feedback';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with non-2xx status
      if (error.response.status === 401) {
        // Unauthorized, clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      
      // Return error message from response if available
      const message = error.response.data?.message || error.response.statusText;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('No response received from server. Please check your network connection.'));
    } else {
      // Something else happened while setting up the request
      return Promise.reject(error);
    }
  }
);

// ===== Authentication API =====

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Store authentication token
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  } catch (error) {
    // Still remove token even if API call fails
    localStorage.removeItem('authToken');
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    return await api.get('/auth/status');
  } catch (error) {
    throw error;
  }
};

// ===== Market Data API =====

export const fetchMarketData = async () => {
  try {
    const data = await fetchAgentData('/market-data');
    console.log('✅ Market Data:', data);
    return data;
  } catch (error) {
    console.error('Market data fetch error:', error);
    throw error;
  }
};

// ===== Property Data API =====

export const fetchPropertyData = async () => {
  try {
    const data = await fetchAgentData('/property-data');
    console.log('✅ Property Data:', data);
    return data;
  } catch (error) {
    console.error('Property data fetch error:', error);
    throw error;
  }
};

// ===== News Data API =====

export const fetchNewsData = async () => {
  try {
    const data = await fetchAgentData('/news-data');
    console.log('✅ News Data:', data);
    return data;
  } catch (error) {
    console.error('News data fetch error:', error);
    throw error;
  }
};

// ===== Agent-specific Data API =====

export const fetchAgentData = async (endpoint) => {
  try {
    const data = await api.get(endpoint);
    console.log(`✅ Agent Data (${endpoint}):`, data);
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Add a new function for chat queries
export const sendChatQuery = async (query) => {
  try {
    const response = await api.post(CHAT_API_URL, { query });
    return response;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

// Add a new function for insights
export const fetchInsights = async (params) => {
  try {
    const response = await api.get(INSIGHTS_API_URL, { params });
    return response;
  } catch (error) {
    console.error('Insights API error:', error);
    throw error;
  }
};

// ===== Feedback API =====

export const sendAgentFeedback = async ({ agent_name, rating, message }) => {
  try {
    const data = await api.post(FEEDBACK_API_URL, {
      agent_name,
      rating,
      message,
    });
    console.log('✅ Feedback sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send feedback:', error);
    throw error;
  }
};

export default api;
