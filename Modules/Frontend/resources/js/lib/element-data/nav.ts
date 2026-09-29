import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Nav',
      type: 'nav' as const,
      className: '',
      styles: {},
   },
};
