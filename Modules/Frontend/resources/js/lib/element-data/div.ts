import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Div',
      type: 'div' as const,
      className: '',
      styles: {},
   },
};
