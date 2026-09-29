import { Star } from 'lucide-react';
import React from 'react';

const IconPlaceholder = () => {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'icon');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-background transition-colors active:cursor-grabbing"
      >
         <Star className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default IconPlaceholder;
