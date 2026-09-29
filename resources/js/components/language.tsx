import { router, usePage } from '@inertiajs/react';
import { Check, Globe } from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import languages from '@/data/languages';
import change from '@/routes/change';
import { Button } from './ui/button';

const Language = () => {
   const { props } = usePage<SharedData>();
   const { system, direction, langs, locale } = props;

   const activeLangs = langs.filter((lang) => lang.is_active);
   const currentLang = languages.find((lang) => lang.code === (locale ?? 'en'));

   const directionHandler = () => {
      router.post(change.direction(), {
         direction: direction === 'ltr' ? 'rtl' : 'ltr',
      });
   };

   const langHandler = (lang: string) => {
      router.post(change.lang(), { locale: lang });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className="cursor-pointer outline-none">
            <Button
               size="icon"
               variant="ghost"
               className="relative h-10 w-10 rounded-full bg-transparent p-0 text-lg"
            >
               {currentLang?.flag ? (
                  <span aria-hidden="true">{currentLang.flag}</span>
               ) : (
                  <Globe className="!h-5 !w-5" />
               )}
               <span className="sr-only">
                  {currentLang?.name ?? 'Select language'}
               </span>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end" className="w-[160px]">
            {/* {system.fields.direction === 'none' && (
               <>
                  <DropdownMenuItem
                     className="cursor-pointer justify-center px-3 uppercase"
                     onClick={directionHandler}
                  >
                     {direction === 'ltr' ? 'RTL' : 'LTR'}
                  </DropdownMenuItem>

                  <Separator className="my-1" />
               </>
            )} */}

            {activeLangs.map((lang) => (
               <DropdownMenuItem
                  key={lang.id}
                  className="cursor-pointer justify-between gap-2 px-3"
                  onClick={() => langHandler(lang.code)}
               >
                  <span className="flex items-center gap-2">
                     {lang.flag && <span aria-hidden="true">{lang.flag}</span>}
                     {lang.name}
                  </span>
                  {lang.code === locale && <Check className="h-4 w-4" />}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default Language;
