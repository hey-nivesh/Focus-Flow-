import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, BookmarkPlus, MessageCircle, Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
}

const YouTubeVideoScene: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
      content: "This video was incredibly helpful! Thanks for sharing such valuable insights.",
      likes: 124,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
      content: "Great explanation! I've been looking for something like this for a while.",
      likes: 89,
      timestamp: "5 hours ago"
    }
  ]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Video Player Section - Now with larger height */}
      <div className="w-full bg-black">
        <div className="max-w-[2000px] mx-auto" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title="YouTube Video"
          ></iframe>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Video Info Section */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Understanding React Hooks and Context API
          </h1>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=faces"
                alt="Channel Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Tech Tutorials</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">1.2M subscribers</p>
              </div>
              <button className="ml-4 px-6 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-l-full ${
                    isLiked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>23K</span>
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-r-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <ThumbsDown className="w-5 h-5" />
                  <span>12</span>
                </button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isSaved ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                } hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <BookmarkPlus className="w-5 h-5" />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>52,463 views</span>
              <span className="mx-2">•</span>
              <span>Premiered Mar 15, 2024</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              In this comprehensive tutorial, we dive deep into React Hooks and the Context API. 
              Learn how to manage state effectively and create maintainable React applications.
              #ReactJS #WebDevelopment #Programming
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Comments • {comments.length}
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="flex items-start space-x-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=faces"
              alt="Your Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white"
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  type="button"
                  onClick={() => setCommentText('')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comment
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <img
                  src={comment.avatar}
                  alt={`${comment.author}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{comment.author}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoScene;