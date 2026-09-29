import { PanelsTopLeft } from 'lucide-react';
import React from 'react';

export default function DrawerPlaceholder() {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'drawer');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-muted"
      >
         <PanelsTopLeft className="h-10 w-10 text-muted-foreground" />
      </div>
   );
}
