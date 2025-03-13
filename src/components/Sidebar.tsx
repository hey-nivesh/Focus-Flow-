import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Settings, 
  Target,
  HomeIcon,
  Home,
  Volume2
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const TRIGGER_AREA = 20;

export function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    { icon: <Target size={24} />, label: 'Daily Focus', href: '#' },
    { icon: <Home size={24} />, label: 'Home', href: '#' },
    { icon: <BookOpen size={24} />, label: 'Tasks', href: '#' },
    { icon: <Volume2 size={24} />, label: 'Focus Sounds', href: '/sounds' },
    { icon: <BarChart3 size={24} />, label: 'Analytics', href: '#' },
    { icon: <Settings size={24} />, label: 'Settings', href: '#' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= TRIGGER_AREA) {
        setIsVisible(true);
      } else if (e.clientX > 256) {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-black border-r border-zinc-800 text-white transition-all duration-300 ease-in-out backdrop-blur-sm ${
        !isVisible ? '-translate-x-full' : 'translate-x-0'
      } ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-16 items-center justify-center">
        <HomeIcon size={24} className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent" />
      </div>
      
      <nav className="mt-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-zinc-400 hover:bg-zinc-900/50 hover:text-white group relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
            <span className="inline-flex items-center justify-center w-8 relative z-10">
              {item.icon}
            </span>
            <span
              className={`ml-4 transition-all duration-300 relative z-10 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              {item.label}
            </span>
            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 ${
                isExpanded ? 'w-full opacity-0 group-hover:opacity-100' : 'w-0 group-hover:w-full'
              }`}
            ></div>
          </a>
        ))}
      </nav>
    </div> 
  );
}