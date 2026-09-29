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
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="md:max-w-2xl">
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Our Latest Post
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Stay updated with our latest articles, tips, and industry
                  insights
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
