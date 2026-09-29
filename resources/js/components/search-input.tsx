import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import debounce from '@/lib/debounce';
import { getQueryParams } from '@/lib/route';
import { cn } from '@/lib/utils';

interface SearchInputProps {
   className?: string;
   iconPosition?: 'left' | 'right';
   placeholder?: string;
   onChangeValue: (value: string) => void;
   change?: boolean;
   searchKey?: string;
}

const SearchInput = (props: SearchInputProps) => {
   const {
      className,
      iconPosition = 'left',
      placeholder = 'Search',
      onChangeValue,
      change = false,
      searchKey = 'search',
   } = props;
   const page = usePage<SharedData>();
   const searchRef = useRef<HTMLInputElement>(null);
   const params = getQueryParams(page.url);

   const searchHandler = debounce(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
         const query = e.target.value;

         onChangeValue(query);
      },
      300,
   );

   useEffect(() => {
      if (params[searchKey] && searchRef.current) {
         searchRef.current.focus();
      }
   }, [page, params, searchKey]);

   return (
      <div className={cn('relative w-full md:max-w-[260px]', className)}>
         <input
            type="text"
            ref={searchRef}
            onChange={searchHandler}
            placeholder={placeholder}
            className={cn(
               'flex h-10 w-full min-w-0 rounded-lg border border-input bg-transparent py-[15px] text-sm font-normal text-gray-500 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
               change
                  ? 'selection:bg-primary selection:text-primary-foreground hover:border-ring focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring'
                  : 'selection:bg-zinc-900 selection:text-zinc-50 hover:border-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 dark:hover:border-zinc-50 dark:focus-visible:border-zinc-50 dark:focus-visible:ring-zinc-50',
               iconPosition === 'left' ? 'pr-4 pl-10' : 'pr-10 pl-4',
            )}
            defaultValue={params[searchKey] ?? ''}
         />

         <Search
            className={cn(
               'absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-700',
               iconPosition === 'left' ? 'left-4' : 'right-4',
            )}
         />
      </div>
   );
};

export default SearchInput;
