import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 animate-pulse"
        title="Toggle ChatBot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat iframe */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-zinc-900/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-zinc-800 animate-slide-in">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-between px-4">
            <span className="text-white font-semibold">Focus-Flow Bot</span>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/13/07/20250313072235-2VP9W9UQ.json"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 'none', marginTop: '8px' }}
            allow="microphone"
            className="pt-8"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;