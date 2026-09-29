import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorAppearance = ({
   className,
   ...props
}: HTMLAttributes<HTMLDivElement>) => {
   const { editor, dispatch } = useEditor();

   const getCurrentIcon = () => {
      switch (editor.editor.theme) {
         case 'dark':
            return <Moon className="h-5 w-5" />;
         case 'light':
            return <Sun className="h-5 w-5" />;
         default:
            return <Monitor className="h-5 w-5" />;
      }
   };

   const themeHandler = (value: Themes) => {
      dispatch({
         type: 'CHANGE_THEME',
         payload: {
            theme: value,
         },
      });
   };

   return (
      <div className={className} {...props}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="outline" size="icon">
                  {getCurrentIcon()}
                  <span className="sr-only">Toggle theme</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
               <DropdownMenuItem
                  onClick={() => themeHandler('light')}
                  className="cursor-pointer"
               >
                  <span className="flex items-center gap-2">
                     <Sun className="h-5 w-5" />
                     Light
                  </span>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => themeHandler('dark')}
                  className="cursor-pointer"
               >
                  <span className="flex items-center gap-2">
                     <Moon className="h-5 w-5" />
                     Dark
                  </span>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => themeHandler('system')}
                  className="cursor-pointer"
               >
                  <span className="flex items-center gap-2">
                     <Monitor className="h-5 w-5" />
                     System
                  </span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};

export default EditorAppearance;
