import { Columns3 } from 'lucide-react';
import React from 'react';

const ThreeColumnsPlaceholder = () => {
   const handleDragState = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', '3Col');
   };

   return (
      <div
         draggable
         onDragStart={handleDragState}
         className="flex h-14 w-14 cursor-grab flex-row gap-[4px] rounded-md bg-muted/70 p-2"
      >
         <Columns3 className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default ThreeColumnsPlaceholder;
