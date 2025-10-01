import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const touchStartY = useRef<number>(0);
  const scrollStartY = useRef<number>(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const csvUrl = '/posts_test.csv';
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          complete: (results) => {
            const posts = results.data as PostData[];
            const validPosts = posts.filter(p => p.id && p.id.trim() !== '');
            // Sort chronologically (newest first)
            const parseDMY = (d: string) => {
              const [dd, mm, yyyy] = d.split('/');
              return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).getTime();
            };
            validPosts.sort((a, b) => parseDMY(b.post_date) - parseDMY(a.post_date));
            setAllPosts(validPosts);
            const foundPost = validPosts.find(p => p.id === id);
            setPost(foundPost || null);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleOpenLink = () => {
    if (post?.post_link) {
      window.open(post.post_link, '_blank');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const navigateToPost = (targetId: string) => {
    setIsDescriptionExpanded(false);
    navigate(`/post/${targetId}`);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!post || allPosts.length === 0) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    // Minimum swipe distance
    const minSwipeDistance = 50;

    // Swipe up for next chronological post
    if (deltaY > minSwipeDistance) {
      const currentIndex = allPosts.findIndex(p => p.id === post.id);
      if (currentIndex < allPosts.length - 1) {
        navigateToPost(allPosts[currentIndex + 1].id);
      }
    }
    // Swipe down for previous post
    else if (deltaY < -minSwipeDistance) {
      const currentIndex = allPosts.findIndex(p => p.id === post.id);
      if (currentIndex > 0) {
        navigateToPost(allPosts[currentIndex - 1].id);
      }
    }
  };

  // Add scroll handling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!post || allPosts.length === 0) return;
      
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Minimum scroll distance to trigger navigation
      if (Math.abs(scrollDelta) > 100) {
        if (scrollDelta > 0) {
          // Scroll down - next post
          const currentIndex = allPosts.findIndex(p => p.id === post.id);
          if (currentIndex < allPosts.length - 1) {
            navigateToPost(allPosts[currentIndex + 1].id);
          }
        } else {
          // Scroll up - previous post
          const currentIndex = allPosts.findIndex(p => p.id === post.id);
          if (currentIndex > 0) {
            navigateToPost(allPosts[currentIndex - 1].id);
          }
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, allPosts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="max-w-2xl mx-auto p-4">
        {/* Post content */}
        <article className="space-y-6">
          {/* User info and date */}
          <Link to={`/profile/${post.post_user_id}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity w-fit">
            <Avatar className="h-12 w-12">
              <AvatarImage 
                src={post.post_avatar || "https://sailorsahoy.com/icon_whitecircle.png"} 
                alt={post.post_user}
              />
              <AvatarFallback>
                {post.post_user.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">{post.post_user}</h2>
              <p className="text-sm text-muted-foreground">{post.post_date}</p>
            </div>
          </Link>

          {/* Post title */}
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {post.post_title}
          </h1>

          {/* Stats and View Post button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <div className="flex items-center space-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{(() => {
                  const likes = Math.floor(Math.random() * 5000) + 10;
                  if (likes < 1000) return likes.toString();
                  if (likes < 1000000) return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
                  return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
                })()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16,6 12,2 8,6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span>{(() => {
                  const shares = Math.floor(Math.random() * 500) + 1;
                  if (shares < 1000) return shares.toString();
                  if (shares < 1000000) return (shares / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
                  return (shares / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
                })()}</span>
              </div>
            </div>
            
            {/* View Post button */}
            {post.post_link && (
              <Button 
                variant="default" 
                size="sm"
                className="text-sm bg-[#0066cc] hover:bg-[#0052a3] text-white" 
                onClick={handleOpenLink}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View post
              </Button>
            )}
          </div>

          {/* Post image with heart overlay */}
          {post.post_image_url && (
            <div className="rounded-lg overflow-hidden relative">
              <img
                src={post.post_image_url}
                alt={post.post_title}
                className="w-full h-auto object-cover"
              />
              {/* Heart overlay */}
              <div className="absolute top-3 right-3">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className="drop-shadow-sm"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    fill={Math.random() > 0.7 ? "#00e3eb" : "white"}
                    stroke="black"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Post description */}
          {post.post_description && (
            <div className="prose prose-sm max-w-none">
              <p className={`text-foreground leading-relaxed whitespace-pre-wrap ${
                !isDescriptionExpanded ? 'line-clamp-3' : ''
              }`}>
                {post.post_description}
              </p>
              {!isDescriptionExpanded && post.post_description.length > 150 && (
                <button
                  onClick={() => setIsDescriptionExpanded(true)}
                  className="text-primary text-sm font-medium hover:underline mt-2"
                >
                  Read more
                </button>
              )}
            </div>
          )}

        </article>
      </div>
    </div>
  );
};

export default Post;