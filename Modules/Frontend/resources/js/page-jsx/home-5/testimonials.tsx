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
         <EditorContainer>
            <EditorDiv className="relative z-10 mx-auto max-w-lg text-center">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Testimonials
               </EditorParagraph>
               <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                  What Our Students Say
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  They efficiently serve large number of students on our
                  platform
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative">
               <EditorDynamicWrapper
                  className="relative z-10"
                  api="api/collections/testimonials/top"
                  apiMethod="GET"
                  componentRef="top-testimonials-carousel-1"
               />

               <EditorDiv className="pointer-events-none absolute -top-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>

               <EditorDiv className="pointer-events-none absolute -right-100 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Testimonials;
