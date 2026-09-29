import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         placeholder: 'Enter text...',
         inputType: 'text',
      },
      id: nanoid(),
      name: 'Input',
      type: 'input' as const,
      className:
         'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      styles: {},
   },
};
