import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { Check, Globe, Table2 } from 'lucide-react';
import { useState } from 'react';
import { translate, translations } from '@/routes/frontend-pages';
import { useEditor } from '@/frontend/hooks/use-editor';

const EditorLocaleSwitcher = () => {
   const { editor, dispatch, projectId, pageDetails } = useEditor();
   const { props } = usePage<SharedData>();
   const langs = props.langs ?? [];
   const [loading, setLoading] = useState(false);

   // Only one language installed — nothing to switch between yet.
   if (langs.length < 2) {
      return null;
   }

   const defaultLang = langs.find((lang) => lang.is_default) ?? langs[0];
   const activeCode = editor.editor.activeLocale || defaultLang.code;
   const activeLang =
      langs.find((lang) => lang.code === activeCode) ?? defaultLang;

   const selectLocale = async (locale: string) => {
      const isDefault = locale === defaultLang.code;

      dispatch({
         type: 'SET_ACTIVE_LOCALE',
         payload: { locale, isDefault },
      });

      // Structural tabs are unavailable in translation mode — land
      // somewhere text editing is actually possible.
      if (!isDefault) {
         dispatch({
            type: 'SET_ACTIVE_TAB',
            payload: { activeTab: 'Customize' },
         });
      }

      if (isDefault || !pageDetails) {
         return;
      }

      setLoading(true);

      try {
         const response = await fetch(
            translations.url({
               project: Number(projectId),
               page: pageDetails.id,
               locale,
            }),
            { headers: { Accept: 'application/json' } },
         );
         const data = await response.json();

         dispatch({
            type: 'LOAD_TRANSLATIONS',
            payload: { translations: data.translations ?? {} },
         });
      } catch (error) {
         console.error('Failed to load translations:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2" disabled={loading}>
               <Globe className="h-4 w-4" />
               {activeLang.nativeName || activeLang.name}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center">
            {langs.map((lang) => (
               <DropdownMenuItem
                  key={lang.code}
                  onClick={() => selectLocale(lang.code)}
                  className="cursor-pointer justify-between gap-4"
               >
                  <span>
                     {lang.nativeName || lang.name}
                     {lang.is_default && (
                        <span className="ml-1 text-muted-foreground">
                           (default)
                        </span>
                     )}
                  </span>
                  {lang.code === activeCode && <Check className="h-4 w-4" />}
               </DropdownMenuItem>
            ))}

            {activeCode !== defaultLang.code && pageDetails && (
               <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                     <Link
                        href={translate({
                           project: Number(projectId),
                           page: pageDetails.id,
                           locale: activeCode,
                        })}
                     >
                        <Table2 className="h-4 w-4" />
                        Translate this page in bulk
                     </Link>
                  </DropdownMenuItem>
               </>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default EditorLocaleSwitcher;
