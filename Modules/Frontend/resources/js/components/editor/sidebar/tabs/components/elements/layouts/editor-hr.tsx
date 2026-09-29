import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface HrProps {
   element: EditorElement;
}

const EditorHr: React.FC<HrProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;

   return (
      <ElementWrapper
         element={element}
         wrapperClassName={cn('relative w-full', {
            'py-2': !editor.liveMode && !editor.previewMode,
         })}
      >
         <hr
            draggable={false}
            style={element.styles}
            className={cn(element.className)}
         />
      </ElementWrapper>
   );
};

export default EditorHr;
