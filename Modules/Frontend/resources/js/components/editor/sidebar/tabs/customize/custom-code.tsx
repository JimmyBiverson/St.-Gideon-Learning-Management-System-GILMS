import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';

const InputSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   return (
      editor.editor.selectedElement.type === 'customCode' && (
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <Label>Custom HTML/React Code</Label>
               <Textarea
                  id="code"
                  placeholder="<div>Your custom HTML or React code here...</div>"
                  rows={10}
                  className="font-mono text-sm"
                  onChange={(e) => {
                     dispatch({
                        type: 'UPDATE_ELEMENT',
                        payload: {
                           elementDetails: {
                              ...editor.editor.selectedElement,
                              content: {
                                 ...(typeof editor.editor.selectedElement
                                    .content === 'object' &&
                                 !Array.isArray(
                                    editor.editor.selectedElement.content,
                                 )
                                    ? editor.editor.selectedElement.content
                                    : {}),
                                 code: e.target.value,
                              },
                           },
                        },
                     });
                  }}
                  value={
                     typeof editor.editor.selectedElement.content ===
                        'object' &&
                     !Array.isArray(editor.editor.selectedElement.content) &&
                     editor.editor.selectedElement.content !== null &&
                     'code' in editor.editor.selectedElement.content
                        ? (editor.editor.selectedElement.content as any).code
                        : '<div>Custom Code Block</div>'
                  }
               />
               <p className="text-xs text-muted-foreground">
                  Enter your custom HTML or React code. This will be rendered
                  directly without editor controls.
               </p>
            </div>
         </div>
      )
   );
};

export default InputSettings;
