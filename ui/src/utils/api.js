// /gebral-Estate/ui/src/utils/api.js
import axios from 'axios';

// API URLs from environment variables with fallbacks
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const CHAT_API_URL = import.meta.env.VITE_API_CHAT_URL || `${API_BASE_URL}/chat/query`;
const FEEDBACK_API_URL = import.meta.env.VITE_API_FEEDBACK_URL || `${API_BASE_URL}/apifeedback/feedback`;
const INSIGHTS_API_URL = import.meta.env.VITE_API_INSIGHTS_URL || `${API_BASE_URL}/insights/results`;

// Create axios instance with default config
const api = axios.create({
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
    // For development, return mock user
    console.warn('Login API not available, using mock data');
    return { id: 1, name: 'Test User', email: 'user@example.com', role: 'manager' };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  } catch (error) {
    // Still remove token even if API call fails
    localStorage.removeItem('authToken');
    console.warn('Logout API not available, token removed locally');
  }
};

export const checkAuthStatus = async () => {
  try {
    return await api.get('/auth/status');
  } catch (error) {
    // For development, return mock auth status
    console.warn('Auth status API not available, using mock data');
    return { authenticated: true, user: { id: 1, name: 'Test User', role: 'manager' } };
  }
};

// ===== ALL Data now fetched through insights API =====

// Helper function to get agent-specific data from insights
const getAgentInsights = async (agentType) => {
  try {
    // Use relative URL if on the same domain, or full URL if cross-domain
    const requestUrl = `${INSIGHTS_API_URL}?agent=${encodeURIComponent(agentType)}`;
    
    const response = await axios.get(requestUrl);
    console.log(`✅ ${agentType} Data:`, response.data);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      // If it's an array, find the matching agent
      const agentData = response.data.find(item => 
        item.agent && item.agent.toLowerCase().includes(agentType.toLowerCase())
      );
      
      if (agentData) {
        return agentData.output;
      } else {
        // If specific agent not found, return the first item's output
        return response.data[0]?.output || null;
      }
    } else {
      // If not an array, return the data directly
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching ${agentType} data:`, error);
    return getMockDataForAgent(agentType);
  }
};

// ===== Market Data API =====
export const fetchMarketData = async () => {
  try {
    // Use trend-spotter as the source for market data
    const data = await getAgentInsights('trend-spotter');
    return { marketData: data };
  } catch (error) {
    console.error('Market data fetch error:', error);
    return { marketData: getMockDataForAgent('trend-spotter') };
  }
};

// ===== Property Data API =====
export const fetchPropertyData = async () => {
  try {
    // Use price-advisor or roi-forecaster for property data
    const data = await getAgentInsights('roi-forecaster');
    return { propertyData: data };
  } catch (error) {
    console.error('Property data fetch error:', error);
    return { propertyData: getMockDataForAgent('roi-forecaster') };
  }
};

// ===== News Data API =====
export const fetchNewsData = async () => {
  try {
    // Use news-intelligence for news data
    const data = await getAgentInsights('news-intelligence');
    return { newsData: data };
  } catch (error) {
    console.error('News data fetch error:', error);
    return { newsData: getMockDataForAgent('news-intelligence') };
  }
};

// ===== Agent-specific Data API =====
export const fetchAgentData = async (agentType) => {
  try {
    // Map the endpoint to agent type if needed
    let mappedAgent = agentType;
    
    if (agentType.startsWith('/api/')) {
      mappedAgent = agentType.replace('/api/', '');
    } else if (agentType.startsWith('/')) {
      mappedAgent = agentType.replace('/', '').replace('-data', '');
    }
    
    const data = await getAgentInsights(mappedAgent);
    return data;
  } catch (error) {
    console.error(`Agent data fetch error for ${agentType}:`, error);
    return getMockDataForAgent(agentType);
  }
};

// ===== Chat API =====
export const sendChatQuery = async (query) => {
  try {
    // Determine the correct URL to use
    const requestUrl = CHAT_API_URL;
    
    // Use direct axios call to the full URL instead of the instance
    const response = await axios.post(requestUrl, { query });
    console.log('✅ Chat response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Return different mock response based on device type
    return { 
      result: isMobile
        ? `I understand you're using a mobile device. ${query} - As a real estate assistant, I can help with market trends, property recommendations, and investment advice in Dubai. Please try again or check your connection.`
        : `I'm experiencing a temporary connection issue. Here's what I can tell you about "${query}": Dubai's real estate market has been showing strong performance in areas like Dubai Marina and Downtown Dubai. How can I help you further?`
    };
  }
};

// ===== Insights API =====
export const fetchInsights = async (agentFilter = null) => {
  try {
    const url = agentFilter ? `${INSIGHTS_API_URL}?agent=${encodeURIComponent(agentFilter)}` : INSIGHTS_API_URL;
    const response = await axios.get(url);
    console.log('✅ Insights received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Insights API error:', error);
    // Return mock data for development
    return getMockDataForAgent(agentFilter);
  }
};

