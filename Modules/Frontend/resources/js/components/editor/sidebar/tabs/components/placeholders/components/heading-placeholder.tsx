import { Heading } from 'lucide-react';
import React from 'react';

export default function HeadingPlaceholder() {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'heading');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-muted"
      >
         <Heading className="h-10 w-10 text-muted-foreground" />
      </div>
   );
}
