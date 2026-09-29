import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import { addElement } from '@/frontend/lib/add-element';
import ElementWrapper from '../element-wrapper';

interface DropdownMenuContentProps {
   element: EditorElement;
}

const EditorDropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
   element,
}) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;

   const handleAddItem = (e: React.MouseEvent) => {
      e.stopPropagation();
      addElement('dropdownMenuItem', element.id, dispatch);
   };

   // Get placement from content
   const placement =
      typeof element.content === 'object' && 'placement' in element.content
         ? element.content.placement
         : 'left';

   // Position classes based on placement
   const getPlacementClasses = () => {
      switch (placement) {
         case 'right':
            return 'left-0';
         case 'center':
            return 'left-1/2 -translate-x-1/2';
         case 'top':
            return 'bottom-full mb-2 left-0';
         case 'bottom':
            return 'top-full mt-2 left-0';
         default: // 'left'
            return 'right-0';
      }
   };

   // Get children from content if using new structure
   const children: EditorElement[] =
      typeof element.content === 'object' && 'children' in element.content
         ? (element.content.children as EditorElement[] | undefined) || []
         : Array.isArray(element.content)
           ? element.content
           : [];

   // Create modified element with children array for ElementWrapper
   const modifiedElement: EditorElement = {
      ...element,
      content: children,
   };

   const { id, type } = modifiedElement;
   const childIds = Array.isArray(children)
      ? children.map((child) => child.id)
      : [];

   return (
      <ElementWrapper
         element={modifiedElement}
         isContainer={true}
         wrapperClassName={cn('absolute', getPlacementClasses())}
      >
         {Array.isArray(children) && (
            <SortableList items={childIds} id={id} content={children} />
         )}

         {!editor.liveMode && (
            <button
               onClick={handleAddItem}
               className="mt-1 flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
               <Plus className="h-4 w-4" />
               <span>Add Item</span>
            </button>
         )}
      </ElementWrapper>
   );
};

export default EditorDropdownMenuContent;
