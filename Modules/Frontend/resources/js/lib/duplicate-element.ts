import { nanoid } from 'nanoid';

/**
 * Deep clone an element and assign new unique IDs to it and all its children
 */
export const cloneElementWithNewIds = (
   element: EditorElement,
): EditorElement => {
   const newId = nanoid();

   // Handle array content (children)
   if (Array.isArray(element.content)) {
      return {
         ...element,
         id: newId,
         content: element.content.map((child) => cloneElementWithNewIds(child)),
      };
   }

   // Handle content with children structure (accordion, dropdown, etc.)
   if (
      element.content &&
      typeof element.content === 'object' &&
      'children' in element.content &&
      Array.isArray(element.content.children)
   ) {
      return {
         ...element,
         id: newId,
         content: {
            ...element.content,
            children: element.content.children.map((child) =>
               cloneElementWithNewIds(child),
            ),
         },
      };
   }

   // Simple element without children
   return {
      ...element,
      id: newId,
   };
};

/**
 * Duplicate an element and insert it right after the original element
 */
export const duplicateElement = (
   elements: EditorElement[],
   elementId: string,
): EditorElement[] => {
   const result: EditorElement[] = [];

   for (const element of elements) {
      result.push(element);

      // If this is the element to duplicate, add the clone right after
      if (element.id === elementId) {
         const clonedElement = cloneElementWithNewIds(element);
         result.push(clonedElement);
         continue;
      }

      // Recursively search in array content
      if (Array.isArray(element.content)) {
         const duplicatedContent = duplicateElement(element.content, elementId);

         if (duplicatedContent !== element.content) {
            result[result.length - 1] = {
               ...element,
               content: duplicatedContent,
            };
         }
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         const duplicatedChildren = duplicateElement(
            element.content.children,
            elementId,
         );

         if (duplicatedChildren !== element.content.children) {
            result[result.length - 1] = {
               ...element,
               content: {
                  ...element.content,
                  children: duplicatedChildren,
               },
            };
         }
      }
   }

   return result;
};
