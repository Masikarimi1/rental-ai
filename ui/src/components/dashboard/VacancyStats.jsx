// /gebral-Estate/ui/src/components/dashboard/VacancyStats.jsx
import React from 'react';
import GlassCard from '../common/GlassCard';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

const VacancyStats = ({ 
  title, 
  value, 
  subtitle, 
  trendDirection = null, 
  trendValue = null 
}) => {
  return (
    <GlassCard className="flex flex-col">
      <div className="text-gray-light text-sm">{title}</div>
      <div className="text-4xl font-bold mt-2">{value}</div>
      
      {subtitle && (
        <div className="text-xs text-gray-light mt-1">{subtitle}</div>
      )}
      
      {trendDirection && (
        <div className={`flex items-center mt-2 text-sm ${
          trendDirection === 'up' ? 'text-success' : 'text-danger'
        }`}>
          {trendDirection === 'up' ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          <span>{trendValue || '3.2%'} from last month</span>
        </div>
      )}
    </GlassCard>
  );
};

export default VacancyStats;

