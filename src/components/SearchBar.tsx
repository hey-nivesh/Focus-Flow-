import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
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
      <SearchResults query={query} />
    </div>
  );
};

export default SearchBar;