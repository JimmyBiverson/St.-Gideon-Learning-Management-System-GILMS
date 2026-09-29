import { Renderer } from '@/components/rich-editor';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';

const Overview = ({ course }: { course: Course }) => {
   return (
      <div className="space-y-10">
         <Renderer value={course.description as string} />

         <Accordion type="single" collapsible>
            <h6 className="mb-4 text-xl font-semibold">Faqs</h6>

            <div className="border-y border-border">
               {course.faqs?.map((faq) => (
                  <AccordionItem
                     key={faq.id}
                     value={faq.id.toString()}
                     className="px-4 last:border-none"
                  >
                     <AccordionTrigger className="cursor-pointer text-lg hover:no-underline [&[data-state=open]]:text-blue-500">
                        {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="pt-2">
                        {faq.answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </div>
         </Accordion>
      </div>
   );
};

export default Overview;
