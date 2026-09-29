import { ImageIcon } from 'lucide-react';
import React from 'react';

const ImagePlaceholder = () => {
   const handleDragStart = (event: React.DragEvent) => {
      event.dataTransfer.setData('componentType', 'image');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-md bg-muted/70 p-2"
      >
         <ImageIcon className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default ImagePlaceholder;
