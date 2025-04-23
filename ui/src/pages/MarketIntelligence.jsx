// /gebral-Estate/ui/src/pages/MarketIntelligence.jsx
import React from 'react';
import NewsIntelligenceAgent from '../components/agents/NewsIntelligenceAgent';
import TrendSpotterAgent from '../components/agents/TrendSpotterAgent';
import ConstructionAnalyzerAgent from '../components/agents/ConstructionAnalyzerAgent';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { 
  ArrowPathIcon, 
  FunnelIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const MarketIntelligence = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Market Intelligence</h1>
          <p className="text-gray-light mt-1">Real-time analysis of market trends and signals</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-light flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            Last updated: 5 min ago
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            icon={FunnelIcon}
          >
            Filter
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
      
      <div className="flex items-center space-x-3 overflow-x-auto py-2">
        <Badge variant="primary" size="md" rounded="full">All Sources</Badge>
        <Badge variant="default" size="md" rounded="full">News</Badge>
        <Badge variant="default" size="md" rounded="full">Listings</Badge>
        <Badge variant="default" size="md" rounded="full">Development</Badge>
        <Badge variant="default" size="md" rounded="full">Government</Badge>
        <Badge variant="default" size="md" rounded="full">Regulations</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NewsIntelligenceAgent />
        </div>
        
        <div className="lg:col-span-1">
          <TrendSpotterAgent />
        </div>
        
        <div className="lg:col-span-1">
          <ConstructionAnalyzerAgent />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Regulatory Updates</h3>
          
          <div className="space-y-4">
            <div className="pb-4 border-b border-white/10">
              <div className="flex items-center">
                <Badge variant="info" size="sm" className="mr-2">New</Badge>
                <h4 className="font-medium">Dubai Land Department Fee Reduction</h4>
              </div>
              <p className="text-sm text-gray-light mt-1">
                Transfer fees reduced from 4% to 3% for first-time buyers of properties under AED 3 million.
              </p>
              <div className="text-xs text-gray-light mt-2">Effective from: April 15, 2025</div>
            </div>
            
            <div>
              <div className="flex items-center">
                <Badge variant="info" size="sm" className="mr-2">Upcoming</Badge>
                <h4 className="font-medium">New Rental Dispute Resolution Process</h4>
              </div>
              <p className="text-sm text-gray-light mt-1">
                Updated procedures for resolving rental disputes with expedited processing for cases under AED 100,000.
              </p>
              <div className="text-xs text-gray-light mt-2">Effective from: May 1, 2025</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Supply Pipeline</h3>
          
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Dubai Marina</span>
                  <span className="ml-2 text-xs text-gray-light">3,240 units</span>
                </div>
                <span className="text-sm font-medium text-primary-light">62%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                <div style={{ width: "62%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Downtown Dubai</span>
                  <span className="ml-2 text-xs text-gray-light">1,875 units</span>
                </div>
                <span className="text-sm font-medium text-primary-light">48%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                <div style={{ width: "48%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Jumeirah Village Circle</span>
                  <span className="ml-2 text-xs text-gray-light">4,120 units</span>
                </div>
                <span className="text-sm font-medium text-primary-light">76%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                <div style={{ width: "76%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Dubai Hills Estate</span>
                  <span className="ml-2 text-xs text-gray-light">2,890 units</span>
                </div>
                <span className="text-sm font-medium text-primary-light">31%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                <div style={{ width: "31%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
