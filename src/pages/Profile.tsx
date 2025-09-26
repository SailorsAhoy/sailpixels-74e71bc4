
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
    <div className="max-w-md mx-auto p-4">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://sailorsahoy.com/icon_whitecircle.png" 
            alt="SailorsAhoy Logo" 
            className="w-16 h-16 rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">SailorsAhoy</h1>
        <p className="text-gray-600 mb-2">The platform for sailors and sailing enthusiasts</p>
        <a 
          href="https://sailorsahoy.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 text-sm hover:underline"
        >
          sailorsahoy.com
        </a>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-8 bg-gray-50 py-4 rounded-lg">
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
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square overflow-hidden">
            {post.post_link ? (
              <a href={post.post_link} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.post_image_url}
                  alt={post.post_title}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={post.post_image_url}
                alt={post.post_title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
