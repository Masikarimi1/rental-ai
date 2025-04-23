// /gebral-Estate/ui/src/pages/personas/ManagerDashboard.jsx
import React from 'react';
import GlassCard from '../../components/common/GlassCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import TrendChart from '../../components/dashboard/TrendChart';
import PriceAdvisorAgent from '../../components/agents/PriceAdvisorAgent';
import LiveLogs from '../../components/dashboard/LiveLogs';
import { 
  ArrowPathIcon, 
  AdjustmentsHorizontalIcon, 
  ClockIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const ManagerDashboard = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Property Manager Dashboard</h1>
          <p className="text-gray-light mt-1">Optimize occupancy and rental income</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            icon={AdjustmentsHorizontalIcon}
          >
            Filters
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Occupancy Rate</div>
          <div className="text-4xl font-bold mt-2">88%</div>
          <div className="text-xs text-gray-light mt-1">Market avg: 83%</div>
          <div className="flex items-center mt-2 text-sm text-success">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            <span>Above target</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Vacancy Rate</div>
          <div className="text-4xl font-bold mt-2">12%</div>
          <div className="text-xs text-gray-light mt-1">18 units vacant</div>
          <div className="flex items-center mt-2 text-sm text-warning">
            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
            <span>Al Barsha: High</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Average Vacancy Duration</div>
          <div className="text-4xl font-bold mt-2">17</div>
          <div className="text-xs text-gray-light mt-1">Days to fill vacancy</div>
          <div className="flex items-center mt-2 text-sm text-danger">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>+3 days vs target</span>
          </div>
        </GlassCard>
        
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Occupancy & Pricing Trends</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={ArrowPathIcon}
                >
                  Refresh
                </Button>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={AdjustmentsHorizontalIcon}
                >
                  Filter
                </Button>
              </div>
            </div>
            
            <TrendChart />
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
                <span className="text-gray-light mr-4">Occupancy Rate</span>
                
                <span className="inline-block w-3 h-3 rounded-full bg-warning mr-2"></span>
                <span className="text-gray-light mr-4">Rental Price</span>
                
                <span className="inline-block w-3 h-3 rounded-full bg-success mr-2"></span>
                <span className="text-gray-light">Market Average</span>
              </div>
            </div>
          </GlassCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <GlassCard>
              <div className="flex items-center mb-4">
                <UsersIcon className="w-5 h-5 text-primary-light mr-2" />
                <h3 className="font-semibold">Tenant Profile Matching</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Unit 403, Al Barsha</div>
                    <Badge variant="warning" size="sm">Vacant 28 days</Badge>
                  </div>
                  <p className="text-sm text-gray-light mb-3">
                    Best matched to small families or professional couples
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="info" size="sm">Dubizzle Pro</Badge>
                    <Badge variant="info" size="sm">Property Finder</Badge>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Unit 1204, Dubai Marina</div>
                    <Badge variant="warning" size="sm">Vacant 14 days</Badge>
                  </div>
                  <p className="text-sm text-gray-light mb-3">
                    Target expatriate professionals with premium budgets
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="info" size="sm">Premium Listings</Badge>
                    <Badge variant="info" size="sm">Corporate Partners</Badge>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard>
              <div className="flex items-center mb-4">
                <ChartBarIcon className="w-5 h-5 text-primary-light mr-2" />
                <h3 className="font-semibold">Renewal Risk Analysis</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Unit 702, Downtown</div>
                    <Badge variant="danger" size="sm">High Risk</Badge>
                  </div>
                  <p className="text-sm text-gray-light mb-3">
                    Tenant complained about maintenance issues 3 times
                  </p>
                  <Button variant="outline" size="sm">
                    Priority Maintenance
                  </Button>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Unit 505, JVC</div>
                    <Badge variant="success" size="sm">Low Risk</Badge>
                  </div>
                  <p className="text-sm text-gray-light mb-3">
                    Tenant indicated intent to renew at current rate
                  </p>
                  <Button variant="outline" size="sm">
                    Send Renewal Agreement
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="border-l-4 border-warning">
            <div className="flex items-start">
              <div className="p-2 bg-warning/20 rounded-full mr-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-medium">2BRs in Al Barsha showing extended vacancy</h3>
                <p className="text-sm text-gray-light mt-1">
                  Two-bedroom apartments in Al Barsha have been vacant for an average of 28 days, which is 40% longer than market average.
                </p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline">
                    Lower Rent
                  </Button>
                  <Button size="sm" variant="outline">
                    Offer Incentives
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <PriceAdvisorAgent />
          
          <LiveLogs />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
