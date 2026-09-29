import { nanoid } from 'nanoid';
import div from './div';

export default {
   elementDetails: {
      content: [div.elementDetails, div.elementDetails, div.elementDetails],
      id: nanoid(),
      name: 'Three Columns',
      type: '3Col' as const,
      className: 'w-full grid grid-cols-1 md:grid-cols-3 gap-6 h-fit',
      styles: {},
   },
};
