import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [
         {
            id: nanoid(),
            name: 'Span',
            type: 'span' as const,
            styles: {},
            className: '',
            content: {
               innerText: 'Open',
            },
         },
      ],
      id: nanoid(),
      name: 'Popover Trigger',
      type: 'popoverTrigger' as const,
      className:
         'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer',
      styles: {},
   },
};
