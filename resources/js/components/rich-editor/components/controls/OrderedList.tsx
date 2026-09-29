import { useEditorState } from '@tiptap/react';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';

const OrderedListButton = () => {
   const { editor } = useTiptapContext();
   const state = useEditorState({
      editor,
      selector: (ctx) => {
         return {
            active: ctx.editor.isActive('orderedList'),
            disabled: !ctx.editor.isEditable,
         };
      },
   });

   return (
      <MenuButton
         icon="OrderedList"
         tooltip="Numbered List"
         shortcuts={['Mod', 'Shift', '7']}
         onClick={() => editor.chain().focus().toggleOrderedList().run()}
         {...state}
      />
   );
};

export default OrderedListButton;
