import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Expand, LucideImageDown, Shrink } from 'lucide-react';
import { ColorPicker } from '@/frontend/components/editor/color-picker';
import { useEditor } from '@/frontend/hooks/use-editor';

const DecorationsSettings = ({ onChange }: { onChange: (e: any) => void }) => {
   const { editor } = useEditor();

   return (
      <>
         <div className="flex flex-col gap-2">
            <Label>Opacity</Label>
            <div className="-mt-2 flex items-center justify-end">
               <span className="p-2">
                  {typeof editor.editor.selectedElement.styles?.opacity ===
                  'number'
                     ? editor.editor.selectedElement.styles?.opacity
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles?.opacity ||
                             '100'
                          ).replace('%', ''),
                       ) || 100}
                  %
               </span>
            </div>
            <Slider
               onValueChange={(e) => {
                  onChange({
                     target: {
                        id: 'opacity',
                        value: `${e[0]}%`,
                     },
                  });
               }}
               className="-mt-2"
               defaultValue={[
                  typeof editor.editor.selectedElement.styles?.opacity ===
                  'number'
                     ? editor.editor.selectedElement.styles?.opacity
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles?.opacity ||
                             '100'
                          ).replace('%', ''),
                       ) || 100,
               ]}
               max={100}
               step={1}
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Border Color</Label>
            <ColorPicker
               value={
                  editor.editor.selectedElement.styles.borderColor as string
               }
               className="w-full"
               onChange={(e) =>
                  onChange({
                     target: {
                        id: 'borderColor',
                        value: e,
                     },
                  })
               }
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Border Width</Label>
            <div className="-mt-2 flex items-center justify-end">
               <span className="p-2">
                  {typeof editor.editor.selectedElement.styles?.borderWidth ===
                  'number'
                     ? editor.editor.selectedElement.styles?.borderWidth
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles
                                ?.borderWidth || '0'
                          ).replace('px', ''),
                       ) || 0}
                  px
               </span>
            </div>
            <Slider
               onValueChange={(e) => {
                  onChange({
                     target: {
                        id: 'borderWidth',
                        value: `${e[0]}px`,
                     },
                  });
               }}
               className="-mt-2"
               defaultValue={[
                  typeof editor.editor.selectedElement.styles?.borderWidth ===
                  'number'
                     ? editor.editor.selectedElement.styles?.borderWidth
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles
                                ?.borderWidth || '0'
                          ).replace('%', ''),
                       ) || 0,
               ]}
               max={100}
               step={1}
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Border Radius</Label>
            <div className="-mt-2 flex items-center justify-end">
               <span className="p-2">
                  {typeof editor.editor.selectedElement.styles?.borderRadius ===
                  'number'
                     ? editor.editor.selectedElement.styles?.borderRadius
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles
                                ?.borderRadius || '0'
                          ).replace('px', ''),
                       ) || 0}
                  px
               </span>
            </div>
            <Slider
               onValueChange={(e) => {
                  onChange({
                     target: {
                        id: 'borderRadius',
                        value: `${e[0]}px`,
                     },
                  });
               }}
               className="-mt-2"
               defaultValue={[
                  typeof editor.editor.selectedElement.styles?.borderRadius ===
                  'number'
                     ? editor.editor.selectedElement.styles?.borderRadius
                     : parseFloat(
                          (
                             editor.editor.selectedElement.styles
                                ?.borderRadius || '0'
                          ).replace('%', ''),
                       ) || 0,
               ]}
               max={100}
               step={1}
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Background Color</Label>
            <ColorPicker
               value={editor.editor.selectedElement.styles.background as string}
               className="w-full"
               onChange={(e) =>
                  onChange({
                     target: {
                        id: 'background',
                        value: e,
                     },
                  })
               }
            />
         </div>

         <div className="flex flex-col gap-2">
            <Label>Background Image</Label>
            <div className="flex overflow-clip rounded-md border-[1px]">
               <div
                  className="w-12 object-cover object-center"
                  style={{
                     backgroundImage:
                        editor.editor.selectedElement.styles.backgroundImage,
                  }}
               />
               <Input
                  placeholder="url(https://upload.wikimedia.org/wikipedia)"
                  className="mr-2 rounded-none !border-y-0 !border-r-0"
                  id="backgroundImage"
                  onChange={onChange}
                  value={editor.editor.selectedElement.styles.backgroundImage}
               />
            </div>
         </div>

         <div className="flex flex-col gap-2">
            <Label>Image Position</Label>
            <ToggleGroup
               type="single"
               className="w-full items-center justify-between gap-4 rounded-md border p-1"
               onValueChange={(e) =>
                  onChange({
                     target: {
                        id: 'backgroundSize',
                        value: e,
                     },
                  })
               }
               value={editor.editor.selectedElement.styles.backgroundSize?.toString()}
            >
               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="cover">
                        <Expand className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Cover</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="contain">
                        <Shrink className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Contain</p>
                  </TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger>
                     <ToggleGroupItem value="auto">
                        <LucideImageDown className="h-5 w-5" />
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p>Auto</p>
                  </TooltipContent>
               </Tooltip>
            </ToggleGroup>
         </div>
      </>
   );
};

export default DecorationsSettings;
