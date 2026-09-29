import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface CheckboxProps {
   element: EditorElement;
}

const EditorCheckbox: React.FC<CheckboxProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const spanRef = React.useRef<HTMLSpanElement>(null);

   const checkboxLabel =
      typeof content === 'object' && 'label' in content
         ? content.label
         : 'Checkbox';
   const checkboxName =
      typeof content === 'object' && 'name' in content ? content.name : '';
   const checkboxValue =
      typeof content === 'object' && 'value' in content ? content.value : 'on';
   const checked =
      typeof content === 'object' && 'checked' in content
         ? content.checked
         : false;

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (spanRef.current && spanRef.current.innerText !== checkboxLabel) {
         spanRef.current.innerText = checkboxLabel as string;
      }
   }, [checkboxLabel]);

   if (editor.liveMode) {
      return (
         <label
            style={styles}
            className={cn('flex items-center gap-2', element.className)}
         >
            <input
               type="checkbox"
               name={checkboxName as string}
               value={checkboxValue as string}
               defaultChecked={checked as boolean}
            />
            <span className="ml-2">{checkboxLabel as string}</span>
         </label>
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <label
            style={styles}
            className={cn('flex items-center gap-2', element.className)}
         >
            <input
               type="checkbox"
               name={checkboxName as string}
               value={checkboxValue as string}
               defaultChecked={checked as boolean}
               disabled={!editor.liveMode}
            />
            <ElementWrapper
               element={{
                  ...element,
                  id: `${element.id}-label`,
                  type: 'span',
               }}
               tag="span"
               wrapperClassName=""
               showDeleteButton={false}
               htmlAttributes={{
                  ref: spanRef,
                  className: 'ml-2 outline-none',
               }}
               contentEditable={!editor.liveMode}
               suppressContentEditableWarning
               onBlur={(e) => {
                  const spanElement = e.target as HTMLSpanElement;
                  const newLabel = spanElement.innerText;

                  // Only dispatch if content actually changed
                  if (newLabel !== checkboxLabel) {
                     dispatch({
                        type: 'UPDATE_ELEMENT',
                        payload: {
                           elementDetails: {
                              ...element,
                              content: {
                                 ...(typeof content === 'object'
                                    ? content
                                    : {}),
                                 label: newLabel,
                              },
                           },
                        },
                     });
                  }
               }}
            >
               {checkboxLabel as string}
            </ElementWrapper>
         </label>
      </ElementWrapper>
   );
};

export default EditorCheckbox;
