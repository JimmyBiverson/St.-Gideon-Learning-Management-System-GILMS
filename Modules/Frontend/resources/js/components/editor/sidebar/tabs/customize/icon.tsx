import React from 'react';
import IconPicker from '@/frontend/components/editor/icon-picker';
import { useEditor } from '@/frontend/hooks/use-editor';

const IconSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor } = useEditor();

   return (
      editor.editor.selectedElement.type === 'icon' && (
         <IconPicker
            enableSearch={true}
            onSelect={(e) =>
               changeCustomValues({
                  target: {
                     id: 'icon',
                     value: e,
                  },
               } as any)
            }
         />
      )
   );
};

export default IconSettings;
