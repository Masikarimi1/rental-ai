// /gebral-Estate/ui/src/utils/api.js
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
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
  // For demo purposes, we'll simulate API responses
  // In a real application, this would make an actual API call
  return simulateMarketData();
};

// ===== Property Data API =====

export const fetchPropertyData = async () => {
  // For demo purposes, we'll simulate API responses
  return simulatePropertyData();
};

// ===== News Data API =====

export const fetchNewsData = async () => {
  // For demo purposes, we'll simulate API responses
  return simulateNewsData();
};

// ===== Agent-specific Data API =====

export const fetchAgentData = async (agentType) => {
  try {
    // For a real API:
    // return await api.get(`/agents/${agentType}`);
    
    // For demo purposes, simulate different data based on agent type
    switch (agentType) {
      case 'news-intelligence':
        return {
          signalCount: 5,
          latestSignals: [
            {
              source: 'Gulf News',
              headline: 'Dubai launches new Green Metro Corridor',
              link: 'https://www.gulfnews.com/article-12345',
              signal_category: 'Infrastructure',
              impact_area: 'Dubai Marina, U-D Marino',
              agent_summary: 'Rents expected to rise due to metro expansion in Dubai Marina'
            },
            {
              source: 'Khaleej Times',
              headline: 'Dubai announces new property regulation changes',
              link: 'https://www.khaleejtimes.com/article-67890',
              signal_category: 'Regulation',
              impact_area: 'All Dubai',
              agent_summary: 'New regulations aim to streamline property transactions and reduce fees'
            }
          ]
        };
        
      case 'trend-spotter':
        return {
          trends: [
            {
              location: 'Dubai Marina',
              rate: 'AED 156/sqft',
              change: 12.3,
              isHotspot: false
            },
            {
              location: 'JVC',
              rate: 'AED 132/sqft',
              change: null,
              isHotspot: true
            },
            {
              location: 'Downtown',
              rate: 'AED 148/sqft',
              change: 8.7,
              isHotspot: false
            }
          ]
        };
        
      case 'roi-forecaster':
        return {
          topListings: [
            {
              address: 'DAMAC Heights, Dubai Marina',
              location: 'Dubai Marina',
              city: 'Dubai',
              rent: 360000,
              estimated_value: 3373437,
              roi: 10.87
            },
            {
              address: 'Cherrywoods, Dubailand',
              location: 'Dubailand',
              city: 'Dubai',
              rent: 200000,
              estimated_value: 2078637,
              roi: 9.62
            },
            {
              address: '1010 Fir Lane Springfield',
              location: 'South End',
              city: 'Springfield',
              rent: 750,
              estimated_value: 466030,
              roi: 0.16
            }
          ]
        };
        
      default:
        return {};
    }
  } catch (error) {
    throw error;
  }
};

// ===== Simulation functions for demo =====

const simulateMarketData = () => {
  return {
    lastUpdated: new Date(),
    trends: {
      rentalGrowth: {
        'Dubai Marina': 12.3,
        'Downtown': 8.7,
        'JVC': 6.5,
        'Business Bay': 7.8,
        'Palm Jumeirah': 10.2
      },
      vacancyRates: {
        'Dubai Marina': 5.2,
        'Downtown': 6.1,
        'JVC': 8.5,
        'Business Bay': 7.3,
        'Palm Jumeirah': 4.8
      },
      averageRentPerSqft: {
        'Dubai Marina': 156,
        'Downtown': 148,
        'JVC': 132,
        'Business Bay': 140,
        'Palm Jumeirah': 185
      }
    },
    hotspots: [
      {
        location: 'JVC',
        reason: 'Emerging growth area with new infrastructure'
      },
      {
        location: 'Dubai Hills',
        reason: 'New development with high demand'
      }
    ]
  };
};

const simulatePropertyData = () => {
  return {
    lastUpdated: new Date(),
    summary: {
      totalProperties: 143,
      occupiedUnits: 125,
      vacantUnits: 18,
      averageRent: 95600,
      revenueAtRisk: 1540000
    },
    properties: [
      {
        id: 'p1001',
        address: 'Apartment 403, Al Barsha Heights',
        location: 'Al Barsha',
        type: '2BR',
        status: 'vacant',
        vacancyDays: 28,
        currentRent: 85000,
        recommendedRent: 80750,
        area: 1200
      },
      {
        id: 'p1002',
        address: 'Unit 1204, Marina Heights',
        location: 'Dubai Marina',
        type: '3BR',
        status: 'vacant',
        vacancyDays: 14,
        currentRent: 140000,
        recommendedRent: 142000,
        area: 1800
      },
      {
        id: 'p1003',
        address: 'Villa 7, Arabian Ranches',
        location: 'Arabian Ranches',
        type: '4BR',
        status: 'occupied',
        vacancyDays: 0,
        currentRent: 180000,
        recommendedRent: 190000,
        area: 3200
      }
    ]
  };
};

const simulateNewsData = () => {
  return {
    lastUpdated: new Date(),
    newsItems: [
      {
        source: 'Gulf News',
        headline: 'Dubai launches new Green Metro Corridor',
        link: 'https://www.gulfnews.com/article-12345',
        signal_category: 'Infrastructure',
        impact_area: 'Dubai Marina, U-D Marino',
        agent_summary: 'Rents expected to rise due to metro expansion in Dubai Marina',
        date: new Date('2025-04-18')
      },
      {
        source: 'Khaleej Times',
        headline: 'Dubai announces new property regulation changes',
        link: 'https://www.khaleejtimes.com/article-67890',
        signal_category: 'Regulation',
        impact_area: 'All Dubai',
        agent_summary: 'New regulations aim to streamline property transactions and reduce fees',
        date: new Date('2025-04-16')
      },
      {
        source: 'Zawya',
        headline: 'Major developer announces new project in Business Bay',
        link: 'https://www.zawya.com/article-54321',
        signal_category: 'Development',
        impact_area: 'Business Bay',
        agent_summary: 'New luxury project could increase competition in the area',
        date: new Date('2025-04-15')
      }
    ],
    regulatoryUpdates: [
      {
        title: 'Dubai Land Department Fee Reduction',
        description: 'Transfer fees reduced from 4% to 3% for first-time buyers of properties under AED 3 million.',
        effectiveDate: new Date('2025-04-15'),
        status: 'new'
      },
      {
        title: 'New Rental Dispute Resolution Process',
        description: 'Updated procedures for resolving rental disputes with expedited processing for cases under AED 100,000.',
        effectiveDate: new Date('2025-05-01'),
        status: 'upcoming'
      }
    ]
  };
};

export default api;
