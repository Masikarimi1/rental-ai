// /gebral-Estate/ui/src/pages/personas/InvestorDashboard.jsx
import React from 'react';
import GlassCard from '../../components/common/GlassCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import TrendChart from '../../components/dashboard/TrendChart';
import ROIForecasterAgent from '../../components/agents/ROIForecasterAgent';
import NewsIntelligenceAgent from '../../components/agents/NewsIntelligenceAgent';
import { 
  ArrowPathIcon, 
  PlusIcon, 
  MapPinIcon, 
  ChartBarIcon,
  EyeIcon,
  ChevronDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const InvestorDashboard = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Investor Dashboard</h1>
          <p className="text-gray-light mt-1">Portfolio performance and acquisition opportunities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            icon={PlusIcon}
          >
            Add Property
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
          <div className="text-gray-light text-sm">Total Portfolio Value</div>
          <div className="text-4xl font-bold mt-2">AED 28.6M</div>
          <div className="text-xs text-gray-light mt-1">12 properties</div>
          <div className="flex items-center mt-2 text-sm text-success">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+4.2% from last quarter</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Annual Rental Income</div>
          <div className="text-4xl font-bold mt-2">AED 1.65M</div>
          <div className="text-xs text-gray-light mt-1">AED 137,500 monthly average</div>
          <div className="flex items-center mt-2 text-sm text-success">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+3.8% from last year</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
          <div className="text-gray-light text-sm">Average ROI</div>
          <div className="text-4xl font-bold mt-2">5.76%</div>
          <div className="text-xs text-gray-light mt-1">Market average: 4.9%</div>
          <div className="flex items-center mt-2 text-sm text-success">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+0.8% above market</span>
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Portfolio Performance</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-light">Past 12 months</span>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  icon={ChevronDownIcon}
                >
                  Change
                </Button>
              </div>
            </div>
            
            <TrendChart />
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-light mb-1">Best Performer</div>
                  <div className="font-medium">Dubai Marina</div>
                  <div className="text-sm text-success">+11.2% ROI</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-light mb-1">Worst Performer</div>
                  <div className="font-medium">Jumeirah Village</div>
                  <div className="text-sm text-danger">+2.1% ROI</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-light mb-1">Acquisition Pipeline</div>
                  <div className="font-medium">3 Properties</div>
                  <div className="text-sm text-primary-light">Due diligence phase</div>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <div className="grid grid-cols-2 gap-6 mt-6">
            <GlassCard className="border-l-4 border-success">
              <div className="flex items-start">
                <div className="p-2 bg-success/20 rounded-full mr-3">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-medium">Opportunity Alert</h3>
                  <p className="text-sm text-gray-light mt-1">
                    Properties in Dubai Marina have price-to-yield ratios 8% below historical averages.
                  </p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" icon={EyeIcon}>View Listings</Button>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="border-l-4 border-info">
              <div className="flex items-start">
                <div className="p-2 bg-info/20 rounded-full mr-3">
                  <ChartBarIcon className="w-5 h-5 text-info" />
                </div>
                <div>
                  <h3 className="font-medium">Market Analysis</h3>
                  <p className="text-sm text-gray-light mt-1">
                    Dubai Marina shows 12.3% higher appreciation than Downtown over the past quarter.
                  </p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" icon={EyeIcon}>View Analysis</Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <h3 className="font-semibold mb-4">Global Market Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-light mr-2" />
                  <span>Dubai, UAE</span>
                </div>
                <Badge variant="success" size="sm">10.87% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-light mr-2" />
                  <span>London, UK</span>
                </div>
                <Badge variant="warning" size="sm">3.2% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-light mr-2" />
                  <span>New York, USA</span>
                </div>
                <Badge variant="warning" size="sm">3.8% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-light mr-2" />
                  <span>Singapore</span>
                </div>
                <Badge variant="warning" size="sm">4.1% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-light mr-2" />
                  <span>Sydney, Australia</span>
                </div>
                <Badge variant="warning" size="sm">4.5% ROI</Badge>
              </div>
            </div>
          </GlassCard>
          
          <NewsIntelligenceAgent />
        </div>
      </div>
      
      <ROIForecasterAgent />
    </div>
  );
};

export default InvestorDashboard;
