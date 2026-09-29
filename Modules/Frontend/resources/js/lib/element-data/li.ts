import { nanoid } from 'nanoid';
import span from './span';

export default {
   elementDetails: {
      content: [
         {
            ...span.elementDetails,
            content: { innerText: 'List Item' },
         },
      ],
      id: nanoid(),
      name: 'List Item',
      type: 'li' as const,
      className: '',
      styles: {},
   },
};
