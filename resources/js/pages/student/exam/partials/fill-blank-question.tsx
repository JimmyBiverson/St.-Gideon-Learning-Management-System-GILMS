import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
   question: ExamQuestion;
   answer: any;
   onAnswerChange: (answer: any) => void;
}

const FillBlankQuestion = ({ question, answer, onAnswerChange }: Props) => {
   // Initialise from saved answer — supports { answers: ['text'] } or { answer: 'text' }
   const buildInitialValue = () => {
      if (answer?.answer) {
         return String(answer.answer);
      }

      if (Array.isArray(answer?.answers) && answer.answers.length > 0) {
         return String(answer.answers[0]);
      }

      return '';
   };

   const [value, setValue] = useState<string>(buildInitialValue);

   const handleChange = (newValue: string) => {
      setValue(newValue);
      // Emit as { answers: ['text'] } so the service can find it via $answerData['answers'][0]
      onAnswerChange({ answers: [newValue] });
   };

   return (
      <div className="space-y-4">
         <p className="text-sm text-gray-600">
            Fill in the blank with the correct answer:
         </p>

         {/* Show the question description (may use ___ or [blank] as visual placeholders) */}
         {question.description && (
            <div className="rounded-lg bg-gray-50 p-4">
               <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: question.description }}
               />
            </div>
         )}

         {/* Single answer input */}
         <div className="space-y-2">
            <Label className="text-sm font-semibold">Your Answer:</Label>
            <div className="flex items-center gap-3 rounded-lg border p-3">
               <span className="text-sm font-semibold text-gray-600">
                  Answer:
               </span>
               <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1"
                  autoComplete="off"
               />
            </div>
         </div>

         {(question.options as any)?.case_sensitive && (
            <p className="text-sm text-yellow-600">
               <span className="font-semibold">Note:</span> Answer is
               case-sensitive.
            </p>
         )}
      </div>
   );
};

export default FillBlankQuestion;
