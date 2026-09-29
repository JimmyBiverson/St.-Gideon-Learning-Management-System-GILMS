import { useEditor } from '@tiptap/react';
import type { UseEditorOptions } from '@tiptap/react';
import type { Ref } from 'react';
import { useEffect, useImperativeHandle } from 'react';
import type { TiptapEditorRef } from '../editor';
import useForceUpdate from './useForceUpdate';

export type UseTiptapEditorOptions = UseEditorOptions & {
   ref?: Ref<TiptapEditorRef>;
   placeholder?: {
      paragraph?: string;
      imageCapton?: string;
   };
};

export default function useTiptapEditor({
   ref,
   placeholder,
   ...editorOptions
}: UseTiptapEditorOptions) {
   const forceUpdate = useForceUpdate();
   const editor = useEditor(editorOptions as any, []);

   useImperativeHandle(
      ref,
      () => ({
         getInstance: () => editor,
      }),
      [editor],
   );

   useEffect(() => {
      const isEditable = editorOptions.editable;

      if (!editor || editor.isEditable === isEditable) {
         return;
      }

      editor.setOptions({ editable: Boolean(isEditable) });
      forceUpdate();
   }, [editor, editorOptions.editable]);

   useEffect(() => {
      if (!editor) {
         return;
      }

      // @ts-expect-error placeholder is merged into editorProps at runtime
      editor.setOptions({ editorProps: { placeholder } });
      forceUpdate();
   }, [editor, placeholder]);

   useEffect(() => {
      return () => {
         editor?.destroy();
      };
   }, []);

   return editor;
}
