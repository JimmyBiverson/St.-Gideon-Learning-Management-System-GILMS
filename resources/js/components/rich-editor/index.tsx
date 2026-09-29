import { forwardRef, lazy, Suspense } from 'react';
import type { TiptapEditorProps, TiptapEditorRef } from './editor';
import { RichEditorFallback } from './editor-fallback';

export type { TiptapEditorProps, TiptapEditorRef };

export { default as Renderer } from './renderer';

const LazyEditor = lazy(() => import('./editor'));

export const Editor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
   function RichTextEditor(props, ref) {
      return (
         <Suspense
            fallback={
               <RichEditorFallback
                  contentMinHeight={props.contentMinHeight}
                  containerClass={props.containerClass}
               />
            }
         >
            <LazyEditor ref={ref} {...props} />
         </Suspense>
      );
   },
);
