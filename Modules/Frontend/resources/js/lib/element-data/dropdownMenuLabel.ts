import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Dropdown Label',
      },
      id: nanoid(),
      name: 'Dropdown Label',
      type: 'dropdownMenuLabel' as const,
      className: 'px-2 py-1.5 text-sm font-semibold',
      styles: {
         width: '100%',
      },
   },
};
