import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         name: '',
         options: ['Option 1', 'Option 2', 'Option 3'],
      },
      id: nanoid(),
      name: 'Select',
      type: 'select' as const,
      className:
         'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      styles: {},
   },
};
