import { Tag } from 'lucide-react';
import React from 'react';

export default function LabelPlaceholder() {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'label');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-muted"
      >
         <Tag className="h-10 w-10 text-muted-foreground" />
      </div>
   );
}
