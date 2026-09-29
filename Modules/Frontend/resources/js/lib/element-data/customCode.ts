import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         code: '<div>Custom Code Block</div>',
      },
      id: nanoid(),
      name: 'Custom Code',
      type: 'customCode' as const,
      className: '',
      styles: {},
   },
};
