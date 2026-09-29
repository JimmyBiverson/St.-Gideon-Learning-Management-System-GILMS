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
      <EditorSection className="relative z-10 py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto mb-10 text-center md:max-w-2xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Top Categories
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Explore by Category
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular courses among listen courses
                  learners worldwide
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/course_categories/top"
               apiMethod="GET"
               componentRef="top-course-categories-2"
               className="relative z-10 my-12"
            />

            <EditorDiv className="pointer-events-none absolute -right-100 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,245,204,0.5)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default TopCategories;
