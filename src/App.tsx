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
import './style/animations.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
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
    <div className={`min-h-screen bg-black text-white`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-8 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed h-full bg-zinc-900 border-r border-zinc-800 flex flex-col items-center pt-24 pb-8 space-y-8 transition-all duration-300 ease-in-out w-16 ${
          !isSidebarVisible ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          <button
            onClick={() => setActiveView('tasks')}
            className={`p-3 rounded-xl ${
              activeView === 'tasks'
                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                : 'hover:bg-zinc-800'
            } transition-all duration-300`}
          >
            <Home className={`w-6 h-6 ${
              activeView === 'tasks'
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('schedule')}
            className={`p-3 rounded-xl ${
              activeView === 'schedule'
                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                : 'hover:bg-zinc-800'
            } transition-all duration-300`}
          >
            <Timer className={`w-6 h-6 ${
              activeView === 'schedule'
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`} />
          </button>
          <button 
            onClick={() => setActiveView('notes')}
            className={`p-3 rounded-xl ${
              activeView === 'notes'
                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                : 'hover:bg-zinc-800'
            } transition-all duration-300`}
          >
            <BookOpen className={`w-6 h-6 ${
              activeView === 'notes'
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('sounds')}
            className={`p-3 rounded-xl ${
              activeView === 'sounds'
                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                : 'hover:bg-zinc-800'
            } transition-all duration-300`}
          >
            <Volume2 className={`w-6 h-6 ${
              activeView === 'sounds'
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`p-3 rounded-xl ${
              activeView === 'analytics'
                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                : 'hover:bg-zinc-800'
            } transition-all duration-300`}
          >
            <BarChart2 className={`w-6 h-6 ${
              activeView === 'analytics'
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`} />
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl hover:bg-zinc-800 transition-all duration-300"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-orange-500" />
            ) : (
              <Moon className="w-6 h-6 text-zinc-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarVisible ? 'ml-16' : 'ml-0'} p-8`}>
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">Keep Focus</h1>
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