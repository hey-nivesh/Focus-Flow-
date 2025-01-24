import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';

const DailyGoals: React.FC = () => {
  const { getCategoryCompletion } = useTaskContext();

  const categories = [
    { name: 'Work', bgClass: 'bg-blue-50 dark:bg-blue-900/20', textClass: 'text-blue-600 dark:text-blue-400' },
    { name: 'Learning', bgClass: 'bg-green-50 dark:bg-green-900/20', textClass: 'text-green-600 dark:text-green-400' },
    { name: 'Personal Growth', bgClass: 'bg-purple-50 dark:bg-purple-900/20', textClass: 'text-purple-600 dark:text-purple-400' },
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Daily Focus</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>{overallPercentage}% completed today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(category => {
          const { completed, total, percentage } = getCategoryCompletion(category.name);
          return (
            <div key={category.name} className={`${category.bgClass} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-2">
                <Target className={`w-5 h-5 ${category.textClass}`} />
                <span className={`text-sm font-medium ${category.textClass}`}>
                  {completed}/{total}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{percentage}% complete</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyGoals;