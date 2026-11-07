import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProfilePhoto({
   src,
   name,
   className,
}: {
   src?: string | null;
   name: string;
   className?: string;
}) {
   const [failedSource, setFailedSource] = useState<string | null>(null);
   if (!src || failedSource === src) {
      const initials = name
         .trim()
         .split(/\s+/)
         .slice(0, 2)
         .map((part) => part[0])
         .join('')
         .toUpperCase();
      return (
         <div
            role="img"
            aria-label={`${name} — profile image unavailable`}
            className={cn(
               'flex items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-4xl font-semibold text-primary',
               className,
            )}
         >
            {initials}
         </div>
      );
   }
   return (
      <img
         src={src}
         alt={name}
         className={className}
         loading="lazy"
         onError={() => setFailedSource(src)}
      />
   );
}
