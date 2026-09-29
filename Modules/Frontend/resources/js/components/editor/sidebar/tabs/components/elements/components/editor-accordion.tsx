import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import { addElement } from '@/frontend/lib/add-element';
import ElementWrapper from '../element-wrapper';

interface AccordionContextType {
   openItems: Set<string>;
   toggleItem: (itemId: string) => void;
   accordionType: 'single' | 'multiple';
}

const EditorAccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordion = () => {
   const context = useContext(EditorAccordionContext);

   if (!context) {
      throw new Error('useAccordion must be used within an Accordion');
   }

   return context;
};

interface AccordionProps {
   element: EditorElement;
}

const EditorAccordion: React.FC<AccordionProps> = ({ element }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const { id, type, content } = element;

   // Get accordion type from element content (default: 'single')
   const accordionType: 'single' | 'multiple' =
      typeof element.content === 'object' &&
      !Array.isArray(element.content) &&
      'type' in element.content
         ? (element.content.type as 'single' | 'multiple')
         : 'single';

   const children = Array.isArray(content)
      ? (content as EditorElement[])
      : typeof content === 'object' && 'children' in content
        ? (content.children as EditorElement[])
        : [];

   const childIds = children.map((child) => child.id);

   // Manage which items are open
   // Initialize based on current mode - first item open in live/preview mode
   const getInitialOpenItems = (): Set<string> => {
      if ((editor.liveMode || editor.previewMode) && children.length > 0) {
         return new Set<string>([children[0].id]);
      }

      return new Set<string>();
   };

   const [openItems, setOpenItems] = useState<Set<string>>(getInitialOpenItems);

   // Reset to initial state when mode changes
   useEffect(() => {
      const timer = setTimeout(() => {
         setOpenItems(getInitialOpenItems());
      }, 0);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [editor.liveMode, editor.previewMode]);

   const toggleItem = (itemId: string) => {
      setOpenItems((prev) => {
         const newSet = new Set(prev);

         if (accordionType === 'single') {
            // Single mode: only one item can be open
            if (newSet.has(itemId)) {
               newSet.delete(itemId);
            } else {
               newSet.clear();
               newSet.add(itemId);
            }
         } else {
            // Multiple mode: toggle individual items
            if (newSet.has(itemId)) {
               newSet.delete(itemId);
            } else {
               newSet.add(itemId);
            }
         }

         return newSet;
      });
   };

   const handleAddItem = (e: React.MouseEvent) => {
      e.stopPropagation();
      addElement('accordionItem', element.id, dispatch);
   };

   return (
      <EditorAccordionContext.Provider
         value={{ openItems, toggleItem, accordionType }}
      >
         <ElementWrapper
            element={element}
            isContainer={true}
            wrapperClassName={cn({
               'p-2': !editor.liveMode && !editor.previewMode,
            })}
         >
            {children.length > 0 ? (
               <SortableList items={childIds} id={id} content={children} />
            ) : (
               <></>
            )}
            {!editor.liveMode && (
               <button
                  onClick={handleAddItem}
                  className="mt-1 flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
               >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
               </button>
            )}
         </ElementWrapper>
      </EditorAccordionContext.Provider>
   );
};

export default EditorAccordion;
