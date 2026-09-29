import { nanoid } from 'nanoid';
import div from './div';

export default {
   elementDetails: {
      content: [div.elementDetails, div.elementDetails],
      id: nanoid(),
      name: 'Two Columns',
      type: '2Col' as const,
      className: 'w-full grid grid-cols-1 md:grid-cols-2 gap-6 h-fit',
      styles: {},
   },
};
