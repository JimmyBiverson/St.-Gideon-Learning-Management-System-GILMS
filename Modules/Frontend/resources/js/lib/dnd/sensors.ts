/**
 * Custom sensors configuration for @dnd-kit
 * Handles mouse, touch, and keyboard interactions
 */

import { KeyboardSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import type { PointerActivationConstraint } from '@dnd-kit/core';

/**
 * Mouse sensor configuration
 * Requires 10px movement to activate drag (prevents accidental drags on click)
 */
export const mouseSensorConfig = {
   sensor: MouseSensor,
   options: {
      activationConstraint: {
         distance: 10,
      } as PointerActivationConstraint,
   },
};

/**
 * Touch sensor configuration
 * Requires 250ms press delay to activate (prevents conflicts with scrolling)
 */
export const touchSensorConfig = {
   sensor: TouchSensor,
   options: {
      activationConstraint: {
         delay: 250,
         tolerance: 5,
      } as PointerActivationConstraint,
   },
};

/**
 * Keyboard sensor configuration
 * Allows keyboard-based drag and drop for accessibility
 */
export const keyboardSensorConfig = {
   sensor: KeyboardSensor,
   options: {},
};

/**
 * Export all sensor configurations
 */
export const defaultSensorConfigs = [
   mouseSensorConfig,
   touchSensorConfig,
   keyboardSensorConfig,
];
