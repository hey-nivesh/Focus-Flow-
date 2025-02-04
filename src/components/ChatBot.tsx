import React, { useState, useEffect, useRef } from 'react';
import { fetchChatResponse } from '../utils/geminiApi';
import { Send } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const cleanBotResponse = (response: string) => {
    return response
      .replace(/\*/g, '') // Remove Markdown-style asterisks
      .replace(/_/g, '')   // Remove underscores
      .trim();
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prevMessages) => [...prevMessages, { user: userMessage, bot: '...' }]);
      setInput('');

      console.log('Sending message to API:', userMessage);
      const botResponse = await fetchChatResponse(userMessage);
      console.log('Received response from API:', botResponse);

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, bot: cleanBotResponse(botResponse) } : msg
        )
      );

      setTimeout(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents new line in input
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-8 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">Focus-Flow Bot</h2>
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="flex flex-col space-y-3 max-h-96 overflow-y-auto mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900"
      >
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-1">
            {/* User Message */}
            <div className="self-end bg-blue-500 text-white px-4 py-3 rounded-2xl shadow-md max-w-[75%]">
              <p className="text-md">{msg.user}</p>
            </div>
            {/* Bot Message */}
            <div className="self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl shadow-md max-w-[75%]">
              <p className="text-md leading-relaxed">{msg.bot}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // 👈 Now handles Enter key
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-150 ease-in-out"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;