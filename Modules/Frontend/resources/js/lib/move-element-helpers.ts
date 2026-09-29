/**
 * Helper functions for moving elements in the editor tree structure
 * Handles nested containers and preserves element integrity
 */

/**
 * Find an element by ID in the tree (recursive)
 */
export function findElement(
   elements: EditorElement[],
   elementId: string,
): EditorElement | null {
   for (const element of elements) {
      if (element.id === elementId) {
         return element;
      }

      if (Array.isArray(element.content)) {
         const found = findElement(
            element.content as EditorElement[],
            elementId,
         );

         if (found) {
            return found;
         }
      }
   }

   return null;
}

/**
 * Find the parent container of an element
 */
export function findParentContainer(
   elements: EditorElement[],
   elementId: string,
   parentId: string | null = null,
): { parent: EditorElement | null; parentId: string | null } {
   for (const element of elements) {
      if (Array.isArray(element.content)) {
         const content = element.content as EditorElement[];

         // Check if any child matches
         if (content.some((child) => child.id === elementId)) {
            return { parent: element, parentId: element.id };
         }

         // Recursively search in children
         const result = findParentContainer(content, elementId, element.id);

         if (result.parent) {
            return result;
         }
      }
   }

   return { parent: null, parentId };
}

/**
 * Remove an element from the tree (returns new tree without the element)
 */
export function removeElement(
   elements: EditorElement[],
   elementId: string,
): { elements: EditorElement[]; removedElement: EditorElement | null } {
   let removedElement: EditorElement | null = null;

   const newElements = elements
      .map((element) => {
         // If this is the element to remove
         if (element.id === elementId) {
            removedElement = element;

            return null; // Mark for removal
         }

         // If element has children, recursively remove from children
         // Handle both array content and { placement, children } structure
         if (Array.isArray(element.content)) {
            const result = removeElement(
               element.content as EditorElement[],
               elementId,
            );

            if (result.removedElement) {
               removedElement = result.removedElement;
            }

            return {
               ...element,
               content: result.elements,
            };
         } else if (
            typeof element.content === 'object' &&
            element.content !== null &&
            'children' in element.content &&
            Array.isArray(element.content.children)
         ) {
            const result = removeElement(
               element.content.children as EditorElement[],
               elementId,
            );

            if (result.removedElement) {
               removedElement = result.removedElement;
            }

            return {
               ...element,
               content: {
                  ...element.content,
                  children: result.elements,
               },
            };
         }

         return element;
      })
      .filter((el): el is EditorElement => el !== null);

   return { elements: newElements, removedElement };
}

/**
 * Insert an element at a specific position in a container
 */
export function insertElement(
   elements: EditorElement[],
   containerId: string,
   elementToInsert: EditorElement,
   index: number,
): EditorElement[] {
   return elements.map((element) => {
      // If this is the target container
      if (element.id === containerId) {
         // Handle { placement, children } structure
         if (
            typeof element.content === 'object' &&
            element.content !== null &&
            'children' in element.content &&
            Array.isArray(element.content.children)
         ) {
            const newContent = [...element.content.children];
            const insertIndex = Math.min(Math.max(0, index), newContent.length);
            newContent.splice(insertIndex, 0, elementToInsert);

            return {
               ...element,
               content: {
                  ...element.content,
                  children: newContent,
               },
            };
         } else if (Array.isArray(element.content)) {
            const newContent = [...(element.content as EditorElement[])];
            const insertIndex = Math.min(Math.max(0, index), newContent.length);
            newContent.splice(insertIndex, 0, elementToInsert);

            return {
               ...element,
               content: newContent,
            };
         } else {
            return {
               ...element,
               content: [elementToInsert],
            };
         }
      }

      // Recursively search in children
      // Handle array content
      if (Array.isArray(element.content)) {
         return {
            ...element,
            content: insertElement(
               element.content as EditorElement[],
               containerId,
               elementToInsert,
               index,
            ),
         };
      } else if (
         typeof element.content === 'object' &&
         element.content !== null &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         return {
            ...element,
            content: {
               ...element.content,
               children: insertElement(
                  element.content.children as EditorElement[],
                  containerId,
                  elementToInsert,
                  index,
               ),
            },
         };
      }

      return element;
   });
}

/**
 * Check if element B is a descendant of element A (prevents circular references)
 */
export function isDescendant(
   elements: EditorElement[],
   ancestorId: string,
   descendantId: string,
): boolean {
   const ancestor = findElement(elements, ancestorId);

   if (!ancestor || !Array.isArray(ancestor.content)) {
      return false;
   }

   // Check if descendant is directly in content
   const content = ancestor.content as EditorElement[];

   if (content.some((child) => child.id === descendantId)) {
      return true;
   }

   // Recursively check in nested content
   for (const child of content) {
      if (isDescendant([child], child.id, descendantId)) {
         return true;
      }
   }

   return false;
}

/**
 * Main function to move an element from one position to another
 */
export function moveElement(
   elements: EditorElement[],
   elementId: string,
   targetContainerId: string,
   targetIndex: number,
): EditorElement[] {
   // Prevent moving an element into itself
   if (elementId === targetContainerId) {
      console.warn('Cannot move element into itself');

      return elements;
   }

   // Prevent circular references (moving parent into child)
   if (isDescendant(elements, elementId, targetContainerId)) {
      console.warn('Cannot move element into its own descendant');

      return elements;
   }

   // Find source parent
   const { parentId: sourceParentId } = findParentContainer(
      elements,
      elementId,
   );

   // Remove element from current position
   const { elements: elementsAfterRemove, removedElement } = removeElement(
      elements,
      elementId,
   );

   if (!removedElement) {
      console.warn('Element to move not found');

      return elements;
   }

   // Use target index directly without adjustment.
   // Dnd-kit's over.index provides the destination index in the current view,
   // which aligns with the "remove then insert" logic without offset adjustments.
   const adjustedIndex = targetIndex;

   // Insert element at new position
   const finalElements = insertElement(
      elementsAfterRemove,
      targetContainerId,
      removedElement,
      adjustedIndex,
   );

   return finalElements;
}

/**
 * Get all valid drop targets for an element (excluding invalid drops)
 */
export function getValidDropTargets(
   elements: EditorElement[],
   elementId: string,
): string[] {
   const validTargets: string[] = [];
   const element = findElement(elements, elementId);

   if (!element) {
      return validTargets;
   }

   function traverse(els: EditorElement[]) {
      for (const el of els) {
         // Can only drop into container-type elements
         const containerTypes: EditorBtns[] = [
            'container',
            'section',
            '__body',
            '2Col',
            '3Col',
         ];

         if (el.type && containerTypes.includes(el.type)) {
            // Don't allow dropping into self or descendants
            if (
               el.id !== elementId &&
               !isDescendant(elements, elementId, el.id)
            ) {
               validTargets.push(el.id);
            }
         }

         // Recursively traverse children
         if (Array.isArray(el.content)) {
            traverse(el.content as EditorElement[]);
         }
      }
   }

   traverse(elements);

   return validTargets;
}
