import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

// Dashboard showcase for the Gebral Real Estate Intelligence Platform
const GebralDashboardShowcase = () => {
  const [activePersona, setActivePersona] = useState('investor');
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Simulate real-time data updates
  const [marketData, setMarketData] = useState({
    dubaiMarina: { rent: 156, change: 12.3 },
    downtown: { rent: 148, change: 8.7 },
    jvc: { rent: 132, change: null }
  });
  
  // Simulate real-time notifications
  const [logs, setLogs] = useState([
    { time: '8:45 AM', agent: 'StrategyAgent', action: 'Recommended offering 1 month free on Al Barsha 2BRs' },
    { time: '8:42 AM', agent: 'InsightAgent', action: 'Identified extended vacancy trend for Al Barsha 2BRs' },
    { time: '8:40 AM', agent: 'ScrapeAgent', action: 'Monitored Al Barsha market for new listings' }
  ]);

  // Update data periodically for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Add small random fluctuations to the data
      setMarketData(prev => ({
        dubaiMarina: { 
          rent: prev.dubaiMarina.rent + (Math.random() > 0.5 ? 1 : -1) * Math.random(), 
          change: prev.dubaiMarina.change + (Math.random() > 0.5 ? 0.1 : -0.1) * Math.random()
        },
        downtown: { 
          rent: prev.downtown.rent + (Math.random() > 0.5 ? 1 : -1) * Math.random(), 
          change: prev.downtown.change + (Math.random() > 0.5 ? 0.1 : -0.1) * Math.random()
        },
        jvc: { 
          rent: prev.jvc.rent + (Math.random() > 0.5 ? 1 : -1) * Math.random(), 
          change: null 
        }
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Hide animation after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Persona data
  const personas = {
    investor: {
      name: 'Robert',
      role: 'Portfolio Investor',
      description: 'Identifies acquisition opportunities across markets'
    },
    manager: {
      name: 'Amina',
      role: 'Property Manager',
      description: 'Optimizes rent pricing and reduces vacancies'
    },
    developer: {
      name: 'Faisal',
      role: 'Developer CFO',
      description: 'Scenario analysis and investment forecasting'
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
              <Camera className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Gebral<span className="text-blue-400">.</span></h1>
              <p className="text-xs text-gray-400">Agentic AI for Real Estate Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm hover:text-blue-400 transition-colors">Dashboard</a>
            <a href="#" className="text-sm hover:text-blue-400 transition-colors">Market Intelligence</a>
            <a href="#" className="text-sm hover:text-blue-400 transition-colors">Property Analysis</a>
            <a href="#" className="text-sm hover:text-blue-400 transition-colors">Strategy Chat</a>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-800/50 text-sm px-3 py-1.5 rounded-full border border-white/10">
              Dubai AI Week 2025
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Persona selector */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {Object.keys(personas).map(personaKey => (
              <button
                key={personaKey}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                  activePersona === personaKey
                    ? 'bg-blue-500/20 border-blue-400/50 text-white shadow-lg shadow-blue-900/10'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800'
                } border backdrop-blur-md`}
                onClick={() => setActivePersona(personaKey)}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  activePersona === personaKey ? 'bg-blue-500/20' : 'bg-gray-800'
                }`}>
                  <Camera className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{personas[personaKey].name}</div>
                  <div className="text-xs opacity-70">{personas[personaKey].role}</div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1">
                  <div className="text-gray-400 text-sm">Occupancy Rate</div>
                  <div className="text-4xl font-bold mt-2">88%</div>
                  <div className="flex items-center mt-2 text-sm text-green-400">
                    <span>↑ +5.3% from last quarter</span>
                  </div>
                </div>
                
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1">
                  <div className="text-gray-400 text-sm">Average ROI</div>
                  <div className="text-4xl font-bold mt-2">7.8%</div>
                  <div className="flex items-center mt-2 text-sm text-green-400">
                    <span>↑ +1.2% vs. market avg</span>
                  </div>
                </div>
                
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1">
                  <div className="text-gray-400 text-sm">Vacancy Duration</div>
                  <div className="text-4xl font-bold mt-2">12</div>
                  <div className="text-xs text-gray-400 mt-1">days avg. to fill</div>
                </div>
              </div>
              
              {/* News Intelligence */}
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                    <Camera className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg">News Intelligence Agent</h3>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500/10 text-blue-400 rounded-full p-1.5">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="ml-2 text-gray-400 text-sm">Gulf News</span>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-3">Dubai launches new Green Metro Corridor</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-500/10 text-blue-400 text-xs py-1 px-2 rounded-full inline-flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                      Infrastructure
                    </span>
                    
                    <span className="bg-purple-500/10 text-purple-400 text-xs py-1 px-2 rounded-full inline-flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
                      Dubai Marina
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm text-gray-400 mb-1">AGENT INSIGHT</div>
                    <p className="text-sm">Rents expected to rise due to metro expansion in Dubai Marina. Consider adjusting rents by +3% for properties within 1km of the new metro stations.</p>
                  </div>
                </div>
              </div>
              
              {/* ROI Forecaster */}
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                      <Camera className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-lg">ROI Forecaster Agent</h3>
                  </div>
                  
                  <div className="text-xs bg-black/30 px-3 py-1 rounded-full border border-white/5 flex items-center">
                    <span className="mr-1">⏰</span>
                    Updated 5m ago
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 tracking-wider">
                          Location
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 tracking-wider">
                          Property
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 tracking-wider">
                          Rent (AED)
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 tracking-wider">
                          Est. Value
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 tracking-wider">
                          ROI (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className={`${showAnimation ? 'animate-pulse' : ''}`}>
                        <td className="px-3 py-3 text-sm">
                          Dubai Marina
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-400">
                          DAMAC Heights, #1204
                        </td>
                        <td className="px-3 py-3 text-sm">
                          360,000
                        </td>
                        <td className="px-3 py-3 text-sm">
                          3,373,437
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span className="bg-green-500/20 text-green-400 text-xs py-1 px-3 rounded-full">
                            10.87
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 text-sm">
                          Dubailand
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-400">
                          Cherrywoods, Villa 42
                        </td>
                        <td className="px-3 py-3 text-sm">
                          200,000
                        </td>
                        <td className="px-3 py-3 text-sm">
                          2,078,637
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span className="bg-yellow-500/20 text-yellow-400 text-xs py-1 px-3 rounded-full">
                            9.62
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 text-sm">
                          Business Bay
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-400">
                          Executive Tower, #301
                        </td>
                        <td className="px-3 py-3 text-sm">
                          185,000
                        </td>
                        <td className="px-3 py-3 text-sm">
                          2,145,000
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span className="bg-yellow-500/20 text-yellow-400 text-xs py-1 px-3 rounded-full">
                            8.62
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Right sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trend Spotter */}
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                    <Camera className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Trend Spotter Agent</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 mr-2">
                        <span className="text-gray-400">📍</span>
                      </div>
                      <div>
                        <div className="font-medium">Dubai Marina</div>
                        <div className="text-sm text-gray-400">AED {marketData.dubaiMarina.rent.toFixed(0)}/sqft</div>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-500/20 text-green-400 text-xs py-1 px-2 rounded-full flex items-center">
                        ↑ +{marketData.dubaiMarina.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 mr-2">
                        <span className="text-gray-400">📍</span>
                      </div>
                      <div>
                        <div className="font-medium">JVC</div>
                        <div className="text-sm text-gray-400">AED {marketData.jvc.rent.toFixed(0)}/sqft</div>
                      </div>
                    </div>
                    <div>
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs py-1 px-2 rounded-full">
                        Hotspot
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 mr-2">
                        <span className="text-gray-400">📍</span>
                      </div>
                      <div>
                        <div className="font-medium">Downtown</div>
                        <div className="text-sm text-gray-400">AED {marketData.downtown.rent.toFixed(0)}/sqft</div>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-500/20 text-green-400 text-xs py-1 px-2 rounded-full flex items-center">
                        ↑ +{marketData.downtown.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Live Logs */}
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                  <div className="bg-red-500/20 p-1.5 rounded-lg mr-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  Live logs
                </h3>
                
                <div className="space-y-4">
                  {logs.map((log, index) => (
                    <div key={index} className={index < logs.length - 1 ? "pb-4 border-b border-white/5" : ""}>
                      <div className="text-sm text-gray-400 mb-1">
                        <span className="mr-1">⏰</span>
                        {log.time}
                      </div>
                      <div className="font-medium">{log.agent}</div>
                      <div className="text-sm text-gray-400 mt-1">{log.action}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Recommendations */}
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                  <div className="bg-blue-500/20 p-1.5 rounded-lg mr-2">
                    <Camera className="w-4 h-4 text-blue-400" />
                  </div>
                  Recommended Actions
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <div className="flex items-center mb-2">
                      <span className="text-red-400 mr-2">↓</span>
                      <span className="font-medium">Lower rent by 5%</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      For Al Barsha 2BRs to match current market demand
                    </p>
                    <button className="w-full py-1.5 px-3 rounded bg-blue-500/80 hover:bg-blue-500 transition-colors text-white text-sm">
                      Apply
                    </button>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">🗓️</span>
                      <span className="font-medium">Offer 1 month free</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      For new 12-month leases in Al Barsha 2BRs
                    </p>
                    <button className="w-full py-1.5 px-3 rounded bg-gray-700/80 hover:bg-gray-700 transition-colors text-white text-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 py-8 bg-black/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">Dubai AI Week Hackathon 2025 • Agentic AI Challenge</p>
        </div>
      </footer>
    </div>
  );
};

export default GebralDashboardShowcase;
