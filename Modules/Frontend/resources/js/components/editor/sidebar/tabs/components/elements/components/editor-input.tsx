import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface InputProps {
   element: EditorElement;
}

const EditorInput: React.FC<InputProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const placeholder =
      typeof content === 'object' && 'placeholder' in content
         ? content.placeholder
         : 'Enter text...';
   const inputType =
      typeof content === 'object' && 'inputType' in content
         ? content.inputType
         : 'text';
   const inputName =
      typeof content === 'object' && 'name' in content ? content.name : '';
   const inputValue =
      typeof content === 'object' && 'value' in content ? content.value : '';

   if (editor.liveMode) {
      return (
         <input
            style={styles}
            placeholder={placeholder as string}
            type={inputType as string}
            name={inputName as string}
            defaultValue={inputValue as string}
            className={cn('w-full', element.className)}
         />
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <input
            style={styles}
            placeholder={placeholder as string}
            type={inputType as string}
            name={inputName as string}
            defaultValue={inputValue as string}
            readOnly={!editor.liveMode}
            className={cn('w-full', element.className)}
         />
      </ElementWrapper>
   );
};

export default EditorInput;
