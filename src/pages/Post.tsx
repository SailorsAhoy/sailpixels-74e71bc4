import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
            const allPosts = results.data as PostData[];
            const foundPost = allPosts.find(p => p.id === id);
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
    <div className="bg-background">
      <div className="max-w-2xl mx-auto p-4">
        {/* Post content */}
        <article className="space-y-6">
          {/* User info and date */}
          <div className="flex items-center space-x-3">
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
          </div>

          {/* Post title */}
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {post.post_title}
          </h1>

          {/* Post image */}
          {post.post_image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.post_image_url}
                alt={post.post_title}
                className="w-full h-auto object-cover"
              />
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

          {/* Link button at bottom */}
          {post.post_link && (
            <div className="pt-4 border-t border-border">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={handleOpenLink}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original Post
              </Button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Post;