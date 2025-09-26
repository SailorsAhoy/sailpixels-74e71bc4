
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

const Search = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
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
          complete: (results) => {
            const allPosts = results.data as PostData[];
            const validPosts = allPosts.filter(post => post.id && post.id.trim() !== '');
            setPosts(validPosts);
            // Show random thumbnails initially
            const shuffled = [...validPosts].sort(() => 0.5 - Math.random());
            setFilteredPosts(shuffled.slice(0, 15));
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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Show random thumbnails when no search term
      const shuffled = [...posts].sort(() => 0.5 - Math.random());
      setFilteredPosts(shuffled.slice(0, 15));
    } else {
      // Filter posts based on search term
      const filtered = posts.filter(post => 
        post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.post_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.post_user.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts, users, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="aspect-square cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handlePostClick(post.id)}
          >
            <img
              src={post.post_image_url}
              alt={post.post_title}
              className="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {searchTerm.trim() !== '' && filteredPosts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No posts found for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default Search;
