import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { deserializeToReact } from '@/frontend/lib/custom-code-registry';
import ElementRender from '../element-render';

interface ButtonProps {
   element: EditorElement;
}

const EditorCustomCode: React.FC<ButtonProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { content, styles } = element;

   const customCode =
      typeof content === 'object' && 'code' in content
         ? content.code
         : '{"type":"__text__","value":"Custom Code Block"}';

   try {
      const parsed = JSON.parse(customCode as string);
      const renderEditorElement = (el: EditorElement) => {
         return <ElementRender key={el.id} element={el} />;
      };
      const isLiveMode = editor.liveMode && editor.previewMode;
      const reactElement = deserializeToReact(
         parsed,
         renderEditorElement,
         false,
         isLiveMode,
      );

      return reactElement;
   } catch (e) {
      return (
         <div
            style={styles}
            className={cn(
               element.className,
               'custom-code-block border border-red-200 bg-red-50 p-4',
            )}
         >
            <p className="font-bold text-red-600">CustomCode Error:</p>
            <pre className="mt-2 overflow-auto text-xs">{String(e)}</pre>
         </div>
      );
   }
};

export default EditorCustomCode;
