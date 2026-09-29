import { useEditorState } from '@tiptap/react';
import { memo, useCallback } from 'react';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { getNodeContainer } from '../../../lib/getNodeContainer';
import { BubbleMenu } from '../../BubbleMenu';
import MenuButton from '../../MenuButton';
import { useTiptapContext } from '../../Provider';
import { Toolbar, ToolbarDivider } from '../../ui/Toolbar';
import CodeDropdown from './CodeDropdown';

export const CodeBlockMenu = () => {
   const { editor, contentElement } = useTiptapContext();
   const { isCopied, copy } = useCopyToClipboard();

   const language = useEditorState({
      editor,
      selector: (ctx) => {
         if (ctx.editor.isActive('codeBlock')) {
            return ctx.editor.getAttributes('codeBlock').language;
         }

         return null;
      },
   });

   const shouldShow = useCallback(({ editor }: any) => {
      return editor.isActive('codeBlock');
   }, []);

   const handleSelect = useCallback(
      (value: string) =>
         editor.commands.updateAttributes('codeBlock', { language: value }),
      [editor],
   );

   const handleCopy = useCallback(() => {
      const node = getNodeContainer(editor, 'pre');

      if (node?.textContent) {
         copy(node.textContent);
      }
   }, [editor]);

   const handleDelete = useCallback(() => {
      editor.chain().focus().deleteNode('codeBlock').run();
   }, [editor]);

   const getReferencedVirtualElement = useCallback(() => {
      const node = getNodeContainer(editor, 'pre');

      if (!node) {
         return null;
      }

      return {
         getBoundingClientRect: () => node.getBoundingClientRect(),
      };
   }, [editor]);

   return (
      <BubbleMenu
         editor={editor}
         pluginKey={'code-block-bubble'}
         shouldShow={shouldShow}
         updateDelay={100}
         appendTo={() => contentElement.current!}
         getReferencedVirtualElement={getReferencedVirtualElement}
         options={{
            placement: 'top',
         }}
      >
         <Toolbar>
            <CodeDropdown value={language} onSelect={handleSelect} />
            <ToolbarDivider />
            <MenuButton
               icon={isCopied ? 'Check' : 'Clipboard'}
               tooltip="Copy code"
               onClick={handleCopy}
            />
            <MenuButton
               icon="Trash"
               tooltip="Delete code"
               onClick={handleDelete}
            />
         </Toolbar>
      </BubbleMenu>
   );
};

export default memo(CodeBlockMenu);
