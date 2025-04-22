// /gebral-Estate/ui/src/components/agents/ROIForecasterAgent.jsx
import React from 'react';
import Card from '../common/Card';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import Badge from '../common/Badge';

const ROIForecasterAgent = ({ listings }) => {
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

  const propertyListings = listings || defaultListings;

  // Format currency values
  const formatCurrency = (value, currency = 'AED') => {
    if (currency === 'AED') {
      return value.toLocaleString('en-AE');
    }
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  // Determine ROI badge color
  const getRoiBadgeVariant = (roi) => {
    if (roi >= 8) return 'success';
    if (roi >= 5) return 'warning';
    return 'danger';
  };

  return (
    <Card
      title="ROI Forecaster Result"
      subtitle="Top Investment Listings by ROI"
      icon={CalculatorIcon}
      className="h-full"
    >
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
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {propertyListings.map((listing, index) => {
              const currency = listing.city === 'Springfield' ? 'USD' : 'AED';
              const isCurrencyAED = currency === 'AED';
              
              return (
                <tr key={index}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ROIForecasterAgent;
