/**
 * Main DnD Context Wrapper for Editor Canvas
 * Handles all drag-and-drop operations and state management
 */

import type {
   DragEndEvent,
   DragOverEvent,
   DragStartEvent,
} from '@dnd-kit/core';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { customCollisionDetection } from '@/frontend/lib/dnd/collision';
import { announceForScreenReader } from '@/frontend/lib/dnd/helpers';
import {
   keyboardSensorConfig,
   mouseSensorConfig,
   touchSensorConfig,
} from '@/frontend/lib/dnd/sensors';
import { findElement } from '@/frontend/lib/move-element-helpers';
import { validateMove } from '@/frontend/lib/validation-rules';
import DragOverlayContent from './DragOverlay';

interface DndEditorCanvasProps {
   children: React.ReactNode;
}

const DndEditorCanvas: React.FC<DndEditorCanvasProps> = ({ children }) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;
   const [activeId, setActiveId] = React.useState<string | null>(null);

   // Configure sensors for mouse, touch, and keyboard
   const sensors = useSensors(
      useSensor(mouseSensorConfig.sensor, mouseSensorConfig.options),
      useSensor(touchSensorConfig.sensor, touchSensorConfig.options),
      useSensor(keyboardSensorConfig.sensor, keyboardSensorConfig.options),
   );

   const handleDragStart = (event: DragStartEvent) => {
      const { active } = event;
      setActiveId(active.id as string);

      // Announce to screen readers
      const element = active.data.current?.element;

      if (element) {
         announceForScreenReader(`Picked up ${element.name} element`);
      }
   };

   const handleDragOver = (event: DragOverEvent) => {
      // Optional: Add visual feedback during drag
      // This can be used to show drop indicators in real-time
   };

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);

      if (!over) {
         announceForScreenReader('Drag cancelled');

         return;
      }

      // Don't do anything if dropped on itself
      if (active.id === over.id) {
         return;
      }

      const activeData = active.data.current;
      const overData = over.data.current;

      // Handle dropping from Components tab (adding new elements)
      if (activeData?.isNewElement) {
         // This is handled by the existing addElement logic
         return;
      }

      // Handle reordering existing elements
      // Check for sortable data first (reordering)
      const sortableData = overData?.sortable;
      const containerId = sortableData?.containerId || overData?.containerId;

      if (activeData?.element && containerId !== undefined) {
         const sourceElement = activeData.element as EditorElement;
         const elementId = active.id as string;
         const targetContainerId = containerId as string;
         let targetIndex = sortableData
            ? sortableData.index
            : (overData?.index as number);

         // Find target container
         const targetContainer = findElement(
            editor.elements,
            targetContainerId,
         );

         // Validate move before executing
         const validation = validateMove(
            sourceElement,
            targetContainerId,
            targetContainer,
            editor.elements,
         );

         if (targetIndex === undefined && targetContainer) {
            targetIndex = Array.isArray(targetContainer.content)
               ? targetContainer.content.length
               : 0;
         }

         if (!validation.valid) {
            // Log error and announce to screen readers
            console.warn('Move validation failed:', validation.reason);
            announceForScreenReader(validation.reason || 'Move not allowed');

            return;
         }

         // Dispatch MOVE_ELEMENT action
         dispatch({
            type: 'MOVE_ELEMENT',
            payload: {
               elementId,
               targetContainerId,
               targetIndex,
            },
         });

         // Announce to screen readers
         announceForScreenReader(`${sourceElement.name} moved to new position`);
      }
   };

   const handleDragCancel = () => {
      setActiveId(null);
      announceForScreenReader('Drag cancelled');
   };

   // Get active element for drag overlay
   const activeElement = React.useMemo(() => {
      if (!activeId) {
         return null;
      }

      // Find element in editor state
      function findInElements(elements: EditorElement[]): EditorElement | null {
         for (const el of elements) {
            if (el.id === activeId) {
               return el;
            }

            if (Array.isArray(el.content)) {
               const found = findInElements(el.content as EditorElement[]);

               if (found) {
                  return found;
               }
            }
         }

         return null;
      }

      return findInElements(editor.elements);
   }, [activeId, editor.elements]);

   return (
      <DndContext
         sensors={sensors}
         collisionDetection={customCollisionDetection}
         onDragStart={handleDragStart}
         onDragOver={handleDragOver}
         onDragEnd={handleDragEnd}
         onDragCancel={handleDragCancel}
      >
         {children}

         {/* Enhanced Drag Overlay - shows beautiful preview while dragging */}
         <DragOverlay
            dropAnimation={{
               duration: 200,
               easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}
         >
            <DragOverlayContent element={activeElement} />
         </DragOverlay>
      </DndContext>
   );
};

export default DndEditorCanvas;
