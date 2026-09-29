import { BoxSelect } from 'lucide-react';
import React from 'react';

const SectionPlaceholder = () => {
   const handleDragStart = (event: React.DragEvent) => {
      event.dataTransfer.setData('componentType', 'section');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-md bg-muted/70 p-2"
      >
         <BoxSelect className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default SectionPlaceholder;
