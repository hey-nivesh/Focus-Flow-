import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, PieChartIcon } from 'lucide-react';

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
    { name: 'Work', value: 40, color: '#F97316' }, // orange-500
    { name: 'Learning', value: 30, color: '#EC4899' }, // pink-500
    { name: 'Personal Growth', value: 20, color: '#8B5CF6' }, // violet-500
    { name: 'Other', value: 10, color: '#6B7280' }, // gray-500
  ];

  return (
    <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-zinc-800 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Productivity Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              timeframe === 'week'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              timeframe === 'month'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Task Completion Rate */}
      <div className="mb-8 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
        <h3 className="text-lg font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Task Completion Rate
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeframe === 'week' ? weeklyData : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={timeframe === 'week' ? 'day' : 'week'} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#ffffff' }} />
              <Legend />
              <Bar dataKey="completed" fill="#F97316" name="Completed Tasks" />
              <Bar dataKey="total" fill="#EC4899" name="Total Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Trend */}
      <div className="mb-8 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
        <h3 className="text-lg font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Productivity Trend
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeframe === 'week' ? weeklyData : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={timeframe === 'week' ? 'day' : 'week'} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#ffffff' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#F97316"
                name="Completed Tasks"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
        <h3 className="text-lg font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
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
              <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#ffffff' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;