import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Span text',
      },
      id: nanoid(),
      name: 'Span',
      type: 'span' as const,
      className: '',
      styles: {},
   },
};
