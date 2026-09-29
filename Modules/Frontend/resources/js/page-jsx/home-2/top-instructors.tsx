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
            <EditorDiv className="mx-auto mb-10 text-center md:max-w-[480px]">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Top Instructors
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Meet Our Experts
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  They efficiently serve large number of students on our
                  platform
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
