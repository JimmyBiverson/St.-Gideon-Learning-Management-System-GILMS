import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface LabelProps {
   element: EditorElement;
}

const EditorLabel: React.FC<LabelProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const labelRef = React.useRef<HTMLLabelElement>(null);

   const innerText =
      typeof content === 'object' && 'innerText' in content
         ? content.innerText
         : 'Label';
   const htmlFor =
      typeof content === 'object' && 'htmlFor' in content
         ? content.htmlFor
         : '';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (labelRef.current && labelRef.current.innerText !== innerText) {
         labelRef.current.innerText = innerText as string;
      }
   }, [innerText]);

   const onKeyDown = (event: React.KeyboardEvent) => {
      formatTextOnKeyboard(event, editor, dispatch);
   };

   return (
      <ElementWrapper
         element={element}
         tag="label"
         wrapperClassName="relative inline-block"
         htmlAttributes={{
            ref: labelRef,
            htmlFor: htmlFor as string,
            style: styles,
            className: cn('outline-none', element.className),
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const labelElement = e.target as HTMLLabelElement;
            const newInnerText = labelElement.innerText;

            // Only dispatch if content actually changed
            if (newInnerText !== innerText) {
               dispatch({
                  type: 'UPDATE_ELEMENT',
                  payload: {
                     elementDetails: {
                        ...element,
                        content: {
                           ...(typeof content === 'object' ? content : {}),
                           innerText: newInnerText,
                        },
                     },
                  },
               });
            }
         }}
      >
         {innerText as string}
      </ElementWrapper>
   );
};

export default EditorLabel;
