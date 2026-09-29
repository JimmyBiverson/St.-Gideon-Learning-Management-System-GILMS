import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditor } from '@/frontend/hooks/use-editor';

const DimensionsSettings = ({ onChange }: { onChange: (e: any) => void }) => {
   const { editor } = useEditor();

   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
               <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                     <Label>Height</Label>
                     <Input
                        id="height"
                        placeholder="px"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.height}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label>Width</Label>
                     <Input
                        placeholder="px"
                        id="width"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.width}
                     />
                  </div>
               </div>
            </div>
            <Label className="w-full text-center">Margin (in px)</Label>
            <div className="flex flex-col gap-4">
               <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                     <Label>Top</Label>
                     <Input
                        id="marginTop"
                        placeholder="px"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.marginTop}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label>Bottom</Label>
                     <Input
                        placeholder="px"
                        id="marginBottom"
                        onChange={onChange}
                        value={
                           editor.editor.selectedElement.styles.marginBottom
                        }
                     />
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                     <Label>Left</Label>
                     <Input
                        placeholder="px"
                        id="marginLeft"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.marginLeft}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label>Right</Label>
                     <Input
                        placeholder="px"
                        id="marginRight"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.marginRight}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-col gap-4">
            <Label className="w-full text-center">Padding (in px)</Label>
            <div className="flex flex-col gap-4">
               <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                     <Label>Top</Label>
                     <Input
                        placeholder="px"
                        id="paddingTop"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.paddingTop}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label>Bottom</Label>
                     <Input
                        placeholder="px"
                        id="paddingBottom"
                        onChange={onChange}
                        value={
                           editor.editor.selectedElement.styles.paddingBottom
                        }
                     />
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                     <Label>Left</Label>
                     <Input
                        placeholder="px"
                        id="paddingLeft"
                        onChange={onChange}
                        value={editor.editor.selectedElement.styles.paddingLeft}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label>Right</Label>
                     <Input
                        placeholder="px"
                        id="paddingRight"
                        onChange={onChange}
                        value={
                           editor.editor.selectedElement.styles.paddingRight
                        }
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DimensionsSettings;
