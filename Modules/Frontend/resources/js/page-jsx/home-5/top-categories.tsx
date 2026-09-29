import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const TopCategories = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row">
               <EditorDiv className="w-full md:max-w-[360px]">
                  <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                     Top Categories
                  </EditorParagraph>
                  <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                     Featured Categories
                  </EditorHeading>
                  <EditorParagraph className="text-muted-foreground">
                     These are the most popular courses among listen courses
                     learners worldwide these are the most popular courses among
                     listen courses learners worldwide categories
                  </EditorParagraph>
               </EditorDiv>

               <EditorDiv className="z-10 w-full max-w-[800px]">
                  <EditorDynamicWrapper
                     api="api/collections/course_categories/top"
                     apiMethod="GET"
                     componentRef="top-course-categories-6"
                  />
               </EditorDiv>
            </EditorDiv>

            <EditorDiv className="pointer-events-none absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default TopCategories;
