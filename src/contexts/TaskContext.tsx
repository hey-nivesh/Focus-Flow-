import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getCategoryCompletion: (category: string) => {
    completed: number;
    total: number;
    percentage: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete project proposal', completed: false, category: 'Work' },
    { id: 2, title: 'Read 30 minutes', completed: false, category: 'Personal Growth' },
    { id: 3, title: 'Learn TypeScript basics', completed: true, category: 'Learning' },
  ]);

  const getCategoryCompletion = (category: string) => {
    const categoryTasks = tasks.filter(task => task.category === category);
    const completedTasks = categoryTasks.filter(task => task.completed);
    const total = categoryTasks.length;
    const completed = completedTasks.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { completed, total, percentage };
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, getCategoryCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};