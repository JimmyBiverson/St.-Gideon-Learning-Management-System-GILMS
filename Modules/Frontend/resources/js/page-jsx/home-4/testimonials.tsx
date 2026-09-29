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

            <EditorDynamicWrapper
               api="api/collections/testimonials/top"
               apiMethod="GET"
               componentRef="top-testimonials-carousel-1"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default Testimonials;
