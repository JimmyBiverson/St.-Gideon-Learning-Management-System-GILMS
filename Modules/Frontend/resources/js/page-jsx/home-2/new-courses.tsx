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
         <EditorContainer className="relative z-10">
            <EditorDiv className="mx-auto text-center md:max-w-2xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Courses
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Latest Courses
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Your professional development is supported by Mentor covering
                  everything from technical subjects to essential abilities
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/courses/new"
               apiMethod="GET"
               componentRef="new-courses-carousel-1"
            />

            <EditorDiv className="pointer-events-none absolute -top-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>

            <EditorDiv className="pointer-events-none absolute -right-80 -bottom-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default NewCourses;