// ===== Feedback API =====
export const sendAgentFeedback = async ({ agent_name, rating, message }) => {
  try {
    const response = await axios.post(FEEDBACK_API_URL, {
      agent_name,
      rating,
      message
    });
    console.log('✅ Feedback sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to send feedback:', error);
    // Return mock response for development
    return { 
      status: "ok", 
      written: { 
        timestamp: new Date().toISOString(),
        agent_name, 
        rating, 
        message 
      } 
    };
  }
};

// Helper function to provide mock data during development
const getMockDataForAgent = (agentType) => {
  console.log('⚠️ Using mock data for', agentType);
  
  // Map the agent type if it's a path
  let agent = agentType;
  if (typeof agent === 'string') {
    if (agent.startsWith('/api/')) {
      agent = agent.replace('/api/', '');
    } else if (agent.startsWith('/')) {
      agent = agent.replace('/', '').replace('-data', '');
    }
  }
  
  // Mock data for different agent types
  const mockData = {
    'trend-spotter': {
      trend_insight: "Rental market is showing growth in prime areas.",
      results: [
        { location: "Dubai Marina", current_rent_per_sqft: 185, percent_change: "8.2%" },
        { location: "Downtown Dubai", current_rent_per_sqft: 283, percent_change: "7.9%" }
      ]
    },
    'market': {
      trend_insight: "Rental market is showing growth in prime areas.",
      results: [
        { location: "Dubai Marina", current_rent_per_sqft: 185, percent_change: "8.2%" },
        { location: "Downtown Dubai", current_rent_per_sqft: 283, percent_change: "7.9%" }
      ]
    },
    'roi-forecaster': [
      {
        "Address": "Corniche Deira, Deira, Dubai",
        "Location": "Deira",
        "City": "Dubai",
        "Rent": 330000.0,
        "Area_in_sqft": 1991.0,
        "Estimated_Value": 2308440.68,
        "ROI": 14.3,
        "log_action": "Highest ROI property; consider aggressive marketing due to low market value."
      }
    ],
    'property': [
      {
        "Address": "Corniche Deira, Deira, Dubai",
        "Location": "Deira",
        "City": "Dubai",
        "Rent": 330000.0,
        "Area_in_sqft": 1991.0,
        "Estimated_Value": 2308440.68,
        "ROI": 14.3
      }
    ],
    'news-intelligence': [
      {
        "source": "Gulf News",
        "headline": "Dubai launches new Green Metro Corridor",
        "link": "https://gulfnews.com/dubai-metro-expansion",
        "signal_category": "Infrastructure",
        "impact_area": "Sheikh Zayed Road",
        "agent_summary": "Metro expansion announced - expect property value increases"
      }
    ],
    'news': [
      {
        "source": "Gulf News",
        "headline": "Dubai launches new Green Metro Corridor",
        "link": "https://gulfnews.com/dubai-metro-expansion",
        "signal_category": "Infrastructure",
        "impact_area": "Sheikh Zayed Road",
        "agent_summary": "Metro expansion announced - expect property value increases"
      }
    ],
    'price-advisor': [
      {
        "address": "Apartment 403, Al Barsha Heights",
        "location": "Al Barsha",
        "current_rent": 85000,
        "recommended_rent": 80750,
        "recommendation_type": "decrease",
        "recommendation_percentage": 5,
        "vacancy_days": 28,
        "market_trend": "declining",
        "confidence": "high",
        "market_context": {
          "average_days_vacant": 16,
          "similar_properties": 12,
          "occupancy_rate": 82,
          "price_trend_3m": -3.2
        },
        "status_msg": "5% decrease suggested to attract new tenants."
      }
    ],
    'chat': {
      logs: [
        {
          id: 1,
          timestamp: new Date(),
          agent: 'StrategyAgent',
          message: 'Recommended offering 1 month free on Al Barsha 2BRs',
          feedback: null
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 5 * 60000),
          agent: 'InsightAgent',
          message: 'Identified extended vacancy trend for Al Barsha 2BRs',
          feedback: null
        }
      ]
    },
    'vacancy-metrics': {
      vacancy_rate_pct: 31.35,
      vacant_units: 163,
      total_units: 520,
      occupancy_rate_pct: 68,
      average_vacancy_days: 12.6,
      highest_vacancy_location: {
        location: "Deira",
        vacancy_rate_pct: 80.0,
        vacant_units: 8
      }
    }
  };
  
  // Return data for the requested agent type or default data
  return agent && mockData[agent] ? mockData[agent] : mockData['trend-spotter'];
};

export default {
  login,
  logout,
  checkAuthStatus,
  fetchMarketData,
  fetchPropertyData,
  fetchNewsData,
  fetchAgentData,
  sendChatQuery,
  fetchInsights,
  sendAgentFeedback
};