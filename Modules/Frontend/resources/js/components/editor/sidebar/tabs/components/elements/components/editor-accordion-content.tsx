import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import ElementWrapper from '../element-wrapper';

interface AccordionContentProps {
   element: EditorElement;
}

const EditorAccordionContent: React.FC<AccordionContentProps> = ({
   element,
}) => {
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   return (
      <ElementWrapper element={element} isContainer={true}>
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorAccordionContent;
