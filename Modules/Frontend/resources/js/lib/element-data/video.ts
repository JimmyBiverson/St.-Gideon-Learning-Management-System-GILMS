import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         src: '',
      },
      id: nanoid(),
      name: 'Video',
      type: 'video' as const,
      className: '',
      styles: {
         width: '100%',
         height: 'auto',
      },
   },
};
