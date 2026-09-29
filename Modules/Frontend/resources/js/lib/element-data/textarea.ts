import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         placeholder: 'Enter text...',
         name: '',
         value: '',
         rows: 4,
         cols: 50,
      },
      id: nanoid(),
      name: 'Textarea',
      type: 'textarea' as const,
      className:
         'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      styles: {},
   },
};
