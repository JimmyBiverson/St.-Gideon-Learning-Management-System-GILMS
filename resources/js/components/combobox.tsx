import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Data {
   id?: number | string;
   child_id?: number | string;
   label: string;
   value: string;
}

interface Props {
   data: Data[];
   placeholder: string;
   onSelect: (selected: Data) => void;
   defaultValue?: string;
   translate?: any;
   name?: string;
   change?: boolean;
}

const Combobox = ({
   data,
   placeholder,
   onSelect,
   defaultValue,
   translate,
   name,
   change = false,
}: Props) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(defaultValue || '');
   const initialRenderRef = useRef(true);

   useEffect(() => {
      const isInitial = initialRenderRef.current;

      // Only set initial value, don't trigger onSelect on subsequent renders with the same defaultValue
      if (defaultValue && (isInitial || defaultValue !== value)) {
         const defaultItem = data.find((item) => item.value === defaultValue);

         if (defaultItem) {
            queueMicrotask(() => {
               setValue(defaultValue);

               // Only call onSelect on non-initial renders to prevent triggering re-renders immediately
               if (!isInitial) {
                  onSelect(defaultItem);
               }
            });
         }
      }

      initialRenderRef.current = false;
   }, [defaultValue, data, value, onSelect]);

   const handleSelect = (selected: Data) => {
      const newValue = selected.value === value ? '' : selected.value;
      setValue(newValue);
      onSelect(selected);
      setOpen(false);
   };

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               size="lg"
               type="button"
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className={cn(
                  'w-full justify-between rounded-lg !bg-transparent transition-[color,box-shadow]',
                  change
                     ? 'hover:border-ring focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring data-[state=open]:border-ring data-[state=open]:ring-1 data-[state=open]:ring-ring'
                     : 'hover:border-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 data-[state=open]:border-zinc-900 data-[state=open]:ring-1 data-[state=open]:ring-zinc-900 dark:hover:border-zinc-50 dark:focus-visible:border-zinc-50 dark:focus-visible:ring-zinc-50 dark:data-[state=open]:border-zinc-50 dark:data-[state=open]:ring-zinc-50',
               )}
            >
               {value
                  ? data.find((item) => item.value === value)?.label
                  : placeholder}
               <ChevronsUpDown className="opacity-50" />
            </Button>
         </PopoverTrigger>
         {name && <input type="hidden" name={name} value={value} />}
         <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
               <CommandInput
                  placeholder={
                     translate?.input?.search_placeholder || 'Search element...'
                  }
                  className="focus:border-none focus:ring-0 focus:outline-none"
               />
               <CommandList>
                  <CommandEmpty>
                     {translate?.frontend?.no_element_found ||
                        'No element found.'}
                  </CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                     {data.map((item) => (
                        <CommandItem
                           key={item.value}
                           value={item.value}
                           onSelect={() => handleSelect(item)}
                        >
                           {item.label}
                           <Check
                              className={cn(
                                 'ml-auto',
                                 value === item.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                              )}
                           />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
};

export default Combobox;
