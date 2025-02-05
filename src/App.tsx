import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Search,
  Clock,
  BookOpen,
  BarChart2,
  Settings,
  Moon,
  Sun,
  Target,
  Timer,
  List,
  Menu,
  Home,
  Volume2
} from 'lucide-react';
import TaskManager from './components/TaskManager';
import FocusTimer from './components/FocusTimer';
import SearchBar from './components/SearchBar';
import DailyGoals from './components/DailyGoals';
import Schedule from './components/Schedule';
import Analytics from './components/Analytics';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import { Notes } from './components/Notes';
import { NotesManager } from './components/NotesManager';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotesProvider } from './contexts/NotesContext';
import ChatBot from './components/ChatBot';
import YouTubeVideoScene from './components/YouTubeVideoScene';
import WhiteNoise from './components/WhiteNoise';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tasks' | 'schedule' | 'analytics' | 'notes' | 'sounds'>('tasks');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onLoginClick={() => setAuthModal('login')}
          onSignupClick={() => setAuthModal('signup')}
        />
        <AuthModal
          isOpen={!!authModal}
          mode={authModal || 'login'}
          onClose={() => setAuthModal(null)}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-8 left-4 z-50 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center pt-24 pb-8 space-y-8 transition-all duration-300 ease-in-out w-16 ${
          !isSidebarVisible ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          <button
            onClick={() => setActiveView('tasks')}
            className={`p-3 rounded-xl ${
              activeView === 'tasks'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Home className={`w-6 h-6 ${
              activeView === 'tasks'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('schedule')}
            className={`p-3 rounded-xl ${
              activeView === 'schedule'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Timer className={`w-6 h-6 ${
              activeView === 'schedule'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button 
            onClick={() => setActiveView('notes')}
            className={`p-3 rounded-xl ${
              activeView === 'notes'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen className={`w-6 h-6 ${
              activeView === 'notes'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('sounds')}
            className={`p-3 rounded-xl ${
              activeView === 'sounds'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Volume2 className={`w-6 h-6 ${
              activeView === 'sounds'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`p-3 rounded-xl ${
              activeView === 'analytics'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart2 className={`w-6 h-6 ${
              activeView === 'analytics'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarVisible ? 'ml-16' : 'ml-0'} p-8`}>
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Keep Focus</h1>
            <SearchBar onSearch={setSearchQuery} isLoggedIn={isAuthenticated} />
          </header>

          {activeView === 'tasks' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <DailyGoals />
                <TaskManager />
              </div>
              <div className="space-y-8">
                <FocusTimer />
              </div>
            </div>
          )}

          {activeView === 'schedule' && <Schedule />}
          {activeView === 'analytics' && <Analytics />}
          {activeView === 'notes' && <NotesManager />}
          {activeView === 'sounds' && <WhiteNoise />}
        </div>
      </div>

      {/* Quick Notes Component */}
      <Notes />

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NotesProvider>
          <Router>
            <Routes>
              <Route path="/video/:videoId" element={<YouTubeVideoScene />} />
              <Route path="/" element={<AppContent />} />
            </Routes>
          </Router>
        </NotesProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;