import React from 'react';

interface SearchResultsProps {
  query: string;
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <div key={result.id.videoId} className="mb-4">
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${result.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={result.snippet.title}
          ></iframe>
          <p className="mt-2 text-gray-900 dark:text-gray-100">{result.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;