import { useEditorState } from '@tiptap/react';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';
import { PopoverClose } from '../ui/Popover';
import { Toolbar } from '../ui/Toolbar';

import AlignCenterButton from './AlignCenterButton';
import AlignJustifyButton from './AlignJustifyButton';
import AlignLeftButton from './AlignLeftButton';
import AlignRightButton from './AlignRightButton';

const AlignPopover = () => {
   const { editor } = useTiptapContext();

   const current = useEditorState({
      editor,
      selector: (ctx) => {
         if (ctx.editor.isActive({ textAlign: 'right' })) {
            return 'AlignRight';
         } else if (ctx.editor.isActive({ textAlign: 'center' })) {
            return 'AlignCenter';
         } else if (ctx.editor.isActive({ textAlign: 'justify' })) {
            return 'AlignJustify';
         }

         return 'AlignLeft';
      },
   });

   const isDisabled = !editor.isEditable || !editor.can().setTextAlign('left');

   return (
      <MenuButton
         type="popover"
         icon={current}
         tooltip="Alignment"
         disabled={isDisabled}
      >
         <PopoverClose asChild>
            <Toolbar dense={true}>
               <AlignLeftButton />
               <AlignCenterButton />
               <AlignRightButton />
               <AlignJustifyButton />
            </Toolbar>
         </PopoverClose>
      </MenuButton>
   );
};

export default AlignPopover;
