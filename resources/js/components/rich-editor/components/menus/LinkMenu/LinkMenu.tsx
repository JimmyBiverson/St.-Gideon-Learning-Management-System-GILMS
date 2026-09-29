import { useEditorState } from '@tiptap/react';
import { memo, useCallback, useState } from 'react';
import { BubbleMenu } from '../../BubbleMenu';
import { useTiptapContext } from '../../Provider';
import LinkEdit from './LinkEdit';
import LinkView from './LinkView';

type LinkStorage = {
   mode?: number;
};

export const LinkMenu = () => {
   const { editor, contentElement } = useTiptapContext();
   const [isEditing, setIsEditing] = useState(false);

   const link = useEditorState({
      editor,
      selector: (context) => {
         const mode =
            (context.editor.storage as { link?: LinkStorage }).link?.mode || 0;

         if (!context.editor.isActive('link')) {
            return { mode, url: undefined, text: undefined };
         }

         const {
            state: { selection, doc },
         } = context.editor;
         const url = context.editor.getAttributes('link').href;
         const text = doc.textBetween(selection.from, selection.to);

         return { mode, url, text };
      },
   });

   const shouldShow = useCallback(
      ({
         editor: menuEditor,
         from,
         to,
      }: {
         editor: typeof editor;
         from: number;
         to: number;
      }) => {
         const mode =
            (menuEditor.storage as { link?: LinkStorage }).link?.mode || 0;
         setIsEditing(mode === -1);

         return menuEditor.isActive('link') && (mode === -1 || from !== to);
      },
      [],
   );

   const applyLink = useCallback(
      (url: string, text?: string) => {
         editor
            .chain()
            .confirmEditLink({
               href: url,
               text: text || url,
            })
            .run();
         setIsEditing(false);
      },
      [editor],
   );

   const removeLink = useCallback(() => {
      editor.chain().focus().unsetLink().run();
   }, [editor]);

   const startEdit = useCallback(() => {
      setIsEditing(true);
   }, []);

   const cancelEdit = useCallback(() => {
      const mode = (editor.storage as { link?: LinkStorage }).link?.mode || 0;

      if (mode === -1) {
         editor.commands.confirmEditLink();
      } else {
         setIsEditing(false);
      }
   }, [editor]);

   return (
      <BubbleMenu
         editor={editor}
         pluginKey="link-menu"
         updateDelay={100}
         shouldShow={shouldShow}
         appendTo={() => contentElement.current!}
         options={{
            placement: 'bottom-start',
            onHide: () => setIsEditing(false),
         }}
      >
         {isEditing ? (
            <LinkEdit
               initialUrl={link?.url}
               initialText={link?.text}
               isCreate={link?.mode === -1}
               onApply={applyLink}
               onCancel={cancelEdit}
            />
         ) : (
            <LinkView
               url={link?.url}
               onEdit={startEdit}
               onRemove={removeLink}
            />
         )}
      </BubbleMenu>
   );
};

export default memo(LinkMenu);
