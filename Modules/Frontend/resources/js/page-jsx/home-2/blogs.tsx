import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Blogs = () => {
   return (
      <EditorSection className="z-10 py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto text-center md:max-w-2xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Blogs
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Our Latest Post
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular courses among listen courses
                  learners worldwide
               </EditorParagraph>
            </EditorDiv>

            <EditorDynamicWrapper
               api="api/collections/blogs/new"
               apiMethod="GET"
               componentRef="new-blogs-carousel"
            />
         </EditorContainer>
      </EditorSection>
   );
};

export default Blogs;
