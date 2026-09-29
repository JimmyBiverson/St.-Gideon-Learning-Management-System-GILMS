import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';

const SelectSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   return (
      editor.editor.selectedElement.type === 'select' && (
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <Label>Select Options</Label>
               <div className="flex flex-col gap-2">
                  {(typeof editor.editor.selectedElement.content === 'object' &&
                  !Array.isArray(editor.editor.selectedElement.content) &&
                  editor.editor.selectedElement.content !== null &&
                  'options' in editor.editor.selectedElement.content &&
                  Array.isArray(
                     (editor.editor.selectedElement.content as any).options,
                  )
                     ? (editor.editor.selectedElement.content as any).options
                     : ['Option 1', 'Option 2', 'Option 3']
                  ).map((option: string, index: number) => (
                     <div key={index} className="flex gap-2">
                        <Input
                           value={option}
                           onChange={(e) => {
                              const currentOptions =
                                 typeof editor.editor.selectedElement
                                    .content === 'object' &&
                                 !Array.isArray(
                                    editor.editor.selectedElement.content,
                                 ) &&
                                 editor.editor.selectedElement.content !==
                                    null &&
                                 'options' in
                                    editor.editor.selectedElement.content &&
                                 Array.isArray(
                                    (
                                       editor.editor.selectedElement
                                          .content as any
                                    ).options,
                                 )
                                    ? [
                                         ...(
                                            editor.editor.selectedElement
                                               .content as any
                                         ).options,
                                      ]
                                    : ['Option 1', 'Option 2', 'Option 3'];
                              currentOptions[index] = e.target.value;
                              dispatch({
                                 type: 'UPDATE_ELEMENT',
                                 payload: {
                                    elementDetails: {
                                       ...editor.editor.selectedElement,
                                       content: {
                                          ...editor.editor.selectedElement
                                             .content,
                                          options: currentOptions,
                                       },
                                    },
                                 },
                              });
                           }}
                        />
                        <Button
                           size="icon"
                           variant="ghost"
                           onClick={() => {
                              const currentOptions =
                                 typeof editor.editor.selectedElement
                                    .content === 'object' &&
                                 !Array.isArray(
                                    editor.editor.selectedElement.content,
                                 ) &&
                                 editor.editor.selectedElement.content !==
                                    null &&
                                 'options' in
                                    editor.editor.selectedElement.content &&
                                 Array.isArray(
                                    (
                                       editor.editor.selectedElement
                                          .content as any
                                    ).options,
                                 )
                                    ? [
                                         ...(
                                            editor.editor.selectedElement
                                               .content as any
                                         ).options,
                                      ]
                                    : ['Option 1', 'Option 2', 'Option 3'];
                              currentOptions.splice(index, 1);
                              dispatch({
                                 type: 'UPDATE_ELEMENT',
                                 payload: {
                                    elementDetails: {
                                       ...editor.editor.selectedElement,
                                       content: {
                                          ...editor.editor.selectedElement
                                             .content,
                                          options: currentOptions,
                                       },
                                    },
                                 },
                              });
                           }}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     </div>
                  ))}
                  <Button
                     size="sm"
                     variant="outline"
                     onClick={() => {
                        const currentOptions =
                           typeof editor.editor.selectedElement.content ===
                              'object' &&
                           !Array.isArray(
                              editor.editor.selectedElement.content,
                           ) &&
                           editor.editor.selectedElement.content !== null &&
                           'options' in editor.editor.selectedElement.content &&
                           Array.isArray(
                              (editor.editor.selectedElement.content as any)
                                 .options,
                           )
                              ? [
                                   ...(
                                      editor.editor.selectedElement
                                         .content as any
                                   ).options,
                                ]
                              : ['Option 1', 'Option 2', 'Option 3'];
                        currentOptions.push(
                           `Option ${currentOptions.length + 1}`,
                        );
                        dispatch({
                           type: 'UPDATE_ELEMENT',
                           payload: {
                              elementDetails: {
                                 ...editor.editor.selectedElement,
                                 content: {
                                    ...editor.editor.selectedElement.content,
                                    options: currentOptions,
                                 },
                              },
                           },
                        });
                     }}
                  >
                     <Plus className="h-4 w-4" />
                     Add Option
                  </Button>
               </div>
            </div>
         </div>
      )
   );
};

export default SelectSettings;
