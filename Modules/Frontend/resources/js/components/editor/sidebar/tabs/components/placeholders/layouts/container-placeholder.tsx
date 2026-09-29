import { Box } from 'lucide-react';
import React from 'react';

const ContainerPlaceholder = () => {
   const handleDragStart = (event: React.DragEvent) => {
      event.dataTransfer.setData('componentType', 'container');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-md bg-muted/70 p-2"
      >
         <Box className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default ContainerPlaceholder;
