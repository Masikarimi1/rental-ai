// /gebral-Estate/ui/src/config/agents.js
/**
 * Configuration for the various AI agents in the system
 */

export const agents = {
    newsIntelligence: {
      id: 'news-intelligence',
      name: 'News Intelligence Agent',
      description: 'Analyzes real estate news, classifies trends, evaluates market impact, and generates actionable recommendations.',
      inputType: 'CSV file with real estate news headlines',
      outputType: 'JSON with categorized news impact analysis',
      updateFrequency: 60 * 60 * 1000, // 1 hour in milliseconds
      color: '#3b82f6', // info color
      icon: 'NewspaperIcon'
    },
    
    trendSpotter: {
      id: 'trend-spotter',
      name: 'Trend Spotter Agent',
      description: 'Detects rent price changes across zones and identifies emerging hot/cold areas by analyzing current and historical rental data.',
      inputType: 'Two CSV files with current and previous rental data snapshots',
      outputType: 'JSON with location-based price trend analysis',
      updateFrequency: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
      color: '#8b5cf6', // secondary color
      icon: 'ChartBarIcon'
    },
    
    roiForecaster: {
      id: 'roi-forecaster',
      name: 'ROI Forecaster Agent',
      description: 'Calculates top listings by ROI using current rent and estimated value with sensitivity analysis.',
      inputType: 'Rental listings CSV and market reference rates CSV',
      outputType: 'JSON with property ROI calculations and rankings',
      updateFrequency: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
      color: '#10b981', // success color
      icon: 'CalculatorIcon'
    },
    
    constructionAnalyzer: {
      id: 'construction-analyzer',
      name: 'Construction Project Analyzer',
      description: 'Monitors active/upcoming construction to predict neighborhood supply impact.',
      inputType: 'Construction projects database and location data',
      outputType: 'JSON with project timelines and market impact assessments',
      updateFrequency: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      color: '#f59e0b', // warning color
      icon: 'BuildingOfficeIcon'
    },
    
    priceAdvisor: {
      id: 'price-advisor',
      name: 'Price Advisor Agent',
      description: 'Suggests optimal pricing based on market conditions and vacancy risk.',
      inputType: 'Property details, market rates, and occupancy data',
      outputType: 'JSON with pricing recommendations and confidence scores',
      updateFrequency: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
      color: '#ef4444', // danger color
      icon: 'CurrencyDollarIcon'
    },
    
    strategyAgent: {
      id: 'strategy-agent',
      name: 'Strategy Agent',
      description: 'Conversational agent that provides strategic advice based on real estate data analysis.',
      inputType: 'Natural language queries and context from other agents',
      outputType: 'Natural language responses with actionable insights',
      updateFrequency: 5 * 60 * 1000, // 5 minutes in milliseconds
      color: '#2563eb', // primary color
      icon: 'BoltIcon'
    }
  };
  
  // Get a specific agent by ID
  export const getAgentById = (id) => {
    return Object.values(agents).find(agent => agent.id === id);
  };
  
  // Get all agents as an array
  export const getAllAgents = () => {
    return Object.values(agents);
  };
  
  export default agents;