import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Statistics = () => {
   return (
      <EditorSection className="py-10">
         <EditorContainer>
            <EditorDiv className="grid grid-cols-2 gap-7 md:grid-cols-4">
               <EditorDiv className="text-center">
                  <EditorHeading className="text-4xl font-bold md:text-5xl">
                     68k+
                  </EditorHeading>
                  <EditorParagraph className="mt-2 text-muted-foreground">
                     Students
                  </EditorParagraph>
               </EditorDiv>
               <EditorDiv className="text-center">
                  <EditorHeading className="text-4xl font-bold md:text-5xl">
                     1.2k+
                  </EditorHeading>
                  <EditorParagraph className="mt-2 text-muted-foreground">
                     Courses
                  </EditorParagraph>
               </EditorDiv>
               <EditorDiv className="text-center">
                  <EditorHeading className="text-4xl font-bold md:text-5xl">
                     850+
                  </EditorHeading>
                  <EditorParagraph className="mt-2 text-muted-foreground">
                     Instructors
                  </EditorParagraph>
               </EditorDiv>
               <EditorDiv className="text-center">
                  <EditorHeading className="text-4xl font-bold md:text-5xl">
                     45k+
                  </EditorHeading>
                  <EditorParagraph className="mt-2 text-muted-foreground">
                     Reviews
                  </EditorParagraph>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Statistics;
