import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Accordion Content',
      type: 'accordionContent' as const,
      className: 'p-4 pt-0 text-sm',
      styles: {},
   },
};
