import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Redo2, Undo2 } from 'lucide-react';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorRedoUndo = () => {
   const { editor, dispatch } = useEditor();

   const handleUndo = () => {
      dispatch({ type: 'UNDO' });
   };

   const handleRedo = () => {
      dispatch({ type: 'REDO' });
   };

   return (
      <>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  disabled={editor.history.currentIndex > 0 === false}
                  onClick={handleUndo}
                  variant="outline"
                  size="icon"
               >
                  <Undo2 className="h-5 w-5" aria-label="Undo" />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p className="inline-flex items-center gap-2">
                  Undo{' '}
                  <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
                     <div className="text-xs">⌘</div>Z
                  </kbd>
               </p>
            </TooltipContent>
         </Tooltip>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  disabled={
                     editor.history.currentIndex <
                        editor.history.history.length - 1 ===
                     false
                  }
                  onClick={handleRedo}
                  variant="outline"
                  size="icon"
               >
                  <Redo2 className="h-5 w-5" aria-label="Redo" />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p className="inline-flex items-center gap-2">
                  Redo{' '}
                  <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
                     <div className="text-xs">⌘</div>Y
                  </kbd>
               </p>
            </TooltipContent>
         </Tooltip>
      </>
   );
};

export default EditorRedoUndo;
