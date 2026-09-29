import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlugin } from '@/hooks/use-plugin';
import { destroy as destroyFaq } from '@/routes/course-faqs';
import { destroy as destroyOutcome } from '@/routes/course-outcomes';
import { destroy as destroyRequirement } from '@/routes/course-requirements';
import { usePage, router } from '@inertiajs/react';
import { Bot, Pencil, Plus } from 'lucide-react';
import AiInlineEditModal from './ai-inline-edit-modal';
import FaqForm from './forms/faq-form';
import OutcomeForm from './forms/outcome-form';
import RequirementForm from './forms/requirement-form';

const Info = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { translate, course } = props;
   const { dashboard, button, frontend } = translate;
   const { faqs, requirements, outcomes } = course;
   const aiAssistantEnabled = usePlugin('AIAssistant');

   return (
      <Card className="p-0 sm:p-6">
         <Tabs defaultValue="faqs" className="w-full md:space-y-6">
            <TabsList className="h-10 w-full">
               <TabsTrigger value="faqs" className="h-8 w-full cursor-pointer">
                  {dashboard.course_faqs}
               </TabsTrigger>
               <TabsTrigger
                  value="requirements"
                  className="h-8 w-full cursor-pointer"
               >
                  {dashboard.requirements}
               </TabsTrigger>
               <TabsTrigger
                  value="outcomes"
                  className="h-8 w-full cursor-pointer"
               >
                  {dashboard.outcomes}
               </TabsTrigger>
            </TabsList>

            <TabsContent value="faqs" className="!m-0 space-y-6 p-4 md:p-0">
               <div className="flex items-center justify-between">
                  <h6 className="text-lg font-medium">
                     {dashboard.course_faqs}
                  </h6>
                  <FaqForm
                     courseId={course.id}
                     title={'Create Faq'}
                     handler={
                        <Button>
                           <Plus />
                           Add Faq
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
                                    label: button.remove || 'Remove',
                                    method: 'delete',
                                    route: destroyFaq.url(faq.id),
                                 },
                              ]}
                              component={
                                 <>
                                    <FaqForm
                                       faq={faq}
                                       courseId={course.id}
                                       title={'Edit Faq'}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             className="h-8 w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Pencil size={15} />
                                             <span>{button.edit}</span>
                                          </Button>
                                       }
                                    />
                                    {aiAssistantEnabled && (
                                       <AiInlineEditModal
                                          title="Edit FAQ with AI"
                                          description="Describe how to improve this question and answer."
                                          actionUrl={`/dashboard/courses/ai/${course.id}/faq/${faq.id}/edit`}
                                          onSuccess={() =>
                                             router.reload({
                                                preserveScroll: true,
                                             })
                                          }
                                          handler={
                                             <Button
                                                variant="ghost"
                                                className="h-8 w-full justify-start text-violet-700 hover:bg-violet-50 hover:text-violet-800 has-[svg]:!px-2 dark:text-violet-400 dark:hover:bg-violet-950/30"
                                             >
                                                <Bot size={15} />
                                                <span>AI Agent</span>
                                             </Button>
                                          }
                                       />
                                    )}
                                 </>
                              }
                           />
                        </div>
                     ))
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                           {frontend?.no_results || 'No FAQs added yet'}
                        </p>
                     </div>
                  )}
               </div>
            </TabsContent>

            <TabsContent
               value="requirements"
               className="!m-0 space-y-6 p-4 md:p-0"
            >
               <div className="flex items-center justify-between">
                  <h6 className="text-lg font-medium">
                     {dashboard.requirements}
                  </h6>
                  <RequirementForm
                     courseId={course.id}
                     title={'Create Requirement'}
                     handler={
                        <Button>
                           <Plus />
                           Add Requirement
                        </Button>
                     }
                  />
               </div>
               <div className="space-y-4">
                  {requirements?.length ? (
                     requirements.map((requirement) => (
                        <div
                           key={requirement.id}
                           className="flex items-center justify-between rounded-lg border px-4 py-2 transition-colors hover:bg-muted/50"
                        >
                           <p className="text-sm font-medium">
                              {requirement.requirement}
                           </p>
                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: button.remove || 'Remove',
                                    method: 'delete',
                                    route: destroyRequirement.url(
                                       requirement.id,
                                    ),
                                 },
                              ]}
                              component={
                                 <>
                                    <RequirementForm
                                       requirement={requirement}
                                       courseId={course.id}
                                       title={'Edit Requirement'}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             className="h-8 w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Pencil size={15} />
                                             <span>{button.edit}</span>
                                          </Button>
                                       }
                                    />
                                    {aiAssistantEnabled && (
                                       <AiInlineEditModal
                                          title="Edit Requirement with AI"
                                          description="Describe how to improve this prerequisite requirement."
                                          actionUrl={`/dashboard/courses/ai/${course.id}/requirement/${requirement.id}/edit`}
                                          onSuccess={() =>
                                             router.reload({
                                                preserveScroll: true,
                                             })
                                          }
                                          handler={
                                             <Button
                                                variant="ghost"
                                                className="h-8 w-full justify-start text-violet-700 hover:bg-violet-50 hover:text-violet-800 has-[svg]:!px-2 dark:text-violet-400 dark:hover:bg-violet-950/30"
                                             >
                                                <Bot size={15} />
                                                <span>AI Agent</span>
                                             </Button>
                                          }
                                       />
                                    )}
                                 </>
                              }
                           />
                        </div>
                     ))
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                           {frontend?.no_results || 'No requirements added yet'}
                        </p>
                     </div>
                  )}
               </div>
            </TabsContent>

            <TabsContent value="outcomes" className="!m-0 space-y-6 p-4 md:p-0">
               <div className="flex items-center justify-between">
                  <h6 className="text-lg font-medium">{dashboard.outcomes}</h6>
                  <OutcomeForm
                     courseId={course.id}
                     title={'Create Outcome'}
                     handler={
                        <Button>
                           <Plus />
                           Add Outcome
                        </Button>
                     }
                  />
               </div>
               <div className="space-y-4">
                  {outcomes?.length ? (
                     outcomes.map((outcome) => (
                        <div
                           key={outcome.id}
                           className="flex items-center justify-between rounded-lg border px-4 py-2 transition-colors hover:bg-muted/50"
                        >
                           <p className="text-sm font-medium">
                              {outcome.outcome}
                           </p>
                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: button.remove || 'Remove',
                                    method: 'delete',
                                    route: destroyOutcome.url(outcome.id),
                                 },
                              ]}
                              component={
                                 <>
                                    <OutcomeForm
                                       outcome={outcome}
                                       courseId={course.id}
                                       title={'Edit Outcome'}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             className="h-8 w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Pencil size={15} />
                                             <span>{button.edit}</span>
                                          </Button>
                                       }
                                    />
                                    {aiAssistantEnabled && (
                                       <AiInlineEditModal
                                          title="Edit Outcome with AI"
                                          description="Describe how to improve this learning outcome."
                                          actionUrl={`/dashboard/courses/ai/${course.id}/outcome/${outcome.id}/edit`}
                                          onSuccess={() =>
                                             router.reload({
                                                preserveScroll: true,
                                             })
                                          }
                                          handler={
                                             <Button
                                                variant="ghost"
                                                className="h-8 w-full justify-start text-violet-700 hover:bg-violet-50 hover:text-violet-800 has-[svg]:!px-2 dark:text-violet-400 dark:hover:bg-violet-950/30"
                                             >
                                                <Bot size={15} />
                                                <span>AI Agent</span>
                                             </Button>
                                          }
                                       />
                                    )}
                                 </>
                              }
                           />
                        </div>
                     ))
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                           {frontend?.no_results || 'No outcomes added yet'}
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
