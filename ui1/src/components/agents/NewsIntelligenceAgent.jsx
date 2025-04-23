// /gebral-Estate/ui/src/components/agents/NewsIntelligenceAgent.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { NewspaperIcon, MapPinIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { LinkIcon, ClockIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { useAgentPolling } from '@hooks/useAgentPolling';
import { formatDate } from '@utils/formatting';

const NewsIntelligenceAgent = ({ initialNewsItem }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const { data, isLoading, lastUpdated, fetchData } = useAgentPolling('news-intelligence', 300000); // 5 min polling
  const [newsItems, setNewsItems] = useState([]);
  const [hasNewSignal, setHasNewSignal] = useState(false);
  
  // Initialize with initial data or empty object
  const defaultNewsItem = {
    source: 'Gulf News',
    headline: 'Dubai launches new Green Metro Corridor',
    link: 'https://www.gulfnews.com/article-12345',
    signal_category: 'Infrastructure',
    impact_area: 'Dubai Marina, U-D Marino',
    agent_summary: 'Rents expected to rise due to metro expansion in Dubai Marina',
    timestamp: new Date()
  };

  // Update news items when data changes
  useEffect(() => {
    if (data?.latestSignals && data.latestSignals.length > 0) {
      // Check if we have new signals that aren't in our current list
      const currentIds = newsItems.map(item => item.id || item.headline);
      const hasNew = data.latestSignals.some(item => !currentIds.includes(item.id || item.headline));
      
      setNewsItems(data.latestSignals);
      if (hasNew && newsItems.length > 0) {
        setHasNewSignal(true);
        setTimeout(() => setHasNewSignal(false), 5000);
      }
    } else if (initialNewsItem) {
      setNewsItems([initialNewsItem]);
    } else {
      setNewsItems([defaultNewsItem]);
    }
  }, [data, initialNewsItem]);

  // Rotate through news items every 10 seconds if there are multiple
  useEffect(() => {
    if (newsItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentNewsIndex(prevIndex => (prevIndex + 1) % newsItems.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Get current news item to display
  const currentNews = newsItems[currentNewsIndex] || defaultNewsItem;

  // Split impact areas
  const impactAreas = currentNews.impact_area ? currentNews.impact_area.split(',').map(area => area.trim()) : [];
  
  return (
    <Card 
      title="News Intelligence Agent"
      subtitle={`${newsItems.length} signals found`}
      icon={NewspaperIcon}
      className={`h-full transition-all duration-300 ${hasNewSignal ? 'border-primary animate-pulse' : ''}`}
      headerClassName="flex justify-between items-center"
      headerContent={
        <div className="flex items-center">
          <span className="text-xs text-gray-light flex items-center mr-2">
            <ClockIcon className="w-3 h-3 mr-1" />
            {lastUpdated ? formatDate(lastUpdated, 'relative') : 'Just now'}
          </span>
          <button 
            onClick={fetchData} 
            className="p-1 rounded-full hover:bg-white/10 text-gray-light"
            disabled={isLoading}
          >
            <ArrowPathIcon className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <div className="relative">
        {newsItems.length > 1 && (
          <div className="absolute -top-8 right-0 flex space-x-1">
            {newsItems.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${currentNewsIndex === index ? 'bg-primary' : 'bg-white/20'}`}
                onClick={() => setCurrentNewsIndex(index)}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center mb-3">
          <div className="bg-info/10 text-info rounded-full p-1.5">
            <NewspaperIcon className="w-5 h-5" />
          </div>
          <span className="ml-2 text-gray-light text-sm">{currentNews.source}</span>
          <span className="ml-auto text-xs text-gray-light">
            {currentNews.timestamp ? formatDate(currentNews.timestamp, 'relative') : 'Recent'}
          </span>
        </div>
        
        <h3 className="font-medium text-lg mb-3">{currentNews.headline}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info" icon={LinkIcon} size="sm">
            {currentNews.signal_category}
          </Badge>
          
          {impactAreas.map((area, index) => (
            <Badge key={index} variant="primary" icon={MapPinIcon} size="sm">
              {area}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-sm text-gray-light mb-1">AGENT INSIGHT</div>
          <p className="text-base">{currentNews.agent_summary}</p>
          
          {currentNews.link && (
            <a 
              href={currentNews.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-sm text-primary-light hover:text-primary transition-colors"
            >
              View full article
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewsIntelligenceAgent;