import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Label',
      },
      id: nanoid(),
      name: 'Label',
      type: 'label' as const,
      className:
         'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      styles: {},
   },
};
