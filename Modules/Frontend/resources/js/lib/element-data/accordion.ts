import { nanoid } from 'nanoid';
import accordionItem from './accordionItem';

export default {
   elementDetails: {
      content: [accordionItem.elementDetails],
      id: nanoid(),
      name: 'Accordion',
      type: 'accordion' as const,
      className: 'w-full',
      styles: {},
   },
};
