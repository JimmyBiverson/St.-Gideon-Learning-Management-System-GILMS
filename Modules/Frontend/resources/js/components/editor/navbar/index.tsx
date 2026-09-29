import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { index, content } from '@/routes/frontend-pages';
import { update as updateTranslations } from '@/routes/frontend-pages/translations';
import { Link, router, usePage } from '@inertiajs/react';
import { Home, Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import EditorAppearance from '@/frontend/components/editor/navbar/partials/appearance';
import EditorDeviceMode from '@/frontend/components/editor/navbar/partials/device-mode';
import EditorLocaleSwitcher from '@/frontend/components/editor/navbar/partials/locale-switcher';
import EditorPreview from '@/frontend/components/editor/navbar/partials/preview';
import EditorRedoUndo from '@/frontend/components/editor/navbar/partials/redo-undo';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorNavigation = () => {
   const { props } = usePage<EditorProps>();
   const { project, page } = props;
   const { editor, dispatch } = useEditor();
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      dispatch({
         type: 'SET_PROJECT_PAGE_ID',
         payload: {
            projectPageId: page.id.toString(),
         },
      });
   }, [dispatch, page]);

   const handlePreviewClick = useCallback(() => {
      dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
      dispatch({ type: 'TOGGLE_LIVE_MODE' });
   }, [dispatch]);

   const handleUndo = useCallback(() => {
      dispatch({ type: 'UNDO' });
   }, [dispatch]);

   const handleRedo = useCallback(() => {
      dispatch({ type: 'REDO' });
   }, [dispatch]);

   const handleSave = useCallback(async () => {
      setIsLoading(true);

      // Non-default locale: save only the translation overlay. The
      // default-locale `content` (source of truth) is never touched from a
      // translation session.
      if (!editor.editor.isDefaultLocale) {
         const payload = Object.entries(editor.editor.translations).flatMap(
            ([elementId, fields]) =>
               Object.entries(fields).map(([field, value]) => ({
                  element_id: elementId,
                  field,
                  value,
               })),
         );

         router.put(
            updateTranslations({
               project: project.id,
               page: page.id,
               locale: editor.editor.activeLocale,
            }),
            { translations: payload },
            {
               preserveScroll: true,
               preserveState: true,
               onSuccess: () => setIsLoading(false),
               onError: () => {
                  toast.error('Oops!', {
                     description: 'Could not save translations',
                  });
                  setIsLoading(false);
               },
            },
         );

         return;
      }

      const serializedContent = JSON.stringify(editor.editor.elements);

      router.put(
         content({
            project: project.id,
            page: page.id,
         }),
         { content: serializedContent },
         {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
               dispatch({ type: 'CLEAR_HISTORY' });
               setIsLoading(false);
            },
            onError: () => {
               toast.error('Oopse!', {
                  description: 'Could not save content',
               });
               setIsLoading(false);
            },
         },
      );
   }, [
      dispatch,
      editor.editor.activeLocale,
      editor.editor.elements,
      editor.editor.isDefaultLocale,
      editor.editor.translations,
      page.id,
      project.id,
   ]);

   const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
         if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            void handleSave();
         } else if (
            event.key === 'z' &&
            (event.ctrlKey || event.metaKey) &&
            !event.shiftKey
         ) {
            event.preventDefault();
            handleUndo();
         } else if (
            event.key === 'z' &&
            (event.ctrlKey || event.metaKey) &&
            event.shiftKey
         ) {
            event.preventDefault();
            handleRedo();
         } else if (event.key === 'y' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            handleRedo();
         } else if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            handlePreviewClick();
         }
      },
      [handlePreviewClick, handleRedo, handleSave, handleUndo],
   );

   useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);

      // Also add listener to iframe content if it exists
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;
      const iframeDoc =
         iframe?.contentDocument || iframe?.contentWindow?.document;

      if (iframeDoc) {
         iframeDoc.addEventListener('keydown', handleKeyDown);
      }

      return () => {
         document.removeEventListener('keydown', handleKeyDown);

         if (iframeDoc) {
            iframeDoc.removeEventListener('keydown', handleKeyDown);
         }
      };
   }, [handleKeyDown]);

   const handleCompactSidebar = () => {
      dispatch({
         type: 'SET_COMPACT_SIDEBAR',
         payload: { compactSidebar: false },
      });
   };

   if (editor.editor.liveMode || editor.editor.previewMode) {
      return null;
   }

   return (
      <nav className="flex h-16 items-center justify-between gap-2 border-b px-4 py-2 transition-all md:px-6">
         <aside className="flex items-center gap-2">
            {editor.editor.windowWidth < 1024 && (
               <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 shadow-md"
                  onClick={handleCompactSidebar}
               >
                  <Menu className="h-5 w-5" />
               </Button>
            )}
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href={index()}>
                     <Button variant="outline" size="icon">
                        <Home className="h-5 w-5" aria-label="Back" />
                     </Button>
                  </Link>
               </TooltipTrigger>
               <TooltipContent>
                  <p className="inline-flex items-center gap-2">
                     Back to Pages
                  </p>
               </TooltipContent>
            </Tooltip>

            {/* ModeToggle has its own dropdown, no tooltip needed */}
            <EditorAppearance />

            {/* Preview has its own dropdown, no tooltip needed */}
            <EditorPreview />
         </aside>

         <aside className="flex items-center gap-2">
            <EditorDeviceMode />
            <EditorLocaleSwitcher />
         </aside>

         <aside className="flex items-center gap-2">
            <EditorRedoUndo />

            <div className="relative flex flex-col gap-1">
               <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-3 md:px-4"
               >
                  Save{' '}
                  {editor.history.history.length > 1 &&
                     `(${editor.history.history.length - 1 <= 50 ? editor.history.history.length - 1 : '50+'})`}
               </Button>
            </div>
         </aside>
      </nav>
   );
};

export default EditorNavigation;
