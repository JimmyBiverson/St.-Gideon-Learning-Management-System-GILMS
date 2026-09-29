import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

export interface TranslatableRow {
   id: number;
   field: string;
   label: string;
   defaultValue: string;
}

interface SiteTranslatorProps {
   rows: TranslatableRow[];
   fetchUrl: (locale: string) => string;
   saveUrl: (locale: string) => string;
}

/**
 * Generic per-locale translation panel for site chrome that has no
 * structure to edit — just a flat list of text fields (navbar item titles,
 * footer section/link titles). Mirrors the Web Builder's locale-switcher +
 * translation-map pattern, without the structural-lock machinery a page
 * editor needs, since there's nothing structural here to lock.
 */
const SiteTranslator = ({ rows, fetchUrl, saveUrl }: SiteTranslatorProps) => {
   const { props } = usePage<SharedData>();
   const activeLangs = (props.langs ?? []).filter((lang) => lang.is_active);
   const defaultLang =
      activeLangs.find((lang) => lang.is_default) ?? activeLangs[0];
   const otherLangs = activeLangs.filter(
      (lang) => lang.code !== defaultLang?.code,
   );

   const [locale, setLocale] = useState(otherLangs[0]?.code ?? '');
   const [translations, setTranslations] = useState<Record<string, string>>(
      {},
   );
   const [loading, setLoading] = useState(false);
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      if (!locale) {
         return;
      }

      setLoading(true);

      fetch(fetchUrl(locale), { headers: { Accept: 'application/json' } })
         .then((response) => response.json())
         .then((data) => {
            const flat: Record<string, string> = {};

            Object.entries(data.translations ?? {}).forEach(
               ([id, fields]) => {
                  Object.entries(fields as Record<string, string>).forEach(
                     ([field, value]) => {
                        flat[`${id}:${field}`] = value;
                     },
                  );
               },
            );

            setTranslations(flat);
         })
         .finally(() => setLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps -- fetchUrl is a stable route builder passed by the caller
   }, [locale]);

   if (otherLangs.length === 0) {
      return null;
   }

   const rowKey = (row: TranslatableRow) => `${row.id}:${row.field}`;
   const getValue = (row: TranslatableRow) => translations[rowKey(row)] ?? '';
   const setValue = (row: TranslatableRow, value: string) =>
      setTranslations((prev) => ({ ...prev, [rowKey(row)]: value }));

   const handleSave = () => {
      setSaving(true);

      const payload = rows.map((row) => ({
         translatable_id: row.id,
         field: row.field,
         value: getValue(row),
      }));

      router.put(
         saveUrl(locale),
         { translations: payload },
         { preserveScroll: true, onFinish: () => setSaving(false) },
      );
   };

   return (
      <div className="space-y-4">
         <div className="flex flex-wrap items-center justify-between gap-3">
            <Select value={locale} onValueChange={setLocale}>
               <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select language" />
               </SelectTrigger>
               <SelectContent>
                  {otherLangs.map((lang) => (
                     <SelectItem key={lang.code} value={lang.code}>
                        {lang.nativeName || lang.name}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>

            <Button onClick={handleSave} disabled={saving || loading}>
               {saving ? 'Saving...' : 'Save Translations'}
            </Button>
         </div>

         <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
            {rows.map((row) => (
               <div key={rowKey(row)} className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">
                     {row.label}
                  </Label>
                  <Input
                     value={getValue(row)}
                     placeholder={row.defaultValue}
                     onChange={(e) => setValue(row, e.target.value)}
                     disabled={loading}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default SiteTranslator;
