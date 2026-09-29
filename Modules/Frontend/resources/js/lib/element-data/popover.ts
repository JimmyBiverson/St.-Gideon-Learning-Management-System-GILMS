import { nanoid } from 'nanoid';
import popoverContent from './popoverContent';
import popoverTrigger from './popoverTrigger';

export default {
   elementDetails: {
      content: [popoverTrigger.elementDetails, popoverContent.elementDetails],
      id: nanoid(),
      name: 'Popover',
      type: 'popover' as const,
      className: 'relative inline-block',
      styles: {},
   },
};
