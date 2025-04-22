// /gebral-Estate/ui/src/pages/PropertyAnalysis.jsx
import React from 'react';
import ROIForecasterAgent from '../components/agents/ROIForecasterAgent';
import PriceAdvisorAgent from '../components/agents/PriceAdvisorAgent';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  BanknotesIcon,
  HomeIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

const PropertyAnalysis = () => {
  // Sample property data for demonstration
  const propertySummary = {
    totalProperties: 143,
    occupiedUnits: 125,
    vacantUnits: 18,
    averageRent: 95600,
    revenueAtRisk: 1540000,
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Property Analysis</h1>
          <p className="text-gray-light mt-1">Optimize your portfolio performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-light" />
            <input
              type="text"
              placeholder="Search properties..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-white placeholder-gray-light"
            />
          </div>
          
          <Button
            variant="outline"
            size="md"
            icon={AdjustmentsHorizontalIcon}
          >
            Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <GlassCard className="md:col-span-1">
          <div className="flex flex-col h-full">
            <h3 className="font-semibold mb-4">Portfolio Summary</h3>
            
            <div className="space-y-4 flex-1">
              <div>
                <div className="text-sm text-gray-light mb-1">Total Properties</div>
                <div className="text-3xl font-bold">{propertySummary.totalProperties}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-light mb-1">Occupied</div>
                  <div className="text-xl font-semibold">{propertySummary.occupiedUnits}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-light mb-1">Vacant</div>
                  <div className="text-xl font-semibold">{propertySummary.vacantUnits}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-light mb-1">Average Rent</div>
                <div className="text-xl font-semibold">
                  AED {propertySummary.averageRent.toLocaleString()}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-light mb-1">Revenue at Risk</div>
                <div className="text-xl font-semibold text-warning">
                  AED {propertySummary.revenueAtRisk.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button variant="outline" size="sm" fullWidth icon={ArrowsRightLeftIcon}>
                Compare Periods
              </Button>
            </div>
          </div>
        </GlassCard>
        
        <div className="md:col-span-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ROIForecasterAgent />
            <PriceAdvisorAgent />
          </div>
          
          <GlassCard>
            <h3 className="font-semibold mb-4">Hotspot Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-success/20 p-1.5 rounded-full mr-2">
                    <HomeIcon className="w-4 h-4 text-success" />
                  </div>
                  <div className="font-medium">High Yield Areas</div>
                </div>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Dubai Marina</span>
                    </div>
                    <Badge variant="success" size="sm">10.87%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">JVC</span>
                    </div>
                    <Badge variant="success" size="sm">9.62%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Business Bay</span>
                    </div>
                    <Badge variant="success" size="sm">8.95%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-warning/20 p-1.5 rounded-full mr-2">
                    <BanknotesIcon className="w-4 h-4 text-warning" />
                  </div>
                  <div className="font-medium">Rental Growth</div>
                </div>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Dubai Marina</span>
                    </div>
                    <Badge variant="warning" size="sm">+12.3%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Downtown</span>
                    </div>
                    <Badge variant="warning" size="sm">+8.7%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Dubai Hills</span>
                    </div>
                    <Badge variant="warning" size="sm">+7.2%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-danger/20 p-1.5 rounded-full mr-2">
                    <HomeIcon className="w-4 h-4 text-danger" />
                  </div>
                  <div className="font-medium">Vacancy Hotspots</div>
                </div>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Al Barsha</span>
                    </div>
                    <Badge variant="danger" size="sm">28 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Jumeirah Lake Towers</span>
                    </div>
                    <Badge variant="danger" size="sm">22 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-light mr-1" />
                      <span className="text-sm">Silicon Oasis</span>
                    </div>
                    <Badge variant="danger" size="sm">19 days</Badge>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalysis;
