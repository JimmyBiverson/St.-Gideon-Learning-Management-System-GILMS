import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface ImageProps {
   element: EditorElement;
}

const EditorImage: React.FC<ImageProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const imageSrc =
      typeof content === 'object' && 'src' in content
         ? content.src
         : 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg';
   const imageAlt =
      typeof content === 'object' && 'alt' in content
         ? content.alt
         : 'Image description';
   const imageWidth =
      typeof content === 'object' && 'width' in content ? content.width : '';
   const imageHeight =
      typeof content === 'object' && 'height' in content ? content.height : '';

   const handleDragStart = (e: React.DragEvent) => {
      if (!editor.liveMode) {
         e.stopPropagation();
      }
   };

   if (editor.liveMode) {
      return (
         <img
            style={styles}
            src={imageSrc as string}
            alt={imageAlt as string}
            width={imageWidth as string}
            height={imageHeight as string}
            draggable={false}
            className={element.className}
         />
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <img
            style={styles}
            src={imageSrc as string}
            alt={imageAlt as string}
            width={imageWidth as string}
            height={imageHeight as string}
            onDragStart={handleDragStart}
            draggable={false}
            className={element.className}
         />
      </ElementWrapper>
   );
};

export default EditorImage;
