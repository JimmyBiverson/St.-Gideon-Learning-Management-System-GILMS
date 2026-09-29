import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorLink,
   EditorParagraph,
} from '@/frontend/lib/components';

const Breadcrumb = (title: string, slug: string) => {
   return (
      <EditorDiv className="relative bg-[rgba(255,222,99,0.06)] pt-[212px] pb-[100px]">
         <EditorContainer>
            <EditorDiv className="relative z-10 flex flex-col items-center justify-center space-y-2">
               <EditorHeading className="text-center text-4xl font-bold md:text-[44px]">
                  {title}
               </EditorHeading>
               <EditorDiv className="flex items-center gap-1 text-muted-foreground">
                  <EditorLink
                     href="/"
                     type="inertia"
                     className="flex items-center justify-center"
                  >
                     <EditorIcon name="home" className="h-[18px] w-[18px]" />
                  </EditorLink>
                  <EditorIcon
                     name="chevrons-right"
                     className="h-[14px] w-[14px]"
                  />
                  <EditorParagraph className="text-sm">{slug}</EditorParagraph>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>

         <EditorDiv className="pointer-events-none absolute top-1/2 right-0 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-40 content-['']"></EditorDiv>
      </EditorDiv>
   );
};

export default Breadcrumb;
