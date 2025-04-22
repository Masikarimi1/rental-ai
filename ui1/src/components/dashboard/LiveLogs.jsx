// /gebral-Estate/ui/src/components/dashboard/LiveLogs.jsx
import React from 'react';
import GlassCard from '../common/GlassCard';
import { ClockIcon } from '@heroicons/react/20/solid';

const logs = [
  {
    time: '8:45 AM',
    agent: 'StrategyAgent',
    action: 'Recommended offering 1 month free on Al Barsha 2BRs'
  },
  {
    time: '8:42 AM',
    agent: 'InsightAgent',
    action: 'Identified extended vacancy trend for Al Barsha 2BRs'
  },
  {
    time: '8:40 AM',
    agent: 'ScrapeAgent',
    action: 'Monitored Al Barsha market for new listings'
  }
];

const LiveLogs = () => {
  return (
    <GlassCard>
      <h3 className="font-semibold mb-4">Live logs</h3>
      
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className={index < logs.length - 1 ? "pb-4 border-b border-white/10" : ""}>
            <div className="text-sm text-gray-light mb-1">
              <ClockIcon className="w-4 h-4 inline mr-1" />
              {log.time}
            </div>
            <div className="font-medium">{log.agent}</div>
            <div className="text-sm text-gray-light mt-1">{log.action}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default LiveLogs;