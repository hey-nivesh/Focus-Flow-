import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Menu, Home, Timer, BookOpen, BarChart2, Volume2, Sun, Moon } from 'lucide-react';
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
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ChatBot from './components/ChatBot';
import YouTubeVideoScene from './components/YouTubeVideoScene';
import WhiteNoise from './components/WhiteNoise';
import './style/animations.css';

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = React.memo(({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl ${
      active ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20' : 'hover:bg-zinc-800'
    } transition-all duration-300`}
    aria-label={label}
  >
    {icon}
  </button>
));

const Sidebar: React.FC<{
  activeView: string;
  setActiveView: (view: 'tasks' | 'schedule' | 'analytics' | 'notes' | 'sounds') => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}> = React.memo(({ activeView, setActiveView, toggleDarkMode, darkMode }) => (
  <div className="fixed h-full bg-zinc-900 border-r border-zinc-800 flex flex-col items-center pt-24 pb-8 space-y-8 transition-all duration-300 ease-in-out w-16 z-40">
    <nav className="flex flex-col space-y-6">
      <NavButton
        active={activeView === 'tasks'}
        onClick={() => setActiveView('tasks')}
        icon={
          <Home className={`w-6 h-6 ${
            activeView === 'tasks' ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
          }`} />
        }
        label="Home"
      />
      <NavButton
        active={activeView === 'schedule'}
        onClick={() => setActiveView('schedule')}
        icon={
          <Timer className={`w-6 h-6 ${
            activeView === 'schedule' ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
          }`} />
        }
        label="Schedule"
      />
      <NavButton
        active={activeView === 'notes'}
        onClick={() => setActiveView('notes')}
        icon={
          <BookOpen className={`w-6 h-6 ${
            activeView === 'notes' ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
          }`} />
        }
        label="Notes"
      />
      <NavButton
        active={activeView === 'sounds'}
        onClick={() => setActiveView('sounds')}
        icon={
          <Volume2 className={`w-6 h-6 ${
            activeView === 'sounds' ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
          }`} />
        }
        label="Sounds"
      />
      <NavButton
        active={activeView === 'analytics'}
        onClick={() => setActiveView('analytics')}
        icon={
          <BarChart2 className={`w-6 h-6 ${
            activeView === 'analytics' ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
          }`} />
        }
        label="Analytics"
      />
    </nav>
    <div className="mt-auto">
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-xl hover:bg-zinc-800 transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-orange-500" />
        ) : (
          <Moon className="w-6 h-6 text-zinc-400" />
        )}
      </button>
    </div>
  </div>
));

const Header: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = React.memo(({ searchQuery, setSearchQuery }) => (
  <header className="mb-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
      Keep Focus
    </h1>
    <SearchBar onSearch={setSearchQuery} isLoggedIn={true} />
  </header>
));

const MainContent: React.FC<{
  activeView: string;
  searchQuery: string;
  isSidebarVisible: boolean;
}> = React.memo(({ activeView, searchQuery, isSidebarVisible }) => {
  const viewComponents = useMemo(() => ({
    tasks: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DailyGoals />
          <TaskManager />
        </div>
        <div className="space-y-8">
          <FocusTimer />
        </div>
      </div>
    ),
    schedule: <Schedule />,
    analytics: <Analytics />,
    notes: <NotesManager />,
    sounds: <WhiteNoise />,
  }), []);

  return (
    <div className={`transition-all duration-300 ${isSidebarVisible ? 'ml-16' : 'ml-0'} p-8`}>
      <div className="max-w-7xl mx-auto">
        <Header searchQuery={searchQuery} setSearchQuery={() => {}} />
        {viewComponents[activeView as keyof typeof viewComponents]}
      </div>
    </div>
  );
});

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tasks' | 'schedule' | 'analytics' | 'notes' | 'sounds'>('tasks');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <button
        onClick={toggleSidebar}
        className="fixed top-8 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-300"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      <MainContent
        activeView={activeView}
        searchQuery={searchQuery}
        isSidebarVisible={isSidebarVisible}
      />

      <Notes />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;