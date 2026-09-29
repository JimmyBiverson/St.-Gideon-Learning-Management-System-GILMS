import LoadingButton from '@/components/loading-button';
import { Renderer } from '@/components/rich-editor';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { store as quizSubmissionStore } from '@/routes/quiz-submissions';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

import LessonControl from './lesson-control';

type QuizAnswer = {
   question_id: string;
   answer: string[];
};

interface QuizViewerProps {
   quiz: SectionQuiz;
}

const QuizViewer = ({ quiz }: QuizViewerProps) => {
   const { auth, translate } = usePage<CoursePlayerProps>().props;
   const { frontend } = translate;
   const [finished, setFinished] = useState(false);
   const [currentTab, setCurrentTab] = useState('summary');
   const { data, setData } = useForm({ answers: [] as QuizAnswer[] });
   const submissions = quiz.quiz_submissions;

   const handleCheckboxChange = (
      questionId: string,
      option: string,
      checked: boolean,
   ) => {
      if (checked) {
         const existingAnswer = data.answers.find(
            (ans) => ans.question_id === questionId,
         );

         if (existingAnswer) {
            setData(
               'answers',
               data.answers.map((ans) =>
                  ans.question_id === questionId
                     ? { ...ans, answer: [...ans.answer, option] }
                     : ans,
               ),
            );
         } else {
            setData('answers', [
               ...data.answers,
               { question_id: questionId, answer: [option] },
            ]);
         }
      } else {
         setData(
            'answers',
            data.answers
               .map((ans) =>
                  ans.question_id === questionId
                     ? {
                          ...ans,
                          answer: ans.answer.filter((a) => a !== option),
                       }
                     : ans,
               )
               .filter((ans) => ans.answer.length > 0),
         );
      }
   };

   const handleRadioChange = (questionId: string, value: string) => {
      const existingAnswerIndex = data.answers.findIndex(
         (ans) => ans.question_id === questionId,
      );

      if (existingAnswerIndex >= 0) {
         setData(
            'answers',
            data.answers.map((ans, index) =>
               index === existingAnswerIndex
                  ? { ...ans, answer: [value] }
                  : ans,
            ),
         );
      } else {
         setData('answers', [
            ...data.answers,
            { question_id: questionId, answer: [value] },
         ]);
      }
   };

   const quizBack = (index: number) => {
      const previousQuestion = index - 1;

      if (previousQuestion < 0) {
         setCurrentTab('summary');
      } else {
         setCurrentTab(quiz.quiz_questions[previousQuestion].id.toString());
      }

      setFinished(false);
   };

   const quizNext = (index: number) => {
      const totalQuestions = quiz.quiz_questions.length;
      const currentQuestion = index + 1;

      if (currentQuestion === totalQuestions) {
         setFinished(true);
      } else {
         setCurrentTab(quiz.quiz_questions[currentQuestion].id.toString());
      }
   };

   const hasAnswerForCurrentQuestion = (questionId: string) => {
      return data.answers.some(
         (ans) => ans.question_id === questionId && ans.answer.length > 0,
      );
   };

   const startQuiz = () => {
      setData('answers', []);
      setFinished(false);
      setCurrentTab(quiz.quiz_questions[0].id.toString());
   };

   return (
      <Card className="group relative h-full min-h-[80vh] w-full overflow-hidden rounded-lg">
         <LessonControl className="opacity-0 transition-all duration-300 group-hover:opacity-100" />

         <p className="p-6 text-center text-lg font-bold">{quiz.title}</p>

         <Separator />

         <Form
            {...quizSubmissionStore.form()}
            transform={(formData) => ({
               ...formData,
               submission_id: submissions.length > 0 ? submissions[0].id : null,
               section_quiz_id: quiz.id,
               user_id: auth.user.id,
               answers: data.answers,
            })}
            onSuccess={() => {
               setData('answers', []);
               setFinished(false);
               setCurrentTab('summary');
            }}
         >
            {({ processing }) => (
               <Tabs
                  value={currentTab}
                  onValueChange={setCurrentTab}
                  className="w-full p-6 md:px-12"
               >
                  <TabsContent value="summary">
                     <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <div className="space-y-2">
                           <p>{frontend.summery}</p>

                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.duration}
                              </p>
                              <p>
                                 :
                                 {` ${quiz.hours} ${frontend.hours} ${quiz.minutes} ${frontend.minutes} ${quiz.seconds} ${frontend.seconds}`}
                              </p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.total_questions}
                              </p>
                              <p>: {quiz.quiz_questions.length}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.total_marks}
                              </p>
                              <p>: {quiz.total_mark}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.pass_marks}
                              </p>
                              <p>: {quiz.pass_mark}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">{frontend.retake}</p>
                              <p>: {quiz.retake}</p>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <p>{frontend.result}</p>

                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.retake_attempts}
                              </p>
                              <p>: {submissions[0]?.attempts || 0}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.correct_answers}
                              </p>
                              <p>: {submissions[0]?.correct_answers || 0}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.incorrect_answers}
                              </p>
                              <p>: {submissions[0]?.incorrect_answers || 0}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">
                                 {frontend.total_marks}
                              </p>
                              <p>: {submissions[0]?.total_marks || 0}</p>
                           </div>
                           <div className="flex gap-2 text-sm">
                              <p className="text-gray-500">Status</p>
                              <p>
                                 :{' '}
                                 {submissions[0]?.is_passed
                                    ? frontend.passed
                                    : frontend.not_passed}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-6 flex justify-center p-6">
                        {submissions[0]?.attempts >= quiz.retake ? (
                           <Button type="button" size="lg">
                              {frontend.quiz_submitted}
                           </Button>
                        ) : (
                           <Button size="lg" type="button" onClick={startQuiz}>
                              {submissions[0]
                                 ? frontend.retake_quiz
                                 : frontend.start_quiz}
                           </Button>
                        )}
                     </div>
                  </TabsContent>

                  {quiz.quiz_questions.map((question, index) => {
                     // Parse the options and answers if they're strings
                     const options = question?.options
                        ? typeof question.options === 'string'
                           ? JSON.parse(question.options)
                           : question.options
                        : [];

                     return (
                        <TabsContent
                           value={question.id.toString()}
                           className="space-y-6"
                        >
                           <Renderer value={question.title} />

                           {question.type === 'boolean' ? (
                              <RadioGroup
                                 className="space-y-2"
                                 defaultValue={
                                    data.answers.find(
                                       (ans) =>
                                          ans.question_id ===
                                          question.id.toString(),
                                    )?.answer[0] || undefined
                                 }
                                 onValueChange={(value) =>
                                    handleRadioChange(
                                       question.id.toString(),
                                       value,
                                    )
                                 }
                              >
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       className="cursor-pointer"
                                       id="True"
                                       value="True"
                                    />
                                    <Label
                                       htmlFor="True"
                                       className="mb-0 capitalize"
                                    >
                                       {frontend.true}
                                    </Label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                       className="cursor-pointer"
                                       id="False"
                                       value="False"
                                    />
                                    <Label
                                       htmlFor="False"
                                       className="mb-0 capitalize"
                                    >
                                       {frontend.false}
                                    </Label>
                                 </div>
                              </RadioGroup>
                           ) : (
                              <div className="space-y-4">
                                 {options.map((option: string) => (
                                    <div
                                       key={option}
                                       className="flex items-center gap-2"
                                    >
                                       <Checkbox
                                          id={option}
                                          checked={data.answers.some(
                                             (ans) =>
                                                ans.question_id ===
                                                   question.id.toString() &&
                                                ans.answer.includes(option),
                                          )}
                                          onCheckedChange={(checked) =>
                                             handleCheckboxChange(
                                                question.id.toString(),
                                                option,
                                                checked as boolean,
                                             )
                                          }
                                       />
                                       <Label
                                          htmlFor={option}
                                          className="mb-0 capitalize"
                                       >
                                          {option}
                                       </Label>
                                    </div>
                                 ))}
                              </div>
                           )}

                           <div className="flex justify-center gap-2 p-6">
                              <Button
                                 type="button"
                                 onClick={() => quizBack(index)}
                              >
                                 Back
                              </Button>

                              {finished ? (
                                 <LoadingButton loading={processing}>
                                    Finish
                                 </LoadingButton>
                              ) : (
                                 <Button
                                    type="button"
                                    onClick={() => quizNext(index)}
                                    disabled={
                                       !hasAnswerForCurrentQuestion(
                                          question.id.toString(),
                                       )
                                    }
                                 >
                                    Next
                                 </Button>
                              )}
                           </div>
                        </TabsContent>
                     );
                  })}
               </Tabs>
            )}
         </Form>
      </Card>
   );
};

export default QuizViewer;
