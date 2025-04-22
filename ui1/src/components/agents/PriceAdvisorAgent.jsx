// /gebral-Estate/ui/src/components/agents/PriceAdvisorAgent.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { CurrencyDollarIcon, ArrowTrendingDownIcon, CheckIcon } from '@heroicons/react/24/outline';

const PriceAdvisorAgent = ({ property }) => {
  const [isApplied, setIsApplied] = useState(false);
  
  const defaultProperty = {
    address: 'Apartment 403, Al Barsha Heights',
    location: 'Al Barsha',
    current_rent: 85000,
    recommended_rent: 80750,
    recommendation_type: 'decrease',
    recommendation_percentage: 5,
    vacancy_days: 28,
    market_trend: 'declining',
    confidence: 'high'
  };
  
  const propertyData = property || defaultProperty;
  
  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would send the recommendation to the backend
  };

  return (
    <Card
      title="Price Advisor"
      subtitle="Rent optimization recommendation"
      icon={CurrencyDollarIcon}
    >
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-light mb-1">Property</div>
          <div className="font-medium">{propertyData.address}</div>
          <div className="text-sm text-gray-light">{propertyData.location}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-light mb-1">Current Rent</div>
            <div className="font-medium text-lg">AED {propertyData.current_rent.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-light mb-1">Recommended</div>
            <div className="font-medium text-lg text-primary-light">
              AED {propertyData.recommended_rent.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center mb-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-primary-light mr-2" />
            <div className="font-medium">
              {propertyData.recommendation_type === 'decrease' ? 'Decrease' : 'Increase'} rent by {propertyData.recommendation_percentage}%
            </div>
          </div>
          
          <div className="text-sm text-gray-light mb-3">
            {propertyData.vacancy_days > 0 ? (
              <span>Property vacant for {propertyData.vacancy_days} days. Market is {propertyData.market_trend}.</span>
            ) : (
              <span>Property currently occupied. Market is {propertyData.market_trend}.</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Badge 
              variant={propertyData.confidence === 'high' ? 'success' : 'warning'} 
              size="sm"
            >
              {propertyData.confidence.charAt(0).toUpperCase() + propertyData.confidence.slice(1)} confidence
            </Badge>
            
            {isApplied ? (
              <Badge variant="success" size="sm" icon={CheckIcon}>
                Applied
              </Badge>
            ) : (
              <Button size="sm" onClick={handleApply}>
                Apply Recommendation
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceAdvisorAgent;
