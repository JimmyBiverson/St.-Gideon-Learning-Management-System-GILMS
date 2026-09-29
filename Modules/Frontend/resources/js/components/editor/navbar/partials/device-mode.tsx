import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorDeviceMode = () => {
   const { editor, dispatch } = useEditor();

   const deviceHandler = (value: DeviceTypes) => {
      dispatch({
         type: 'CHANGE_DEVICE',
         payload: {
            device: value,
         },
      });
   };

   const getCurrentIcon = () => {
      switch (editor.editor.device) {
         case 'Desktop':
            return <Laptop className="h-5 w-5" />;
         case 'Tablet':
            return <Tablet className="h-5 w-5" />;
         case 'Mobile':
            return <Smartphone className="h-5 w-5" />;
      }
   };

   return editor.editor.windowWidth > 768 ? (
      <Tabs
         className="w-fit"
         defaultValue="Desktop"
         value={editor.editor.device}
         onValueChange={(value) => deviceHandler(value as DeviceTypes)}
      >
         <TabsList className="grid h-fit w-full grid-cols-3 gap-x-2 bg-transparent">
            <Tooltip>
               <TooltipTrigger asChild>
                  <TabsTrigger
                     value="Desktop"
                     className="h-9 w-9 cursor-pointer border border-input bg-background p-0 data-[state=active]:bg-muted"
                  >
                     <Laptop className="h-5 w-5" />
                  </TabsTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Desktop</p>
               </TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <TabsTrigger
                     value="Tablet"
                     className="h-9 w-9 cursor-pointer border border-input bg-background p-0 data-[state=active]:bg-muted"
                  >
                     <Tablet className="h-5 w-5" />
                  </TabsTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Tablet</p>
               </TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <TabsTrigger
                     value="Mobile"
                     className="h-9 w-9 cursor-pointer border border-input bg-background p-0 data-[state=active]:bg-muted"
                  >
                     <Smartphone className="h-5 w-5" />
                  </TabsTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Mobile</p>
               </TooltipContent>
            </Tooltip>
         </TabsList>
      </Tabs>
   ) : (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               {getCurrentIcon()}
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center">
            <DropdownMenuItem
               onClick={() => deviceHandler('Desktop')}
               className="cursor-pointer"
            >
               <span className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Desktop
               </span>
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => deviceHandler('Tablet')}
               className="cursor-pointer"
            >
               <span className="flex items-center gap-2">
                  <Tablet className="h-5 w-5" />
                  Tablet
               </span>
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => deviceHandler('Mobile')}
               className="cursor-pointer"
            >
               <span className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile
               </span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default EditorDeviceMode;
