import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface DropdownMenuItemProps {
   element: EditorElement;
}

const EditorDropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
   element,
}) => {
   const { editor: editorState, dispatch } = useEditor();
   const { editor } = editorState;
   const { content, styles } = element;
   const itemRef = React.useRef<HTMLDivElement>(null);

   const hasChildren = Array.isArray(content);
   const innerText =
      !hasChildren && typeof content === 'object' && 'innerText' in content
         ? content.innerText
         : 'Item';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (itemRef.current && itemRef.current.innerText !== innerText) {
         itemRef.current.innerText = innerText as string;
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
            ref: itemRef,
            style: styles,
            className: cn('block w-full outline-none', element.className),
            onClick: (e: React.MouseEvent) => {
               if (!editor.liveMode) {
                  e.preventDefault();
               }
            },
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

export default EditorDropdownMenuItem;
