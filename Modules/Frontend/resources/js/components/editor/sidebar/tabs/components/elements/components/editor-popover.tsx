import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementRender from '../element-render';
import ElementWrapper from '../element-wrapper';

interface PopoverProps {
   element: EditorElement;
}

const EditorPopover: React.FC<PopoverProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const triggerRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [isOpen, setIsOpen] = useState(editor.liveMode ? false : true);

   // Get trigger and content from children
   const children = Array.isArray(element.content) ? element.content : [];
   const trigger = children.find((child) => child.type === 'popoverTrigger');
   const content = children.find((child) => child.type === 'popoverContent');

   // Add click listener to trigger for both editor and live mode
   useEffect(() => {
      if (triggerRef.current) {
         const handleClick = (e: MouseEvent) => {
            // Only stop propagation in live mode to allow element selection in editor mode
            if (editor.liveMode) {
               e.stopPropagation();
            }

            setIsOpen((prev) => !prev);
         };

         const triggerButton = triggerRef.current.querySelector('button');

         if (triggerButton) {
            triggerButton.addEventListener('click', handleClick);

            return () => {
               triggerButton.removeEventListener('click', handleClick);
            };
         }
      }
   }, [editor.liveMode]);

   // Add click-outside detection in live mode
   useEffect(() => {
      if (editor.liveMode && isOpen) {
         const handleClickOutside = (e: MouseEvent) => {
            if (
               containerRef.current &&
               !containerRef.current.contains(e.target as Node)
            ) {
               setIsOpen(false);
            }
         };

         const doc = containerRef.current?.ownerDocument || document;
         doc.addEventListener('mousedown', handleClickOutside);

         return () => {
            doc.removeEventListener('mousedown', handleClickOutside);
         };
      }
   }, [editor.liveMode, isOpen]);

   // Show content based on isOpen state
   const shouldShowContent = isOpen;

   return (
      <ElementWrapper
         element={element}
         isContainer={false}
         wrapperClassName={cn(
            element.className,
            !editor.liveMode ? 'py-1.5' : '',
         )}
      >
         <div className="relative inline-block w-full" ref={containerRef}>
            {/* Trigger */}
            {trigger && (
               <div ref={triggerRef}>
                  <ElementRender element={trigger} />
               </div>
            )}

            {/* Content */}
            {shouldShowContent && content && (
               <div className={cn('absolute z-50 mt-2 w-full')}>
                  <ElementRender element={content} />
               </div>
            )}
         </div>
      </ElementWrapper>
   );
};

export default EditorPopover;
