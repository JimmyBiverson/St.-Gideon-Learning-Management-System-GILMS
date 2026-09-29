/**
 * Custom collision detection strategies for @dnd-kit
 * Optimized for nested container structures
 */

import { closestCenter, pointerWithin, rectIntersection } from '@dnd-kit/core';
import type { CollisionDetection } from '@dnd-kit/core';

/**
 * Custom collision detection that prioritizes the closest droppable
 * when dealing with nested containers
 */
export const customCollisionDetection: CollisionDetection = (args) => {
   // First, try pointer-based collision (most accurate for nested containers)
   const pointerCollisions = pointerWithin(args);

   if (pointerCollisions.length > 0) {
      // If multiple collisions, prioritize the deepest (most nested) container
      const deepestCollision = getDeepestDroppable(pointerCollisions);

      if (deepestCollision) {
         return [deepestCollision];
      }

      return pointerCollisions;
   }

   // Fallback to rect intersection for edge cases
   const rectCollisions = rectIntersection(args);

   if (rectCollisions.length > 0) {
      const deepestCollision = getDeepestDroppable(rectCollisions);

      if (deepestCollision) {
         return [deepestCollision];
      }

      return rectCollisions;
   }

   // Final fallback to closest center
   return closestCenter(args);
};

/**
 * Get the deepest (most specific) droppable container
 * Useful for nested container scenarios
 */
export function getDeepestDroppable(collisions: any[]) {
   if (collisions.length === 0) {
      return null;
   }

   // Sort by z-index or depth to get most specific container
   const sorted = [...collisions].sort((a, b) => {
      const aDepth = a.data?.current?.depth || 0;
      const bDepth = b.data?.current?.depth || 0;

      return bDepth - aDepth; // Higher depth = more nested = higher priority
   });

   return sorted[0];
}

/**
 * Check if a collision is valid based on element types
 */
export function isValidCollision(
   activeElement: EditorElement | undefined,
   overElement: EditorElement | undefined,
): boolean {
   if (!activeElement || !overElement) {
      return false;
   }

   // Prevent dropping an element into itself
   if (activeElement.id === overElement.id) {
      return false;
   }

   // Prevent dropping a container element into a non-container
   const containerTypes: EditorBtns[] = [
      'container',
      'section',
      '__body',
      '2Col',
      '3Col',
   ];
   const nonContainerTypes: EditorBtns[] = [
      'button',
      'input',
      'label',
      'image',
      'video',
      'link',
   ];

   const isActiveContainer =
      activeElement.type && containerTypes.includes(activeElement.type);
   const isOverNonContainer =
      overElement.type && nonContainerTypes.includes(overElement.type);

   // Can't drop section/container into button/text/etc
   if (isActiveContainer && isOverNonContainer) {
      return false;
   }

   return true;
}
