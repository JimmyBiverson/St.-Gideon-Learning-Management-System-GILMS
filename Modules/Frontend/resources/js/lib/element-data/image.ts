import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         src: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg',
         alt: 'Image description',
      },
      id: nanoid(),
      name: 'Image',
      type: 'image' as const,
      className: '',
      styles: {},
   },
};
