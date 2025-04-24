// ui/src/components/dashboard/LiveLogs.jsx
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

      // Only allow changing feedback if different from current
      if (log.feedback === type) {
        // Toggle off if clicking the same feedback
        setLogs(prevLogs => 
          prevLogs.map(log => 
            log.id === logId 
              ? { ...log, feedback: null } 
              : log
          )
        );
        return;
      }

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

  const submitFeedback = async (logId) => {
    if (!feedbackText.trim()) return;

    const log = logs.find((l) => l.id === logId);
    if (!log) return;
    
    const agentName = log?.agent || 'UnknownAgent';
    const rating = log.feedback === 'up' ? 'like' : 'dislike';

    try {
      await sendAgentFeedback({
        agent_name: agentName,
        rating: rating,
        message: feedbackText.trim(),
      });
      
      console.log("Detailed feedback submitted successfully");
      setExpandedFeedback(null);
      setFeedbackText('');
    } catch (error) {
      console.error("Error submitting detailed feedback:", error);
    }
  };

  return (
    <GlassCard className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-deeper/30 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <div className="relative mr-2">
            <div className="w-2 h-2 bg-primary rounded-full absolute"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
          Live logs
        </h3>
        
        <button 
          onClick={fetchData}
          className="text-xs text-gray-light hover:text-white transition-colors duration-200 
                     hover:bg-white/10 px-2 py-1 rounded flex items-center"
          disabled={isLoading}
        >
          <span className="mr-1">Refresh</span>
          <svg className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
            <path fill="currentColor" d="M12 20v2a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8Z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="text-center py-4 text-gray-light animate-pulse">
            No logs available
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={log.id || index} 
              className={`${index < logs.length - 1 ? "pb-4 border-b border-white/10" : ""} 
                          transition-all duration-300 ${expandedFeedback === log.id ? 'bg-white/5 p-3 -mx-3 rounded-lg' : ''}`}
            >
              <div className="text-sm text-gray-light mb-1 flex justify-between">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  {log.time}
                </div>
                
                {/* Thumbs up/down buttons */}
                <div className="flex space-x-2">
                  <button 
                    className={`p-1 rounded transition-all duration-200 
                                ${log.feedback === 'up' 
                                  ? 'text-success bg-success/10 feedback-btn liked' 
                                  : 'text-gray-light hover:bg-white/10 feedback-btn'}`}
                    onClick={() => handleFeedbackClick('up', log.id)}
                    type="button"
                    aria-label="Like"
                  >
                    <HandThumbUpIcon className={`w-4 h-4 transform transition-transform ${log.feedback === 'up' ? 'scale-110' : ''}`} />
                  </button>
                  <button 
                    className={`p-1 rounded transition-all duration-200 
                                ${log.feedback === 'down' 
                                  ? 'text-danger bg-danger/10 feedback-btn disliked' 
                                  : 'text-gray-light hover:bg-white/10 feedback-btn'}`}
                    onClick={() => handleFeedbackClick('down', log.id)}
                    type="button"
                    aria-label="Dislike"
                  >
                    <HandThumbDownIcon className={`w-4 h-4 transform transition-transform ${log.feedback === 'down' ? 'scale-110' : ''}`} />
                  </button>
                  <button 
                    className={`p-1 rounded transition-all duration-200 
                                ${expandedFeedback === log.id 
                                  ? 'text-primary bg-primary/10 feedback-btn active' 
                                  : 'text-gray-light hover:bg-white/10 feedback-btn'}`}
                    onClick={() => toggleFeedbackInput(log.id)}
                    type="button"
                    aria-label={expandedFeedback === log.id ? "Close feedback" : "Add feedback"}
                  >
                    {expandedFeedback === log.id ? (
                      <XMarkIcon className="w-4 h-4 animate-scale" />
                    ) : (
                      <span className="text-xs">Feedback</span>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="font-medium">{log.agent}</div>
              <div className="text-sm text-gray-light mt-1">{log.action}</div>
              
              {/* Feedback input area with animation */}
              {expandedFeedback === log.id && (
                <div className="mt-2 relative animate-slide-in">
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-1 px-2 text-sm focus:outline-none focus:border-primary-light transition-colors duration-200"
                    placeholder="Add your feedback..."
                    rows="2"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  ></textarea>
                  <button 
                    className="absolute right-2 bottom-2 text-primary hover:text-primary-light transition-colors duration-200"
                    onClick={() => submitFeedback(log.id)}
                    disabled={!feedbackText.trim()}
                  >
                    <PaperAirplaneIcon className={`w-4 h-4 transition-transform duration-200 
                                                  ${feedbackText.trim() ? 'transform hover:translate-x-1' : 'opacity-50'}`} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
};

export default LiveLogs;