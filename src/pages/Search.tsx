
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Papa from 'papaparse';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [displayedPosts, setDisplayedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<PostData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [loadedCount, setLoadedCount] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const touchStartY = useRef<number>(0);

  // Sample categories and subcategories
  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'art', label: 'Art & Design' }
  ];

  const subcategories: Record<string, { value: string; label: string }[]> = {
    technology: [
      { value: 'software', label: 'Software' },
      { value: 'hardware', label: 'Hardware' },
      { value: 'ai', label: 'AI & ML' }
    ],
    lifestyle: [
      { value: 'fitness', label: 'Fitness' },
      { value: 'wellness', label: 'Wellness' },
      { value: 'fashion', label: 'Fashion' }
    ],
    travel: [
      { value: 'adventure', label: 'Adventure' },
      { value: 'culture', label: 'Culture' },
      { value: 'budget', label: 'Budget Travel' }
    ],
    food: [
      { value: 'recipes', label: 'Recipes' },
      { value: 'restaurants', label: 'Restaurants' },
      { value: 'cooking', label: 'Cooking Tips' }
    ],
    art: [
      { value: 'digital', label: 'Digital Art' },
      { value: 'traditional', label: 'Traditional' },
      { value: 'photography', label: 'Photography' }
    ]
  };

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
            setPosts(validPosts);
            // Show random thumbnails initially
            const shuffled = [...validPosts].sort(() => 0.5 - Math.random());
            setFilteredPosts(shuffled);
            setDisplayedPosts(shuffled.slice(0, 15));
            setLoadedCount(15);
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
      setFilteredPosts(shuffled);
      setDisplayedPosts(shuffled.slice(0, 15));
      setLoadedCount(15);
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      // Filter posts based on search term
      const filtered = posts.filter(post => 
        post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.post_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.post_user.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
      setDisplayedPosts(filtered.slice(0, 15));
      setLoadedCount(15);

      // Show suggestions after 3 characters
      if (searchTerm.length >= 3) {
        const suggestedPosts = filtered.slice(0, 5); // Show top 5 matches
        setSuggestions(suggestedPosts);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }, [searchTerm, posts]);

  const handlePostClick = (postId: string) => {
    setShowSuggestions(false);
    navigate(`/post/${postId}`);
  };

  const handleSuggestionClick = (post: PostData) => {
    setSearchTerm(post.post_title);
    setShowSuggestions(false);
    navigate(`/post/${post.id}`);
  };

  const handleSearchInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const loadMorePosts = () => {
    if (isLoadingMore || loadedCount >= filteredPosts.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextCount = Math.min(loadedCount + 10, filteredPosts.length);
      setDisplayedPosts(filteredPosts.slice(0, nextCount));
      setLoadedCount(nextCount);
      setIsLoadingMore(false);
    }, 500); // Small delay to show loading state
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const minSwipeDistance = 100;

    // Swipe down to load more
    if (deltaY < -minSwipeDistance) {
      loadMorePosts();
    }
  };

  const applyFilters = () => {
    // Filter logic based on category and subcategory will be implemented when real data is provided
    console.log('Applying filters:', { selectedCategory, selectedSubcategory });
  };

  if (loading) {
  return (
    <div className="max-w-md mx-auto p-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4 relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search posts, users, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleSearchInputBlur}
              className="w-full p-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            
            {/* Search suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg">
                {suggestions.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground border-b border-border last:border-b-0"
                    onClick={() => handleSuggestionClick(post)}
                  >
                    <img
                      src={post.post_image_url}
                      alt={post.post_title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{post.post_title}</p>
                      <p className="text-xs text-muted-foreground truncate">{post.post_user}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Filter button */}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="p-3 border border-input bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Filter Posts</DrawerTitle>
                  <DrawerDescription>
                    Filter posts by category and subcategory
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCategory && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subcategory</label>
                      <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories[selectedCategory]?.map((subcategory) => (
                            <SelectItem key={subcategory.value} value={subcategory.value}>
                              {subcategory.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setSelectedSubcategory('');
                      }}
                      className="flex-1 py-2 px-4 border border-input bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={applyFilters}
                      className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {displayedPosts.map((post) => (
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
      
      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="text-center text-muted-foreground mt-4">
          Loading more posts...
        </div>
      )}
      
      {/* Load more hint */}
      {!isLoadingMore && loadedCount < filteredPosts.length && (
        <div className="text-center text-muted-foreground mt-4 text-sm">
          Swipe down to load {Math.min(10, filteredPosts.length - loadedCount)} more posts
        </div>
      )}
      
      {searchTerm.trim() !== '' && displayedPosts.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No posts found for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default Search;
