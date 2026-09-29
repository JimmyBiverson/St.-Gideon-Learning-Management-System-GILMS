import { cn } from '@/lib/utils';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface FooterProps {
   element: EditorElement;
}

const EditorFooter: React.FC<FooterProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   return (
      <ElementWrapper
         tag="footer"
         element={element}
         isContainer={true}
         wrapperClassName={cn('relative transition-all', {
            'p-2': !editor.liveMode && !editor.previewMode,
         })}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorFooter;
