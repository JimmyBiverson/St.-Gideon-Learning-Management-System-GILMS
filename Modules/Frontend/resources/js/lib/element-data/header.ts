import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Header',
      type: 'header' as const,
      className: '',
      styles: {},
   },
};
