import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         src: '',
         title: 'Iframe',
         width: '100%',
         height: '400',
      },
      id: nanoid(),
      name: 'Iframe',
      type: 'iframe' as const,
      className: '',
      styles: {},
   },
};
