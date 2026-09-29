import { MousePointerClick } from 'lucide-react';
import React from 'react';

export default function ButtonPlaceholder() {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'button');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-muted"
      >
         <MousePointerClick className="h-10 w-10 text-muted-foreground" />
      </div>
   );
}
