import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import { addElement } from '@/frontend/lib/add-element';
import ElementWrapper from '../element-wrapper';

interface TabsListProps {
   element: EditorElement;
}

const EditorTabsList: React.FC<TabsListProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   const handleAddTab = (e: React.MouseEvent) => {
      e.stopPropagation();
      addElement('tabsTrigger', element.id, dispatch);

      // Find parent Tabs element by searching through all elements recursively
      const findParentTabs = (
         elements: EditorElement[],
      ): EditorElement | null => {
         for (const el of elements) {
            if (
               Array.isArray(el.content) &&
               el.content.some(
                  (child: EditorElement) => child.id === element.id,
               )
            ) {
               return el;
            }

            if (Array.isArray(el.content)) {
               const found = findParentTabs(el.content);

               if (found) {
                  return found;
               }
            }
         }

         return null;
      };

      const parentElement = findParentTabs(editor.elements);

      if (parentElement) {
         addElement('tabsContent', parentElement.id, dispatch);
      }
   };

   return (
      <ElementWrapper
         element={element}
         isContainer={true}
         wrapperClassName={cn({
            'p-1': !editor.liveMode && !editor.previewMode,
         })}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}

         {!editor.liveMode && (
            <button
               onClick={handleAddTab}
               className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
               <Plus className="h-4 w-4" />
            </button>
         )}
      </ElementWrapper>
   );
};

export default EditorTabsList;
