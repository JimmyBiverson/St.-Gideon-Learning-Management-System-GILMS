import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface VideoProps {
   element: EditorElement;
}

const EditorVideo: React.FC<VideoProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const videoSrc =
      typeof content === 'object' && 'src' in content ? content.src : '';
   const videoType =
      typeof content === 'object' && 'videoType' in content
         ? content.videoType
         : 'video/mp4';
   const controls =
      typeof content === 'object' && 'controls' in content
         ? content.controls
         : true;
   const autoplay =
      typeof content === 'object' && 'autoplay' in content
         ? content.autoplay
         : false;
   const loop =
      typeof content === 'object' && 'loop' in content ? content.loop : false;

   if (editor.liveMode) {
      return (
         <video
            style={styles}
            src={videoSrc as string}
            controls={controls as boolean}
            autoPlay={autoplay as boolean}
            loop={loop as boolean}
            className={cn('w-full', element.className)}
         >
            <source src={videoSrc as string} type={videoType as string} />
            Your browser does not support the video tag.
         </video>
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <video
            style={styles}
            src={videoSrc as string}
            controls={controls as boolean}
            autoPlay={autoplay as boolean}
            loop={loop as boolean}
            className={cn('w-full', element.className)}
         >
            <source src={videoSrc as string} type={videoType as string} />
            Your browser does not support the video tag.
         </video>
      </ElementWrapper>
   );
};

export default EditorVideo;
