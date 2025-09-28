
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

interface PostData {
  id: string;
  post_date: string;
  post_title: string;
  post_description: string;
  post_user: string;
  post_user_id: string;
  post_avatar: string;
  post_image_url: string;
  post_link: string;
}

const Home = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const csvUrl = '/posts_test.csv';
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          complete: (results) => {
            const allPosts = results.data as PostData[];
            const validPosts = allPosts.filter(post => post.id && post.id.trim() !== '');
            // Sort by date chronologically (newest first) - CSV uses DD/MM/YYYY
            const parseDMY = (d: string) => {
              const [dd, mm, yyyy] = d.split('/');
              return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).getTime();
            };
            validPosts.sort((a, b) => parseDMY(b.post_date) - parseDMY(a.post_date));
            setPosts(validPosts);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">Loading posts...</div>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  };

  const generateRandomStats = () => ({
    views: Math.floor(Math.random() * 50000) + 100,
    likes: Math.floor(Math.random() * 5000) + 10,
    shares: Math.floor(Math.random() * 500) + 1,
    isLiked: Math.random() > 0.7
  });

  return (
    <div className="mx-auto p-1 sm:p-4">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3">
        {posts.map((post) => {
          const stats = generateRandomStats();
          return (
            <div 
              key={post.id} 
              className="cursor-pointer hover:opacity-95 transition-opacity bg-white rounded-lg p-2 sm:p-3 relative"
              style={{
                boxShadow: '3px 3px 0px 0px #ecedee'
              }}
              onClick={() => handlePostClick(post.id)}
            >
              {/* User info on top */}
              <div className="flex items-center mb-2">
                <img 
                  src={post.post_avatar || "https://sailorsahoy.com/icon_whitecircle.png"} 
                  alt={post.post_user}
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-full object-cover mr-1 sm:mr-2"
                />
                <span className="text-xs font-medium text-gray-700 truncate">{post.post_user}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {post.post_title}
              </h3>
              
              {/* Thumbnail image with heart overlay */}
              <div className="aspect-square overflow-hidden rounded-lg relative">
                <img
                  src={post.post_image_url}
                  alt={post.post_title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Heart overlay */}
                <div className="absolute top-1 right-1">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    className="drop-shadow-sm"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      fill={stats.isLiked ? "#00e3eb" : "white"}
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between mt-2 text-xs">
                <div className="flex items-center space-x-1 text-gray-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>{formatNumber(stats.views)}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{formatNumber(stats.likes)}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16,6 12,2 8,6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <span>{formatNumber(stats.shares)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
