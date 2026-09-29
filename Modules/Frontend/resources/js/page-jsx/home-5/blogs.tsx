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
      <EditorSection className="overflow-hidden py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 mx-auto text-center">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Latest Insights
               </EditorParagraph>
               <EditorHeading className="mb-4 text-2xl font-bold sm:text-3xl">
                  Explore Our Blog
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Stay updated with the latest tips, trends, and insights from
                  industry experts
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative">
               <EditorDynamicWrapper
                  className="relative z-10"
                  api="api/collections/blogs/new"
                  apiMethod="GET"
                  componentRef="new-blogs-carousel"
               />

               <EditorDiv className="pointer-events-none absolute top-1/2 -left-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>

               <EditorDiv className="pointer-events-none absolute -top-80 -right-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Blogs;
