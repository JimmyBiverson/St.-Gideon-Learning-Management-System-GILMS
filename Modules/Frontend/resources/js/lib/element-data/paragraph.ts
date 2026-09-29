import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Paragraph text',
      },
      id: nanoid(),
      name: 'Paragraph',
      type: 'paragraph' as const,
      className: '',
      styles: {},
   },
};
