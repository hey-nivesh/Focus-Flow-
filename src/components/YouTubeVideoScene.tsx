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

interface RecommendedVideo {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
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

  const recommendedVideos: RecommendedVideo[] = [
    {
      id: "video1",
      title: "Advanced React Patterns for Production Applications",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
      channel: "React Masters",
      views: "234K views",
      timestamp: "3 days ago"
    },
    {
      id: "video2",
      title: "Building Scalable Web Applications with TypeScript",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop",
      channel: "TypeScript Pro",
      views: "186K views",
      timestamp: "1 week ago"
    },
    {
      id: "video3",
      title: "Modern JavaScript Features You Should Know",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=320&h=180&fit=crop",
      channel: "JS Ninja",
      views: "542K views",
      timestamp: "2 weeks ago"
    },
    {
      id: "video4",
      title: "Web Development Best Practices 2024",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop",
      channel: "CodeCraft",
      views: "892K views",
      timestamp: "3 weeks ago"
    }
  ];

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row max-w-[2000px] mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="w-full bg-black">
            <div style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                title="YouTube Video"
              ></iframe>
            </div>
          </div>

          {/* Video Info and Comments */}
          <div className="px-4 lg:px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Understanding React Hooks and Context API
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
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
                <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
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
                  </button>
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isSaved ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <BookmarkPlus className="w-5 h-5" />
                  <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
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

        {/* Recommended Videos Sidebar */}
        <div className="lg:w-[400px] p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended</h2>
          <div className="space-y-4">
            {recommendedVideos.map((video) => (
              <div key={video.id} className="flex space-x-2 cursor-pointer group">
                <div className="flex-shrink-0 relative w-40 h-24">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.channel}</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{video.views}</span>
                    <span className="mx-1">•</span>
                    <span>{video.timestamp}</span>
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