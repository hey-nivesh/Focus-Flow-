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
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        !isVisible ? '-translate-x-full' : 'translate-x-0'
      } ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-16 items-center justify-center">
        <HomeIcon size={24} className="text-blue-400" />
      </div>
      
      <nav className="mt-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span className="inline-flex items-center justify-center w-8">
              {item.icon}
            </span>
            <span
              className={`ml-4 transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div> 
  );
}