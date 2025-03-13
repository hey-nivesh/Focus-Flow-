import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  query: string;
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
  const navigate = useNavigate(); // ✅ Use useNavigate instead of useHistory

  if (!query.trim()) {
    return null;
  }

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`); // ✅ Replace history.push with navigate
  };

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {results.map((result) => (
        <div 
          key={result.id.videoId} 
          className="mb-4 cursor-pointer bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 group" 
          onClick={() => handleVideoClick(result.id.videoId)}
        >
          <div className="relative overflow-hidden">
            <img
              src={result.snippet.thumbnails.medium.url || result.snippet.thumbnails.default.url}
              alt={result.snippet.title}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <span className="p-2 text-white text-sm">Click to watch</span>
            </div>
          </div>
          <div className="p-3">
            <p className="text-white group-hover:text-orange-500 transition-colors duration-300 font-medium">{result.snippet.title}</p>
            <p className="mt-1 text-zinc-400 text-sm">{result.snippet.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;