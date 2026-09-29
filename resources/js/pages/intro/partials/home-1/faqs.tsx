import { usePage } from '@inertiajs/react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { getPageSection, getPropertyArray } from '@/lib/page';
import Section from '../section';

const FAQs = () => {
   const { props } = usePage<IntroPageProps>();
   const { page, customize } = props;
   const faqsCoursesSection = getPageSection(page, 'faqs');

   return (
      <div className="overflow-y-hidden py-20">
         <Section
            customize={customize}
            pageSection={faqsCoursesSection}
            contentClass="relative"
         >
            <div className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2">
               <div className="md:max-w-lg">
                  <p className="mb-1 font-medium text-secondary-foreground">
                     {faqsCoursesSection?.title}
                  </p>
                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                     {faqsCoursesSection?.sub_title}
                  </h2>
                  <p className="text-muted-foreground">
                     {faqsCoursesSection?.description}
                  </p>

                  <img
                     src={faqsCoursesSection?.thumbnail || ''}
                     alt=""
                     className="mx-auto mt-6 max-w-[268px]"
                  />
               </div>

               <Accordion
                  type="single"
                  collapsible
                  defaultValue="faq-0"
                  className="w-full"
               >
                  {getPropertyArray(faqsCoursesSection).map((faq, index) => (
                     <AccordionItem
                        key={`faq-${index}`}
                        value={`faq-${index}`}
                        className="mb-4 rounded-lg border border-border bg-background px-6 shadow-sm"
                     >
                        <AccordionTrigger className="text-base font-semibold">
                           {faq.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                           {faq.description}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>

            <div className="after:pointer-events-none after:absolute after:top-0 after:left-0 after:h-[240px] after:w-[240px] after:rounded-full after:bg-[rgba(0,167,111,1)] after:blur-[290px] after:content-['']"></div>

            <div className="after:pointer-events-none after:absolute after:top-1/2 after:right-20 after:h-[290px] after:w-[290px] after:-translate-y-1/2 after:rounded-full after:bg-[rgba(97,95,255,1))] after:blur-[290px] after:content-['']"></div>
         </Section>
      </div>
   );
};

export default FAQs;
