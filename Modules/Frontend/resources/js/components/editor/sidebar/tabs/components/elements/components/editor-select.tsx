import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface SelectProps {
   element: EditorElement;
}

const EditorSelect: React.FC<SelectProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const selectName =
      typeof content === 'object' && 'name' in content ? content.name : '';
   const options =
      typeof content === 'object' && 'options' in content
         ? content.options
         : ['Option 1', 'Option 2', 'Option 3'];

   if (editor.liveMode) {
      return (
         <select
            style={styles}
            name={selectName as string}
            className={cn('w-full', element.className)}
         >
            {Array.isArray(options) &&
               options.map((option, index) => (
                  <option key={index} value={option}>
                     {option}
                  </option>
               ))}
         </select>
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <select
            style={{
               ...styles,
               pointerEvents: editor.liveMode ? 'auto' : 'none',
            }}
            name={selectName as string}
            disabled={!editor.liveMode}
            className={cn('w-full', element.className)}
         >
            {Array.isArray(options) &&
               options.map((option, index) => (
                  <option key={index} value={option}>
                     {option}
                  </option>
               ))}
         </select>
      </ElementWrapper>
   );
};

export default EditorSelect;
