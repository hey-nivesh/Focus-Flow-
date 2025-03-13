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
    <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-zinc-800 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Schedule</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700 
                   transition-all duration-300"
        >
          <Plus className="w-5 h-5 text-orange-500" />
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-800">
        <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-all duration-300">
          <ChevronLeft className="w-5 h-5 text-zinc-400 hover:text-orange-500" />
        </button>
        <h3 className="text-lg font-medium text-white">
          {formatDate(selectedDate)}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-all duration-300">
          <ChevronRight className="w-5 h-5 text-zinc-400 hover:text-orange-500" />
        </button>
      </div>

      {/* Add Event Form */}
      {showAddEvent && (
        <div className="mb-6 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 animate-slide-in">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 rounded-lg border border-zinc-700 
                       bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="p-2 rounded-lg border border-zinc-700 
                         bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
              />
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className="p-2 rounded-lg border border-zinc-700 
                         bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                className="p-2 rounded-lg border border-zinc-700 
                         bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
              />
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                className="p-2 rounded-lg border border-zinc-700 
                         bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 rounded-lg text-zinc-400 
                         hover:bg-zinc-800 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg 
                         hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
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
              className="flex items-center p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800
                       hover:border-orange-500/50 transition-all duration-300 group"
            >
              <button
                onClick={() => toggleEventCompletion(event.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${event.completed 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-zinc-600'
                  }`}
              >
                {event.completed && <Clock className="w-3 h-3 text-white" />}
              </button>
              <div className="ml-3 flex-1">
                <h4 className={`font-medium ${
                  event.completed ? 'text-zinc-500 line-through' : 'text-white'
                }`}>
                  {event.title}
                </h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-zinc-400">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.startTime} - {event.endTime}</span>
                  <span className="px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
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