import { useEditorState } from '@tiptap/react';
import type { CSSProperties } from 'react';
import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import ColorPicker from '../color-picker';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';

const TextColorButton: React.FC = () => {
   const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
   const { editor } = useTiptapContext();

   const setButtonRef = useCallback((node: HTMLButtonElement | null) => {
      setPortalTarget(node);
   }, []);

   const state = useEditorState({
      editor,
      selector: (ctx) => ({
         color: ctx.editor.getAttributes('textStyle').color || 'DEFAULT',
         disabled: !ctx.editor.can().setColor(''),
      }),
   });

   const colorBarStyle = {
      position: 'absolute',
      bottom: 1.5,
      insetInline: 4,
      height: 4,
      borderRadius: 4,
      pointerEvents: 'none',
      background:
         state.color === 'DEFAULT' ? 'var(--rte-fg, black)' : state.color,
   };

   const renderBar = portalTarget
      ? createPortal(
           <div style={colorBarStyle as CSSProperties} />,
           portalTarget,
        )
      : null;

   return (
      <>
         <MenuButton
            ref={setButtonRef}
            type="popover"
            icon="TextColor"
            hideArrow
            tooltip="Color"
            disabled={state.disabled}
         >
            <ColorPicker
               color={state.color}
               onChange={(color) =>
                  editor.chain().focus().setColor(color).run()
               }
               onReset={() => editor.chain().focus().unsetColor().run()}
            />
         </MenuButton>
         {renderBar}
      </>
   );
};

export default TextColorButton;
