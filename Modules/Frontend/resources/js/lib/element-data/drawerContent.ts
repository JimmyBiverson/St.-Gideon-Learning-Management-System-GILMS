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
                  innerText: 'Place content for the drawer here.',
               },
            },
         ],
      },
      id: nanoid(),
      name: 'Drawer Content',
      type: 'drawerContent' as const,
      className:
         'fixed z-50 bg-background p-6 shadow-lg transition ease-in-out overflow-y-auto',
      styles: {},
   },
};
