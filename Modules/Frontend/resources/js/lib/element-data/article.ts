import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Article',
      type: 'article' as const,
      className: '',
      styles: {},
   },
};
