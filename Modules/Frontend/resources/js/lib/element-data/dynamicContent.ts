import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         code: '<div>Dynamic Content</div>',
      },
      id: nanoid(),
      name: 'Dynamic Content',
      type: 'dynamicContent' as const,
      className: '',
      styles: {},
   },
};
