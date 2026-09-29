import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementRender from '../element-render';
import ElementWrapper from '../element-wrapper';

interface DrawerProps {
   element: EditorElement;
}

const EditorDrawer: React.FC<DrawerProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const triggerRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [isOpen, setIsOpen] = useState(false);

   // Get trigger and content from children
   const children = Array.isArray(element.content) ? element.content : [];
   const trigger = children.find((child) => child.type === 'drawerTrigger');
   const content = children.find((child) => child.type === 'drawerContent');

   // Get placement from content
   const placement =
      content &&
      typeof content.content === 'object' &&
      !Array.isArray(content.content) &&
      'placement' in content.content
         ? (content.content.placement as string)
         : 'left';

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

   // Get position classes based on placement
   const getPositionClasses = () => {
      switch (placement) {
         case 'right':
            return 'right-0 top-0 h-full border-l';
         case 'top':
            return 'top-0 left-0 w-full border-b';
         case 'bottom':
            return 'bottom-0 left-0 w-full border-t';
         case 'left':
         default:
            return 'left-0 top-0 h-full border-r';
      }
   };

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

            {/* Backdrop overlay */}
            {shouldShowContent && editor.liveMode && (
               <div
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={() => setIsOpen(false)}
               />
            )}

            {/* Content */}
            {shouldShowContent && content && (
               <div className={cn('fixed z-50', getPositionClasses())}>
                  <ElementRender element={content} />
               </div>
            )}
         </div>
      </ElementWrapper>
   );
};

export default EditorDrawer;
