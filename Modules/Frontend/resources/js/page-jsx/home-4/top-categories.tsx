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
      <EditorSection className="mt-20 py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
               <EditorDiv className="w-full md:max-w-[306px]">
                  <EditorHeading className="mb-2 text-3xl font-bold sm:text-4xl">
                     Top Categories
                  </EditorHeading>
                  <EditorParagraph className="text-muted-foreground">
                     Explore our most popular course categories
                  </EditorParagraph>
               </EditorDiv>

               <EditorDynamicWrapper
                  className="w-full"
                  api="api/collections/course_categories/new"
                  apiMethod="GET"
                  componentRef="top-course-categories-5"
               />
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default TopCategories;
