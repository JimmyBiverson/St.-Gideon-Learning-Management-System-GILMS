import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';
import { formatTextOnKeyboard } from '@/frontend/lib/format-text';
import ElementWrapper from '../element-wrapper';

interface ButtonProps {
   element: EditorElement;
}

const EditorButton: React.FC<ButtonProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;
   const hasChildren = Array.isArray(content);
   const buttonRef = React.useRef<HTMLButtonElement>(null);

   const { value: translatableValue, commit } = useTranslatableText(
      element,
      'innerText',
   );
   const buttonText =
      !hasChildren && typeof content === 'object'
         ? translatableValue || 'Button'
         : 'Button';
   const buttonType =
      !hasChildren && typeof content === 'object' && 'buttonType' in content
         ? content.buttonType
         : 'button';

   // Update innerText only when content changes from external source
   React.useEffect(() => {
      if (buttonRef.current && buttonRef.current.innerText !== buttonText) {
         buttonRef.current.innerText = buttonText as string;
      }
   }, [buttonText]);

   const onKeyDown = (event: React.KeyboardEvent) => {
      formatTextOnKeyboard(event, editor, dispatch);
   };

   return (
      <ElementWrapper
         element={element}
         tag="button"
         wrapperClassName="relative"
         htmlAttributes={{
            type: buttonType as 'button' | 'submit' | 'reset',
            style: styles,
            className: cn('outline-none', element.className),
            ref: buttonRef,
         }}
         contentEditable={!editor.liveMode}
         onKeyDown={onKeyDown}
         suppressContentEditableWarning
         onBlur={(e) => {
            const newInnerText = (e.target as HTMLButtonElement).innerText;

            // Only dispatch if content actually changed
            if (newInnerText !== buttonText) {
               commit(newInnerText);
            }
         }}
      >
         {buttonText as string}
      </ElementWrapper>
   );
};

export default EditorButton;
