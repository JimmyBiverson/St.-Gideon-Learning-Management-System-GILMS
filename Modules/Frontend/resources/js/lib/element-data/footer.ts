import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Footer',
      type: 'footer' as const,
      className: '',
      styles: {},
   },
};
