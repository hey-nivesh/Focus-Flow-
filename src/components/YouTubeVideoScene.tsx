import React from 'react';
import { useParams } from 'react-router-dom';

const YouTubeVideoScene: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();

  return (
    <div className="container mx-auto p-4">
      <div className="video-container">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </div>
      <div className="video-details mt-4">
        <h2 className="text-2xl font-bold">Video Title</h2>
        <div className="actions mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Like</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Subscribe</button>
        </div>
        <div className="comments mt-4">
          <h3 className="text-xl font-semibold">Comments</h3>
          {/* Add comment section here */}
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoScene;