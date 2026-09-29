import {
   EditorButton,
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const CategoryCourses = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Everything you need to know in one place
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Your professional development is supported by Mentor, covering
                  everything from technical subjects to essential abilities.
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/course_categories/featured"
               apiMethod="GET"
               componentRef="top-course-categories-3"
            />

            <EditorDiv className="mt-10 flex items-center justify-center">
               <EditorLink
                  type="inertia"
                  href="/courses/all"
                  className="cursor-pointer"
               >
                  <EditorButton buttonType="button" className="h-[42px] px-5">
                     View All Courses
                  </EditorButton>
               </EditorLink>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default CategoryCourses;
