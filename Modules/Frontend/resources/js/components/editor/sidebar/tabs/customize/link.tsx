import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { useEditor } from '@/frontend/hooks/use-editor';

const LinkSettings = ({
   changeHtmlAttributes,
}: {
   changeHtmlAttributes: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   const handleLinkTypeChange = (value: string) => {
      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: {
               ...editor.editor.selectedElement,
               htmlAttributes: {
                  ...editor.editor.selectedElement.htmlAttributes,
                  type: value,
               },
            },
         },
      });
   };

   return (
      editor.editor.selectedElement.type === 'link' && (
         <div className="flex flex-col gap-2">
            <Label>Link Path</Label>
            <Input
               id="href"
               placeholder="https://domain.example.com/pathname"
               onChange={changeHtmlAttributes}
               value={
                  editor.editor.selectedElement.htmlAttributes?.href ||
                  (typeof editor.editor.selectedElement.content === 'object' &&
                  !Array.isArray(editor.editor.selectedElement.content) &&
                  editor.editor.selectedElement.content !== null &&
                  'href' in editor.editor.selectedElement.content
                     ? (editor.editor.selectedElement.content as any).href
                     : '')
               }
            />

            <Label>Link Type</Label>
            <Select
               value={
                  (editor.editor.selectedElement.htmlAttributes
                     ?.type as string) || 'native'
               }
               onValueChange={handleLinkTypeChange}
            >
               <SelectTrigger>
                  <SelectValue placeholder="Select link type" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="native">Native Link</SelectItem>
                  <SelectItem value="inertia">Inertia Link</SelectItem>
               </SelectContent>
            </Select>
         </div>
      )
   );
};

export default LinkSettings;
