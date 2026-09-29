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
            <EditorDiv className="mx-auto text-center md:max-w-[480px]">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  What Our Students Say
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Real stories from real students who achieved their goals
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative mt-10">
               <EditorDynamicWrapper
                  api="api/collections/testimonials/top"
                  apiMethod="GET"
                  componentRef="top-testimonials-carousel-2"
               />

               <EditorDiv className="pointer-events-none absolute top-1/2 -left-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']" />

               <EditorDiv className="pointer-events-none absolute top-1/2 -right-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-20 content-['']" />
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Testimonials;
