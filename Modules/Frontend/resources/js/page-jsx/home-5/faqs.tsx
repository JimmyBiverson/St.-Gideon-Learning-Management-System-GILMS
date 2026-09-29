import { nanoid } from 'nanoid';
import {
   EditorAccordion,
   EditorAccordionContent,
   EditorAccordionItem,
   EditorAccordionTrigger,
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const FAQs = () => {
   const faqs = [
      {
         id: nanoid(),
         question: 'Do I need any prior experience to take your courses?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether you're a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'How long do I have access to the course materials?',
         answer:
            'You have lifetime access to all course materials. Once you enroll, you can learn at your own pace and revisit the content whenever you need a refresher.',
      },
      {
         id: nanoid(),
         question: 'Will I get a certificate after completing a course?',
         answer:
            "Yes! Upon successful completion of any course, you'll receive a certificate of completion that you can share on your professional profiles and with potential employers.",
      },
      {
         id: nanoid(),
         question: 'Can I ask questions or get support during the course?',
         answer:
            'Absolutely! Each course includes a discussion forum where you can ask questions, interact with other students, and receive support from instructors and the community.',
      },
      {
         id: nanoid(),
         question: "What if I'm not satisfied with the course?",
         answer:
            "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can request a full refund within 30 days of enrollment, no questions asked.",
      },
   ];

   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 mx-auto max-w-3xl">
               <EditorDiv className="relative z-10 mx-auto mb-10 max-w-lg text-center">
                  <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                     FAQs
                  </EditorParagraph>
                  <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                     Frequently Asked Questions!
                  </EditorHeading>
                  <EditorParagraph className="text-muted-foreground">
                     Do you have any questions? We answered questions you may
                     have.
                  </EditorParagraph>
               </EditorDiv>

               <EditorAccordion className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                     <EditorAccordionItem key={faq.id}>
                        <EditorAccordionTrigger className="text-base font-semibold">
                           {faq.question}
                        </EditorAccordionTrigger>
                        <EditorAccordionContent className="text-muted-foreground">
                           {faq.answer}
                        </EditorAccordionContent>
                     </EditorAccordionItem>
                  ))}
               </EditorAccordion>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default FAQs;
