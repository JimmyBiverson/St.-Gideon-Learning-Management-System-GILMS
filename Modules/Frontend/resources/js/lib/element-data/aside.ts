import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Aside',
      type: 'aside' as const,
      className: '',
      styles: {},
   },
};
