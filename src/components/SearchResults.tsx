import React from 'react';
import { Play, Clock } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  // Simulated video results based on search query
  const videos: Video[] = [
    {
      id: '1',
      title: 'How to Stay Focused While Working',
      duration: '5:30',
      thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      category: 'Productivity'
    },
    {
      id: '2',
      title: 'Time Management Tips',
      duration: '7:15',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
      category: 'Time Management'
    },
    {
      id: '3',
      title: 'Deep Work Techniques',
      duration: '10:00',
      thumbnail: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e',
      category: 'Focus'
    }
  ].filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      {videos.length > 0 ? (
        <div className="p-4 space-y-4">
          {videos.map(video => (
            <div key={video.id} className="flex space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
              <div className="relative w-40 h-24 rounded-lg overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{video.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{video.category}</span>
              </div>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Play className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchResults;