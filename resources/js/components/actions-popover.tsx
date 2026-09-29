import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
   Popover,
   PopoverContent,
   PopoverDescription,
   PopoverHeader,
   PopoverTitle,
   PopoverTrigger,
} from '@/components/ui/popover';
import DeleteModal from './inertia/delete-modal';

const ActionPopover = () => {
   const [open, setOpen] = useState(false);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
         </PopoverTrigger>
         <PopoverContent side="left">
            <PopoverHeader>
               <PopoverTitle>Dimensions</PopoverTitle>
               <PopoverDescription>
                  Set the dimensions for the layer.
               </PopoverDescription>
            </PopoverHeader>

            <DeleteModal
               routePath={'#'}
               actionComponent={
                  <Button
                     className="h-8 cursor-pointer"
                     variant="destructive"
                     onClick={() => setOpen(false)}
                  >
                     <TrashIcon />
                     Delete
                  </Button>
               }
            />
         </PopoverContent>
      </Popover>
   );
};

export default ActionPopover;
