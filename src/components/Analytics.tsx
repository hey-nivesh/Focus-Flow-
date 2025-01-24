import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  // Sample data - In a real app, this would come from your backend
  const weeklyData = [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 12, total: 15 },
    { day: 'Wed', completed: 5, total: 8 },
    { day: 'Thu', completed: 9, total: 12 },
    { day: 'Fri', completed: 7, total: 10 },
    { day: 'Sat', completed: 4, total: 5 },
    { day: 'Sun', completed: 3, total: 4 },
  ];

  const monthlyData = [
    { week: 'Week 1', completed: 35, total: 45 },
    { week: 'Week 2', completed: 42, total: 50 },
    { week: 'Week 3', completed: 28, total: 40 },
    { week: 'Week 4', completed: 38, total: 45 },
  ];

  const categoryData = [
    { name: 'Work', value: 40, color: '#3B82F6' },
    { name: 'Learning', value: 30, color: '#10B981' },
    { name: 'Personal Growth', value: 20, color: '#8B5CF6' },
    { name: 'Other', value: 10, color: '#6B7280' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Productivity Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              timeframe === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              timeframe === 'month'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Task Completion Rate */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Task Completion Rate
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeframe === 'week' ? weeklyData : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeframe === 'week' ? 'day' : 'week'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#3B82F6" name="Completed Tasks" />
              <Bar dataKey="total" fill="#93C5FD" name="Total Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Productivity Trend
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeframe === 'week' ? weeklyData : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeframe === 'week' ? 'day' : 'week'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3B82F6"
                name="Completed Tasks"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Category Distribution
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;