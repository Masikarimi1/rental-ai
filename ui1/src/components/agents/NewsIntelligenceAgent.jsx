// /gebral-Estate/ui/src/components/agents/NewsIntelligenceAgent.jsx
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { NewspaperIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { LinkIcon } from '@heroicons/react/20/solid';

const NewsIntelligenceAgent = ({ newsItem }) => {
  const {
    source = 'Gulf News',
    headline = 'Dubai launches new Green Metro Corridor',
    link = 'https://www.gulfnews.com/article-12345',
    signal_category = 'Infrastructure',
    impact_area = 'Dubai Marina, U-D Marino',
    agent_summary = 'Rents expected to rise due to metro expansion in Dubai Marina'
  } = newsItem || {};

  return (
    <Card 
      title="New Signal Identified"
      icon={NewspaperIcon}
      className="h-full"
    >
      <div className="flex items-center mb-3">
        <div className="bg-info/10 text-info rounded-full p-1.5">
          <NewspaperIcon className="w-5 h-5" />
        </div>
        <span className="ml-2 text-gray-light text-sm">{source}</span>
      </div>
      
      <h3 className="font-medium text-lg mb-3">{headline}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="info" icon={LinkIcon} size="sm">
          {signal_category}
        </Badge>
        
        <Badge variant="primary" icon={MapPinIcon} size="sm">
          {impact_area.split(',')[0]}
        </Badge>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-sm text-gray-light mb-1">AGENT INSIGHT</div>
        <p>{agent_summary}</p>
      </div>
    </Card>
  );
};

export default NewsIntelligenceAgent;
