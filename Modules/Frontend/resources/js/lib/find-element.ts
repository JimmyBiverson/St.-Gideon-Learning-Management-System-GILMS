/**
 * Find an element by ID in the element tree
 */
export const findElementById = (
   elements: EditorElement[],
   id: string,
): EditorElement | null => {
   for (const element of elements) {
      if (element.id === id) {
         return element;
      }

      // Search in array content
      if (Array.isArray(element.content)) {
         const found = findElementById(element.content, id);

         if (found) {
            return found;
         }
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         const found = findElementById(element.content.children, id);

         if (found) {
            return found;
         }
      }
   }

   return null;
};
