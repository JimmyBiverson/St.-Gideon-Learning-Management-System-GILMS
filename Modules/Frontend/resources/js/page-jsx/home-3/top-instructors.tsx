import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const TopInstructors = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="md:max-w-[480px]">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Meet Our Experts
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Learn from industry professionals with years of experience
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/instructors/top"
               apiMethod="GET"
               componentRef="top-instructors-carousel-2"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default TopInstructors;
