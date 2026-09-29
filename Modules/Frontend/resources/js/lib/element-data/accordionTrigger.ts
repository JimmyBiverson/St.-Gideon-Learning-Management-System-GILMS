import { nanoid } from 'nanoid';
import span from './span';

export default {
   elementDetails: {
      content: [
         {
            ...span.elementDetails,
            content: { innerText: 'Accordion Trigger' },
         },
      ],
      id: nanoid(),
      name: 'Accordion Trigger',
      type: 'accordionTrigger' as const,
      className:
         'flex flex-1 items-center justify-between p-4 text-sm font-medium transition-all cursor-pointer',
      styles: {},
   },
};
