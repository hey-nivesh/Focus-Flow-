import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';
import { fetchYoutubeResults } from '../utils/youtubeApi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setAnimate(true);
    }
  }, [isLoggedIn]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    onSearch(value);
    if (value.trim()) {
      const youtubeResults = await fetchYoutubeResults(value);
      setResults(youtubeResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className={`relative ${animate ? 'search-bar-animate' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-orange-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl 
                 bg-zinc-900/50 backdrop-blur-sm text-white 
                 placeholder-zinc-500 focus:outline-none focus:border-orange-500 
                 transition-all duration-300"
        placeholder="Search for tasks, resources, or guidance..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchResults query={query} results={results} />
    </div>
  );
};

export default SearchBar;