// /gebral-Estate/ui/src/components/agents/ROIForecasterAgent.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CalculatorIcon, ArrowPathIcon, MapPinIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useAgentPolling } from '@hooks/useAgentPolling';
import { formatCurrency, formatDate } from '@utils/formatting';

const ROIForecasterAgent = ({ initialListings }) => {
  const { data, isLoading, lastUpdated, fetchData } = useAgentPolling('roi-forecaster', 300000); // 5 min polling
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState('roi'); // 'roi', 'rent', 'value'
  const [showDetail, setShowDetail] = useState(null);
  
  const defaultListings = [
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
  ];

  // Update listings when data changes
  useEffect(() => {
    if (data?.topListings && data.topListings.length > 0) {
      setListings(data.topListings);
    } else if (initialListings) {
      setListings(initialListings);
    } else {
      setListings(defaultListings);
    }
  }, [data, initialListings]);
  
  // Sort listings based on current sort criteria
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'roi') return b.roi - a.roi;
    if (sortBy === 'rent') return b.rent - a.rent;
    if (sortBy === 'value') return b.estimated_value - a.estimated_value;
    return 0;
  });

  // Determine ROI badge color
  const getRoiBadgeVariant = (roi) => {
    if (roi >= 8) return 'success';
    if (roi >= 5) return 'warning';
    return 'danger';
  };
  
  // Calculate average ROI
  const averageRoi = listings.length 
    ? listings.reduce((sum, listing) => sum + listing.roi, 0) / listings.length 
    : 0;

  return (
    <Card
      title="ROI Forecaster Result"
      subtitle={lastUpdated ? `Updated ${formatDate(lastUpdated, 'relative')}` : 'Analyzing investment opportunities'}
      icon={CalculatorIcon}
      className="h-full"
      headerClassName="flex justify-between items-center"
      headerContent={
        <div className="flex items-center space-x-2">
          <div className="text-xs bg-white/10 px-2 py-1 rounded">
            Avg ROI: <span className="font-medium text-primary-light">{averageRoi.toFixed(2)}%</span>
          </div>
          <button 
            onClick={fetchData} 
            className="p-1 rounded-full hover:bg-white/10 text-gray-light"
            disabled={isLoading}
          >
            <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <div className="flex mb-4 space-x-2 border-b border-white/10 pb-2">
        <Button 
          size="xs" 
          variant={sortBy === 'roi' ? 'primary' : 'ghost'} 
          onClick={() => setSortBy('roi')}
        >
          Sort by ROI
        </Button>
        <Button 
          size="xs" 
          variant={sortBy === 'rent' ? 'primary' : 'ghost'} 
          onClick={() => setSortBy('rent')}
        >
          Sort by Rent
        </Button>
        <Button 
          size="xs" 
          variant={sortBy === 'value' ? 'primary' : 'ghost'} 
          onClick={() => setSortBy('value')}
        >
          Sort by Value
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                Address
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                Location
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                Rent
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                Est. Value
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-light tracking-wider">
                ROI (%)
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-light tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {sortedListings.map((listing, index) => {
              const currency = listing.city === 'Springfield' ? 'USD' : 'AED';
              const isCurrencyAED = currency === 'AED';
              
              return (
                <React.Fragment key={index}>
                  <tr className={`transition-colors duration-300 ${showDetail === index ? 'bg-white/5' : ''}`}>
                    <td className="px-3 py-3 text-sm">
                      <div className="line-clamp-1 font-medium">{listing.address}</div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-light">
                      {listing.location}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      {isCurrencyAED ? formatCurrency(listing.rent) : formatCurrency(listing.rent, 'USD')}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      {isCurrencyAED ? formatCurrency(listing.estimated_value) : formatCurrency(listing.estimated_value, 'USD')}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge 
                        variant={getRoiBadgeVariant(listing.roi)} 
                        size="sm" 
                        rounded="full"
                        className="min-w-[60px] text-center"
                      >
                        {listing.roi.toFixed(2)}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-sm">
                      <button
                        onClick={() => setShowDetail(showDetail === index ? null : index)}
                        className="p-1 rounded-full hover:bg-white/10 text-gray-light"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  
                  {showDetail === index && (
                    <tr className="bg-white/5">
                      <td colSpan="6" className="px-3 py-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-light mb-1">Location Details</div>
                            <div className="flex items-center text-sm">
                              <MapPinIcon className="w-4 h-4 mr-1 text-gray-light" />
                              {listing.location}, {listing.city}
                            </div>
                            <div className="mt-2 text-sm text-gray-light">
                              Market trend: <span className="text-primary-light">Rising</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-light mb-1">Investment Analysis</div>
                            <div className="text-sm">
                              Yield: <span className="text-primary-light">{listing.roi.toFixed(2)}%</span>
                            </div>
                            <div className="text-sm">
                              Payback period: <span className="text-primary-light">{Math.round(100 / listing.roi)} years</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button size="xs" variant="outline">
                            Full Analysis
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {listings.length === 0 && (
        <div className="text-center py-4 text-gray-light">
          No property listings available
        </div>
      )}
    </Card>
  );
};

export default ROIForecasterAgent;