import { nanoid } from 'nanoid';
import li from './li';

export default {
   elementDetails: {
      content: [li.elementDetails, li.elementDetails, li.elementDetails],
      id: nanoid(),
      name: 'Unordered List',
      type: 'ul' as const,
      className: '',
      styles: {},
   },
};
