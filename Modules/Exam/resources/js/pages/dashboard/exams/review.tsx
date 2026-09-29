import Breadcrumbs from '@/components/breadcrumbs';
import { Renderer } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/layout';
import { grade } from '@/routes/exam-attempts';
import { index as attemptsIndex } from '@/routes/exam-attempts';
import { index as examsIndex } from '@/routes/exams';
import { index as studentIndex } from '@/routes/student';
import { Link, router } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import QuestionAnswerResult from '@/exam/pages/components/question-answer-result';
import QuestionStatusBadge from '@/exam/pages/components/question-status-badge';
import QuestionStatusIcon from '@/exam/pages/components/question-status-icon';
import QuestionTypeBadge from '@/exam/pages/components/question-type-badge';

interface AttemptAnswerWithQuestion extends ExamAttemptAnswer {
   exam_question: ExamQuestion;
}

const Review = ({
   exam_id,
   attempt,
}: {
   exam_id: number;
   attempt: ExamAttempt;
}) => {
   const [manualGrades, setManualGrades] = useState<Record<number, number>>({});
   const [submitting, setSubmitting] = useState(false);
   const answers = attempt.attempt_answers ?? [];

   const safeQuestion = (answer: AttemptAnswerWithQuestion) =>
      answer.exam_question ?? ({} as ExamQuestion);

   const handleManualGradeChange = (questionId: number, value: string) => {
      const numValue = parseFloat(value) || 0;
      setManualGrades((prev) => ({
         ...prev,
         [questionId]: numValue,
      }));
   };

   const handleSubmitGrades = () => {
      setSubmitting(true);
      router.post(
         grade(attempt.id),
         {
            manual_grades: manualGrades,
         },
         {
            preserveScroll: true,
            onSuccess: () => {
               setSubmitting(false);
               setManualGrades({});
            },
            onError: () => {
               setSubmitting(false);
            },
         },
      );
   };

   const needsManualGrading = answers.some((answer) => {
      const question = safeQuestion(answer);

      return (
         question.question_type === 'listening' ||
         question.question_type === 'short_answer'
      );
   });

   if (!attempt) {
      return (
         <div className="flex h-full items-center justify-center p-10">
            <div className="text-center">
               <h1 className="text-2xl font-semibold text-gray-800">
                  Attempt data unavailable
               </h1>
               <p className="mt-2 text-sm text-muted-foreground">
                  Please return to the exam list and try again.
               </p>
               <div className="mt-4">
                  <Link href={studentIndex('exams')}>
                     <Button variant="outline">Back to My Exams</Button>
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   return (
      <>
         <Breadcrumbs
            title="Attempts"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exams', href: examsIndex.url() },
               { title: 'Attempts', href: attemptsIndex.url(exam_id) },
               { title: 'Attempt Review' },
            ]}
            className="mb-4"
         />

         {/* Question-wise Analysis */}
         <Card className="space-y-6 py-4 md:py-6">
            <CardContent className="space-y-6 px-4 md:px-6">
               {answers.length > 0 ? (
                  answers.map((answer, index) => {
                     const question = safeQuestion(answer);
                     const questionId = question.id as number;

                     return (
                        <div
                           key={answer.id ?? index}
                           className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white"
                        >
                           {/* Question Header */}
                           <div className="border-b border-gray-200 bg-gray-50 p-4">
                              <div className="flex items-start justify-between gap-4">
                                 <div className="mb-2 flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                       <QuestionStatusIcon answer={answer} />

                                       <span className="text-xl font-semibold">
                                          Question {index + 1}
                                       </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                       {question.question_type && (
                                          <QuestionTypeBadge
                                             type={
                                                question.question_type as ExamQuestionType
                                             }
                                          />
                                       )}
                                       <QuestionStatusBadge answer={answer} />
                                    </div>
                                 </div>

                                 <div className="flex-shrink-0 text-right">
                                    <p className="text-lg font-bold">
                                       {answer.marks_obtained || 0}/
                                       {question.marks || 0}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       marks
                                    </p>
                                 </div>
                              </div>

                              <p className="text-sm font-medium text-gray-700">
                                 {question.title}
                              </p>
                           </div>

                           {/* Question Content */}
                           {question.description && (
                              <Renderer
                                 value={question.description}
                                 className="p-0"
                              />
                           )}

                           <div className="p-4">
                              {/* Render Question with Answer */}
                              <div className="mb-4">
                                 <QuestionAnswerResult
                                    answer={answer}
                                    question={question}
                                 />
                              </div>

                              {/* Manual Grading Section for listening and short_answer */}
                              {(question.question_type === 'listening' ||
                                 question.question_type === 'short_answer') && (
                                 <div className="mt-4 rounded-lg border-t border-gray-200 bg-yellow-50 p-4 pt-4">
                                    <Label
                                       htmlFor={`grade-${questionId}`}
                                       className="text-sm font-semibold text-gray-700"
                                    >
                                       Assign Marks (Max: {question.marks || 0})
                                    </Label>
                                    <Input
                                       id={`grade-${questionId}`}
                                       type="number"
                                       min="0"
                                       max={question.marks || 0}
                                       step="0.5"
                                       placeholder="Enter marks"
                                       value={
                                          manualGrades[questionId] ??
                                          answer.marks_obtained ??
                                          ''
                                       }
                                       onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>,
                                       ) =>
                                          handleManualGradeChange(
                                             questionId,
                                             e.target.value,
                                          )
                                       }
                                       className="mt-1 w-full"
                                    />

                                    {answer.is_correct === null && (
                                       <p className="mt-2 flex items-center gap-1 text-xs text-yellow-700">
                                          <Clock className="h-3 w-3" />
                                          This question requires manual grading
                                       </p>
                                    )}
                                 </div>
                              )}
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                     <p className="text-lg font-medium text-gray-900">
                        No answers to review
                     </p>
                     <p className="mt-1 text-sm text-gray-500">
                        {attempt.status === 'in_progress'
                           ? 'This exam attempt is still in progress.'
                           : 'No answers were submitted for this attempt.'}
                     </p>
                  </div>
               )}

               {/* Submit Grades Button */}
               {needsManualGrading && (
                  <Button
                     onClick={handleSubmitGrades}
                     disabled={
                        submitting || Object.keys(manualGrades).length === 0
                     }
                  >
                     {submitting ? 'Submitting...' : 'Submit Grades'}
                  </Button>
               )}
            </CardContent>
         </Card>
      </>
   );
};

Review.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default Review;
