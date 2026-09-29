import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Tabs Content',
      type: 'tabsContent' as const,
      className: 'mt-2 p-2 ring-offset-background',
      styles: {},
   },
};
