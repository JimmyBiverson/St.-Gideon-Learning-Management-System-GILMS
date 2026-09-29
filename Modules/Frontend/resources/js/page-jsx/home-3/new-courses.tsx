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
            <EditorDiv className="md:max-w-2xl">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Latest Courses
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Discover our newest courses and start learning something new
                  today
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/courses/new"
               apiMethod="GET"
               componentRef="new-courses-carousel-1"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default NewCourses;
