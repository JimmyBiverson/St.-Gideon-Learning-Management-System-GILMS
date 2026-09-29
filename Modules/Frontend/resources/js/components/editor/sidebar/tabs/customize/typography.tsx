import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import {
   AlignCenter,
   AlignLeft,
   AlignRight,
   GripHorizontal,
   Italic,
   RemoveFormatting,
   Type,
   Underline,
   Waves,
} from 'lucide-react';
import { ColorPicker } from '@/frontend/components/editor/color-picker';
import { useEditor } from '@/frontend/hooks/use-editor';

const TypographySettings = ({ onChange }: { onChange: (e: any) => void }) => {
   const { editor } = useEditor();

   return (
      <>
         <div className="flex flex-col gap-2">
            <Label>Text Align</Label>
            <ToggleGroup
               type="single"
               className="w-full items-center justify-between gap-4 rounded-md border p-1"
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'textAlign',
                        value: e,
                     },
                  })
               }
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="left">
                        <AlignLeft className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Left</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="center">
                        <AlignCenter className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Center</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="right">
                        <AlignRight className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Right</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <ColorPicker
               value={editor.editor.selectedElement.styles.color}
               className="w-full"
               onChange={(e) =>
                  onChange({
                     target: {
                        id: 'color',
                        value: e,
                     },
                  })
               }
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Text Decoration</Label>
            <ToggleGroup
               type="single"
               className="w-full items-center justify-between gap-4 rounded-md border p-1"
               value={
                  editor.editor.selectedElement.styles.textDecoration as string
               }
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'textDecoration',
                        value: e,
                     },
                  })
               }
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="underline">
                        <Underline className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p className="inline-flex items-center gap-2">
                        Underline{' '}
                        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100 select-none">
                           <div className="text-xs">⌘</div>U
                        </kbd>
                     </p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="underline dotted">
                        <GripHorizontal className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Dotted</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="underline wavy">
                        <Waves className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Wavy</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Font Style</Label>
            <ToggleGroup
               type="single"
               className="items-center justify-between gap-4 rounded-md border p-1"
               value={editor.editor.selectedElement.styles.fontStyle as string}
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'fontStyle',
                        value: e,
                     },
                  })
               }
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="italic">
                        <Italic className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p className="inline-flex items-center gap-2">
                        Italic{' '}
                        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100 select-none">
                           <div className="text-xs">⌘</div>I
                        </kbd>
                     </p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="normal">
                        <Type className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Normal</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="oblique">
                        <RemoveFormatting className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Oblique</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Weight</Label>
            <Select
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'fontWeight',
                        value: e,
                     },
                  })
               }
               value={editor.editor.selectedElement.styles.fontWeight?.toString()}
               defaultValue={editor.editor.selectedElement.styles.fontWeight?.toString()}
            >
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a weight" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Font Weights</SelectLabel>
                     <SelectItem value="700">Bold</SelectItem>
                     <SelectItem value="600">Semi-bold</SelectItem>
                     <SelectItem value="500">Medium</SelectItem>
                     <SelectItem value="normal">Regular</SelectItem>
                     <SelectItem value="300">Light</SelectItem>
                     <SelectItem value="200">Extra-light</SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Size</Label>
            <Input
               placeholder="px"
               id="fontSize"
               onChange={onChange}
               defaultValue="16px"
               value={editor.editor.selectedElement.styles.fontSize}
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Line Height</Label>
            <Input
               placeholder="rem"
               id="lineHeight"
               onChange={onChange}
               defaultValue="1.5rem"
               value={editor.editor.selectedElement.styles.lineHeight}
            />
         </div>
      </>
   );
};

export default TypographySettings;
