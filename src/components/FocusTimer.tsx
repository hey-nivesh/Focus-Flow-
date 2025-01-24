import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

const FocusTimer: React.FC = () => {
  const [initialMinutes, setInitialMinutes] = useState(25);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  const adjustTime = (amount: number) => {
    if (!isActive) {
      const newTime = Math.max(1, initialMinutes + amount);
      setInitialMinutes(newTime);
      setMinutes(newTime);
      setSeconds(0);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Focus Timer</h2>
      
      <div className="flex flex-col items-center">
        {/* Time Adjustment Controls */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => adjustTime(-5)}
            disabled={isActive}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 
                     dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition duration-150 ease-in-out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {initialMinutes} min
          </div>
          <button
            onClick={() => adjustTime(5)}
            disabled={isActive}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 
                     dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition duration-150 ease-in-out"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        {/* Control Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="p-4 bg-blue-500 rounded-full text-white hover:bg-blue-600 
                     transition duration-150 ease-in-out"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 
                     dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 
                     transition duration-150 ease-in-out"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;