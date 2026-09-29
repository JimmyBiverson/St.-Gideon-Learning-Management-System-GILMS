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
import { useEditor } from '@/frontend/hooks/use-editor';

const ButtonSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor } = useEditor();

   return (
      editor.editor.selectedElement.type === 'button' && (
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <Label>Button Type</Label>
               <Select
                  onValueChange={(e) =>
                     changeCustomValues({
                        target: {
                           id: 'buttonType',
                           value: e,
                        },
                     } as any)
                  }
                  value={
                     typeof editor.editor.selectedElement.content ===
                        'object' &&
                     !Array.isArray(editor.editor.selectedElement.content) &&
                     editor.editor.selectedElement.content !== null &&
                     'buttonType' in editor.editor.selectedElement.content
                        ? (editor.editor.selectedElement.content as any)
                             .buttonType || 'button'
                        : 'button'
                  }
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Select button type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectLabel>Button Types</SelectLabel>
                        <SelectItem value="button">Button</SelectItem>
                        <SelectItem value="submit">Submit</SelectItem>
                        <SelectItem value="reset">Reset</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
         </div>
      )
   );
};

export default ButtonSettings;
