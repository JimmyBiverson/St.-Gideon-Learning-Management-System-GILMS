import Breadcrumbs from '@/components/breadcrumbs';
import InputError from '@/components/input-error';
import JsonEditorModal from '@/components/json-editor-modal';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import {
   edit as editLanguage,
   index as languageIndex,
} from '@/routes/language';
import { update } from '@/routes/language/property';
import { useForm, usePage } from '@inertiajs/react';
import { FileJson, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface Props extends SharedData {
   property: LanguagesProperty;
}

const Properties = ({ property }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { button } = translate;
   const { data, setData, put, errors, processing } = useForm(
      property.properties,
   );
   const [tab, setTab] = useState('form');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(update.url(property.id));
   };

   const handleJsonSave = () => {
      put(update.url(property.id));
   };

   return (
      <>
         <Breadcrumbs
            title={property.name}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Languages', href: languageIndex.url() },
               {
                  title: 'Language Properties',
                  href: editLanguage.url(property.language.code),
               },
               { title: property.name },
            ]}
            action={
               <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                     tab === 'form' ? setTab('json') : setTab('form')
                  }
               >
                  {tab === 'form' ? (
                     <FileJson className="mr-2 h-4 w-4" />
                  ) : (
                     <X className="mr-2 h-4 w-4" />
                  )}
                  {tab === 'form' ? 'Update From JSON' : 'Update From Form'}
               </Button>
            }
            className="mb-4"
         />

         <div className="md:px-3">
            <Tabs value={tab} onValueChange={setTab}>
               <Card className="p-4 sm:p-6">
                  <TabsContent value="form">
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                           {Object.entries(data).map(([key, value]) => (
                              <div key={key}>
                                 <Label>{key}</Label>
                                 <Input
                                    name={key}
                                    value={
                                       data[key as keyof typeof data] as any
                                    }
                                    placeholder="Enter value"
                                    onChange={(e) => onHandleChange(e, setData)}
                                 />
                                 <InputError
                                    message={errors[key as keyof typeof errors]}
                                 />
                              </div>
                           ))}
                        </div>

                        <LoadingButton loading={processing}>
                           {button.save_changes}
                        </LoadingButton>
                     </form>
                  </TabsContent>

                  <TabsContent value="json">
                     <JsonEditorModal
                        tab={tab}
                        setTab={setTab}
                        data={data as any}
                        onChange={(changedData) => setData(changedData as any)}
                        onSave={handleJsonSave}
                     />
                  </TabsContent>
               </Card>
            </Tabs>
         </div>
      </>
   );
};

Properties.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Properties;
