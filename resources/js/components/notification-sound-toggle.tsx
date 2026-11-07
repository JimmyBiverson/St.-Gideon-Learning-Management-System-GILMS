import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
   playNotificationSound,
   setSoundEnabled,
   soundEnabled,
   soundEvent,
   unlockNotificationAudio,
} from '@/lib/notification-sound';

export default function NotificationSoundToggle() {
   const [enabled, setEnabled] = useState(false);
   useEffect(() => {
      const sync = () => setEnabled(soundEnabled());
      sync();
      window.addEventListener(soundEvent, sync);
      window.addEventListener('storage', sync);
      return () => {
         window.removeEventListener(soundEvent, sync);
         window.removeEventListener('storage', sync);
      };
   }, []);
   const label = enabled
      ? 'Mute notification sound'
      : 'Enable notification sound';
   return (
      <Button
         size="icon"
         variant="ghost"
         className="h-8 w-8 shrink-0"
         aria-label={label}
         title={label}
         aria-pressed={enabled}
         onClick={() => {
            setSoundEnabled(!enabled);
            if (!enabled) {
               unlockNotificationAudio();
               void playNotificationSound();
            }
         }}
      >
         {enabled ? (
            <Volume2 className="h-4 w-4" />
         ) : (
            <VolumeX className="h-4 w-4" />
         )}
      </Button>
   );
}
