import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Form',
      type: 'form' as const,
      className: '',
      styles: {},
   },
};
