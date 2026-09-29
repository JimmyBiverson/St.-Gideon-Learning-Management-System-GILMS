import Breadcrumbs from '@/components/breadcrumbs';
import DeleteModal from '@/components/inertia/delete-modal';
import Switch from '@/components/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import {
   defaultMethod as languageDefault,
   destroy as languageDestroy,
   edit as languageEdit,
   update as languageUpdate,
} from '@/routes/language';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import AddLanguage from '../components/add-language';

const Index = () => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, common } = translate;

   const languageStatus = (lang: Language, checked: boolean) => {
      router.put(
         languageUpdate(lang.id),
         { is_active: checked },
         {
            preserveScroll: true,
         },
      );
   };

   const defaultLanguage = (lang: Language) => {
      router.post(languageDefault(lang.id), {
         preserveScroll: true,
      });
   };

   return (
      <>
         <Breadcrumbs
            title={settings.language_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Languages' },
            ]}
            action={<AddLanguage />}
            className="mb-4"
         />

         <div className="mx-auto w-full max-w-[1000px] md:px-3">
            <Card className="space-y-6 p-6">
               <div className="rounded-md text-sm text-blue-700 dark:text-blue-400">
                  <div className="mb-2 font-medium">
                     Translation Scope Information
                  </div>
                  <ul className="list-disc space-y-1 pl-5">
                     <li>
                        Translations will be applied to dashboard interfaces
                        (admin, instructor, student).
                     </li>
                     <li>
                        Public pages are not affected by these translations as
                        they are fully customizable through the page editor.
                     </li>
                  </ul>
               </div>

               <div className="flex flex-col gap-5">
                  {props.langs.map((lang) =>
                     lang.is_default ? (
                        <div
                           key={lang.code}
                           className="mb-5 flex items-center justify-between rounded-md border border-border p-5"
                        >
                           <h6 className="text-xl">
                              {lang.name} ({lang.nativeName})
                           </h6>

                           <div className="flex items-center">
                              <span className="mr-4 rounded-full bg-blue-50 px-2 py-0.5 text-sm font-medium dark:bg-blue-950">
                                 {common.default}
                              </span>
                              <Link href={languageEdit(lang.code)}>
                                 <Button
                                    size="icon"
                                    variant="ghost"
                                    className="mr-3 rounded-full"
                                 >
                                    <Pencil />
                                 </Button>
                              </Link>
                              <Switch disabled checked name={lang.code} />
                           </div>
                        </div>
                     ) : (
                        <div
                           key={lang.code}
                           className="flex items-center justify-between rounded-md border border-border p-5"
                        >
                           <h6 className="text-xl">
                              {lang.name} ({lang.nativeName})
                           </h6>

                           <div className="flex items-center gap-3">
                              {lang.is_active ? (
                                 <Button
                                    onClick={() => defaultLanguage(lang)}
                                    size="sm"
                                    variant="secondary"
                                    className="rounded-full"
                                 >
                                    Set Default
                                 </Button>
                              ) : null}

                              <Link href={languageEdit(lang.code)}>
                                 <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-full"
                                 >
                                    <Pencil />
                                 </Button>
                              </Link>

                              <DeleteModal
                                 routePath={languageDestroy.url(
                                    Number(lang.id),
                                 )}
                                 actionComponent={
                                    <Button
                                       size="icon"
                                       variant="ghost"
                                       className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                       <Trash2 />
                                    </Button>
                                 }
                              />

                              <Switch
                                 name={lang.code}
                                 defaultChecked={lang.is_active}
                                 onCheckedChange={(checked) =>
                                    languageStatus(lang, checked)
                                 }
                                 className="cursor-pointer"
                              />
                           </div>
                        </div>
                     ),
                  )}
               </div>
            </Card>
         </div>
      </>
   );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
