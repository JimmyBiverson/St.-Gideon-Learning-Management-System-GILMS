import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { useEditor } from '@/frontend/hooks/use-editor';

const AccordionSettings = () => {
   const { editor, dispatch } = useEditor();

   if (editor.editor.selectedElement.type !== 'accordion') {
      return null;
   }

   // Get current accordion type
   const currentType =
      typeof editor.editor.selectedElement.content === 'object' &&
      !Array.isArray(editor.editor.selectedElement.content) &&
      'type' in editor.editor.selectedElement.content
         ? (editor.editor.selectedElement.content.type as string)
         : 'single';

   const handleTypeChange = (value: 'single' | 'multiple') => {
      const currentContent = editor.editor.selectedElement.content;
      const children = Array.isArray(currentContent)
         ? currentContent
         : typeof currentContent === 'object' && 'children' in currentContent
           ? currentContent.children
           : [];

      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: {
               ...editor.editor.selectedElement,
               content: {
                  type: value,
                  children: children,
               },
            },
         },
      });
   };

   return (
      <div className="flex flex-col gap-2">
         <Label htmlFor="accordion-type" className="text-sm font-medium">
            Accordion Type
         </Label>
         <Select value={currentType} onValueChange={handleTypeChange}>
            <SelectTrigger id="accordion-type">
               <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="single">Single</SelectItem>
               <SelectItem value="multiple">Multiple</SelectItem>
            </SelectContent>
         </Select>
         <p className="text-xs text-muted-foreground">
            {currentType === 'single'
               ? 'Only one item can be open at a time'
               : 'Multiple items can be open simultaneously'}
         </p>
      </div>
   );
};

export default AccordionSettings;
