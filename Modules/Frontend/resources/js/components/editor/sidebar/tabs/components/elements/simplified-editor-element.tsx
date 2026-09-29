import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

/**
 * Simplified editor element for use inside functional components (Dialog, Accordion, etc.)
 * This version forwards refs and removes editor UI (badges, delete buttons, etc.)
 * to work with asChild pattern while preserving editability
 */

interface SimplifiedEditorElementProps {
   element: EditorElement;
   onClick?: (e: React.MouseEvent) => void;
   className?: string;
   forceTag?: keyof React.JSX.IntrinsicElements; // Force a specific HTML tag
   children?: React.ReactNode;
}

const SimplifiedEditorElement = forwardRef<
   HTMLElement,
   SimplifiedEditorElementProps
>(({ element, onClick, className, forceTag, children, ...props }, ref) => {
   const { type, content, className: elementClassName } = element;

   // Get the text content
   const innerText =
      typeof content === 'object' && 'innerText' in content
         ? content.innerText
         : children || '';

   // Determine the HTML tag based on element type
   const getTag = (): keyof React.JSX.IntrinsicElements => {
      // If forceTag is provided, use it
      if (forceTag) {
         return forceTag;
      }

      switch (type) {
         case 'span':
            return 'span';
         case 'paragraph':
            return 'p';
         case 'button':
            return 'button';
         case 'link':
            return 'a';
         case 'heading':
            return 'h2'; // Default to h2, could be enhanced
         default:
            return 'span';
      }
   };

   const tag: keyof React.JSX.IntrinsicElements = getTag();
   const combinedClassName = cn(elementClassName, className);

   // Create the element with ref forwarding
   return React.createElement(
      tag,
      {
         ref: ref as any,
         className: combinedClassName,
         onClick,
         'data-editor-element-id': element.id,
         'data-editor-type': type,
         ...props,
      },
      innerText,
   );
});

SimplifiedEditorElement.displayName = 'SimplifiedEditorElement';

export default SimplifiedEditorElement;
