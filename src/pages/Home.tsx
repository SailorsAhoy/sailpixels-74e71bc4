
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

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 2-column grid layout */}
      <div className="grid grid-cols-2 gap-3">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => handlePostClick(post.id)}
          >
            {/* User info on top */}
            <div className="flex items-center mb-2">
              <img 
                src={post.post_avatar || "https://sailorsahoy.com/icon_whitecircle.png"} 
                alt={post.post_user}
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="text-xs font-medium text-gray-700 truncate">{post.post_user}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {post.post_title}
            </h3>
            
            {/* Thumbnail image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={post.post_image_url}
                alt={post.post_title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
