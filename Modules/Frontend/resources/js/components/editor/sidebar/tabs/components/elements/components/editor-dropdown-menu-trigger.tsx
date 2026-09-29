import { cn } from '@/lib/utils';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import ElementWrapper from '../element-wrapper';

interface DropdownMenuTriggerProps {
   element: EditorElement;
}

const EditorDropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
   element,
}) => {
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   return (
      <ElementWrapper
         tag="button"
         element={element}
         isContainer={true}
         wrapperClassName="relative"
         htmlAttributes={{
            className: cn(element.className),
            type: 'button',
         }}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorDropdownMenuTrigger;
