import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface TextareaProps {
   element: EditorElement;
}

const EditorTextarea: React.FC<TextareaProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { styles, content } = element;

   const placeholder =
      typeof content === 'object' && 'placeholder' in content
         ? content.placeholder
         : 'Enter text...';
   const textareaName =
      typeof content === 'object' && 'name' in content ? content.name : '';
   const textareaValue =
      typeof content === 'object' && 'value' in content ? content.value : '';
   const rows =
      typeof content === 'object' && 'rows' in content ? content.rows : 4;
   const cols =
      typeof content === 'object' && 'cols' in content ? content.cols : 50;

   if (editor.liveMode) {
      return (
         <textarea
            style={styles}
            placeholder={placeholder as string}
            name={textareaName as string}
            defaultValue={textareaValue as string}
            rows={rows as number}
            cols={cols as number}
            className={cn('w-full resize-y', element.className)}
         />
      );
   }

   return (
      <ElementWrapper applyStyles={false} element={element}>
         <textarea
            style={styles}
            placeholder={placeholder as string}
            name={textareaName as string}
            defaultValue={textareaValue as string}
            rows={rows as number}
            cols={cols as number}
            readOnly={!editor.liveMode}
            className={cn('w-full resize-y', element.className)}
         />
      </ElementWrapper>
   );
};

export default EditorTextarea;
