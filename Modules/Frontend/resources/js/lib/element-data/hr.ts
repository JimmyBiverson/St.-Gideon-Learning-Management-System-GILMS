import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {},
      id: nanoid(),
      name: 'Horizontal Rule',
      type: 'hr' as const,
      className: 'border-t border-border',
      styles: {},
   },
};
