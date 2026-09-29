import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface HeadingProps {
   element: EditorElement;
}

const EditorHeading: React.FC<HeadingProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const hasChildren = Array.isArray(content);
   const headingRef = React.useRef<HTMLHeadingElement>(null);

   const { value: translatableValue, commit } = useTranslatableText(
      element,
      'innerText',
   );
   const innerText =
      !hasChildren && typeof content === 'object'
         ? translatableValue || 'Heading'
         : 'Heading';
   const level =
      !hasChildren && typeof content === 'object' && 'level' in content
         ? content.level
         : 'h2';

   const HeadingTag = level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (headingRef.current && headingRef.current.innerText !== innerText) {
         headingRef.current.innerText = innerText as string;
      }
   }, [innerText]);

   const onKeyDown = (event: React.KeyboardEvent) => {
      formatTextOnKeyboard(event, editor, dispatch);
   };

   return (
      <ElementWrapper
         element={element}
         tag={HeadingTag}
         wrapperClassName="relative w-full"
         htmlAttributes={{
            ref: headingRef,
            style: styles,
            className: cn('outline-none', element.className),
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const newInnerText = (e.target as HTMLHeadingElement).innerText;

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

export default EditorHeading;
