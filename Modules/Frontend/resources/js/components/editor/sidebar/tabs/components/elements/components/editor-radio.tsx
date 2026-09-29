import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface RadioProps {
   element: EditorElement;
}

const EditorRadio: React.FC<RadioProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const spanRef = React.useRef<HTMLSpanElement>(null);

   const radioLabel =
      typeof content === 'object' && 'label' in content
         ? content.label
         : 'Radio';
   const radioName =
      typeof content === 'object' && 'name' in content ? content.name : '';
   const radioValue =
      typeof content === 'object' && 'value' in content
         ? content.value
         : 'option';
   const checked =
      typeof content === 'object' && 'checked' in content
         ? content.checked
         : false;

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (spanRef.current && spanRef.current.innerText !== radioLabel) {
         spanRef.current.innerText = radioLabel as string;
      }
   }, [radioLabel]);

   if (editor.liveMode) {
      return (
         <label
            style={styles}
            className={cn('flex items-center gap-2', element.className)}
         >
            <input
               type="radio"
               name={radioName as string}
               value={radioValue as string}
               defaultChecked={checked as boolean}
            />
            <span className="ml-2">{radioLabel as string}</span>
         </label>
      );
   }

   return (
      <ElementWrapper element={element} applyStyles={false}>
         <label
            style={styles}
            className={cn('flex items-center gap-2', element.className)}
         >
            <input
               type="radio"
               name={radioName as string}
               value={radioValue as string}
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
                  if (newLabel !== radioLabel) {
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
               {radioLabel as string}
            </ElementWrapper>
         </label>
      </ElementWrapper>
   );
};

export default EditorRadio;
