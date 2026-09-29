import Breadcrumbs from '@/components/breadcrumbs';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { index as languageIndex } from '@/routes/language';
import { edit as languagePropertyEdit } from '@/routes/language/property';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props extends SharedData {
   language: Language;
}

const Update = ({ language }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, button } = translate;
   const groupedObjects = language.properties.reduce(
      (acc, property) => {
         if (!acc[property.group]) {
            acc[property.group] = [];
         }

         acc[property.group].push(property);

         return acc;
      },
      {} as Record<string, any[]>,
   );

   return (
      <div className="md:px-3">
         <Head title={settings.translation_update} />

         <Breadcrumbs
            title={settings.language_properties}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Languages', href: languageIndex.url() },
               { title: settings.language_properties },
            ]}
            className="mb-4"
         />

         <div className="space-y-4">
            <Accordion
               type="single"
               collapsible
               defaultValue="faq-0"
               className="w-full"
            >
               {Object.entries(groupedObjects).map(
                  ([group, properties], index) => (
                     <AccordionItem
                        key={`faq-${index}`}
                        value={`faq-${index}`}
                        className="mb-4 rounded-lg border border-border bg-background px-6 shadow-sm"
                     >
                        <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold capitalize hover:no-underline">
                           {group} {settings.elements}
                        </AccordionTrigger>
                        <AccordionContent className="grid grid-cols-1 gap-4 pt-0 pb-4 text-sm text-muted-foreground sm:grid-cols-2 md:grid-cols-4">
                           {properties.map((property) => (
                              <Link
                                 href={languagePropertyEdit(
                                    Number(property.id),
                                 )}
                              >
                                 <Card className="flex flex-row items-center justify-between border-2 p-4 !shadow-none hover:border-secondary-100 hover:text-secondary-foreground">
                                    <p className="font-medium">
                                       {property.name}
                                    </p>
                                    <ArrowRight size={16} />
                                 </Card>
                              </Link>
                           ))}
                        </AccordionContent>
                     </AccordionItem>
                  ),
               )}
            </Accordion>
         </div>
      </div>
   );
};

Update.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Update;
