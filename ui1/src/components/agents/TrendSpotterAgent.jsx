// /gebral-Estate/ui/src/components/agents/TrendSpotterAgent.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { ChartBarIcon, MapPinIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon, FireIcon } from '@heroicons/react/20/solid';
import { useAgentPolling } from '@hooks/useAgentPolling';
import { formatDate, formatPercentage } from '@utils/formatting';

const TrendSpotterAgent = ({ initialTrends }) => {
  const { data, isLoading, lastUpdated, fetchData } = useAgentPolling('trend-spotter', 300000); // 5 min polling
  const [trends, setTrends] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  
  const defaultTrends = [
    {
      location: 'Dubai Marina',
      rate: 'AED 156/sqft',
      rateValue: 156,
      change: 12.3,
      isHotspot: false
    },
    {
      location: 'JVC',
      rate: 'AED 132/sqft',
      rateValue: 132,
      change: null,
      isHotspot: true
    },
    {
      location: 'Downtown',
      rate: 'AED 148/sqft',
      rateValue: 148,
      change: 8.7,
      isHotspot: false
    }
  ];

  // Update trends when data changes
  useEffect(() => {
    if (data?.trends && data.trends.length > 0) {
      setTrends(data.trends);
      
      // Flash highlight on updated values
      if (trends.length > 0) {
        // Find index of trend with the largest change
        const maxChangeIndex = data.trends.reduce((maxIdx, curr, idx, arr) => {
          if (!arr[maxIdx]?.change) return idx;
          if (!curr.change) return maxIdx;
          return curr.change > arr[maxIdx].change ? idx : maxIdx;
        }, 0);
        
        setHighlightIndex(maxChangeIndex);
        setTimeout(() => setHighlightIndex(null), 3000);
      }
    } else if (initialTrends) {
      setTrends(initialTrends);
    } else {
      setTrends(defaultTrends);
    }
  }, [data, initialTrends]);
  
  // Find trend with the highest percentage rise
  const highestRiseTrend = trends.reduce((prev, current) => {
    if (current.change && (!prev.change || current.change > prev.change)) {
      return current;
    }
    return prev;
  }, trends[0] || {});
  
  // Find hotspot trends
  const hotspotTrends = trends.filter(trend => trend.isHotspot);
  
  // Prepare a recommendation based on trends
  const getRecommendation = () => {
    if (highestRiseTrend && highestRiseTrend.change > 10) {
      return `${highestRiseTrend.location} is showing strong price growth at ${formatPercentage(highestRiseTrend.change, 1, true)}. Consider reassessing portfolio allocation.`;
    } else if (hotspotTrends.length > 0) {
      return `${hotspotTrends[0].location} is identified as an emerging hotspot. Monitor for early investment opportunities.`;
    } else if (highestRiseTrend) {
      return `${highestRiseTrend.location} showed the highest price appreciation at ${formatPercentage(highestRiseTrend.change, 1, true)}.`;
    }
    return 'Market appears stable across monitored areas.';
  };

  return (
    <Card
      title="Trend Spotter Agent"
      subtitle={lastUpdated ? `Updated ${formatDate(lastUpdated, 'relative')}` : 'Analyzing market trends'}
      icon={ChartBarIcon}
      className="h-full"
      headerClassName="flex justify-between items-center"
      headerContent={
        <button 
          onClick={fetchData} 
          className="p-1 rounded-full hover:bg-white/10 text-gray-light"
          disabled={isLoading}
        >
          <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      }
    >
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center transition-all duration-300 ${
              highlightIndex === index ? 'bg-primary/20 -mx-3 px-3 py-1 rounded-lg' : ''
            } ${index < trends.length - 1 ? 'pb-4 border-b border-white/10' : ''}`}
          >
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-gray-light mr-2" />
              <div>
                <div className="font-medium">{trend.location}</div>
                <div className="text-sm text-gray-light flex items-center">
                  {trend.rate}
                  {trend.isHotspot && (
                    <span className="ml-2 text-warning flex items-center">
                      <FireIcon className="w-3 h-3 mr-1" />
                      Emerging
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              {trend.change !== null ? (
                <Badge 
                  variant={trend.change > 0 ? "success" : "danger"} 
                  size="sm" 
                  rounded="full" 
                  className="flex items-center"
                >
                  {trend.change > 0 ? (
                    <ArrowUpIcon className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 mr-1" />
                  )}
                  {formatPercentage(Math.abs(trend.change), 1, trend.change > 0)}
                </Badge>
              ) : (
                <Badge variant="warning" size="sm" rounded="full" icon={FireIcon}>
                  Hotspot
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-sm text-gray-light mb-2">AGENT INSIGHT</div>
        <p className="text-sm">
          {getRecommendation()}
        </p>
      </div>
    </Card>
  );
};

export default TrendSpotterAgent;