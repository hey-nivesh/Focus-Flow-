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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tasks</h2>
        <button 
          onClick={() => setIsAddingTask(true)}
          className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 
                   dark:hover:bg-blue-900/40 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {isAddingTask && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 
                         hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 transition-colors duration-200"
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
            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg 
                     group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${task.completed 
                  ? 'border-green-500 bg-green-500' 
                  : 'border-gray-300 dark:border-gray-600'
                }`}
            >
              {task.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className={`ml-3 flex-1 text-gray-700 dark:text-gray-300
              ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
              {task.title}
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-600 
                           text-gray-600 dark:text-gray-300 mr-3">
              {task.category}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 
                       hover:text-red-500 transition-all duration-200"
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