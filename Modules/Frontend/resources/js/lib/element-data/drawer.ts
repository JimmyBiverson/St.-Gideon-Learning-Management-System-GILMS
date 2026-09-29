import { nanoid } from 'nanoid';
import drawerContent from './drawerContent';
import drawerTrigger from './drawerTrigger';

export default {
   elementDetails: {
      content: [drawerTrigger.elementDetails, drawerContent.elementDetails],
      id: nanoid(),
      name: 'Drawer',
      type: 'drawer' as const,
      className: 'relative inline-block',
      styles: {},
   },
};
