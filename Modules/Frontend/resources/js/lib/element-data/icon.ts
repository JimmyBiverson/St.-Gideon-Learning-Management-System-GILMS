import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: { icon: 'star' },
      id: nanoid(),
      name: 'Icon',
      type: 'icon' as const,
      className: 'text-foreground',
      styles: {
         width: '24px',
         height: '24px',
      },
   },
};
