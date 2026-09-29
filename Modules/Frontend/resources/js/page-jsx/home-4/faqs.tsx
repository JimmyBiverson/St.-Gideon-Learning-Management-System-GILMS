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
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'How long do I have access to the course materials?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'Will I get a certificate after completing a course?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'Can I ask questions or get support during the course?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: "What if I'm not satisfied with the course?",
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'What is the refund policy?',
         answer:
            "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please note that refunds are only available for unused course materials.",
      },
      {
         id: nanoid(),
         question: 'How do I get access to the course materials?',
         answer:
            "Once you've enrolled, you'll receive immediate access to all course materials. You can access them anytime, anywhere, on any device with an internet connection.",
      },
      {
         id: nanoid(),
         question: 'How can I get help if I need it?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether your a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      // {
      //    id: nanoid(),
      //    question: 'What is the refund policy?',
      //    answer:
      //       "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please note that refunds are only available for unused course materials.",
      // },
   ];

   // Split FAQs into two columns
   const midPoint = Math.ceil(faqs.length / 2);
   const firstColumn = faqs.slice(0, midPoint);
   const secondColumn = faqs.slice(midPoint);

   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10">
               <EditorDiv className="relative z-10 mx-auto mb-10 max-w-lg text-center">
                  <EditorHeading className="mb-2 text-3xl font-bold sm:text-4xl">
                     Frequently Asked Questions!
                  </EditorHeading>
                  <EditorParagraph className="text-muted-foreground">
                     These are the most popular courses among listen courses
                     learners worldwide these are the most popular courses among
                     listen
                  </EditorParagraph>
               </EditorDiv>

               <EditorAccordion className="relative w-full">
                  <EditorDiv className="relative z-10 grid grid-cols-1 items-start gap-x-7 gap-y-4 md:grid-cols-2">
                     {/* First Column */}
                     <EditorDiv>
                        {firstColumn.map((faq) => (
                           <EditorAccordionItem key={faq.id} className="mb-4">
                              <EditorAccordionTrigger className="text-base font-semibold">
                                 {faq.question}
                              </EditorAccordionTrigger>
                              <EditorAccordionContent className="text-muted-foreground">
                                 {faq.answer}
                              </EditorAccordionContent>
                           </EditorAccordionItem>
                        ))}
                     </EditorDiv>

                     {/* Second Column */}
                     <EditorDiv>
                        {secondColumn.map((faq) => (
                           <EditorAccordionItem key={faq.id} className="mb-4">
                              <EditorAccordionTrigger className="text-base font-semibold">
                                 {faq.question}
                              </EditorAccordionTrigger>
                              <EditorAccordionContent className="text-muted-foreground">
                                 {faq.answer}
                              </EditorAccordionContent>
                           </EditorAccordionItem>
                        ))}
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv className="pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
               </EditorAccordion>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default FAQs;
