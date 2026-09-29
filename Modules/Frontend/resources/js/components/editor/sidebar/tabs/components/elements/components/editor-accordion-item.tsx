import { cn } from '@/lib/utils';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementRender from '../element-render';
import ElementWrapper from '../element-wrapper';
import { useAccordion } from './editor-accordion';

interface AccordionItemProps {
   element: EditorElement;
}

const EditorAccordionItem: React.FC<AccordionItemProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { openItems, toggleItem } = useAccordion();

   // Get trigger and content from children
   const children = Array.isArray(element.content) ? element.content : [];
   const trigger = children.find((child) => child.type === 'accordionTrigger');
   const content = children.find((child) => child.type === 'accordionContent');

   // Check if this item is open
   const isOpen = openItems.has(element.id);

   // In editor mode, always show content. In live/preview mode, use context state.
   const shouldShowContent =
      editor.liveMode || editor.previewMode ? isOpen : true;

   const handleToggle = () => {
      if (editor.liveMode || editor.previewMode) {
         toggleItem(element.id);
      }
   };

   // Clone trigger and add rotation class to icon child
   const modifiedTrigger = trigger
      ? {
           ...trigger,
           content: Array.isArray(trigger.content)
              ? trigger.content.map((child) => {
                   // If child is an icon, add rotation class
                   if (child.type === 'icon') {
                      return {
                         ...child,
                         className: cn(
                            child.className,
                            'm-0 rotate-0 transition-transform duration-200',
                            shouldShowContent && 'rotate-180',
                         ),
                      };
                   }

                   return child;
                })
              : trigger.content,
        }
      : null;

   return (
      <ElementWrapper
         element={element}
         isContainer={false}
         wrapperClassName={cn({
            'p-2': !editor.liveMode && !editor.previewMode,
         })}
      >
         {/* Trigger with icon rotation */}
         {modifiedTrigger && (
            <div
               onClickCapture={(e) => {
                  handleToggle();

                  if (editor.liveMode || editor.previewMode) {
                     e.stopPropagation();
                  }
               }}
               className={cn(
                  (editor.liveMode || editor.previewMode) && 'cursor-pointer',
               )}
            >
               <ElementRender element={modifiedTrigger} />
            </div>
         )}

         {/* Content */}
         {shouldShowContent && content && (
            <div className={cn(!editor.liveMode && 'mt-2')}>
               <ElementRender element={content} />
            </div>
         )}
      </ElementWrapper>
   );
};

export default EditorAccordionItem;
