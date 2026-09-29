/**
 * Helper functions for drag-and-drop operations
 */

/**
 * Generate a unique droppable ID for a container and index
 */
export function generateDroppableId(
   containerId: string,
   index: number,
): string {
   return `droppable-${containerId}-${index}`;
}

/**
 * Parse a droppable ID to get container ID and index
 */
export function parseDroppableId(droppableId: string): {
   containerId: string;
   index: number;
} | null {
   const match = droppableId.match(/^droppable-(.+)-(\d+)$/);

   if (!match) {
      return null;
   }

   return {
      containerId: match[1],
      index: parseInt(match[2], 10),
   };
}

/**
 * Check if an element type can contain children
 */
export function canContainChildren(elementType: EditorBtns | null): boolean {
   const containerTypes: EditorBtns[] = [
      'container',
      'section',
      '__body',
      '2Col',
      '3Col',
   ];

   return elementType ? containerTypes.includes(elementType) : false;
}

/**
 * Check if element A can be dropped into element B
 */
export function canDropInto(
   sourceType: EditorBtns | null,
   targetType: EditorBtns | null,
): boolean {
   if (!sourceType || !targetType) {
      return false;
   }

   // Target must be able to contain children
   if (!canContainChildren(targetType)) {
      return false;
   }

   // Sections can only be dropped into body or other sections
   if (sourceType === 'section') {
      return targetType === '__body';
   }

   // Containers can be dropped into sections, 2Col, 3Col, or body
   if (sourceType === 'container') {
      return ['section', '__body', '2Col', '3Col'].includes(targetType);
   }

   // Regular elements can be dropped into any container
   return true;
}

/**
 * Get CSS transform string from transform object
 */
export function getTransformCSS(
   transform: { x: number; y: number } | null,
): string {
   if (!transform) {
      return '';
   }

   return `translate3d(${transform.x}px, ${transform.y}px, 0)`;
}

/**
 * Calculate the depth (nesting level) of an element in the tree
 */
export function calculateElementDepth(
   elements: EditorElement[],
   elementId: string,
   currentDepth: number = 0,
): number {
   for (const element of elements) {
      if (element.id === elementId) {
         return currentDepth;
      }

      if (Array.isArray(element.content)) {
         const depth = calculateElementDepth(
            element.content as EditorElement[],
            elementId,
            currentDepth + 1,
         );

         if (depth !== -1) {
            return depth;
         }
      }
   }

   return -1; // Not found
}

/**
 * Announce drag action to screen readers
 */
export function announceForScreenReader(message: string): void {
   // Create or update live region for screen reader announcements
   let liveRegion = document.getElementById('dnd-live-region');

   if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'dnd-live-region';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'assertive');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
   }

   liveRegion.textContent = message;
}
