import IconPickerTooltip from '@/components/icon-picker-tooltip';
import { Label } from '@/components/ui/label';
import debounce from '@/lib/debounce';
import { Search } from 'lucide-react';
import iconNodes from 'lucide-static/icon-nodes.json';
import { useMemo, useState } from 'react';

interface IconPickerProps {
   enableSearch?: boolean;
   onSelect?: (iconName: string) => void;
}

const IconPicker = ({ enableSearch = true, onSelect }: IconPickerProps) => {
   const allNames = Object.keys(iconNodes);
   const [searchTerm, setSearchTerm] = useState('');

   const filteredIcons = useMemo(() => {
      if (!searchTerm) {
         return allNames;
      }

      const term = searchTerm.toLowerCase();

      return allNames.filter((icon) => icon.toLowerCase().includes(term));
   }, [allNames, searchTerm]);

   const searchHandler = debounce(async (e: any) => {
      setSearchTerm(e.target.value);
   }, 400);

   return (
      <div>
         {enableSearch && (
            <>
               <div className="flex items-center justify-between">
                  <Label htmlFor="email">Icons</Label>
                  <p className="text-sm text-gray-500">
                     Showing Results{' '}
                     {searchTerm.length > 0 ? filteredIcons.length : 0} of{' '}
                     {allNames.length}
                  </p>
               </div>

               <div className="relative w-full">
                  <input
                     type="text"
                     placeholder="Search Icon..."
                     onChange={searchHandler}
                     className="h-10 w-full rounded-md border border-gray-200 py-[15px] pr-4 pl-12 text-sm font-normal text-gray-500 focus:border-primary focus:ring-0 focus:outline-0"
                  />
                  <Search className="absolute top-3 left-4 z-10 h-4 w-4 text-gray-700" />
               </div>
            </>
         )}

         {searchTerm.length > 0 && filteredIcons.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2.5">
               {filteredIcons.map((name) => (
                  <IconPickerTooltip
                     key={name}
                     name={name}
                     onSelect={onSelect}
                  />
               ))}
            </div>
         ) : (
            <p className="mt-4 text-center text-sm text-gray-500">
               No icon found
            </p>
         )}
      </div>
   );
};

export default IconPicker;
