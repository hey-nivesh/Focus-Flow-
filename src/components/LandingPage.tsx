import React from 'react';
import { Target } from 'lucide-react';
import '../style/LandingPage.css';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-orange-500" />
            <span className="text-2xl hoverani font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Focus Flow
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className="px-6 py-2 hoverani rounded-lg text-zinc-300 hover:text-white transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={onSignupClick}
              className="px-6 py-2 hoverani rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
            >
              Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-5xl hoverani lg:text-6xl font-bold leading-tight mb-8 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Your Gateway to a Distraction-Free Life
            </h1>
            <p className="text-xl hoverani text-zinc-400 mb-8">
              Master your time, boost productivity, and achieve your goals with our comprehensive task management and focus tools.
            </p>
            <button
              onClick={onSignupClick}
              className="px-8 py-4 hoverani bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Get Started
            </button>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="w-[500px] h-[500px] bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full absolute blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800"
                alt="Productivity"
                className="relative hoverani z-10 rounded-lg shadow-2xl border border-zinc-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;