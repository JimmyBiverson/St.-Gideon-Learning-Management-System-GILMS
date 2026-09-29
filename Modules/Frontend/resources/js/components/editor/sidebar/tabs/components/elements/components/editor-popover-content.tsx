import { cn } from '@/lib/utils';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import ElementWrapper from '../element-wrapper';

interface PopoverContentProps {
   element: EditorElement;
}

const EditorPopoverContent: React.FC<PopoverContentProps> = ({ element }) => {
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
         showDeleteButton={false}
         wrapperClassName={cn('absolute', getPlacementClasses())}
      >
         {Array.isArray(children) && (
            <SortableList items={childIds} id={id} content={children} />
         )}
      </ElementWrapper>
   );
};

export default EditorPopoverContent;
