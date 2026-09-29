import { Renderer } from '@/components/rich-editor';
import { Card } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { cn } from '@/lib/utils';
import { streamUrl as lessonStreamUrl } from '@/routes/lesson/video';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import DocumentViewer from './document-viewer';
import EmbedViewer from './embed-viewer';
import LessonControl from './lesson-control';

interface LessonViewerProps {
   lesson: SectionLesson;
}

/**
 * How much of a signed video URL's reported lifetime to let elapse before
 * proactively fetching a new one. Comfortably under 1 so a normal refresh
 * always lands well before the old URL actually expires.
 */
const REFRESH_AT_FRACTION = 0.75;
const REFRESH_RETRY_DELAY_MS = 30_000;

/**
 * Proactively refreshes a private video lesson's signed playback URL before
 * it expires (TTL is intentionally short — see course.video_url_ttl_minutes
 * — since the URL is a bearer token for as long as it's valid). Swaps the
 * <video> source in place and restores playback position/state so a
 * multi-hour lesson never hard-fails mid-watch. Isolated to this component
 * rather than the shared VideoPlayer, which is also used by course
 * previews and marketing pages that have nothing to refresh.
 */
function useLessonVideoUrlRefresh(
   lesson: SectionLesson,
   containerRef: React.RefObject<HTMLDivElement | null>,
) {
   const [playbackUrl, setPlaybackUrl] = useState(lesson.stream_url);

   useEffect(() => {
      if (lesson.lesson_type !== 'video' || !lesson.stream_url_expires_in) {
         return;
      }

      let cancelled = false;
      let refreshing = false;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let expiresAt = Date.now() + lesson.stream_url_expires_in * 1000;

      const schedule = (delayMs: number) => {
         clearTimeout(timer);
         timer = setTimeout(refresh, Math.max(0, delayMs));
      };

      const refresh = async () => {
         if (cancelled || refreshing) {
            return;
         }

         refreshing = true;

         const videoEl = containerRef.current?.querySelector('video');
         const savedTime = videoEl?.currentTime ?? 0;
         const wasPlaying = videoEl ? !videoEl.paused : false;

         try {
            const response = await fetch(
               lessonStreamUrl.url({ lesson: lesson.id }),
               {
                  headers: {
                     Accept: 'application/json',
                     'X-Requested-With': 'XMLHttpRequest',
                  },
               },
            );

            if (!response.ok) {
               throw new Error('Failed to refresh the video URL');
            }

            const data: { url: string | null; expires_in: number | null } =
               await response.json();

            if (cancelled || !data.url) {
               return;
            }

            setPlaybackUrl(data.url);

            const newVideoEl = containerRef.current?.querySelector('video');

            newVideoEl?.addEventListener(
               'loadedmetadata',
               () => {
                  newVideoEl.currentTime = savedTime;

                  if (wasPlaying) {
                     newVideoEl.play().catch(() => {});
                  }
               },
               { once: true },
            );

            if (data.expires_in) {
               expiresAt = Date.now() + data.expires_in * 1000;
               schedule(data.expires_in * 1000 * REFRESH_AT_FRACTION);
            }
         } catch {
            if (!cancelled) {
               schedule(REFRESH_RETRY_DELAY_MS);
            }
         } finally {
            refreshing = false;
         }
      };

      schedule(lesson.stream_url_expires_in * 1000 * REFRESH_AT_FRACTION);

      // Native `error` on <video> doesn't bubble, but a capturing listener
      // on an ancestor still sees it during the capture phase — this
      // survives Plyr swapping the underlying <video> element on refresh,
      // so it never needs re-attaching.
      const onVideoError = () => refresh();
      const container = containerRef.current;
      container?.addEventListener('error', onVideoError, true);

      // setTimeout is throttled/paused in a backgrounded tab — catch up
      // immediately on refocus instead of waiting for a stale timer.
      const onVisibilityChange = () => {
         if (document.visibilityState !== 'visible') {
            return;
         }

         if (Date.now() >= expiresAt) {
            refresh();
         } else {
            schedule(expiresAt - Date.now());
         }
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
         cancelled = true;
         clearTimeout(timer);
         container?.removeEventListener('error', onVideoError, true);
         document.removeEventListener('visibilitychange', onVisibilityChange);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lesson.id]);

   return playbackUrl;
}

const LessonViewer = ({ lesson }: LessonViewerProps) => {
   const { props } = usePage<CoursePlayerProps>();
   const { translate } = props;
   const { frontend } = translate;
   const videoContainerRef = useRef<HTMLDivElement>(null);
   const streamUrl = useLessonVideoUrlRefresh(lesson, videoContainerRef);

   return lesson ? (
      <Card className={cn('group lesson-container relative')}>
         <LessonControl className="opacity-0 transition-all duration-300 group-hover:opacity-100" />

         {lesson.lesson_type === 'video' &&
            lesson.stream_url_type === 'iframe' && (
               <iframe
                  key={lesson.id}
                  src={streamUrl}
                  loading="lazy"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  className="h-full w-full"
               />
            )}

         {['video_url', 'video'].includes(lesson.lesson_type) &&
            lesson.stream_url_type !== 'iframe' && (
               <div ref={videoContainerRef} className="h-full w-full">
                  <VideoPlayer
                     source={{
                        type: 'video' as const,
                        sources: [
                           {
                              src:
                                 lesson.lesson_type === 'video'
                                    ? streamUrl || ''
                                    : lesson.lesson_src || '',
                              type: 'video/mp4' as const,
                           },
                        ],
                     }}
                  />
               </div>
            )}

         {lesson.lesson_type === 'document' && (
            <DocumentViewer src={lesson.lesson_src || ''} />
         )}

         {lesson.lesson_type === 'embed' && (
            <EmbedViewer src={lesson.lesson_src || ''} />
         )}

         {lesson.lesson_type === 'text' && (
            <div className="h-full w-full overflow-y-auto">
               <Renderer
                  value={lesson.lesson_src || ''}
                  className="!px-6 !pb-6"
               />
            </div>
         )}

         {lesson.lesson_type === 'image' && (
            <div className="flex h-full w-full items-center justify-center overflow-y-auto">
               <img
                  className="h-full max-h-[calc(100vh-60px)] min-h-[80vh]"
                  src={lesson.lesson_src}
               />
            </div>
         )}
      </Card>
   ) : (
      <Card className="min-h-[60vh] w-full overflow-hidden rounded-lg">
         <div className="flex h-full items-center justify-center">
            <p>{frontend.no_lesson_found}</p>
         </div>
      </Card>
   );
};

export default LessonViewer;
