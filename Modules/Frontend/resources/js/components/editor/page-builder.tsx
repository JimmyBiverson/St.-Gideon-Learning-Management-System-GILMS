import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { EyeOff } from 'lucide-react';
import { lazy, Suspense, useEffect } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import DndEditorCanvas from './dnd/DndEditorCanvas';
import ElementRender from './sidebar/tabs/components/elements/element-render';

const LazyFrame = lazy(() => import('@/components/iframe'));

const EditorPageBuilder = () => {
   const { props } = usePage<EditorProps>();
   const { page } = props;
   const { editor, dispatch } = useEditor();
   const { liveMode } = editor.editor;

   useEffect(() => {
      if (liveMode) {
         dispatch({
            type: 'TOGGLE_LIVE_MODE',
            payload: { value: true },
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [liveMode]);

   useEffect(() => {
      if (!page) {
         return undefined;
      }

      dispatch({
         type: 'LOAD_DATA',
         payload: {
            elements: page.content ? JSON.parse(page.content) : '',
            withLive: !!liveMode,
         },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, liveMode]);

   const handleClickElement = () => {
      dispatch({
         type: 'CHANGE_CLICKED_ELEMENT',
         payload: {},
      });
   };

   const handlePreview = () => {
      dispatch({ type: 'TOGGLE_LIVE_MODE' });
      dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
   };

   return (
      <DndEditorCanvas>
         <div
            onClick={handleClickElement}
            className={cn('w-full overflow-x-hidden', {
               'p-0': editor.editor.previewMode || editor.editor.liveMode,
               'use-automation-zoom-in transition-all':
                  !editor.editor.previewMode && !editor.editor.liveMode,
            })}
         >
            {editor.editor.previewMode && editor.editor.liveMode && (
               <Button
                  variant="outline"
                  size="icon"
                  className="fixed top-4 left-4 z-[100]"
                  onClick={handlePreview}
                  title="Back to editor"
               >
                  <EyeOff aria-label="Back to editor" className="h-4 w-4" />
               </Button>
            )}

            {/* <ResponsiveChecker>
                    {Array.isArray(editor.editor.elements) &&
                        editor.editor.elements.map((element) => (
                            <ElementRender key={element.id} element={element} />
                        ))}
                </ResponsiveChecker> */}
            <Suspense
               fallback={
                  <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
                     <div className="text-muted-foreground">
                        Loading editor...
                     </div>
                  </div>
               }
            >
               <LazyFrame
                  previewTheme={editor.editor.theme}
                  className={cn(
                     'mx-auto',
                     editor.editor.device === 'Mobile'
                        ? 'w-[420px] shadow-[0px_0px_10px_0px_#00000024]'
                        : editor.editor.device === 'Tablet'
                          ? 'w-[780px] shadow-[0px_0px_10px_0px_#00000024]'
                          : 'w-full',
                     editor.editor.previewMode && editor.editor.liveMode
                        ? 'h-screen'
                        : 'h-[calc(100vh-64px)]',
                  )}
               >
                  {Array.isArray(editor.editor.elements) &&
                     editor.editor.elements.map((element) => (
                        <ElementRender key={element.id} element={element} />
                     ))}
               </LazyFrame>
            </Suspense>
         </div>
      </DndEditorCanvas>
   );
};

export default EditorPageBuilder;
