import { Facebook, Instagram, Send, Mail, Link as LinkIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';

interface ProfileShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  profileUrl: string;
}

export const ProfileShareModal = ({ open, onOpenChange, userName, profileUrl }: ProfileShareModalProps) => {
  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      color: 'hover:text-[#1877F2]'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: null, // Instagram doesn't support URL sharing
      color: 'hover:text-[#E4405F]',
      action: () => {
        toast({
          title: "Instagram",
          description: "Please share via Instagram app",
        });
      }
    },
    {
      name: 'TikTok',
      icon: Send,
      url: null,
      color: 'hover:text-[#000000]',
      action: () => {
        toast({
          title: "TikTok",
          description: "Please share via TikTok app",
        });
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(`Check out ${userName}'s profile!`)}`,
      color: 'hover:text-[#0088cc]'
    },
    {
      name: 'WhatsApp',
      icon: Send,
      url: `https://wa.me/?text=${encodeURIComponent(`Check out ${userName}'s profile: ${profileUrl}`)}`,
      color: 'hover:text-[#25D366]'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(`Check out ${userName}'s profile`)}&body=${encodeURIComponent(profileUrl)}`,
      color: 'hover:text-primary'
    }
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to clipboard",
    });
  };

  const handleShare = (option: typeof shareOptions[0]) => {
    if (option.action) {
      option.action();
    } else if (option.url) {
      window.open(option.url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            Share {userName}'s profile with your network
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 py-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent transition-colors ${option.color}`}
            >
              <option.icon className="w-6 h-6" />
              <span className="text-xs">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <div className="flex-1 p-3 rounded-lg bg-muted text-sm truncate">
            {profileUrl}
          </div>
          <button
            onClick={copyLink}
            className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
