import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  completed: boolean;
}

const Schedule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    category: 'Work'
  });

  const categories = ['Work', 'Learning', 'Personal Growth', 'Meeting', 'Break'];

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.startTime && newEvent.endTime) {
      setEvents([...events, {
        id: Date.now(),
        ...newEvent,
        completed: false
      }]);
      setShowAddEvent(false);
      setNewEvent({ title: '', date: '', startTime: '', endTime: '', category: 'Work' });
    }
  };

  const toggleEventCompletion = (id: number) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Schedule</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 
                   dark:hover:bg-blue-900/40 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {formatDate(selectedDate)}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Add Event Form */}
      {showAddEvent && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 
                         hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 transition-colors duration-200"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events
          .filter(event => new Date(event.date).getMonth() === selectedDate.getMonth())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(event => (
            <div
              key={event.id}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg 
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <button
                onClick={() => toggleEventCompletion(event.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${event.completed 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                {event.completed && <Clock className="w-3 h-3 text-white" />}
              </button>
              <div className="ml-3 flex-1">
                <h4 className={`font-medium ${
                  event.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {event.title}
                </h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.startTime} - {event.endTime}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600">
                    {event.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;