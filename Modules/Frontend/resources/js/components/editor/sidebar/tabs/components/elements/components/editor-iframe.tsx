import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface IframeProps {
   element: EditorElement;
}

const EditorIframe: React.FC<IframeProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const iframeSrc =
      typeof content === 'object' && 'src' in content ? content.src : '';
   const iframeTitle =
      typeof content === 'object' && 'title' in content
         ? content.title
         : 'Iframe';
   const iframeWidth =
      typeof content === 'object' && 'width' in content
         ? content.width
         : '100%';
   const iframeHeight =
      typeof content === 'object' && 'height' in content
         ? content.height
         : '400';

   if (editor.liveMode) {
      return (
         <iframe
            style={styles}
            src={iframeSrc as string}
            title={iframeTitle as string}
            width={iframeWidth as string}
            height={iframeHeight as string}
            className={cn('border-0', element.className)}
         />
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <iframe
            style={{
               ...styles,
               pointerEvents: editor.liveMode ? 'auto' : 'none',
            }}
            src={iframeSrc as string}
            title={iframeTitle as string}
            width={iframeWidth as string}
            height={iframeHeight as string}
            className={cn('border-0', element.className)}
         />
      </ElementWrapper>
   );
};

export default EditorIframe;
