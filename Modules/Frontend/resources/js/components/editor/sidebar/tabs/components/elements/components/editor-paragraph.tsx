import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface ParagraphProps {
   element: EditorElement;
}

const EditorParagraph: React.FC<ParagraphProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const hasChildren = Array.isArray(content);
   const pRef = React.useRef<HTMLParagraphElement>(null);

   const { value: translatableValue, commit } = useTranslatableText(
      element,
      'innerText',
   );
   const innerText =
      !hasChildren && typeof content === 'object'
         ? translatableValue || 'Paragraph text'
         : 'Paragraph text';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (pRef.current && pRef.current.innerText !== innerText) {
         pRef.current.innerText = innerText as string;
      }
   }, [innerText]);

   const onKeyDown = (event: React.KeyboardEvent) => {
      formatTextOnKeyboard(event, editor, dispatch);
   };

   return (
      <ElementWrapper
         tag="p"
         element={element}
         wrapperClassName="relative"
         htmlAttributes={{
            ref: pRef,
            style: styles,
            className: cn('outline-none', element.className),
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const newInnerText = (e.target as HTMLParagraphElement).innerText;

            // Only dispatch if content actually changed
            if (newInnerText !== innerText) {
               commit(newInnerText);
            }
         }}
      >
         {innerText as string}
      </ElementWrapper>
   );
};

export default EditorParagraph;
