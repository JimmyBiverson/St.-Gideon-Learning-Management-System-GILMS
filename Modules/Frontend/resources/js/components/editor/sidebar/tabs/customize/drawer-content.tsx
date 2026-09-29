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

const DrawerSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   const currentContent = editor.editor.selectedElement.content;

   // Get current placement value
   const getCurrentPlacement = (): string => {
      if (
         typeof currentContent === 'object' &&
         currentContent !== null &&
         'placement' in currentContent
      ) {
         const placement = (currentContent as any).placement;

         // Ensure it's a valid option for drawer
         if (['left', 'right', 'top', 'bottom'].includes(placement)) {
            return placement;
         }
      }

      return 'left'; // Default
   };

   return (
      <div className="flex flex-col gap-2">
         <Label>Drawer Placement</Label>
         <Select
            onValueChange={(value) => {
               // Preserve children array when updating placement
               const children = Array.isArray(currentContent)
                  ? currentContent
                  : typeof currentContent === 'object' &&
                      currentContent !== null &&
                      'children' in currentContent
                    ? currentContent.children
                    : [];

               dispatch({
                  type: 'UPDATE_ELEMENT',
                  payload: {
                     elementDetails: {
                        ...editor.editor.selectedElement,
                        content: {
                           placement: value as any,
                           children: children,
                        },
                     },
                  },
               });
            }}
            value={getCurrentPlacement()}
         >
            <SelectTrigger>
               <SelectValue placeholder="Select placement" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Edge Position</SelectLabel>
                  <SelectItem value="left">Left Edge</SelectItem>
                  <SelectItem value="right">Right Edge</SelectItem>
                  <SelectItem value="top">Top Edge</SelectItem>
                  <SelectItem value="bottom">Bottom Edge</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
         <p className="text-xs text-muted-foreground">
            Choose which edge of the screen the drawer opens from
         </p>
      </div>
   );
};

export default DrawerSettings;
