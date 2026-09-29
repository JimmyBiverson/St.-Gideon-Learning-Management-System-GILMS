import ActionsDropdown from '@/components/actions-dropdown';
import DataSortModal from '@/components/data-sort-modal';
import DeleteByInertia from '@/components/inertia/delete-modal';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { usePlugin } from '@/hooks/use-plugin';
import {
   deleteMethod as deleteLesson,
   sort as sortLessons,
} from '@/routes/lesson';
import { destroy as deleteQuiz } from '@/routes/quiz';
import {
   deleteMethod as deleteSection,
   sort as sortSections,
} from '@/routes/section';
import { router, usePage } from '@inertiajs/react';
import {
   Bot,
   ChevronDown,
   FolderOpen,
   ListOrdered,
   Pencil,
   Plus,
   ArrowDownUp,
   Trash2,
} from 'lucide-react';
import AiInlineEditModal from './ai-inline-edit-modal';
import LessonForm from './forms/lesson-form';
import QuestionQuestions from './forms/question-questions';
import QuizForm from './forms/quiz-form';
import SectionForm from './forms/section-form';
import ResourceModal from './resource-modal';

const Curriculum = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { button, dashboard } = translate;
   const aiAssistantEnabled = usePlugin('AIAssistant');

   return (
      <Card className="p-4 sm:p-6">
         <div className="flex flex-wrap items-center justify-end gap-4">
            <SectionForm
               title={button.add_section}
               handler={
                  <Button
                     variant="ghost"
                     className="bg-muted hover:bg-muted-foreground/10"
                  >
                     {button.add_section}
                  </Button>
               }
            />

            <DataSortModal
               title={button.sort}
               data={props.course.sections}
               handler={
                  <Button
                     variant="ghost"
                     className="bg-muted hover:bg-muted-foreground/10"
                  >
                     {button.sort_section}
                  </Button>
               }
               onOrderChange={(newOrder) => {
                  router.post(
                     sortSections(),
                     {
                        sortedData: newOrder,
                     },
                     { preserveScroll: true },
                  );
               }}
               renderContent={(item) => (
                  <Card className="w-full px-4 py-3">
                     <p>{item.title}</p>
                  </Card>
               )}
            />
         </div>

         <Separator className="my-5" />

         <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue={props.course.sections[0]?.id.toString() ?? ''}
         >
            {props.course.sections.map((section, index) => (
               <AccordionItem
                  key={section.id}
                  value={section.id.toString()}
                  className="w-full overflow-hidden rounded-lg border"
               >
                  <AccordionTrigger className="px-4 py-3 text-base hover:no-underline [&>svg]:hidden [&[data-state=open]]:bg-muted">
                     <div className="flex w-full items-center justify-between">
                        <span>
                           {index + 1}. {section.title}
                        </span>

                        <div onClick={(e) => e.stopPropagation()}>
                           <Popover>
                              <PopoverTrigger>
                                 <Button
                                    variant="ghost"
                                    className="bg-muted px-2.5 hover:bg-muted-foreground/10"
                                 >
                                    <span>Section Menu</span>
                                    <ChevronDown className="h-4 w-4" />
                                 </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                 align="end"
                                 className="flex w-[160px] flex-col space-y-1 p-2"
                              >
                                 <LessonForm
                                    title={button.add_lesson}
                                    sectionId={section.id}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start bg-muted hover:bg-muted-foreground/10 has-[svg]:!px-2"
                                       >
                                          <Plus size={15} />
                                          <span>{button.add_lesson}</span>
                                       </Button>
                                    }
                                 />

                                 <DataSortModal
                                    title={dashboard.sort_items}
                                    data={section.section_lessons}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start bg-muted hover:bg-muted-foreground/10 has-[svg]:!px-2"
                                       >
                                          <ArrowDownUp size={15} />
                                          <span>Sort Lessons</span>
                                       </Button>
                                    }
                                    onOrderChange={(newOrder) => {
                                       router.post(
                                          sortLessons(),
                                          {
                                             sortedData: newOrder,
                                          },
                                          { preserveScroll: true },
                                       );
                                    }}
                                    renderContent={(lesson) => (
                                       <Card className="w-full px-4 py-3">
                                          <p>{lesson.title}</p>
                                       </Card>
                                    )}
                                 />

                                 <QuizForm
                                    title={button.add_quiz}
                                    sectionId={section.id}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start bg-muted hover:bg-muted-foreground/10 has-[svg]:!px-2"
                                       >
                                          <Plus size={15} />
                                          <span>{button.add_quiz}</span>
                                       </Button>
                                    }
                                 />

                                 {section.section_lessons.length > 0 &&
                                    aiAssistantEnabled && (
                                       <AiInlineEditModal
                                          title="Generate quiz with AI"
                                          description="Choose how many single-choice, multiple-choice, and true/false questions to generate, then describe focus and difficulty. Questions are generated only from this section’s lesson titles, summaries, and descriptions."
                                          actionUrl={`/dashboard/courses/${props.course.id}/sections/${section.id}/ai/quiz`}
                                          questionCountFields
                                          countLabels={{
                                             single: dashboard.single_choice,
                                             multiple:
                                                dashboard.multiple_choice,
                                             boolean: dashboard.true_false,
                                          }}
                                          submitButtonLabel="Generate with AI"
                                          promptLabel="Additional instructions"
                                          promptPlaceholder="e.g. Emphasize practical examples and keep difficulty beginner-friendly…"
                                          onSuccess={() =>
                                             router.reload({
                                                preserveScroll: true,
                                             })
                                          }
                                          handler={
                                             <Button
                                                variant="ghost"
                                                className="h-8 w-full justify-start gap-2 bg-muted text-violet-700 hover:bg-muted-foreground/10 has-[svg]:!px-2 dark:text-violet-400"
                                             >
                                                <Bot size={15} />
                                                <span>Quiz with AI</span>
                                             </Button>
                                          }
                                       />
                                    )}

                                 <SectionForm
                                    title={dashboard.update_section}
                                    section={section}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start bg-muted hover:bg-muted-foreground/10 has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          <span>
                                             {dashboard.update_section}
                                          </span>
                                       </Button>
                                    }
                                 />

                                 {aiAssistantEnabled && (
                                    <AiInlineEditModal
                                       title="Edit Section with AI"
                                       description="Describe how you want to change this section title."
                                       actionUrl={`/dashboard/courses/ai/${props.course.id}/section/${section.id}/edit`}
                                       onSuccess={() =>
                                          router.reload({
                                             preserveScroll: true,
                                          })
                                       }
                                       handler={
                                          <Button
                                             variant="ghost"
                                             className="h-8 w-full justify-start gap-2 bg-muted text-violet-700 hover:bg-muted-foreground/10 has-[svg]:!px-2 dark:text-violet-400"
                                          >
                                             <Bot size={15} />
                                             <span>Update with AI</span>
                                          </Button>
                                       }
                                    />
                                 )}

                                 <DeleteByInertia
                                    routePath={deleteSection.url(
                                       Number(section.id),
                                    )}
                                    actionComponent={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start bg-destructive/8 text-destructive hover:bg-destructive/6 hover:text-destructive has-[svg]:!px-2"
                                       >
                                          <Trash2 size={15} />
                                          <span>{button.delete_section}</span>
                                       </Button>
                                    }
                                 />
                              </PopoverContent>
                           </Popover>
                        </div>
                     </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-4 p-4">
                     {section.section_lessons.length > 0 ? (
                        section.section_lessons.map((lesson: SectionLesson) => (
                           <div
                              key={lesson.id}
                              className="group flex w-full items-center justify-between rounded-md border border-border px-4 py-3"
                           >
                              <p>{lesson.title}</p>

                              <ActionsDropdown
                                 className="max-w-36"
                                 routes={[
                                    {
                                       label: 'Delete',
                                       method: 'delete',
                                       route: deleteLesson.url(
                                          Number(lesson.id),
                                       ),
                                       message: `Are you sure you want to delete the lesson "${lesson.title}"?`,
                                    },
                                 ]}
                                 component={
                                    <>
                                       <ResourceModal
                                          lesson={lesson}
                                          title="Lesson Resources"
                                          handler={
                                             <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start has-[svg]:!px-2"
                                             >
                                                <FolderOpen size={15} />
                                                <span>Resource</span>
                                             </Button>
                                          }
                                       />

                                       <LessonForm
                                          lesson={lesson}
                                          sectionId={section.id}
                                          title={dashboard.update_lesson}
                                          handler={
                                             <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start has-[svg]:!px-2"
                                             >
                                                <Pencil size={15} />
                                                <span>Edit</span>
                                             </Button>
                                          }
                                       />
                                    </>
                                 }
                              />
                           </div>
                        ))
                     ) : (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                           No lessons found in this section.
                        </div>
                     )}

                     {section.section_quizzes.map((quiz: SectionQuiz) => (
                        <div
                           key={quiz.id}
                           className="group flex w-full items-center justify-between rounded-md border border-border px-4 py-3"
                        >
                           <p>{quiz.title}</p>

                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: 'Delete',
                                    method: 'delete',
                                    route: deleteQuiz.url(quiz.id),
                                    message: `Are you sure you want to delete the quiz "${quiz.title}"?`,
                                 },
                              ]}
                              component={
                                 <>
                                    <QuestionQuestions
                                       quiz={quiz}
                                       title={button.quiz_questions}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <ListOrdered size={15} />
                                             <span>Questions</span>
                                          </Button>
                                       }
                                    />

                                    {aiAssistantEnabled && (
                                       <AiInlineEditModal
                                          title="Update quiz with AI"
                                          description="Describe what to change: add questions, rewrite wording, adjust marks, or remove questions. Only your instruction is required."
                                          actionUrl={`/dashboard/courses/${props.course.id}/sections/${section.id}/quizzes/${quiz.id}/ai`}
                                          promptLabel="Instructions"
                                          promptPlaceholder="e.g. Add two more true/false questions on variables, and fix typos in question 1…"
                                          submitButtonLabel="Update with AI"
                                          onSuccess={() =>
                                             router.reload({
                                                preserveScroll: true,
                                             })
                                          }
                                          handler={
                                             <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-violet-700 hover:text-violet-700 has-[svg]:!px-2 dark:text-violet-400 dark:hover:text-violet-400"
                                                type="button"
                                             >
                                                <Bot size={15} />
                                                <span>AI Edit</span>
                                             </Button>
                                          }
                                       />
                                    )}

                                    <QuizForm
                                       quiz={quiz}
                                       title={dashboard.update_quiz}
                                       sectionId={section.id}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Pencil size={15} />
                                             <span>Edit</span>
                                          </Button>
                                       }
                                    />
                                 </>
                              }
                           />
                        </div>
                     ))}
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </Card>
   );
};

export default Curriculum;
