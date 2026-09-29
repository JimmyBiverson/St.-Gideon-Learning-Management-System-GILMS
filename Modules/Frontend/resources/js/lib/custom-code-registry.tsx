import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import SimplifiedEditorElement from '@/frontend/components/editor/sidebar/tabs/components/elements/simplified-editor-element';

// Component registry - add all components you want to use in CustomCode
export const CUSTOM_CODE_COMPONENTS: Record<
   string,
   React.ComponentType<any>
> = {
   // shadcn/ui Dialog components
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,

   // shadcn/ui Button
   Button,

   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,

   // Add more components as needed
   // Example: Card, Alert, Badge, etc.
   Card,
   CardContent,

   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
};

/**
 * Deserialize JSON to React elements
 * Supports mixed content with __editor_element__ markers for editable elements
 *
 * @param serialized - The serialized JSON structure
 * @param renderEditorElement - Function to render full editor elements
 * @param useSimplified - If true, render editor elements in simplified mode for functional components
 * @param isLiveMode - If true, we're in preview/live mode (not editor mode)
 */
export const deserializeToReact = (
   serialized: any,
   renderEditorElement?: (element: EditorElement) => React.ReactNode,
   useSimplified: boolean = false,
   isLiveMode: boolean = false,
): React.ReactNode => {
   if (!serialized) {
      return null;
   }

   // Handle text nodes
   if (serialized.type === '__text__') {
      return serialized.value;
   }

   // Handle editor elements (preserved from DynamicContent)
   if (serialized.type === '__editor_element__' && serialized.element) {
      // Only use simplified mode in live/preview mode AND when inside functional triggers
      // In editor mode, always render full editor elements for selectability
      if (useSimplified && isLiveMode) {
         // Force span tag for trigger contexts to avoid invalid HTML (e.g., <p> inside <button>)
         return (
            <SimplifiedEditorElement
               element={serialized.element}
               forceTag="span"
            />
         );
      }

      // If we have a renderer function, use it to render the full EditorElement
      if (renderEditorElement) {
         return renderEditorElement(serialized.element);
      }

      // Otherwise, just return null (shouldn't happen in practice)
      return null;
   }

   // Handle arrays
   if (Array.isArray(serialized)) {
      return serialized.map((item, index) => (
         <React.Fragment key={index}>
            {deserializeToReact(
               item,
               renderEditorElement,
               useSimplified,
               isLiveMode,
            )}
         </React.Fragment>
      ));
   }

   // Handle React elements
   if (typeof serialized === 'object' && serialized.type) {
      const componentName = serialized.type;
      const props = serialized.props || {};

      // Special handling: if this is a functional trigger component (DialogTrigger, AccordionTrigger, etc.)
      // render children in simplified mode (works with or without asChild)
      const isFunctionalTrigger = [
         'DialogTrigger',
         'AccordionTrigger',
      ].includes(componentName);

      // Use simplified mode for functional triggers
      // This allows editor elements to work as triggers
      const shouldUseSimplified = isFunctionalTrigger;

      // Recursively deserialize children
      const children = serialized.children
         ? deserializeToReact(
              serialized.children,
              renderEditorElement,
              // Use simplified mode for children of functional triggers
              isFunctionalTrigger,
              isLiveMode,
           )
         : null;

      // Get component from registry or use native HTML element
      const Component = CUSTOM_CODE_COMPONENTS[componentName];

      if (Component) {
         // In editor mode (not live/preview), render functional triggers as plain divs
         // to prevent them from being interactive (e.g., Space key opening Dialog)
         if (isFunctionalTrigger && !isLiveMode) {
            return <div {...props}>{children}</div>;
         }

         // Don't use asChild for AccordionTrigger - it causes React.Children.only errors
         // The AccordionTrigger can work fine without asChild, it will just wrap the content
         const componentProps = props;

         // Registered React component
         return <Component {...componentProps}>{children}</Component>;
      } else {
         // Native HTML element
         const htmlTag = componentName.toLowerCase();

         return React.createElement(htmlTag, props, children);
      }
   }

   return null;
};
