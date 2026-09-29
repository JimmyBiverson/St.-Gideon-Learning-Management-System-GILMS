import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Dropdown Item',
      },
      id: nanoid(),
      name: 'Dropdown Item',
      type: 'dropdownMenuItem' as const,
      className:
         'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
      styles: {
         width: '100%',
      },
   },
};
