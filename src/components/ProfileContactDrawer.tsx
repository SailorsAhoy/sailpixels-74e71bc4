import { Phone, Mail, MessageCircle } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ProfileContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

export const ProfileContactDrawer = ({ open, onOpenChange, userName }: ProfileContactDrawerProps) => {
  // Simulated contact data
  const contactData = {
    phone: '+1 (555) 123-4567',
    whatsapp: '+1 (555) 123-4567',
    email: 'contact@example.com'
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Contact {userName}</DrawerTitle>
            <DrawerDescription>
              Choose how you'd like to get in touch
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-6 space-y-3">
            <a
              href={`tel:${contactData.phone}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">{contactData.phone}</div>
              </div>
            </a>
            
            <a
              href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-sm text-muted-foreground">{contactData.whatsapp}</div>
              </div>
            </a>
            
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">{contactData.email}</div>
              </div>
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
