/**
 * Sortable List Wrapper
 * Creates a sortable context for a list of items
 */

import {
   SortableContext,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementRender from '../sidebar/tabs/components/elements/element-render';
import DroppableContainer from './DroppableContainer';

interface SortableListProps {
   id: string; // Optional container ID
   items: string[]; // Array of item IDs
   content: EditorElement[];
   defaultIndicatorClass?: string;
}

const SortableList: React.FC<SortableListProps> = ({
   id,
   items,
   content,
   defaultIndicatorClass,
}) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;

   if (editor.liveMode) {
      return (content as EditorElement[]).length > 0 ? (
         <>
            {(content as EditorElement[]).map((child) => (
               <ElementRender key={child.id} element={child} />
            ))}
         </>
      ) : null;
   }

   return (
      <SortableContext
         id={id}
         items={items}
         strategy={verticalListSortingStrategy}
      >
         {(content as EditorElement[]).length > 0 ? (
            (content as EditorElement[]).map((child) => (
               <ElementRender key={child.id} element={child} />
            ))
         ) : (
            <DroppableContainer
               index={0}
               id={`droppable-${id}-0`}
               containerId={id}
               className={defaultIndicatorClass}
            />
         )}
      </SortableContext>
   );
};

export default SortableList;
