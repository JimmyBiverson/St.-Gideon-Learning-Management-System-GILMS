import { nanoid } from 'nanoid';
import accordionContent from './accordionContent';
import accordionTrigger from './accordionTrigger';
import icon from './icon';
import span from './span';

export default {
   elementDetails: {
      content: [
         {
            ...accordionTrigger.elementDetails,
            content: [
               span.elementDetails,
               {
                  ...icon.elementDetails,
                  content: { icon: 'chevron-up' },
                  styles: { width: '16px', height: '16px' },
               },
            ],
         },
         accordionContent.elementDetails,
      ],
      id: nanoid(),
      name: 'Accordion Item',
      type: 'accordionItem' as const,
      className:
         'border-b border-border bg-background rounded-lg border shadow-sm',
      styles: { width: '' },
   },
};
