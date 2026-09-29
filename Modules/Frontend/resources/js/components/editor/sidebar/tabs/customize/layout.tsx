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
   AlignHorizontalJustifyCenterIcon,
   AlignHorizontalJustifyEnd,
   AlignHorizontalJustifyStart,
   AlignHorizontalSpaceAround,
   AlignHorizontalSpaceBetween,
   AlignVerticalJustifyCenter,
   AlignVerticalJustifyEnd,
   AlignVerticalJustifyStart,
} from 'lucide-react';
import { useEditor } from '@/frontend/hooks/use-editor';

const LayoutSettings = ({ onChange }: { onChange: (e: any) => void }) => {
   const { editor } = useEditor();

   return (
      <>
         <div className="flex flex-col gap-2">
            <Label>Display Mode</Label>
            <Select
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'display',
                        value: e,
                     },
                  })
               }
            >
               <SelectTrigger>
                  <SelectValue placeholder="Select display" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Display Mode</SelectLabel>
                     <SelectItem value="flex">Flex</SelectItem>
                     <SelectItem value="inline-flex">Inline Flex</SelectItem>
                     <SelectItem value="inline">Inline</SelectItem>
                     <SelectItem value="block">Block</SelectItem>
                     <SelectItem value="inline-block">Inline Block</SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Justify Content</Label>
            <ToggleGroup
               type="single"
               className="w-full items-center justify-between gap-2 rounded-md border p-1"
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'justifyContent',
                        value: e,
                     },
                  })
               }
               value={editor.editor.selectedElement.styles.justifyContent}
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="space-between">
                        <AlignHorizontalSpaceBetween className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Space Between</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="space-around">
                        <AlignHorizontalSpaceAround className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Space Around</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="center">
                        <AlignHorizontalJustifyCenterIcon className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Center</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="flex-start">
                        <AlignHorizontalJustifyStart className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Start</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="flex-end">
                        <AlignHorizontalJustifyEnd className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>End</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Align Items</Label>
            <ToggleGroup
               type="single"
               className="w-full items-center justify-between gap-4 rounded-md border p-1"
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'alignItems',
                        value: e,
                     },
                  })
               }
               value={editor.editor.selectedElement.styles.alignItems}
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="center">
                        <AlignVerticalJustifyCenter className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Center</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="flex-start">
                        <AlignVerticalJustifyStart className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Start</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="flex-end">
                        <AlignVerticalJustifyEnd className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>End</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Direction</Label>
            <Select
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'flexDirection',
                        value: e,
                     },
                  })
               }
            >
               <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Directions</SelectLabel>
                     <SelectItem value="row">Row</SelectItem>
                     <SelectItem value="column">Column</SelectItem>
                     <SelectItem value="row-reverse">Row Reverse</SelectItem>
                     <SelectItem value="column-reverse">
                        Column Reverse
                     </SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
      </>
   );
};

export default LayoutSettings;
