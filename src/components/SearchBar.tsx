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
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-transparent transition duration-150 ease-in-out"
        placeholder="Search for tasks, resources, or guidance..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchResults query={query} results={results} />
    </div>
  );
};

export default SearchBar;