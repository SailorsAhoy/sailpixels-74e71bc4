
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

const Profile = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const csvUrl = '/posts_test.csv';
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const allPosts = results.data as PostData[];
            const validPosts = allPosts.filter(post => post.id && post.id.trim() !== '');
            setPosts(validPosts.slice(0, 6)); // Show first 6 posts
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

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className="w-full h-[300px] bg-gradient-to-r from-blue-400 to-blue-600 relative">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=300&fit=crop&crop=center" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-4">
          <div className="flex items-end space-x-4">
            <img 
              src="https://sailorsahoy.com/icon_whitecircle.png" 
              alt="SailorsAhoy Logo" 
              className="w-32 h-32 rounded-full border-4 border-white bg-white"
            />
            <div className="pb-4">
              <h1 className="text-2xl font-bold text-gray-900">@SailorsAhoy</h1>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-2">
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            The platform for sailors and sailing enthusiasts. Join our community of passionate sailors sharing their adventures, tips, and stories from the open seas. Discover new destinations, connect with fellow sailors, and explore the world of sailing.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4 mb-2">
          <a href="https://sailorsahoy.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.753 2.87c-.27 1.04-1.005 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="mailto:contact@sailorsahoy.com" className="text-gray-600 hover:text-cyan-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-3 bg-gray-50 py-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            <div className="text-gray-600 text-sm">published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">1.2K</div>
            <div className="text-gray-600 text-sm">followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">328</div>
            <div className="text-gray-600 text-sm">following</div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square overflow-hidden relative bg-white rounded-lg" style={{
              boxShadow: '3px 3px 0px 0px #ecedee'
            }}>
              {post.post_link ? (
                <a href={post.post_link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={post.post_image_url}
                    alt={post.post_title}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={post.post_image_url}
                  alt={post.post_title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              )}
              
              {/* Views overlay */}
              <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>{(() => {
                  const views = Math.floor(Math.random() * 50000) + 100;
                  if (views < 1000) return views.toString();
                  if (views < 1000000) return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
                  return (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
                })()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
