// /gebral-Estate/ui/src/pages/personas/DeveloperDashboard.jsx
import React from 'react';
import GlassCard from '../../components/common/GlassCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import TrendChart from '../../components/dashboard/TrendChart';
import ConstructionAnalyzerAgent from '../../components/agents/ConstructionAnalyzerAgent';
import { 
  ArrowPathIcon, 
  DocumentTextIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

const DeveloperDashboard = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Developer CFO Dashboard</h1>
          <p className="text-gray-light mt-1">Project analysis and investment forecasting</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            icon={DocumentTextIcon}
          >
            Reports
          </Button>
          
          <Button 
            variant="primary" 
            size="sm" 
            icon={ArrowPathIcon}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Active Projects</div>
          <div className="text-4xl font-bold mt-2">6</div>
          <div className="text-xs text-gray-light mt-1">3,850 total units</div>
          <div className="flex items-center mt-2 text-sm text-primary-light">
            <BuildingOfficeIcon className="w-4 h-4 mr-1" />
            <span>2 completing this year</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Total Investment</div>
          <div className="text-4xl font-bold mt-2">AED 5.2B</div>
          <div className="text-xs text-gray-light mt-1">Development pipeline</div>
          <div className="flex items-center mt-2 text-sm text-primary-light">
            <CurrencyDollarIcon className="w-4 h-4 mr-1" />
            <span>AED 1.8B committed</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Average IRR</div>
          <div className="text-4xl font-bold mt-2">18.6%</div>
          <div className="text-xs text-gray-light mt-1">Across all projects</div>
          <div className="flex items-center mt-2 text-sm text-success">
            <ChartBarIcon className="w-4 h-4 mr-1" />
            <span>+2.4% above target</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Permitting Status</div>
          <div className="text-4xl font-bold mt-2">3</div>
          <div className="text-xs text-gray-light mt-1">Projects pending approval</div>
          <div className="flex items-center mt-2 text-sm text-warning">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>Est. 45 days remaining</span>
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Project Performance</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={ArrowPathIcon}
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Project Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Location
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Units
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Completion
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Budget (AED)
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      IRR
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium">Marina Heights</td>
                    <td className="px-3 py-3 text-sm text-gray-light">Dubai Marina</td>
                    <td className="px-3 py-3 text-sm">360</td>
                    <td className="px-3 py-3 text-sm">Q3 2025</td>
                    <td className="px-3 py-3 text-sm">980M</td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="success" size="sm">21.4%</Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="warning" size="sm">Construction</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium">Downtown Vista</td>
                    <td className="px-3 py-3 text-sm text-gray-light">Downtown</td>
                    <td className="px-3 py-3 text-sm">285</td>
                    <td className="px-3 py-3 text-sm">Q1 2026</td>
                    <td className="px-3 py-3 text-sm">1.2B</td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="success" size="sm">19.8%</Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="warning" size="sm">Construction</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium">Creek Residences</td>
                    <td className="px-3 py-3 text-sm text-gray-light">Dubai Creek</td>
                    <td className="px-3 py-3 text-sm">520</td>
                    <td className="px-3 py-3 text-sm">Q4 2025</td>
                    <td className="px-3 py-3 text-sm">1.5B</td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="warning" size="sm">16.2%</Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="primary" size="sm">Planning</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium">JVC Garden Homes</td>
                    <td className="px-3 py-3 text-sm text-gray-light">JVC</td>
                    <td className="px-3 py-3 text-sm">145</td>
                    <td className="px-3 py-3 text-sm">Q2 2025</td>
                    <td className="px-3 py-3 text-sm">420M</td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="success" size="sm">22.1%</Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant="warning" size="sm">Construction</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <GlassCard>
              <div className="flex items-center mb-4">
                <PresentationChartLineIcon className="w-5 h-5 text-primary-light mr-2" />
                <h3 className="font-semibold">Scenario Simulator</h3>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-light mb-2">Impact of Construction Cost Change</div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-light">-10%</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-light">+10%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    defaultValue="0"
                    className="w-full appearance-none bg-white/10 h-2 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-light mb-2">Impact of Sales Price Change</div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-light">-10%</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-light">+10%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    defaultValue="0"
                    className="w-full appearance-none bg-white/10 h-2 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-sm text-gray-light mb-1">IRR Impact</div>
                  <div className="text-xl font-bold text-primary-light">+1.8%</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-light mb-1">ROI Impact</div>
                  <div className="text-xl font-bold text-primary-light">+2.3%</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="outline" size="sm" fullWidth>
                  Run Detailed Simulation
                </Button>
              </div>
            </GlassCard>
            
            <GlassCard>
              <div className="flex items-center mb-4">
                <MapPinIcon className="w-5 h-5 text-primary-light mr-2" />
                <h3 className="font-semibold">Zone Performance</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Dubai Marina</span>
                    <Badge variant="success" size="sm">High Performance</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-light">IRR: </span>
                      <span>21.4%</span>
                    </div>
                    <div>
                      <span className="text-gray-light">ROI: </span>
                      <span>10.87%</span>
                    </div>
                  </div>
                </div>
                
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Downtown Dubai</span>
                    <Badge variant="success" size="sm">High Performance</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-light">IRR: </span>
                      <span>19.8%</span>
                    </div>
                    <div>
                      <span className="text-gray-light">ROI: </span>
                      <span>9.62%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">JVC</span>
                    <Badge variant="warning" size="sm">Medium Performance</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-light">IRR: </span>
                      <span>16.2%</span>
                    </div>
                    <div>
                      <span className="text-gray-light">ROI: </span>
                      <span>7.85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <h3 className="font-semibold mb-4">Regulatory Opportunity</h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-white/10">
                <div className="flex items-center mb-2">
                  <Badge variant="success" size="sm" className="mr-2">New</Badge>
                  <h4 className="font-medium">Reduced Transfer Fees</h4>
                </div>
                <p className="text-sm text-gray-light mb-3">
                  Transfer fees reduced from 4% to 3% for first-time buyers of properties under AED 3 million.
                </p>
                <div className="text-sm text-success">
                  Potential impact: Increased sales velocity for projects under AED 3M price point.
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Badge variant="info" size="sm" className="mr-2">Upcoming</Badge>
                  <h4 className="font-medium">Increased Plot Ratio in JVC</h4>
                </div>
                <p className="text-sm text-gray-light mb-3">
                  New zoning allows increased plot ratio in JVC District 12, effective June 2025.
                </p>
                <div className="text-sm text-primary-light">
                  Potential impact: 15-20% increase in buildable area for qualifying plots.
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    Review Plots
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <ConstructionAnalyzerAgent />
        </div>
      </div>
    </div>
  );
};

import { ClockIcon } from '@heroicons/react/24/outline';

export default DeveloperDashboard;