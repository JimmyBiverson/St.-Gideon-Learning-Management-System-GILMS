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
import FooterEditor from '@/layouts/footer/footer-editor';
import FooterPreview from '@/layouts/footer/footer-preview';
import { translations } from '@/routes/footer';
import { update as updateFooterTranslations } from '@/routes/footer/translations';

import type { SystemProps } from '../index';

type Mode = 'preview' | 'edit' | 'translate';

const buildFooterRows = (footer: Footer): TranslatableRow[] =>
   footer.footer_items.flatMap((item) => {
      const rows: TranslatableRow[] = [
         {
            id: Number(item.id),
            field: 'title',
            label: `${item.slug} (section title)`,
            defaultValue: item.title,
         },
      ];

      if (Array.isArray(item.items)) {
         (item.items as unknown as { title?: string }[]).forEach(
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

const Footer = () => {
   const { props } = usePage<SystemProps & SharedData>();
   const { footer, translate, langs } = props;
   const { settings, button } = translate;
   const [mode, setMode] = useState<Mode>('preview');

   const hasMultipleLanguages =
      (langs ?? []).filter((lang) => lang.is_active).length > 1;

   if (!footer) {
      return (
         <Card>
            <CardContent className="flex items-center justify-center py-8">
               <p className="text-muted-foreground">
                  {settings.footer_config_not_found}
               </p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader className="p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
               <div>
                  <CardTitle className="flex items-center gap-2">
                     <Eye className="h-5 w-5" />
                     {settings.live_footer_preview}
                  </CardTitle>
                  <CardDescription className="hidden sm:block">
                     {settings.interactive_preview} {footer.title} (
                     {footer.slug})
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
                           {button.edit_footer}
                        </Button>
                     </>
                  )}
               </div>
            </div>
         </CardHeader>

         <Separator />

         {mode === 'edit' && <FooterEditor footer={footer} />}

         {mode === 'translate' && (
            <CardContent className="p-4 md:p-6">
               <SiteTranslator
                  rows={buildFooterRows(footer)}
                  fetchUrl={(locale) => translations.url({ locale })}
                  saveUrl={(locale) =>
                     updateFooterTranslations.url({ locale })
                  }
               />
            </CardContent>
         )}

         {mode === 'preview' && (
            <CardContent className="p-4 md:p-6">
               <FooterPreview />
            </CardContent>
         )}
      </Card>
   );
};

export default Footer;
