import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Main from '@/layouts/main';
import { editor as editorRoute } from '@/routes/frontend-pages';
import { update as updateTranslations } from '@/routes/frontend-pages/translations';
import { walkTranslatableElements } from '@/frontend/lib/translatable-fields';

interface TranslatePageProps extends SharedData {
   project: { id: number; name: string };
   page: ProjectPage;
   locale: string;
   translations: Record<string, Record<string, string>>;
}

export default function Translate() {
   const { props } = usePage<TranslatePageProps>();
   const { project, page, locale, translations: initialTranslations } = props;

   const rows = useMemo(
      () => walkTranslatableElements(JSON.parse(page.content || '[]')),
      [page.content],
   );

   const [edits, setEdits] = useState(initialTranslations);
   const [search, setSearch] = useState('');
   const [untranslatedOnly, setUntranslatedOnly] = useState(false);
   const [saving, setSaving] = useState(false);

   const getValue = (elementId: string, field: string) =>
      edits[elementId]?.[field] ?? '';

   const setValue = (elementId: string, field: string, value: string) => {
      setEdits((prev) => ({
         ...prev,
         [elementId]: { ...prev[elementId], [field]: value },
      }));
   };

   const translatedCount = rows.filter((row) =>
      getValue(row.elementId, row.field),
   ).length;

   const filteredRows = rows.filter((row) => {
      if (untranslatedOnly && getValue(row.elementId, row.field)) {
         return false;
      }

      if (!search.trim()) {
         return true;
      }

      const term = search.toLowerCase();

      return (
         row.defaultValue.toLowerCase().includes(term) ||
         getValue(row.elementId, row.field).toLowerCase().includes(term)
      );
   });

   const handleSave = () => {
      setSaving(true);

      const payload = rows.map((row) => ({
         element_id: row.elementId,
         field: row.field,
         value: getValue(row.elementId, row.field),
      }));

      router.put(
         updateTranslations({ project: project.id, page: page.id, locale }),
         { translations: payload },
         {
            preserveScroll: true,
            onSuccess: () => setSaving(false),
            onError: () => {
               toast.error('Oops!', {
                  description: 'Could not save translations',
               });
               setSaving(false);
            },
         },
      );
   };

   return (
      <Main>
         <Head title={`Translate ${page.title}`} />

         <div className="mx-auto max-w-5xl space-y-6 p-6">
            <div className="flex items-center justify-between">
               <div>
                  <Link
                     href={editorRoute({ project: project.id, page: page.id })}
                     className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                     <ArrowLeft className="h-4 w-4" />
                     Back to editor
                  </Link>
                  <h1 className="text-2xl font-semibold">
                     Translate &ldquo;{page.title}&rdquo;
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     Locale: <span className="font-medium">{locale}</span>
                  </p>
               </div>

               <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save All'}
               </Button>
            </div>

            <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                  <span>
                     {translatedCount} / {rows.length} translated
                  </span>
               </div>
               <Progress
                  value={rows.length ? (translatedCount / rows.length) * 100 : 0}
               />
            </div>

            <div className="flex items-center gap-4">
               <Input
                  placeholder="Search strings..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
               />

               <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                     checked={untranslatedOnly}
                     onCheckedChange={(checked) =>
                        setUntranslatedOnly(checked === true)
                     }
                  />
                  Untranslated only
               </label>
            </div>

            <Table className="border-y border-border">
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[35%]">Source</TableHead>
                     <TableHead className="w-[45%]">Translation</TableHead>
                     <TableHead>Element</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {filteredRows.length ? (
                     filteredRows.map((row) => (
                        <TableRow key={`${row.elementId}-${row.field}`}>
                           <TableCell className="align-top text-muted-foreground">
                              {row.defaultValue}
                           </TableCell>
                           <TableCell className="align-top">
                              <Input
                                 value={getValue(row.elementId, row.field)}
                                 placeholder={row.defaultValue}
                                 onChange={(e) =>
                                    setValue(
                                       row.elementId,
                                       row.field,
                                       e.target.value,
                                    )
                                 }
                              />
                           </TableCell>
                           <TableCell className="align-top text-xs text-muted-foreground">
                              {row.elementName} ({row.field})
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                           No strings found.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
      </Main>
   );
}
