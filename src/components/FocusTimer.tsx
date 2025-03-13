import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

const FocusTimer: React.FC = () => {
  const [initialMinutes, setInitialMinutes] = useState(25);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

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
    <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-zinc-800 animate-fade-in">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-6">Focus Timer</h2>
      
      <div className="flex flex-col items-center">
        {/* Time Adjustment Controls */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => adjustTime(-5)}
            disabled={isActive}
            className="p-2 rounded-full bg-zinc-800 text-zinc-300 
                     hover:bg-zinc-700 hover:text-orange-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="text-lg font-medium text-white">
            {initialMinutes} min
          </div>
          <button
            onClick={() => adjustTime(5)}
            disabled={isActive}
            className="p-2 rounded-full bg-zinc-800 text-zinc-300 
                     hover:bg-zinc-700 hover:text-orange-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        {/* Control Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white 
                     hover:from-orange-600 hover:to-pink-600 shadow-lg
                     transition-all duration-300"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-zinc-800 rounded-full text-zinc-300 
                     hover:bg-zinc-700 hover:text-white
                     transition-all duration-300"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;