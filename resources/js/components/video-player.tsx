import { lazy, Suspense, useEffect, useState } from 'react';

// Plyr accesses `document` at module level, which crashes Node.js during SSR.
// Split into two files:
//   video-player.tsx       — SSR-safe lazy wrapper (this file, safe to import anywhere)
//   video-player-plyr.tsx  — actual Plyr implementation, only loaded in the browser

const PlyrVideoPlayer = lazy(() => import('./video-player-plyr'));

interface Props {
   source: {
      type: 'video' | 'audio';
      sources: Array<{
         src: string;
         type?: string;
         provider?: 'youtube' | 'vimeo' | 'html5';
      }>;
   };
   translate?: any;
}

const VideoPlayer = ({ source, translate }: Props) => {
   // `mounted` is false during SSR — return the fallback immediately so
   // React never tries to resolve the lazy import in Node.js.
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setMounted(true);
      }, 0);
   }, []);

   const fallback = (
      <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />
   );

   if (!mounted) {
      return fallback;
   }

   return (
      <Suspense fallback={fallback}>
         <PlyrVideoPlayer source={source} translate={translate} />
      </Suspense>
   );
};

export default VideoPlayer;
