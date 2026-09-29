import { usePage } from '@inertiajs/react';
import { Edit, Eye, Languages, X } from 'lucide-react';
import { useState } from 'react';
import type { TranslatableRow } from '@/components/site-translator';
import SiteTranslator from '@/components/site-translator';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import NavbarEditor from '@/layouts/navbar/navbar-editor';
import NavbarPreview from '@/layouts/navbar/navbar-preview';
import { translations } from '@/routes/navbar';
import { update as updateNavbarTranslations } from '@/routes/navbar/translations';

import type { SystemProps } from '../index';

type Mode = 'preview' | 'edit' | 'translate';

const buildNavbarRows = (navbar: Navbar): TranslatableRow[] =>
   navbar.navbar_items.flatMap((item) => {
      const rows: TranslatableRow[] = [
         {
            id: Number(item.id),
            field: 'title',
            label: `${item.type}: ${item.title}`,
            defaultValue: item.title,
         },
      ];

      if (Array.isArray(item.items)) {
         (item.items as unknown as { title: string }[]).forEach(
            (sub, index) => {
               if (!sub.title) {
                  return;
               }

               rows.push({
                  id: Number(item.id),
                  field: `items.${index}.title`,
                  label: `${item.title} → ${sub.title}`,
                  defaultValue: sub.title,
               });
            },
         );
      }

      return rows;
   });

const Navbar = () => {
   const { props } = usePage<SystemProps & SharedData>();
   const { navbar, translate, langs } = props;
   const { settings, button } = translate;
   const [mode, setMode] = useState<Mode>('preview');

   const hasMultipleLanguages =
      (langs ?? []).filter((lang) => lang.is_active).length > 1;

   return (
      <Card>
         <CardHeader className="p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
               <div>
                  <CardTitle className="flex items-center gap-2">
                     <Eye className="h-5 w-5" />
                     {settings.live_navbar_preview}
                  </CardTitle>
                  <CardDescription className="hidden sm:block">
                     {settings.interactive_preview} {navbar.title} (
                     {navbar.slug})
                  </CardDescription>
               </div>

               <div className="flex items-center gap-2">
                  {mode !== 'preview' ? (
                     <Button
                        onClick={() => setMode('preview')}
                        variant="outline"
                     >
                        <X className="mr-2 h-4 w-4" />
                        {button.close}
                     </Button>
                  ) : (
                     <>
                        {hasMultipleLanguages && (
                           <Button
                              onClick={() => setMode('translate')}
                              variant="outline"
                              className="flex items-center gap-2"
                           >
                              <Languages className="h-4 w-4" />
                              Translate
                           </Button>
                        )}
                        <Button
                           onClick={() => setMode('edit')}
                           className="flex items-center gap-2"
                        >
                           <Edit className="h-4 w-4" />
                           {button.edit_navbar}
                        </Button>
                     </>
                  )}
               </div>
            </div>
         </CardHeader>

         <Separator />

         {mode === 'edit' && <NavbarEditor navbar={navbar} />}

         {mode === 'translate' && (
            <CardContent className="p-4 md:p-6">
               <SiteTranslator
                  rows={buildNavbarRows(navbar)}
                  fetchUrl={(locale) => translations.url({ locale })}
                  saveUrl={(locale) =>
                     updateNavbarTranslations.url({ locale })
                  }
               />
            </CardContent>
         )}

         {mode === 'preview' && (
            <CardContent className="space-y-6 p-4 md:p-6">
               <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                     {settings.before_login}
                  </p>
                  <NavbarPreview auth={false} navbar={navbar} />
               </div>

               <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                     {settings.after_login}
                  </p>
                  <NavbarPreview auth={true} navbar={navbar} />
               </div>
            </CardContent>
         )}
      </Card>
   );
};

export default Navbar;
