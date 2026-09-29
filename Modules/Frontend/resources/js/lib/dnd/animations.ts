/**
 * Animation utilities for drag-and-drop
 * Provides smooth, performant animations for dragging operations
 */

import type { DropAnimation } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

/**
 * Default drop animation configuration
 * Smooth spring-like bounce effect
 */
export const defaultDropAnimation: DropAnimation = {
   duration: 200,
   easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)', // Spring easing
   keyframes: ({ transform }) => [
      { transform: CSS.Transform.toString(transform.initial) },
      {
         transform: CSS.Transform.toString({
            ...transform.final,
            scaleX: 1.05,
            scaleY: 1.05,
         }),
      },
      { transform: CSS.Transform.toString(transform.final) },
   ],
};

/**
 * Fast drop animation for quick interactions
 */
export const fastDropAnimation: DropAnimation = {
   duration: 150,
   easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Fast ease-out
};

/**
 * Slow drop animation for accessibility
 */
export const slowDropAnimation: DropAnimation = {
   duration: 350,
   easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease-in-out
};

/**
 * No animation (instant drop)
 */
export const noDropAnimation: DropAnimation | null = null;

/**
 * Spring animation curves
 */
export const springEasing = {
   gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   medium: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
   bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

/**
 * Standard animation curves
 */
export const easingCurves = {
   linear: 'linear',
   easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
   easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
   easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Animation durations (in milliseconds)
 */
export const durations = {
   instant: 0,
   fast: 150,
   normal: 200,
   slow: 300,
   slower: 500,
};

/**
 * Get animation based on user preferences
 * Respects prefers-reduced-motion
 */
export function getAnimation(options: {
   reducedMotion?: boolean;
   speed?: 'fast' | 'normal' | 'slow';
}): DropAnimation | null {
   const { reducedMotion = false, speed = 'normal' } = options;

   if (reducedMotion) {
      return noDropAnimation;
   }

   switch (speed) {
      case 'fast':
         return fastDropAnimation;
      case 'slow':
         return slowDropAnimation;
      default:
         return defaultDropAnimation;
   }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
   if (typeof window === 'undefined') {
      return false;
   }

   return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
