import { EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';
import { createContext, useContext, useRef, useState } from 'react';
import CodeMirrorEditor from '@/components/rich-editor/components/Source';
import useTiptapEditor from '../hooks/useTiptapEditor';
import type { UseTiptapEditorOptions } from '../hooks/useTiptapEditor';

type TiptapContextType = {
   editor: Editor;
   // contentElement: RefObject<Element>
   contentElement: RefObject<HTMLDivElement | null>;
   isFullScreen: boolean;
   isResizing: boolean;
   isSourceMode: boolean;
   toggleFullScreen: () => void;
   toggleSourceMode: () => void;
   setIsResizing: (value: boolean) => void;
};

const TiptapContext = createContext<TiptapContextType>({} as TiptapContextType);
export const useTiptapContext = () => useContext(TiptapContext);

type TiptapProviderProps = {
   slotBefore?: ReactNode;
   slotAfter?: ReactNode;
   editorOptions: UseTiptapEditorOptions;
   children?: ReactNode;
   change?: boolean;
};

export const TiptapProvider = ({
   children,
   editorOptions,
   slotBefore,
   slotAfter,
   change = false,
}: TiptapProviderProps) => {
   const contentElement = useRef<HTMLDivElement>(null);
   const editor = useTiptapEditor(editorOptions);
   const [isFullScreen, setIsFullScreen] = useState(false);
   const [isSourceMode, setIsSourceMode] = useState(false);
   const [isResizing, setIsResizing] = useState(false);

   if (!editor) {
      return null;
   }

   const focusEditorViaContainer = (event: React.MouseEvent) => {
      const target = event.target as Element;
      const content = contentElement.current;

      if (content && target.contains(content)) {
         content.style.display = 'flex';
         setTimeout(() => {
            content.style.display = '';
         }, 0);
      }
   };

   const editorContent = (
      <div
         className={clsx(
            'rte-editor',
            isFullScreen && 'rte-editor--fullscreen',
            'rounded-lg border border-input shadow-xs transition-[color,box-shadow]',
            change
               ? 'selection:bg-primary selection:text-primary-foreground focus-within:border-ring focus-within:ring-1 focus-within:ring-ring hover:border-ring'
               : 'selection:bg-zinc-900 selection:text-zinc-50 focus-within:border-zinc-900 focus-within:ring-1 focus-within:ring-zinc-900 hover:border-zinc-900 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 dark:focus-within:border-zinc-50 dark:focus-within:ring-zinc-50 dark:hover:border-zinc-50',
         )}
      >
         {slotBefore}
         <div
            className="rte-editor__container"
            onMouseDown={focusEditorViaContainer}
         >
            {isSourceMode ? (
               <CodeMirrorEditor initialContent={editor.getHTML() || ''} />
            ) : (
               <EditorContent
                  ref={contentElement}
                  editor={editor}
                  className="rte-editor__content"
               />
            )}
         </div>
         {children}
         {slotAfter}
      </div>
   );

   return (
      <TiptapContext.Provider
         value={{
            editor,
            contentElement,
            isFullScreen,
            isResizing,
            isSourceMode,
            setIsResizing,
            toggleFullScreen: () => setIsFullScreen((prev) => !prev),
            toggleSourceMode: () => setIsSourceMode((prev) => !prev),
         }}
      >
         {editorContent}
      </TiptapContext.Provider>
   );
};

export default TiptapProvider;
