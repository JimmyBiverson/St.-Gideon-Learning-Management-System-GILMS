import { usePage } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import setGlobalColorTheme from '@/lib/theme-colors';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
   buttonClass?: string;
}

const Appearance = ({ className, buttonClass, ...props }: Props) => {
   const page = usePage<SharedData>();
   const { appearance, updateAppearance } = useAppearance();

   const getCurrentIcon = () => {
      switch (appearance) {
         case 'dark':
            return <Moon className="!h-5 !w-5" />;
         case 'light':
            return <Sun className="!h-5 !w-5" />;
         default:
            return <Monitor className="!h-5 !w-5" />;
      }
   };

   const appearanceHandler = (appearance: Appearance) => {
      updateAppearance(appearance);

      if (page.props.frontend) {
         setGlobalColorTheme(
            appearance,
            page.props.frontend.theme_color as ThemeColors,
         );
      }
   };

   return (
      <div className={className} {...props}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  size="icon"
                  variant="ghost"
                  className={cn('h-9 w-9 rounded-full', buttonClass)}
               >
                  {getCurrentIcon()}
                  <span className="sr-only">Toggle theme</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem
                  onClick={() => appearanceHandler('light')}
                  className="cursor-pointer"
               >
                  <span className="flex items-center gap-2">
                     <Sun className="h-5 w-5" />
                     Light
                  </span>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => appearanceHandler('dark')}
                  className="cursor-pointer"
               >
                  <span className="flex items-center gap-2">
                     <Moon className="h-5 w-5" />
                     Dark
                  </span>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => appearanceHandler('system')}
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

export default Appearance;
