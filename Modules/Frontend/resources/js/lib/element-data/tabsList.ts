import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Tabs List',
      type: 'tabsList' as const,
      className:
         'inline-flex items-center rounded-md bg-muted p-1 text-muted-foreground w-full',
      styles: {},
   },
};
