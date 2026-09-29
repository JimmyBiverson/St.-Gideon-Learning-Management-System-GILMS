import { usePage } from '@inertiajs/react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { getCompletedContents } from '@/lib/utils';
import QuizStatus from '../partials/quiz-status';

const Quizzes = () => {
   const { props } = usePage<StudentCourseProps>();
   const { quizzes, watchHistory } = props;
   const completed = getCompletedContents(watchHistory);

   return (
      <>
         {quizzes.length > 0 ? (
            <Accordion
               type="single"
               collapsible
               className="space-y-4"
               defaultValue={quizzes[0].id.toString()}
            >
               {quizzes.map((section, ind) => {
                  return (
                     <AccordionItem
                        key={section.id}
                        value={section.id.toString()}
                        className="overflow-hidden rounded-lg border"
                     >
                        <AccordionTrigger className="px-4 py-3 text-base hover:no-underline [&[data-state=open]]:!bg-muted">
                           {ind + 1}. {section.title}
                        </AccordionTrigger>

                        <AccordionContent className="space-y-2 p-2">
                           {section.section_quizzes.length > 0 ? (
                              section.section_quizzes.map((quiz) => (
                                 <QuizStatus
                                    key={quiz.id}
                                    quiz={quiz}
                                    completed={completed}
                                 />
                              ))
                           ) : (
                              <div className="px-4 py-3 text-center">
                                 <p>There is no quiz added</p>
                              </div>
                           )}
                        </AccordionContent>
                     </AccordionItem>
                  );
               })}
            </Accordion>
         ) : (
            <div className="p-6 text-center">
               <p>There is no quiz added</p>
            </div>
         )}
      </>
   );
};

export default Quizzes;
