import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';

const DailyGoals: React.FC = () => {
  const { getCategoryCompletion } = useTaskContext();

  const categories = [
    { name: 'Work', bgClass: 'bg-zinc-900/50', textClass: 'text-orange-500' },
    { name: 'Learning', bgClass: 'bg-zinc-900/50', textClass: 'text-pink-500' },
    { name: 'Personal Growth', bgClass: 'bg-zinc-900/50', textClass: 'text-purple-500' },
  ];

  const totalCompletion = categories.reduce((acc, category) => {
    const { completed, total } = getCategoryCompletion(category.name);
    return {
      completed: acc.completed + completed,
      total: acc.total + total,
    };
  }, { completed: 0, total: 0 });

  const overallPercentage = totalCompletion.total === 0 
    ? 0 
    : Math.round((totalCompletion.completed / totalCompletion.total) * 100);

  return (
    <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-zinc-800 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Daily Focus</h2>
        <div className="flex items-center space-x-2 text-sm text-zinc-400">
          <TrendingUp className="w-4 h-4" />
          <span>{overallPercentage}% completed today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(category => {
          const { completed, total, percentage } = getCategoryCompletion(category.name);
          return (
            <div key={category.name} className={`${category.bgClass} backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <Target className={`w-5 h-5 ${category.textClass}`} />
                <span className={`text-sm font-medium ${category.textClass}`}>
                  {completed}/{total}
                </span>
              </div>
              <h3 className="font-medium text-white">{category.name}</h3>
              <p className="text-sm text-zinc-400">{percentage}% complete</p>
              
              {/* Progress bar */}
              <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyGoals;