'use client';

import '@/components/rich-editor/style/editor.css';

import type { Content, Editor } from '@tiptap/react';
import { forwardRef, useCallback, useEffect } from 'react';
import ExtensionKit from '@/components/rich-editor/components/extensions/kit';
import MenuBar from '@/components/rich-editor/components/MenuBar';
import {
   CodeBlockMenu,
   ImageMenu,
   LinkMenu,
} from '@/components/rich-editor/components/menus';
import TableMenu from '@/components/rich-editor/components/menus/TableMenu';
import TiptapProvider from '@/components/rich-editor/components/Provider';
import Resizer from '@/components/rich-editor/components/Resizer';
import StatusBar from '@/components/rich-editor/components/StatusBar';

import { Toaster } from '@/components/rich-editor/components/ui/sonner';
import type { UseTiptapEditorOptions } from '@/components/rich-editor/hooks/useTiptapEditor';
import { cssVar } from '@/components/rich-editor/lib/cssVar';
import { throttle } from '@/components/rich-editor/lib/throttle';
export type TiptapEditorRef = {
   getInstance: () => Editor | null;
};

export interface TiptapEditorProps {
   ssr?: boolean;
   readonly?: boolean;
   disabled?: boolean;
   initialContent?: Content;
   placeholder?: {
      paragraph?: string;
      imageCaption?: string;
   };
   output?: 'html' | 'json';
   hideMenuBar?: boolean;
   hideStatusBar?: boolean;
   hideBubbleMenu?: boolean;
   containerClass?: string;
   menuBarClass?: string;
   contentClass?: string;
   contentMinHeight?: string | number;
   contentMaxHeight?: string | number;
   onContentChange?: (value: Content) => void;
   change?: boolean;
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
   (
      {
         ssr = false,
         output = 'html',
         readonly = false,
         disabled = false,
         initialContent,
         placeholder,
         hideMenuBar = false,
         hideStatusBar = false,
         hideBubbleMenu = true,
         contentMinHeight = 200,
         contentMaxHeight,
         onContentChange,
         change = false,
      },
      ref,
   ) => {
      const isServer = typeof window === 'undefined';
      const effectiveSsr = ssr || isServer;
      const isEditable = !readonly && !disabled;
      const displayBubbleMenu = isEditable && hideBubbleMenu;

      const throttledUpdate = useCallback(
         throttle((value: Content) => onContentChange?.(value), 1500),
         [],
      );

      const handleUpdate = useCallback(
         (editor: Editor) => {
            const content =
               output === 'html'
                  ? editor.isEmpty
                     ? ''
                     : editor.getHTML()
                  : editor.getJSON();
            throttledUpdate(content);
         },
         [throttledUpdate, output],
      );

      const editorOptions: UseTiptapEditorOptions = {
         ref,
         placeholder,
         extensions: ExtensionKit,
         content: initialContent,
         editable: isEditable,
         immediatelyRender: !effectiveSsr,
         shouldRerenderOnTransaction: false,
         autofocus: false,
         onUpdate: ({ editor }) => handleUpdate(editor),
      };

      useEffect(() => {
         cssVar('--rte-editor-min-height', `${contentMinHeight}px`);
         cssVar('--rte-editor-max-height', `${contentMaxHeight}px`);
      }, [contentMaxHeight, contentMinHeight]);

      const menus = displayBubbleMenu && (
         <>
            {/* <TextMenu /> */}
            <LinkMenu />
            <ImageMenu />
            <CodeBlockMenu />
            <TableMenu />
         </>
      );

      return (
         <TiptapProvider
            editorOptions={editorOptions}
            slotBefore={!hideMenuBar && <MenuBar />}
            slotAfter={!hideStatusBar && <StatusBar />}
            change={change}
         >
            {menus}
            <Resizer />
            <Toaster />
         </TiptapProvider>
      );
   },
);

TiptapEditor.displayName = 'TiptapEditor';

export default TiptapEditor;
