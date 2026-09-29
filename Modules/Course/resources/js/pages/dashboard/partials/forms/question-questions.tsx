import ActionsDropdown from '@/components/actions-dropdown';
import DataSortModal from '@/components/data-sort-modal';
import { Renderer } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { destroy, sort } from '@/routes/quiz-questions';
import { router, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

import QuestionForm from './question-form';

interface Props {
   title: string;
   handler: React.ReactNode;
   quiz: SectionQuiz;
   question?: QuizQuestion;
}

const QuestionQuestions = ({ title, handler, quiz, question }: Props) => {
   const [open, setOpen] = useState(false);
   const [questionType, setQuestionType] = useState(
      question ? 'add-question' : 'questions',
   );
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { button, dashboard, frontend } = translate;

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (!nextOpen) {
               setQuestionType(question ? 'add-question' : 'questions');
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <div className="space-y-7">
                  <div className="flex items-center gap-4">
                     <QuestionForm
                        quiz={quiz}
                        title={button.add_question}
                        question={question}
                        handler={
                           <Button
                              variant="ghost"
                              className="bg-muted hover:bg-muted-foreground/10"
                           >
                              {button.add_question}
                           </Button>
                        }
                     />

                     <DataSortModal
                        title={button.sort}
                        data={quiz.quiz_questions}
                        handler={
                           <Button
                              variant="ghost"
                              className="bg-muted hover:bg-muted-foreground/10"
                           >
                              {button.sort} Questions
                           </Button>
                        }
                        onOrderChange={(newOrder, setOpen) => {
                           router.post(
                              sort(),
                              {
                                 sortedData: newOrder,
                              },
                              {
                                 preserveScroll: true,
                                 onSuccess: () => setOpen?.(false),
                              },
                           );
                        }}
                        renderContent={(item) => (
                           <Card key={item.id} className="w-full px-4 py-3">
                              <Renderer value={item.title} />
                           </Card>
                        )}
                     />
                  </div>

                  <div className="space-y-2">
                     {quiz.quiz_questions.length > 0 ? (
                        quiz.quiz_questions.map((question: QuizQuestion) => (
                           <div
                              key={question.id}
                              className="group flex w-full items-center justify-between overflow-hidden rounded-md border border-border pr-4"
                           >
                              <Renderer value={question.title} />

                              <ActionsDropdown
                                 className="max-w-36"
                                 routes={[
                                    {
                                       label: 'Delete',
                                       method: 'delete',
                                       route: destroy.url(question.id),
                                       message:
                                          'Are you sure you want to delete this question?',
                                    },
                                 ]}
                                 component={
                                    <QuestionForm
                                       quiz={quiz}
                                       title={dashboard.edit_question}
                                       question={question}
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
                                 }
                              />
                           </div>
                        ))
                     ) : (
                        <div className="flex items-center justify-center">
                           <p className="text-sm text-muted-foreground">
                              {frontend.no_results}
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               <DialogFooter className="w-full justify-end space-x-2 pt-8">
                  <DialogClose asChild>
                     <Button type="button" variant="outline">
                        {button.close}
                     </Button>
                  </DialogClose>

                  <TabsList className="p-0">
                     <TabsTrigger
                        asChild
                        value="questions"
                        className={cn(
                           questionType === 'questions' ? 'hidden' : 'block',
                        )}
                     >
                        <Button>{button.back}</Button>
                     </TabsTrigger>
                  </TabsList>
               </DialogFooter>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default QuestionQuestions;
