
import { Heart, Send, Eye, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sailorsahoy.com/sailpixels/data/posts.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setPosts(results.data as PostData[]);
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

  const getViewCount = (index: number) => {
    const counts = [875, 1200, 456, 23400, 987, 15600, 234, 45200, 678, 12300];
    const count = counts[index % counts.length];
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  const getLikeCount = (index: number) => {
    const counts = [92, 156, 43, 2100, 87, 1800, 34, 3200, 67, 890];
    const count = counts[index % counts.length];
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6 p-4">
        {posts.map((post, index) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center p-3 border-b border-gray-100">
              <img 
                src={post.post_avatar || "https://sailorsahoy.com/icon_whitecircle.png"} 
                alt={post.post_user}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <span className="font-medium text-sm">{post.post_user}</span>
            </div>
            
            {post.post_link ? (
              <a href={post.post_link} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.post_image_url}
                  alt={post.post_title}
                  className="w-full aspect-square object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={post.post_image_url}
                alt={post.post_title}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            )}
            
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
                  <Send className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.post_date}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {getViewCount(index)}
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {getLikeCount(index)}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 50) + 1}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Marina
                </div>
              </div>
              
              {post.post_title && (
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{post.post_title}</h3>
              )}
              <p className="text-sm text-gray-800">{post.post_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
