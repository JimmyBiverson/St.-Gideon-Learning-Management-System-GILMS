import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const NewCourses = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="relative z-10 mx-auto mb-10 max-w-lg text-center">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Subjects
               </EditorParagraph>
               <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                  Latest Subjects
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular subjects among listen subjects
                  learners worldwide these are the most popular subjects among
                  subjects
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative">
               <EditorDynamicWrapper
                  api="api/collections/courses/new"
                  apiMethod="GET"
                  componentRef="new-subjects-1"
               />

               <EditorDiv className="pointer-events-none absolute -bottom-100 -left-100 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
               <EditorDiv className="pointer-events-none absolute -top-100 -right-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default NewCourses;
