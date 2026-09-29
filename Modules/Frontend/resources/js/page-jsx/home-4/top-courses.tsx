import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const TopCourses = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto mb-10 text-center md:max-w-2xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Courses
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Popular Courses
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Discover our most popular courses and start learning today
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/courses/top"
               apiMethod="GET"
               componentRef="new-courses-1"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default TopCourses;
