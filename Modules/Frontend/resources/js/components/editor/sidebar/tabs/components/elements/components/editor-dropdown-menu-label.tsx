import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface DropdownMenuLabelProps {
   element: EditorElement;
}

const EditorDropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
   element,
}) => {
   const { editor: editorState, dispatch } = useEditor();
   const { editor } = editorState;
   const { content, styles } = element;
   const labelRef = React.useRef<HTMLDivElement>(null);

   const hasChildren = Array.isArray(content);
   const innerText =
      !hasChildren && typeof content === 'object' && 'innerText' in content
         ? content.innerText
         : 'Label';

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
         tag="div"
         wrapperClassName="relative"
         htmlAttributes={{
            ref: labelRef,
            style: styles,
            className: cn('block w-full outline-none', element.className),
            ...element.htmlAttributes,
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const divElement = e.target as HTMLDivElement;
            const newInnerText = divElement.innerText;

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

export default EditorDropdownMenuLabel;
