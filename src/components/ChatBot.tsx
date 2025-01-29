import React, { useState } from 'react';
import { fetchChatResponse } from '../utils/geminiApi';
import { Send } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { user: userMessage, bot: '...' }]);
      setInput('');

      console.log('Sending message to API:', userMessage);
      const response = await fetchChatResponse(userMessage);
      console.log('Received response from API:', response);
      if (response) {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, bot: response.reply } : msg
          )
        );
      } else {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, bot: 'Error: No response from API' } : msg
          )
        );
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">ChatBot</h2>
      <div className="flex flex-col space-y-4 max-h-80 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col">
            <div className="self-end bg-blue-500 text-white p-3 rounded-lg mb-2 max-w-xs">
              <p>{msg.user}</p>
            </div>
            <div className="self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg max-w-xs">
              <p>{msg.bot}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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