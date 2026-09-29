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
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';

const InputSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor } = useEditor();
   const { value: placeholder } = useTranslatableText(
      editor.editor.selectedElement,
      'placeholder',
   );

   return (
      editor.editor.selectedElement.type === 'input' && (
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <Label>Placeholder Text</Label>
               <Input
                  id="placeholder"
                  placeholder="Enter placeholder..."
                  onChange={changeCustomValues}
                  value={placeholder}
               />
            </div>
            <div className="flex flex-col gap-2">
               <Label>Input Type</Label>
               <Select
                  disabled={!editor.editor.isDefaultLocale}
                  onValueChange={(e) =>
                     changeCustomValues({
                        target: {
                           id: 'inputType',
                           value: e,
                        },
                     } as any)
                  }
                  value={
                     typeof editor.editor.selectedElement.content ===
                        'object' &&
                     !Array.isArray(editor.editor.selectedElement.content) &&
                     editor.editor.selectedElement.content !== null &&
                     'inputType' in editor.editor.selectedElement.content
                        ? (editor.editor.selectedElement.content as any)
                             .inputType || 'text'
                        : 'text'
                  }
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Select input type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectLabel>Input Types</SelectLabel>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="password">Password</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="tel">Telephone</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="search">Search</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
         </div>
      )
   );
};

export default InputSettings;
