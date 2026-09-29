import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Statistics = () => {
   return (
      <EditorSection className="relative z-10 py-11">
         <EditorContainer>
            <EditorDiv className="grid grid-cols-2 gap-20 rounded-lg border-none bg-[#004B50] p-10 text-white shadow-none md:grid-cols-4 md:flex-row md:gap-28 md:px-[120px]">
               <EditorDiv>
                  <EditorHeading className="text-4xl font-bold md:text-6xl">
                     64k
                  </EditorHeading>
                  <EditorParagraph className="text-lg">Users</EditorParagraph>
               </EditorDiv>
               <EditorDiv>
                  <EditorHeading className="text-4xl font-bold md:text-6xl">
                     45k
                  </EditorHeading>
                  <EditorParagraph className="text-lg">
                     Active Learners
                  </EditorParagraph>
               </EditorDiv>
               <EditorDiv>
                  <EditorHeading className="text-4xl font-bold md:text-6xl">
                     32k
                  </EditorHeading>
                  <EditorParagraph className="text-lg">
                     Enrolled Courses
                  </EditorParagraph>
               </EditorDiv>
               <EditorDiv>
                  <EditorHeading className="text-4xl font-bold md:text-6xl">
                     429k+
                  </EditorHeading>
                  <EditorParagraph className="text-lg">
                     Course Completed
                  </EditorParagraph>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Statistics;
