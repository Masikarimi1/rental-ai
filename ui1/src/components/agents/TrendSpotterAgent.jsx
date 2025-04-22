// /gebral-Estate/ui/src/components/agents/TrendSpotterAgent.jsx
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { ChartBarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon } from '@heroicons/react/20/solid';

const TrendSpotterAgent = ({ trends }) => {
  const defaultTrends = [
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
  ];

  const rentalTrends = trends || defaultTrends;
  
  // Find the location with the highest percentage rise
  const highestRise = rentalTrends.reduce((prev, current) => {
    if (current.change && (!prev.change || current.change > prev.change)) {
      return current;
    }
    return prev;
  }, rentalTrends[0]);

  return (
    <Card
      title="Emerging Rental Trends"
      subtitle="Updated 2 mins ago"
      icon={ChartBarIcon}
      className="h-full"
    >
      <div className="space-y-4">
        {rentalTrends.map((trend, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center ${
              index < rentalTrends.length - 1 ? 'pb-4 border-b border-white/10' : ''
            }`}
          >
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-gray-light mr-2" />
              <div>
                <div className="font-medium">{trend.location}</div>
                <div className="text-sm text-gray-light">{trend.rate}</div>
              </div>
            </div>
            <div>
              {trend.change !== null ? (
                <Badge variant="success" size="sm" rounded="full" className="flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +{trend.change}%
                </Badge>
              ) : (
                <Badge variant="warning" size="sm" rounded="full">
                  Hotspot
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-sm">
          {highestRise.location} saw the highest % rise in rent per sqft
        </p>
      </div>
    </Card>
  );
};

export default TrendSpotterAgent;
