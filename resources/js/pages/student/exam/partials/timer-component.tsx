import { router } from '@inertiajs/react';
import { AlertTriangle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import examAttempts from '@/routes/exam-attempts';

interface Props {
   endTime: string;
   onTimeUp?: () => void;
   attempt: ExamAttempt;
   questionIndex: number;
}

function getSecondsRemaining(endTime: string): number {
   if (!endTime) {
      return 0;
   }

   const end = new Date(endTime).getTime();

   if (Number.isNaN(end)) {
      return 0;
   }

   const difference = end - Date.now();

   return Math.max(0, Math.floor(difference / 1000));
}

const TimerComponent = ({
   endTime,
   onTimeUp,
   attempt,
   questionIndex,
}: Props) => {
   const [timeLeft, setTimeLeft] = useState(() => getSecondsRemaining(endTime));
   const [isWarning, setIsWarning] = useState(() => {
      const remaining = getSecondsRemaining(endTime);

      return remaining <= 300 && remaining > 0;
   });

   useEffect(() => {
      const interval = setInterval(() => {
         const remaining = getSecondsRemaining(endTime);
         setTimeLeft(remaining);

         // Warning at 5 minutes
         if (remaining <= 300 && remaining > 0) {
            setIsWarning(true);
         }

         // Auto-submit when time is up
         if (remaining === 0) {
            clearInterval(interval);

            if (onTimeUp) {
               onTimeUp();
            } else {
               router.post(examAttempts.submit(attempt.id));
            }
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [endTime, attempt.id, onTimeUp]);

   const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };

   return (
      <Card className={`${isWarning ? 'border-destructive' : ''}`}>
         <CardContent className="p-4">
            <div className="flex items-center justify-between">
               <h6 className="flex items-center gap-2">
                  {isWarning ? (
                     <AlertTriangle className="h-5 w-5 text-destructive" />
                  ) : (
                     <Clock className="h-5 w-5 text-gray-600" />
                  )}
                  <span className="font-semibold text-gray-700">
                     Time Remaining
                  </span>
               </h6>

               <Badge
                  variant={isWarning ? 'destructive' : 'secondary'}
                  className="font-mono text-lg"
               >
                  {formatTime(timeLeft)}
               </Badge>
            </div>
            <p className="pl-7 text-sm text-gray-600">
               Question {questionIndex + 1} of {attempt.exam.questions.length}
            </p>

            {isWarning && (
               <p className="mt-2 text-sm text-destructive">
                  Less than 5 minutes remaining! The exam will auto-submit when
                  time runs out.
               </p>
            )}
         </CardContent>
      </Card>
   );
};

export default TimerComponent;
