import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         innerText: 'Button',
         buttonType: 'button',
      },
      id: nanoid(),
      name: 'Button',
      type: 'button' as const,
      className:
         'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all px-4 py-2 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
      styles: {},
   },
};
