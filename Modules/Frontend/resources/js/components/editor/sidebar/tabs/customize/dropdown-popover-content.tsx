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

const DropdownPopoverSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   const currentContent = editor.editor.selectedElement.content;

   // Infer placement from className if old array structure
   const inferPlacementFromClassName = (): string => {
      const className = editor.editor.selectedElement.className || '';

      // Check for placement indicators in className
      if (className.includes('left-0') && !className.includes('left-1/2')) {
         return 'right'; // left-0 means right-aligned
      }

      if (className.includes('right-0')) {
         return 'left'; // right-0 means left-aligned
      }

      if (
         className.includes('left-1/2') &&
         className.includes('-translate-x-1/2')
      ) {
         return 'center';
      }

      if (className.includes('bottom-full')) {
         return 'top';
      }

      if (className.includes('top-full')) {
         return 'bottom';
      }

      return 'left'; // Default
   };

   // Get current placement value
   const getCurrentPlacement = (): string => {
      if (
         typeof currentContent === 'object' &&
         currentContent !== null &&
         'placement' in currentContent
      ) {
         const placement = (currentContent as any).placement;

         // Ensure it's a valid option
         if (['left', 'right', 'center', 'top', 'bottom'].includes(placement)) {
            return placement;
         }
      }

      // If old array structure, infer from className
      if (Array.isArray(currentContent)) {
         return inferPlacementFromClassName();
      }

      return 'left'; // Default
   };

   return (
      <div className="flex flex-col gap-2">
         <Label>Placement</Label>
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
                  <SelectLabel>Placement Options</SelectLabel>
                  <SelectItem value="left">Left (Right-aligned)</SelectItem>
                  <SelectItem value="right">Right (Left-aligned)</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
         <p className="text-xs text-muted-foreground">
            Choose where the content appears relative to the trigger
         </p>
      </div>
   );
};

export default DropdownPopoverSettings;
