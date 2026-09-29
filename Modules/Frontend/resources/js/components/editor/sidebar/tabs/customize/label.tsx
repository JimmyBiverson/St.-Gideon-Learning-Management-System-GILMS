import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';

const LabelSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor } = useEditor();
   const { value } = useTranslatableText(
      editor.editor.selectedElement,
      'innerText',
   );

   return (
      editor.editor.selectedElement.type === 'label' && (
         <div className="flex flex-col gap-2">
            <Label>Label Text</Label>
            <Input
               id="innerText"
               placeholder="Enter label text..."
               onChange={changeCustomValues}
               value={value}
            />
         </div>
      )
   );
};

export default LabelSettings;
