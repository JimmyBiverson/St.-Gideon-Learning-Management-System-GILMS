import { nanoid } from 'nanoid';
import dropdownMenuContent from './dropdownMenuContent';
import dropdownMenuItem from './dropdownMenuItem';
import dropdownMenuLabel from './dropdownMenuLabel';
import dropdownMenuTrigger from './dropdownMenuTrigger';

export default {
   elementDetails: {
      content: [
         dropdownMenuTrigger.elementDetails,
         {
            ...dropdownMenuContent.elementDetails,
            content: {
               placement: 'left',
               children: [
                  dropdownMenuLabel.elementDetails,
                  dropdownMenuItem.elementDetails,
               ],
            },
         },
      ],
      id: nanoid(),
      name: 'Dropdown Menu',
      type: 'dropdownMenu' as const,
      className: 'relative inline-block',
      styles: {},
   },
};
