import { cn } from '@/lib/utils';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface DrawerContentProps {
   element: EditorElement;
}

const EditorDrawerContent: React.FC<DrawerContentProps> = ({ element }) => {
   const { editor } = useEditor();
   const editMode = !editor.editor.liveMode || !editor.editor.previewMode;
   // Get placement from content
   const placement =
      typeof element.content === 'object' && 'placement' in element.content
         ? element.content.placement
         : 'left';

   // Position classes based on placement
   const getPlacementClasses = () => {
      switch (placement) {
         case 'right':
            return 'right-0 top-0 h-full border-l w-80';
         case 'top':
            return cn(
               'h-80 w-full border-b',
               editMode && editor.editor.device === 'Desktop'
                  ? 'top-16 left-[300px]'
                  : 'top-0 left-0',
            );
         case 'bottom':
            return cn(
               'bottom-0 h-80 w-full border-t',
               editMode && editor.editor.device === 'Desktop'
                  ? 'left-[300px]'
                  : 'left-0',
            );
         case 'left':
         default:
            return cn(
               'top-0 h-full w-80 border-r',
               editMode && editor.editor.device === 'Desktop'
                  ? 'left-[300px]'
                  : 'left-0',
            );
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
         wrapperClassName={cn('fixed', getPlacementClasses())}
      >
         {Array.isArray(children) && (
            <SortableList items={childIds} id={id} content={children} />
         )}
      </ElementWrapper>
   );
};

export default EditorDrawerContent;
