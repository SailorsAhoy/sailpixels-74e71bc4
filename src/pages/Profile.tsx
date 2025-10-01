import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Globe, Facebook, Instagram, Youtube, Send, Mail, 
  MessageCircle, Phone, Share2, Eye 
} from 'lucide-react';
import { ProfileContactDrawer } from '@/components/ProfileContactDrawer';
import { ProfileShareModal } from '@/components/ProfileShareModal';

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

interface ProfileData {
  user_id: string;
  user_name: string;
  avatar: string;
  cover_image: string;
  bio: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  telegram?: string;
  patreon?: string;
  email?: string;
}

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Mock profile data - replace with actual data source
  const profileData: ProfileData = {
    user_id: userId || '1',
    user_name: 'SailorsAhoy',
    avatar: 'https://sailorsahoy.com/icon_whitecircle.png',
    cover_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
    bio: 'The platform for sailors and sailing enthusiasts. Connecting the global sailing community through shared experiences, knowledge, and adventures on the water.',
    website: 'https://sailorsahoy.com',
    facebook: 'https://facebook.com/sailorsahoy',
    instagram: 'https://instagram.com/sailorsahoy',
    tiktok: 'https://tiktok.com/@sailorsahoy',
    youtube: 'https://youtube.com/sailorsahoy',
    telegram: 'https://t.me/sailorsahoy',
    patreon: 'https://patreon.com/sailorsahoy',
    email: 'hello@sailorsahoy.com'
  };

  const isOwnProfile = false; // Set to true when viewing own profile

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
            // Filter posts by user if userId is provided
            const userPosts = userId 
              ? validPosts.filter(post => post.post_user_id === userId)
              : validPosts.slice(0, 6);
            setPosts(userPosts);
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
  }, [userId]);

  const socialLinks = [
    { icon: Globe, url: profileData.website, name: 'Website' },
    { icon: Facebook, url: profileData.facebook, name: 'Facebook' },
    { icon: Instagram, url: profileData.instagram, name: 'Instagram' },
    { icon: Send, url: profileData.tiktok, name: 'TikTok' },
    { icon: Youtube, url: profileData.youtube, name: 'YouTube' },
    { icon: Send, url: profileData.telegram, name: 'Telegram' },
    { icon: Send, url: profileData.patreon, name: 'Patreon' },
    { icon: Mail, url: profileData.email ? `mailto:${profileData.email}` : undefined, name: 'Email' }
  ].filter(link => link.url);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Cover Image */}
      <div className="w-full h-[250px] md:h-[400px] overflow-hidden">
        <img 
          src={profileData.cover_image} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="px-4">
        {/* 8px padding */}
        <div className="h-2" />

        {/* Avatar and Username */}
        <div className="flex items-center gap-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileData.avatar} alt={profileData.user_name} />
            <AvatarFallback>{profileData.user_name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-foreground">@{profileData.user_name}</h1>
        </div>
        
        {/* 5px padding */}
        <div className="h-[5px]" />

        {/* Bio */}
        <div>
          <p className={`text-[0.75rem] text-foreground leading-relaxed ${!isBioExpanded ? 'line-clamp-2' : ''}`}>
            {profileData.bio}
          </p>
          {!isBioExpanded && profileData.bio.length > 100 && (
            <button
              onClick={() => setIsBioExpanded(true)}
              className="text-primary text-[0.75rem] font-medium hover:underline mt-1"
            >
              Read more
            </button>
          )}
        </div>

        {/* 5px padding */}
        <div className="h-[5px]" />

        {/* Social Links */}
        <div className="flex items-center gap-3 flex-wrap">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00e3eb] transition-colors"
              title={link.name}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around my-6 bg-muted/50 py-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{posts.length}</div>
            <div className="text-muted-foreground text-sm">published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">1.2K</div>
            <div className="text-muted-foreground text-sm">followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">328</div>
            <div className="text-muted-foreground text-sm">following</div>
          </div>
        </div>

        {/* Action Buttons (only show if not own profile) */}
        {!isOwnProfile && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
              className="text-xs"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/messages')}
              className="p-0"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setContactDrawerOpen(true)}
              className="p-0"
            >
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <Phone className="w-3 h-3" />
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="p-0"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* 12px padding */}
        <div className="h-3" />

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 pb-4">
          {posts.map((post) => {
            const views = Math.floor(Math.random() * 50000) + 100;
            const formattedViews = views < 1000 
              ? views.toString() 
              : views < 1000000 
              ? (views / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
              : (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';

            return (
              <div 
                key={post.id} 
                className="aspect-square relative cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <img
                  src={post.post_image_url}
                  alt={post.post_title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* View count overlay */}
                <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-medium">{formattedViews}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Drawer */}
      <ProfileContactDrawer 
        open={contactDrawerOpen}
        onOpenChange={setContactDrawerOpen}
        userName={profileData.user_name}
      />

      {/* Share Modal */}
      <ProfileShareModal 
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        userName={profileData.user_name}
        profileUrl={`${window.location.origin}/profile/${profileData.user_id}`}
      />
    </div>
  );
};

export default Profile;
