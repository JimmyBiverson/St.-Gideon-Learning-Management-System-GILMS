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
         <EditorContainer>
            <EditorDiv className="mb-10 md:max-w-2xl">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  New Categories
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular subjects among listen subjects
                  learners worldwide
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/course_categories/new"
               apiMethod="GET"
               componentRef="top-subject-categories-4"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default TopCategories;
