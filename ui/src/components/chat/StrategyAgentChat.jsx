// /gebral-Estate/ui/src/components/chat/StrategyAgentChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, MicrophoneIcon, PlusIcon } from '@heroicons/react/24/outline';
import { BoltIcon } from '@heroicons/react/20/solid';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import ChatMessage from './ChatMessage';
import { usePersona } from '@hooks/usePersona';
import { sendChatQuery } from '@utils/api';

const StrategyAgentChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentPersona } = usePersona();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample suggestions based on persona
  const getSuggestions = () => {
    switch (currentPersona.id) {
      case 'investor':
        return [
          "What's the best area to invest in right now?",
          "Compare ROI between Dubai Marina and Downtown",
          "Predict market trends for the next 6 months"
        ];
      case 'manager':
        return [
          "How should I price vacant units in Al Barsha?",
          "What's causing the extended vacancy in JVC?",
          "When should I offer rent-free periods?"
        ];
      case 'developer':
        return [
          "Analyze the impact of the new metro line",
          "Compare development costs between areas",
          "What amenities are trending in new properties?"
        ];
      default:
        return [
          "What are the current market trends?",
          "How can I optimize my rental pricing?",
          "Analyze recent property listings"
        ];
    }
  };

  const suggestions = getSuggestions();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Adjust height for mobile devices
  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial height
    adjustHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', adjustHeight);
    window.addEventListener('orientationchange', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
      window.removeEventListener('orientationchange', adjustHeight);
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Send message to API and get response
      const response = await sendChatQuery(inputValue.trim());
      
      // Create agent message from API response
      const agentMessage = {
        id: Date.now() + 1,
        content: response.result || "I'm sorry, I couldn't process that request.",
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(error.message || "Network error. Please check your connection and try again.");
      
      // Create error message
      const errorMessage = {
        id: Date.now() + 1,
        content: "I'm sorry, there was an error processing your request. Please try again.",
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Focus the input
    document.getElementById('chat-input')?.focus();
  };

  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] h-[calc(var(--vh, 1vh) * 100 - 9rem)]">
      <GlassCard className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-white/10">
          <div className="flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-2 md:mr-3">
              <BoltIcon className="w-5 h-5 text-primary-light" />
            </div>
            <div>
              <h2 className="font-semibold">Strategy Agent</h2>
              <p className="text-xs text-gray-light">AI assistant for real estate decisions</p>
            </div>
          </div>
          
          {errorMessage && (
            <div className="hidden md:block text-xs text-danger bg-danger/10 px-2 py-1 rounded">
              Connection error
            </div>
          )}
        </div>
        
        {/* Show error message on mobile */}
        {errorMessage && isMobile && (
          <div className="md:hidden text-xs text-danger bg-danger/10 px-3 py-2 text-center">
            {errorMessage}
          </div>
        )}
        
        <div 
          className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4"
          ref={chatContainerRef}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-2 md:px-4">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BoltIcon className="w-8 h-8 md:w-10 md:h-10 text-primary-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Strategy Agent Chat</h3>
              <p className="text-gray-light max-w-md mb-6 text-sm md:text-base">
                Ask questions about market trends, pricing strategies, or investment opportunities. I'll provide tailored insights based on real-time data.
              </p>
              
              <div className="grid grid-cols-1 gap-2 max-w-md w-full">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-left p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm md:text-base"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  persona={currentPersona}
                  isMobile={isMobile}
                />
              ))}
              
              {isTyping && (
                <div className="flex items-center text-gray-light text-sm">
                  <div className="bg-white/10 rounded-full p-2 mr-2">
                    <BoltIcon className="w-4 h-4 text-primary-light" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="animate-pulse-subtle h-2 w-2 rounded-full bg-gray-light"></div>
                    <div className="animate-pulse-subtle h-2 w-2 rounded-full bg-gray-light" style={{ animationDelay: '0.2s' }}></div>
                    <div className="animate-pulse-subtle h-2 w-2 rounded-full bg-gray-light" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        
        <div className="p-3 md:p-4 border-t border-white/10">
          <div className="relative">
            <textarea
              id="chat-input"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-3 pr-12 py-2 md:pl-4 md:pr-12 md:py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-white placeholder-gray-light resize-none text-sm md:text-base"
              placeholder="Ask a question..."
              rows={isMobile ? "1" : "2"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            
            <div className="absolute right-2 bottom-2 flex items-center space-x-1 md:space-x-2">
              {!isMobile && (
                <>
                  <button className="p-1 md:p-2 rounded-full hover:bg-white/10 text-gray-light">
                    <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="p-1 md:p-2 rounded-full hover:bg-white/10 text-gray-light">
                    <MicrophoneIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </>
              )}
              <button 
                className="p-1.5 md:p-2 rounded-full bg-primary hover:bg-primary-dark text-white disabled:opacity-50"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
              >
                <PaperAirplaneIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default StrategyAgentChat;