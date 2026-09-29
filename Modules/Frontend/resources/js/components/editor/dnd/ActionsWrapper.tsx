import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copy, GripVertical, Trash } from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';

interface Props {
   id: string;
   element: EditorElement;
   listeners: any;
   attributes: any;
   children: ReactNode;
   showDeleteButton: boolean;
   showDropIndicator: boolean | null;
}

const ActionsWrapper = ({
   id,
   element,
   listeners,
   attributes,
   children,
   showDeleteButton,
   showDropIndicator,
}: Props) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;

   const handleDeleteElement = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({
         type: 'DELETE_ELEMENT',
         payload: { elementDetails: element },
      });
   };

   const handleDuplicateElement = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({
         type: 'DUPLICATE_ELEMENT',
         payload: { elementDetails: element },
      });
   };

   return (
      <>
         {/* Drop Indicator */}
         {showDropIndicator && !editor.liveMode && (
            <div className="absolute inset-x-0 top-0 z-20 -mt-1">
               <div className="h-1 animate-in rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/50 duration-200 slide-in-from-top-1" />
               <div className="absolute inset-x-0 top-0 -mt-1 h-3 rounded-full bg-blue-500/20 blur-sm" />
            </div>
         )}

         {/* Drag Handle — hidden while translating a non-default locale */}
         {editor.selectedElement.id === id &&
            !editor.liveMode &&
            editor.isDefaultLocale && (
            <div
               {...listeners}
               {...attributes}
               className={cn(
                  'drag-handle absolute top-1/2 -left-6 z-10 -translate-y-1/2 cursor-grab rounded-md bg-background p-1 shadow-md ring-1 ring-border transition-all hover:scale-110 hover:bg-accent hover:ring-primary active:cursor-grabbing',
               )}
               title="Drag to reorder"
            >
               <GripVertical className="h-4 w-4 text-muted-foreground transition-colors" />
            </div>
         )}

         {/* Element Badge */}
         {editor.selectedElement.id === id && !editor.liveMode && (
            <Badge
               className={cn(
                  'absolute -top-6 -left-0.5 z-50 rounded-none rounded-t-md',
               )}
            >
               {element.name}
            </Badge>
         )}

         {/* Main contentEditable element */}
         {children}

         {/* Action Buttons — hidden while translating a non-default locale */}
         {editor.selectedElement.id === id &&
            !editor.liveMode &&
            showDeleteButton &&
            editor.isDefaultLocale && (
               <div className="absolute -top-6 -right-[1px] z-50 flex gap-0">
                  {/* Duplicate Button */}
                  <Button
                     size="icon"
                     onClick={handleDuplicateElement}
                     className="h-[22px] w-auto cursor-pointer rounded-none rounded-tl-md px-2.5 py-1"
                     title="Duplicate element"
                  >
                     <Copy className="!h-[14px] !w-[14px]" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                     size="icon"
                     onClick={handleDeleteElement}
                     className="h-[22px] w-auto cursor-pointer rounded-none rounded-tr-md px-2.5 py-1"
                     title="Delete element"
                  >
                     <Trash className="!h-[14px] !w-[14px]" />
                  </Button>
               </div>
            )}
      </>
   );
};

export default ActionsWrapper;
