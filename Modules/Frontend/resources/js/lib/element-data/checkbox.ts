import { nanoid } from 'nanoid';

export default {
   elementDetails: {
      content: {
         label: 'Checkbox',
         name: '',
         value: 'on',
         checked: false,
      },
      id: nanoid(),
      name: 'Checkbox',
      type: 'checkbox' as const,
      className:
         'peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
      styles: {},
   },
};
