// ui/src/components/agents/PriceAdvisorAgent.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { 
  CurrencyDollarIcon, 
  ArrowTrendingDownIcon, 
  ArrowTrendingUpIcon, 
  CheckIcon,
  ChartBarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAgentPolling } from '@hooks/useAgentPolling';
import { formatCurrency, formatDate } from '@utils/formatting';
import LiveUpdateNotification from '../common/LiveUpdateNotification';
import { sendAgentFeedback } from '@utils/api';

const PriceAdvisorAgent = ({ initialProperty }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMarketContext, setShowMarketContext] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showApprovalAlert, setShowApprovalAlert] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { data, isLoading, lastUpdated, fetchData } = useAgentPolling('price-advisor', 300000); // 5 min polling
  const [property, setProperty] = useState(null);
  
  const defaultProperty = {
    address: 'Apartment 403, Al Barsha Heights',
    location: 'Al Barsha',
    current_rent: 85000,
    recommended_rent: 80750,
    recommendation_type: 'decrease',
    recommendation_percentage: 5,
    vacancy_days: 28,
    market_trend: 'declining',
    confidence: 'high',
    market_context: {
      average_days_vacant: 16,
      similar_properties: 12,
      occupancy_rate: 82,
      price_trend_3m: -3.2
    }
  };

  // Update property when data changes
  useEffect(() => {
    if (data?.property) {
      setProperty(data.property);
    } else if (initialProperty) {
      setProperty(initialProperty);
    } else {
      setProperty(defaultProperty);
    }
  }, [data, initialProperty]);

  // Set default property if nothing provided
  useEffect(() => {
    if (!property) {
      setProperty(defaultProperty);
    }
  }, []);
  
  const handleApply = () => {
    // Check if discount percentage requires manager approval
    if (property.recommendation_type === 'decrease' && property.recommendation_percentage > 5) {
      setShowApprovalAlert(true);
      return;
    }
    
    applyRecommendation();
  };
  
  const applyRecommendation = async () => {
    try {
      setIsApplying(true);
      
      // Simulate API call latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsApplied(true);
      setShowNotification(true);
      setShowApprovalAlert(false);
      
      // Send feedback to the API about the applied recommendation
      await sendAgentFeedback({
        agent_name: 'PriceAdvisorTool',
        rating: 'like',
        message: feedbackText.trim() || `Applied ${property.recommendation_percentage}% ${property.recommendation_type} recommendation for ${property.address}`
      });
      
      console.log("Applied recommendation with feedback:", feedbackText);
      
      // Reset feedback text after submission
      setFeedbackText('');
    } catch (error) {
      console.error("Error applying recommendation:", error);
      // Show error notification if needed
    } finally {
      setIsApplying(false);
    }
  };

  // If property is null, show loading
  if (!property) {
    return (
      <Card
        title="Price Advisor"
        subtitle="Loading recommendations..."
        icon={CurrencyDollarIcon}
      >
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <>
      {showNotification && (
        <LiveUpdateNotification 
          message="Price recommendation applied successfully! Rental listing has been updated."
          type="success"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <Card
        title="Price Advisor"
        subtitle={lastUpdated ? `Updated ${formatDate(lastUpdated, 'relative')}` : 'Analyzing market data'}
        icon={CurrencyDollarIcon}
        className="relative"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-dark-deeper/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <span className="text-sm">Updating recommendation...</span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="animate-slide-in">
            <div className="text-sm text-gray-light mb-1">Property</div>
            <div className="font-medium">{property.address}</div>
            <div className="text-sm text-gray-light">{property.location}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-sm text-gray-light mb-1">Current Rent</div>
              <div className="font-medium text-lg">
                {formatCurrency(property.current_rent)}
              </div>
            </div>
            
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-sm text-gray-light mb-1">Recommended</div>
              <div className="font-medium text-lg text-primary-light">
                {formatCurrency(property.recommended_rent)}
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 border border-white/10 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-2">
              {property.recommendation_type === 'decrease' ? (
                <ArrowTrendingDownIcon className="w-5 h-5 text-primary-light mr-2" />
              ) : (
                <ArrowTrendingUpIcon className="w-5 h-5 text-success mr-2" />
              )}
              <div className="font-medium">
                {property.recommendation_type === 'decrease' ? 'Decrease' : 'Increase'} rent by {property.recommendation_percentage}%
              </div>
            </div>
            
            <div className="text-sm text-gray-light mb-3">
              {property.vacancy_days > 0 ? (
                <div className="flex items-start">
                  <ClockIcon className="w-4 h-4 text-warning mr-2 flex-shrink-0 mt-0.5" />
                  <span>Property vacant for {property.vacancy_days} days. Market is {property.market_trend}.</span>
                </div>
              ) : (
                <div className="flex items-start">
                  <BuildingOfficeIcon className="w-4 h-4 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Property currently occupied. Market is {property.market_trend}.</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Badge 
                variant={property.confidence === 'high' ? 'success' : 'warning'} 
                size="sm"
                glow={property.confidence === 'high'}
              >
                {property.confidence.charAt(0).toUpperCase() + property.confidence.slice(1)} confidence
              </Badge>
              
              {isApplied ? (
                <Badge variant="success" size="sm" icon={CheckIcon} pulse={true}>
                  Applied
                </Badge>
              ) : (
                <Button 
                  size="sm" 
                  onClick={handleApply} 
                  isLoading={isApplying}
                  animationEffect="scale"
                >
                  Apply Recommendation
                </Button>
              )}
            </div>
            
            {/* Feedback textarea */}
            {!isApplied && (
              <div className="mt-4 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm 
                            focus:outline-none focus:border-primary-light transition-colors duration-200"
                  placeholder="Why did you apply or ignore this recommendation?"
                  rows="3"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
            )}
            
            {/* Manager approval alert */}
            {showApprovalAlert && (
              <div className="mt-4 bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-start animate-slide-in">
                <ExclamationTriangleIcon className="w-5 h-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Manager Approval Required</p>
                  <p className="text-xs text-gray-light mt-1">
                    This recommendation exceeds the 5% threshold and requires manager approval.
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button size="xs" variant="outline" onClick={() => setShowApprovalAlert(false)}>
                      Cancel
                    </Button>
                    <Button size="xs" variant="warning" onClick={applyRecommendation}>
                      Request Approval
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
            <button 
              className="flex items-center text-sm text-gray-light hover:text-white transition-colors duration-200 group"
              onClick={() => setShowMarketContext(!showMarketContext)}
            >
              <ChartBarIcon className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
              {showMarketContext ? 'Hide market context' : 'Show market context'}
            </button>
            
            {showMarketContext && property.market_context && (
              <div className="mt-3 bg-white/5 rounded-lg p-3 border border-white/10 text-sm animate-slide-in">
                <div className="grid grid-cols-2 gap-y-2">
                  <div>
                    <span className="text-gray-light">Avg. vacancy:</span>
                    <span className="ml-2">{property.market_context.average_days_vacant} days</span>
                  </div>
                  <div>
                    <span className="text-gray-light">Similar properties:</span>
                    <span className="ml-2">{property.market_context.similar_properties}</span>
                  </div>
                  <div>
                    <span className="text-gray-light">Occupancy rate:</span>
                    <span className="ml-2">{property.market_context.occupancy_rate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-light">3-month trend:</span>
                    <span className={`ml-2 ${property.market_context.price_trend_3m >= 0 ? 'text-success' : 'text-danger'}`}>
                      {property.market_context.price_trend_3m > 0 ? '+' : ''}
                      {property.market_context.price_trend_3m}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default PriceAdvisorAgent;