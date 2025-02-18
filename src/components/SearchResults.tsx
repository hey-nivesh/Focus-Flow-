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
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <div key={result.id.videoId} className="mb-4 cursor-pointer" onClick={() => handleVideoClick(result.id.videoId)}>
          <img
            src={result.snippet.thumbnails.default.url}
            alt={result.snippet.title}
            className="w-full h-auto"
          />
          <p className="mt-2 text-gray-900 dark:text-gray-100">{result.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;