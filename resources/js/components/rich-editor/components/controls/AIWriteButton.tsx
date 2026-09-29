import { useEditorState } from '@tiptap/react';
import { memo, useCallback } from 'react';
import AiContentModal from '@/components/ai-content-modal';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';

const AIWriteButton = () => {
   const { editor } = useTiptapContext();

   const selectionText = useEditorState({
      editor,
      selector: (ctx) => {
         const { from, to } = ctx.editor.state.selection;

         return ctx.editor.state.doc.textBetween(from, to).trim();
      },
   });

   const handleGenerated = useCallback(
      ({ content, format }: AiGlobalContentResponse) => {
         if (
            format === 'json' &&
            typeof content === 'object' &&
            content !== null
         ) {
            editor.chain().focus().insertContent(content).run();

            return;
         }

         const asString =
            typeof content === 'string' ? content : JSON.stringify(content);
         editor.chain().focus().insertContent(asString).run();
      },
      [editor],
   );

   return (
      <AiContentModal
         format="html"
         title="Write with AI"
         context={selectionText.length > 0 ? selectionText : undefined}
         handler={
            <MenuButton
               icon="AiWrite"
               tooltip="Write with AI"
               buttonClass="!text-violet-700 dark:!text-violet-400"
            />
         }
         onGenerated={handleGenerated}
      />
   );
};

export default memo(AIWriteButton);
