// ui1/src/components/dashboard/LiveLogs.jsx
import React, { useState, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { 
  ClockIcon, 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  XMarkIcon, 
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline';
import { useAgentPolling } from '@hooks/useAgentPolling';
import { formatDate } from '@utils/formatting';
import { sendChatQuery, sendAgentFeedback } from '@utils/api';

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const { data, isLoading, fetchData } = useAgentPolling('chat', 60000); // 1 min polling for logs
  
  // Default logs to show while loading
  const defaultLogs = [
    {
      id: 1,
      time: '8:45 AM',
      agent: 'StrategyAgent',
      action: 'Recommended offering 1 month free on Al Barsha 2BRs',
      feedback: null
    },
    {
      id: 2,
      time: '8:42 AM',
      agent: 'InsightAgent',
      action: 'Identified extended vacancy trend for Al Barsha 2BRs',
      feedback: null
    },
    {
      id: 3,
      time: '8:40 AM',
      agent: 'ScrapeAgent',
      action: 'Monitored Al Barsha market for new listings',
      feedback: null
    }
  ];

  // Update logs when data changes
  useEffect(() => {
    if (data?.logs && data.logs.length > 0) {
      // Transform the data to match our logs structure if needed
      const formattedLogs = data.logs.map(log => ({
        id: log.id || Date.now() + Math.random(),
        time: formatDate(log.timestamp || new Date(), 'time'),
        agent: log.agent || 'System',
        action: log.message || log.action,
        feedback: log.feedback || null
      }));
      setLogs(formattedLogs);
    } else {
      setLogs(defaultLogs);
    }
  }, [data]);

  const handleFeedbackClick = async (type, logId) => {
    try {
      // Find the log
      const log = logs.find((l) => l.id === logId);
      if (!log) return;

      // Update UI immediately
      setLogs(prevLogs => 
        prevLogs.map(log => 
          log.id === logId 
            ? { ...log, feedback: type } 
            : log
        )
      );

      // Send feedback to API
      const agentName = log.agent || 'UnknownAgent';
      const rating = type === 'up' ? 'like' : 'dislike';

      const response = await sendAgentFeedback({
        agent_name: agentName,
        rating: rating,
        message: `User ${rating === 'like' ? 'liked' : 'disliked'} the recommendation`,
      });

      console.log("Feedback submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Revert UI state on error
      setLogs(prevLogs => 
        prevLogs.map(log => 
          log.id === logId 
            ? { ...log, feedback: null } 
            : log
        )
      );
    }
  };

  const toggleFeedbackInput = (logId) => {
    if (expandedFeedback === logId) {
      setExpandedFeedback(null);
      setFeedbackText('');
    } else {
      setExpandedFeedback(logId);
      setFeedbackText('');
    }
  };

  const submitFeedback = (logId) => {
    if (!feedbackText.trim()) return;

    const log = logs.find((l) => l.id === logId);
    const agentName = log?.agent || 'UnknownAgent';
    const rating = log.feedback === 'up' ? 'like' : 'dislike';

    sendAgentFeedback({
      agent_name: agentName,
      rating: rating,
      message: feedbackText.trim(),
    })
      .then((response) => {
        console.log("Feedback submitted:", response);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });

    setExpandedFeedback(null);
    setFeedbackText('');
  };

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live logs</h3>
        
        {isLoading ? (
          <div className="animate-pulse text-xs text-gray-light">Updating...</div>
        ) : (
          <button 
            onClick={fetchData}
            className="text-xs text-gray-light hover:text-white"
          >
            Refresh
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={log.id || index} className={index < logs.length - 1 ? "pb-4 border-b border-white/10" : ""}>
            <div className="text-sm text-gray-light mb-1 flex justify-between">
              <div>
                <ClockIcon className="w-4 h-4 inline mr-1" />
                {log.time}
              </div>
              
              {/* Thumbs up/down buttons */}
              <div className="flex space-x-2">
                <button 
                  className={`p-1 rounded hover:bg-white/10 ${log.feedback === 'up' ? 'text-success' : 'text-gray-light'}`}
                  onClick={() => handleFeedbackClick('up', log.id)}
                  type="button"
                >
                  <HandThumbUpIcon className="w-4 h-4" />
                </button>
                <button 
                  className={`p-1 rounded hover:bg-white/10 ${log.feedback === 'down' ? 'text-danger' : 'text-gray-light'}`}
                  onClick={() => handleFeedbackClick('down', log.id)}
                  type="button"
                >
                  <HandThumbDownIcon className="w-4 h-4" />
                </button>
                <button 
                  className="p-1 rounded hover:bg-white/10 text-gray-light"
                  onClick={() => toggleFeedbackInput(log.id)}
                  type="button"
                >
                  {expandedFeedback === log.id ? (
                    <XMarkIcon className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">Feedback</span>
                  )}
                </button>
              </div>
            </div>
            
            <div className="font-medium">{log.agent}</div>
            <div className="text-sm text-gray-light mt-1">{log.action}</div>
            
            {/* Feedback input area */}
            {expandedFeedback === log.id && (
              <div className="mt-2 relative">
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-1 px-2 text-sm focus:outline-none focus:border-primary-light"
                  placeholder="Add your feedback..."
                  rows="2"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
                <button 
                  className="absolute right-2 bottom-2 text-primary hover:text-primary-light"
                  onClick={() => submitFeedback(log.id)}
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
        
        {logs.length === 0 && (
          <div className="text-center py-4 text-gray-light">
            No logs available
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default LiveLogs;