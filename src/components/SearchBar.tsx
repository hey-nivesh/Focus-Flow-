import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';
import { fetchYoutubeResults } from '../utils/youtubeApi';
import { debounce } from '../utils/helpers';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
}

interface YouTubeResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<YouTubeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setAnimate(true);
    }
  }, [isLoggedIn]);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const youtubeResults = await fetchYoutubeResults(searchQuery);
        setResults(youtubeResults);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className={`relative ${animate ? 'search-bar-animate' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-orange-500" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-900/50 backdrop-blur-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all duration-300"
        placeholder="Search for tasks, resources, or guidance..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search input"
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
      <SearchResults query={query} results={results} />
    </div>
  );
};

export default React.memo(SearchBar);