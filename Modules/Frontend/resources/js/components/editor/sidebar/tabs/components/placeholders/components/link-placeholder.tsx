import { Link2Icon } from 'lucide-react';
import React from 'react';

const LinkPlaceholder = () => {
   const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('componentType', 'link');
   };

   return (
      <div
         draggable
         onDragStart={handleDragStart}
         className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg bg-muted"
      >
         <Link2Icon className="h-10 w-10 text-muted-foreground" />
      </div>
   );
};

export default LinkPlaceholder;
