import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface SpanProps {
   element: EditorElement;
}

const EditorSpan: React.FC<SpanProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const hasChildren = Array.isArray(content);
   const spanRef = React.useRef<HTMLSpanElement>(null);

   const innerText =
      !hasChildren && typeof content === 'object' && 'innerText' in content
         ? content.innerText
         : 'Text';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (spanRef.current && spanRef.current.innerText !== innerText) {
         spanRef.current.innerText = innerText as string;
      }
   }, [innerText]);

   const onKeyDown = (event: React.KeyboardEvent) => {
      formatTextOnKeyboard(event, editor, dispatch);
   };

   return (
      <ElementWrapper
         tag="span"
         element={element}
         wrapperClassName="relative"
         htmlAttributes={{
            style: styles,
            className: cn('outline-none', element.className),
            ref: spanRef,
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const spanElement = e.target as HTMLSpanElement;
            const newInnerText = spanElement.innerText;

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

export default EditorSpan;
