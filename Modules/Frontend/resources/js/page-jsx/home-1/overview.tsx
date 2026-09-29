import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Overview = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="text-center">
            <EditorDiv className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
               <EditorDiv className="rounded-3xl border-none bg-[rgba(52,105,154,0.1)] px-6 py-10 !shadow-none md:py-12">
                  <EditorDiv className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(52,105,154,1)]">
                     <EditorIcon name="users" className="h-8 w-8 text-white" />
                  </EditorDiv>

                  <EditorDiv className="mt-4 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        68k+
                     </EditorHeading>
                     <EditorParagraph className="mt-6 text-muted-foreground">
                        Join 68k+ students already mastering new skills.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="rounded-3xl border-none bg-[rgba(255,203,97,0.1)] px-6 py-10 !shadow-none md:py-12">
                  <EditorDiv className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,203,97,1)]">
                     <EditorIcon
                        name="download"
                        className="h-8 w-8 text-white"
                     />
                  </EditorDiv>

                  <EditorDiv className="mt-4 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        32k+
                     </EditorHeading>
                     <EditorParagraph className="mt-6 text-muted-foreground">
                        Downloaded over 32,000 times by users worldwide.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="rounded-3xl border-none bg-[rgba(74,151,130,0.1)] px-6 py-10 !shadow-none md:py-12">
                  <EditorDiv className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(74,151,130,1)]">
                     <EditorIcon name="heart" className="h-8 w-8 text-white" />
                  </EditorDiv>

                  <EditorDiv className="mt-4 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        45k+
                     </EditorHeading>
                     <EditorParagraph className="mt-6 text-muted-foreground">
                        Loved by learners with 45k+ great reviews.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="rounded-3xl border-none bg-[rgba(121,158,255,0.1)] px-6 py-10 !shadow-none md:py-12">
                  <EditorDiv className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(121,158,255,1)]">
                     <EditorIcon name="award" className="h-8 w-8 text-white" />
                  </EditorDiv>

                  <EditorDiv className="mt-4 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        1.2k+
                     </EditorHeading>
                     <EditorParagraph className="mt-6 text-muted-foreground">
                        Recognized with more than 1,200 prestigious accolades.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Overview;
