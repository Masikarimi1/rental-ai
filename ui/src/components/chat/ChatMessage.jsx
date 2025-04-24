// /gebral-Estate/ui/src/components/chat/ChatMessage.jsx
import React from 'react';
import { BoltIcon, UserCircleIcon } from '@heroicons/react/20/solid';

const ChatMessage = ({ message, persona, isMobile = false }) => {
  const { content, sender, timestamp } = message;
  
  const isUser = sender === 'user';
  // Format time for display
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Adjust sizes based on device
  const iconSize = isMobile ? 'w-4 h-4' : 'w-5 h-5';
  const avatarContainerSize = isMobile ? 'p-1' : 'p-1.5';
  const textSize = isMobile ? 'text-xs' : 'text-sm';
  const maxWidth = isMobile ? 'max-w-[90%]' : 'max-w-[80%] md:max-w-[70%]';
  
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className={`${maxWidth}`}>
          <div className="flex items-start justify-end mb-1">
            <div className="text-xs text-gray-light mr-2">{formattedTime}</div>
            <div className={`bg-primary/20 rounded-full ${avatarContainerSize}`}>
              <UserCircleIcon className={`${iconSize} text-primary-light`} />
            </div>
          </div>
          <div className="bg-primary/20 p-2 md:p-3 rounded-lg rounded-tr-none">
            <p className={textSize}>{content}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-start">
      <div className={`${maxWidth}`}>
        <div className="flex items-start mb-1">
          <div className={`bg-white/10 rounded-full ${avatarContainerSize} mr-2`}>
            <BoltIcon className={`${iconSize} text-primary-light`} />
          </div>
          <div className="text-xs text-gray-light">{formattedTime}</div>
        </div>
        <div className="bg-white/5 p-2 md:p-3 rounded-lg rounded-tl-none">
          <p className={textSize}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;