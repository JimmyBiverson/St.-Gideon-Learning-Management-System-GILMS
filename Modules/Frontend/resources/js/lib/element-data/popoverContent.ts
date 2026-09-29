import { nanoid } from 'nanoid';
import paragraph from './paragraph';

export default {
   elementDetails: {
      content: {
         placement: 'left',
         children: [
            {
               ...paragraph.elementDetails,
               content: {
                  innerText: 'Place content for the popover here.',
               },
            },
         ],
      },
      id: nanoid(),
      name: 'Popover Content',
      type: 'popoverContent' as const,
      className:
         'absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      styles: {},
   },
};
