/**
 * Enhanced Drag Overlay Component
 * Shows a beautiful preview of the element being dragged
 */

import { cn } from '@/lib/utils';
import {
   Box,
   GripVertical,
   ImageIcon,
   LayoutGrid,
   Link2,
   Type,
   Video,
} from 'lucide-react';
import React from 'react';

interface DragOverlayContentProps {
   element: EditorElement | null;
}

/**
 * Get icon for element type
 */
function getElementIcon(type: EditorBtns | null) {
   switch (type) {
      case 'button':
         return <Box className="h-4 w-4" />;
      case 'label':
         return <Type className="h-4 w-4" />;
      case 'image':
         return <ImageIcon className="h-4 w-4" />;
      case 'video':
         return <Video className="h-4 w-4" />;
      case 'link':
         return <Link2 className="h-4 w-4" />;
      case 'container':
      case 'section':
      case '2Col':
      case '3Col':
         return <LayoutGrid className="h-4 w-4" />;
      default:
         return <Box className="h-4 w-4" />;
   }
}

/**
 * Get background color for element type
 */
function getElementColor(type: EditorBtns | null): string {
   switch (type) {
      case 'button':
         return 'bg-blue-50 border-blue-200';
      case 'label':
         return 'bg-purple-50 border-purple-200';
      case 'input':
         return 'bg-green-50 border-green-200';
      case 'image':
         return 'bg-pink-50 border-pink-200';
      case 'video':
         return 'bg-orange-50 border-orange-200';
      case 'link':
         return 'bg-cyan-50 border-cyan-200';
      case 'container':
      case 'section':
      case '2Col':
      case '3Col':
         return 'bg-slate-50 border-slate-200';
      default:
         return 'bg-gray-50 border-gray-200';
   }
}

const DragOverlayContent: React.FC<DragOverlayContentProps> = ({ element }) => {
   if (!element) {
      return null;
   }

   const colorClass = getElementColor(element.type);
   const icon = getElementIcon(element.type);

   return (
      <div
         className={cn(
            'relative flex items-center gap-3 rounded-lg border-2 p-4 shadow-2xl backdrop-blur-sm transition-all',
            colorClass,
            'animate-in duration-200 zoom-in-95 fade-in',
         )}
         style={{
            minWidth: '200px',
            maxWidth: '300px',
         }}
      >
         {/* Drag Handle Icon */}
         <div className="flex-shrink-0">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
         </div>

         {/* Element Info */}
         <div className="flex flex-1 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/80">
               {icon}
            </div>

            <div className="min-w-0 flex-1">
               <div className="truncate text-sm font-semibold text-foreground">
                  {element.name}
               </div>
               <div className="truncate text-xs text-muted-foreground">
                  {element.type}
               </div>
            </div>
         </div>

         {/* Moving Indicator */}
         <div className="flex-shrink-0">
            <div className="flex items-center gap-1">
               <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
               <div
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                  style={{ animationDelay: '150ms' }}
               />
               <div
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                  style={{ animationDelay: '300ms' }}
               />
            </div>
         </div>

         {/* Glow effect */}
         <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl" />
      </div>
   );
};

export default DragOverlayContent;
