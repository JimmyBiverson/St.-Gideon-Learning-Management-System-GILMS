import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEditor } from '@/frontend/hooks/use-editor';
import EditorTabs from './tabs';

const EditorSidebar = () => {
   const { editor } = useEditor();

   if (editor.editor.liveMode || editor.editor.previewMode) {
      return null;
   }

   return (
      <TooltipProvider>
         <section
            className={cn(
               'hidden h-full overflow-x-hidden border-r border-border shadow lg:block',
               editor.editor.liveMode ? 'w-0' : 'w-full max-w-[300px]',
            )}
         >
            <EditorTabs />
         </section>

         <section
            className={cn(
               'fixed z-50 overflow-x-hidden transition-all duration-300 lg:hidden',
               editor.editor.compactSidebar ? 'w-[0px]' : 'w-auto',
            )}
         >
            <div className="h-full border-r border-border bg-background shadow transition-all duration-300">
               <EditorTabs />
            </div>
         </section>
      </TooltipProvider>
   );
};

export default EditorSidebar;
