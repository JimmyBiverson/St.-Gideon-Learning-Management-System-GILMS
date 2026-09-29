import { nanoid } from 'nanoid';
import {
   EditorAccordion,
   EditorAccordionContent,
   EditorAccordionItem,
   EditorAccordionTrigger,
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const FAQs = () => {
   const faqsData = [
      {
         id: nanoid(),
         question: 'Do I need any prior experience to take your courses?',
         answer:
            "Not at all! My courses are designed for learners of all levels. Whether you're a complete beginner or looking to sharpen existing skills, you'll find step-by-step guidance to help you progress with confidence.",
      },
      {
         id: nanoid(),
         question: 'How long do I have access to the course materials',
         answer:
            'Once enrolled, you have lifetime access to all course materials. You can learn at your own pace and revisit content whenever you need a refresher.',
      },
      {
         id: nanoid(),
         question: 'Will I get a certificate after completing a course?',
         answer:
            "Yes! Upon successful completion of a course, you'll receive a certificate of completion that you can share on your LinkedIn profile or include in your portfolio.",
      },
      {
         id: nanoid(),
         question: 'Can I ask questions or get support during the course?',
         answer:
            'Absolutely! Each course includes a discussion section where you can ask questions, share insights, and connect with other learners. I personally monitor and respond to questions.',
      },
      {
         id: nanoid(),
         question: "What if I'm not satisfied with the course?",
         answer:
            "I offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can request a full refund within 30 days of enrollment.",
      },
   ];

   return (
      <EditorSection className="overflow-hidden py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2">
               <EditorDiv className="md:max-w-lg">
                  <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                     FAQ
                  </EditorParagraph>
                  <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                     Frequently Asked Questions!
                  </EditorHeading>
                  <EditorParagraph className="text-muted-foreground">
                     These are the most popular courses among listen courses
                     learners worldwide these are the most popular courses among
                     listen
                  </EditorParagraph>

                  <EditorImage
                     className="mx-auto mt-6 max-w-[268px]"
                     src="/assets/images/intro/home-1/faqs.png"
                     alt=""
                  />
               </EditorDiv>

               <EditorAccordion className="space-y-4">
                  {faqsData.map((faq) => (
                     <EditorAccordionItem key={faq.id}>
                        <EditorAccordionTrigger className="text-base font-semibold">
                           <EditorParagraph className="text-lg font-semibold">
                              {faq.question}
                           </EditorParagraph>

                           <EditorIcon
                              name="chevron-down"
                              className="h-5 w-5"
                           />
                        </EditorAccordionTrigger>
                        <EditorAccordionContent className="text-muted-foreground">
                           <EditorParagraph>{faq.answer}</EditorParagraph>
                        </EditorAccordionContent>
                     </EditorAccordionItem>
                  ))}
               </EditorAccordion>
            </EditorDiv>

            <EditorDiv className="pointer-events-none absolute -top-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>

            <EditorDiv className="pointer-events-none absolute top-1/2 -right-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default FAQs;
