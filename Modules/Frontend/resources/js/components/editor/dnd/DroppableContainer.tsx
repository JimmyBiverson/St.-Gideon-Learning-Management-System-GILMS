/**
 * Droppable Container Wrapper
 * Creates drop zones for reordering elements
 */

import { cn } from '@/lib/utils';
import React from 'react';

interface DroppableContainerProps {
   id: string;
   containerId: string;
   index: number;
   children?: React.ReactNode;
   className?: string;
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({
   id,
   containerId,
   index,
   children,
   className,
}) => {
   void id;
   void containerId;
   void index;
   const setNodeRef = (_node: HTMLDivElement | null) => {};
   const isOver = false;
   const active = false;

   // Show drop indicator when hovering
   const showDropIndicator = isOver && active;

   return (
      <div
         ref={setNodeRef}
         className={cn(
            'droppable-container relative min-h-4 transition-all duration-200',
            className,
         )}
      >
         {/* Enhanced Drop Indicator with animation */}
         {showDropIndicator && (
            <div className="absolute inset-x-0 top-0 z-20 -mt-1">
               <div className="h-1 animate-in rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/50 duration-200 slide-in-from-top-1" />
               {/* Glow effect */}
               <div className="absolute inset-x-0 top-0 -mt-1 h-3 rounded-full bg-blue-500/20 blur-sm" />
            </div>
         )}

         {children}
      </div>
   );
};

export default DroppableContainer;
