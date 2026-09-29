import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { destroy as destroyFaq } from '@/routes/product-faqs';
import { destroy as destroySpecification } from '@/routes/product-specifications';
import { usePage } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import FaqForm from './forms/faq-form';
import SpecificationForm from './forms/specification-form';

const Info = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { product } = props;
   const { faqs, specifications } = product;

   return (
      <Card className="p-0 sm:p-6">
         <Tabs defaultValue="specifications" className="w-full md:space-y-6">
            <TabsList className="h-10 w-full">
               <TabsTrigger
                  value="specifications"
                  className="h-8 w-full cursor-pointer"
               >
                  Specifications
               </TabsTrigger>
               <TabsTrigger value="faqs" className="h-8 w-full cursor-pointer">
                  FAQs
               </TabsTrigger>
            </TabsList>

            <TabsContent
               value="specifications"
               className="!m-0 space-y-6 p-4 md:p-0"
            >
               <div className="flex items-center justify-between">
                  <h6 className="text-lg font-medium">Specifications</h6>
                  <SpecificationForm
                     productId={product.id}
                     title="Add Specification"
                     handler={
                        <Button>
                           <Plus />
                           Add Specification
                        </Button>
                     }
                  />
               </div>
               <div className="space-y-4">
                  {specifications?.length ? (
                     specifications.map((specification) => (
                        <div
                           key={specification.id}
                           className="flex items-center justify-between rounded-lg border px-4 py-2 transition-colors hover:bg-muted/50"
                        >
                           <p className="text-sm font-medium">
                              {specification.title}:{' '}
                              <span className="font-normal text-muted-foreground">
                                 {specification.value}
                              </span>
                           </p>
                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: 'Remove',
                                    method: 'delete',
                                    route: destroySpecification.url(
                                       specification.id,
                                    ),
                                 },
                              ]}
                              component={
                                 <SpecificationForm
                                    specification={specification}
                                    productId={product.id}
                                    title="Edit Specification"
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          <span>Edit</span>
                                       </Button>
                                    }
                                 />
                              }
                           />
                        </div>
                     ))
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                           No specifications added yet
                        </p>
                     </div>
                  )}
               </div>
            </TabsContent>

            <TabsContent value="faqs" className="!m-0 space-y-6 p-4 md:p-0">
               <div className="flex items-center justify-between">
                  <h6 className="text-lg font-medium">
                     Frequently Asked Questions
                  </h6>
                  <FaqForm
                     productId={product.id}
                     title="Add FAQ"
                     handler={
                        <Button>
                           <Plus />
                           Add FAQ
                        </Button>
                     }
                  />
               </div>
               <div className="space-y-4">
                  {faqs?.length ? (
                     faqs.map((faq) => (
                        <div
                           key={faq.id}
                           className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                           <div className="space-y-1">
                              <p className="text-sm font-medium">
                                 {faq.question}
                              </p>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                 {faq.answer}
                              </p>
                           </div>
                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: 'Remove',
                                    method: 'delete',
                                    route: destroyFaq.url(faq.id),
                                 },
                              ]}
                              component={
                                 <FaqForm
                                    faq={faq}
                                    productId={product.id}
                                    title="Edit FAQ"
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          <span>Edit</span>
                                       </Button>
                                    }
                                 />
                              }
                           />
                        </div>
                     ))
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                           No FAQs added yet
                        </p>
                     </div>
                  )}
               </div>
            </TabsContent>
         </Tabs>
      </Card>
   );
};

export default Info;
