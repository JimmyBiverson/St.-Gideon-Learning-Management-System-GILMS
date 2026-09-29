import { nanoid } from 'nanoid';
import span from './span';

export default {
   elementDetails: {
      content: [
         {
            ...span.elementDetails,
            content: { innerText: 'Link Text' },
         },
      ],
      id: nanoid(),
      name: 'Link',
      type: 'link' as const,
      className: '',
      styles: {},
      htmlAttributes: {
         href: '#',
         type: 'native', // 'native' for native anchor tag, 'inertia' for Inertia Link
      },
   },
};
