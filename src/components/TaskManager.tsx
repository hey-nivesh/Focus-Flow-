import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { useTaskContext, Task } from '../contexts/TaskContext';

const TaskManager: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');

  const categories = ['Work', 'Personal Growth', 'Learning'];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle.trim(),
        completed: false,
        category: newTaskCategory,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-zinc-800 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Tasks</h2>
        <button 
          onClick={() => setIsAddingTask(true)}
          className="p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700 transition-all duration-300"
        >
          <Plus className="w-5 h-5 text-orange-500" />
        </button>
      </div>

      {isAddingTask && (
        <div className="mb-4 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 animate-slide-in">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
              autoFocus
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-white focus:border-orange-500 transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 
                     group hover:border-orange-500/50 transition-all duration-300 animate-fade-in"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${task.completed 
                  ? 'border-orange-500 bg-orange-500' 
                  : 'border-zinc-600'
                }`}
            >
              {task.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className={`ml-3 flex-1 text-zinc-300
              ${task.completed ? 'line-through text-zinc-500' : ''}`}>
              {task.title}
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-300 mr-3">
              {task.category}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 
                       hover:text-pink-500 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;