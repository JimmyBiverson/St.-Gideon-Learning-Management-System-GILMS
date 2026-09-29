import { nanoid } from 'nanoid';
import container from './container';

export default {
   elementDetails: {
      content: [container.elementDetails],
      id: nanoid(),
      name: 'Section',
      type: 'section' as const,
      className: '',
      styles: {},
   },
};
