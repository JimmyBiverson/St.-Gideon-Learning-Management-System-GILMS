import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye } from 'lucide-react';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorPreview = () => {
   const { dispatch } = useEditor();

   const handlePreviewClick = () => {
      dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
      dispatch({ type: 'TOGGLE_LIVE_MODE' });
   };

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handlePreviewClick}>
               <Eye className="h-5 w-5" aria-label="Preview" />
            </Button>
         </TooltipTrigger>
         <TooltipContent>
            <p className="inline-flex items-center gap-2">
               Preview{' '}
               <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
                  <div className="text-xs">⌘</div>P
               </kbd>
            </p>
         </TooltipContent>
      </Tooltip>
   );
};

export default EditorPreview;
