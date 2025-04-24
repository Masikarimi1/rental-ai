// /gebral-Estate/ui/src/components/chat/ChatMessage.jsx
import React from 'react';
import { BoltIcon, UserCircleIcon } from '@heroicons/react/20/solid';

const ChatMessage = ({ message, persona }) => {
  const { content, sender, timestamp } = message;
  
  const isUser = sender === 'user';
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] md:max-w-[70%]">
          <div className="flex items-start justify-end mb-1">
            <div className="text-xs text-gray-light mr-2">{formattedTime}</div>
            <div className="bg-primary/20 rounded-full p-1">
              <UserCircleIcon className="w-5 h-5 text-primary-light" />
            </div>
          </div>
          <div className="bg-primary/20 p-3 rounded-lg rounded-tr-none">
            <p className="text-sm">{content}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] md:max-w-[70%]">
        <div className="flex items-start mb-1">
          <div className="bg-white/10 rounded-full p-1 mr-2">
            <BoltIcon className="w-5 h-5 text-primary-light" />
          </div>
          <div className="text-xs text-gray-light">{formattedTime}</div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg rounded-tl-none">
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;