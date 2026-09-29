import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Testimonials = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative z-10">
            <EditorDiv className="mx-auto text-center md:max-w-[480px]">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Testimonials
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  What Our Students Say
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  They efficiently serve large number of students on our
                  platform
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/testimonials/top"
               apiMethod="GET"
               componentRef="top-testimonials-carousel-1"
            />

            <EditorDiv className="pointer-events-none absolute -bottom-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
            <EditorDiv className="pointer-events-none absolute -top-80 -right-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Testimonials;
