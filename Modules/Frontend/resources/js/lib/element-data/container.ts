import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: [],
      id: nanoid(),
      name: 'Container',
      type: 'container' as const,
      className: 'max-w-[1280px] mx-auto w-full px-6',
      styles: {},
   },
};
