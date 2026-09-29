import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { store as storeExamFaq } from '@/routes/exam-faqs';
import { store as storeExamOutcome } from '@/routes/exam-outcomes';
import { store as storeExamRequirement } from '@/routes/exam-requirements';
import { router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import FaqForm from '../forms/faq-form';
import OutcomeForm from '../forms/outcome-form';
import RequirementForm from '../forms/requirement-form';

const Info = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { exam } = props;
   const { faqs, requirements, outcomes } = exam;

   return (
      <Card className="space-y-7 p-4 sm:p-6">
         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">Exam FAQs</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(storeExamFaq(), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  Add FAQ
               </Button>
               {faqs?.map((faq) => (
                  <FaqForm key={faq.id} faq={faq} />
               ))}
            </div>
         </div>

         <Separator />

         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">Requirements</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(storeExamRequirement(), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  Add Requirement
               </Button>
               {requirements?.map((requirement) => (
                  <RequirementForm
                     key={requirement.id}
                     requirement={requirement}
                  />
               ))}
            </div>
         </div>

         <Separator />

         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">Learning Outcomes</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(storeExamOutcome(), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  Add Outcome
               </Button>
               {outcomes?.map((outcome) => (
                  <OutcomeForm key={outcome.id} outcome={outcome} />
               ))}
            </div>
         </div>
      </Card>
   );
};

export default Info;
