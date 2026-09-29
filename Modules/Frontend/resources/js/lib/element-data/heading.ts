import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Heading',
         level: 'h2',
      },
      id: nanoid(),
      name: 'Heading',
      type: 'heading' as const,
      className: '',
      styles: {},
   },
};
