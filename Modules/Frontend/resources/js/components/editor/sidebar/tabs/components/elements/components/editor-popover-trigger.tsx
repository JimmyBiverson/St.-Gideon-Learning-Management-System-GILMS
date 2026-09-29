import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import ElementWrapper from '../element-wrapper';

interface PopoverTriggerProps {
   element: EditorElement;
}

const EditorPopoverTrigger: React.FC<PopoverTriggerProps> = ({ element }) => {
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   return (
      <ElementWrapper
         element={element}
         isContainer={true}
         tag="button"
         htmlAttributes={{ type: 'button' }}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorPopoverTrigger;
