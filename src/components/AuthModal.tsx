import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const { login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'signup') {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md relative border border-zinc-800 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-6">
          {mode === 'login' ? 'Welcome Back' : 'Get Started Now'}
        </h2>

        {error && (
          <div className="bg-pink-500/10 border border-pink-500 text-pink-500 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all duration-300"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;