import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import DeleteModal from '@/components/inertia/delete-modal';
import { Renderer } from '@/components/rich-editor';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { destroy } from '@/routes/newsletters';

import NewsletterForm from './partials/newsletter-form';
import NewsletterSend from './partials/newsletter-send';

const Index = ({
   newsletters,
   translate,
}: {
   newsletters: Pagination<Newsletter>;
   translate: LanguageTranslations;
}) => {
   const { dashboard, button } = translate;

   return (
      <>
         <Breadcrumbs
            title="Newsletters"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Newsletters' },
            ]}
            action={
               <NewsletterForm
                  translate={translate}
                  title={button.add_newsletter}
                  handler={
                     <Button className="h-9 px-4">
                        <Plus />
                        <span>{button.add_newsletter}</span>
                     </Button>
                  }
               />
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={newsletters}
               title={dashboard.newsletter_list}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="newsletters.index"
            />

            <Accordion type="single" collapsible className="space-y-4 p-6 pt-0">
               {newsletters.data.length > 0 ? (
                  newsletters.data.map((newsletter, index) => (
                     <AccordionItem
                        key={newsletter.id}
                        value={newsletter.id.toString()}
                        className="w-full overflow-hidden rounded-lg border"
                     >
                        <AccordionTrigger className="px-4 py-3 text-base hover:no-underline [&[data-state=open]]:!bg-muted">
                           <div className="flex w-full items-center justify-between">
                              <span>
                                 {newsletters.total - index}.{' '}
                                 {newsletter.subject}
                              </span>

                              <div
                                 className="flex items-center gap-2"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 <NewsletterSend id={newsletter.id} />

                                 <NewsletterForm
                                    translate={translate}
                                    title={button.update_newsletter}
                                    newsletter={newsletter}
                                    handler={
                                       <Button
                                          size="icon"
                                          variant="ghost"
                                          className="rounded-full"
                                       >
                                          <Pencil />
                                       </Button>
                                    }
                                 />

                                 <DeleteModal
                                    routePath={destroy.url({
                                       newsletter: Number(newsletter.id),
                                    })}
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
                              </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2 p-4">
                           <Renderer value={newsletter.description} />
                        </AccordionContent>
                     </AccordionItem>
                  ))
               ) : (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                     {dashboard.no_newsletters_found}
                  </p>
               )}
            </Accordion>

            <TableFooter
               className="mt-1 border-none p-5 pt-0 sm:p-6 md:pt-0"
               routeName="newsletters.index"
               paginationInfo={newsletters}
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
