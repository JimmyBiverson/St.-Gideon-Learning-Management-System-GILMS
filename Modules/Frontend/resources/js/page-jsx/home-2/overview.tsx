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
            <EditorDiv className="relative z-10 mx-auto mb-10 text-center md:max-w-2xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  We Provide
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Take Your Skills to the Next Level
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular courses among listen courses
                  learners worldwide.
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-3">
               <EditorDiv className="relative z-10 rounded-3xl border-2 border-white bg-background/50 px-6 py-16 md:py-20">
                  <EditorDiv className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white/5 shadow-card-md">
                     <EditorDiv className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                        <EditorIcon
                           name="clock"
                           className="h-6 w-6 text-white"
                        />
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv className="mt-5 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        212+
                     </EditorHeading>
                     <EditorParagraph className="mt-2">
                        Hours Course Time
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="relative z-10 rounded-3xl border-2 border-white bg-background/50 px-6 py-16 md:py-20">
                  <EditorDiv className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white/5 shadow-card-md">
                     <EditorDiv className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                        <EditorIcon
                           name="monitor"
                           className="h-6 w-6 text-white"
                        />
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv className="mt-5 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        15+
                     </EditorHeading>
                     <EditorParagraph className="mt-2">
                        Creative Courses
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="relative z-10 rounded-3xl border-2 border-white bg-background/50 px-6 py-16 md:py-20">
                  <EditorDiv className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white/5 shadow-card-md">
                     <EditorDiv className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                        <EditorIcon
                           name="users"
                           className="h-6 w-6 text-white"
                        />
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv className="mt-5 space-y-2">
                     <EditorHeading className="text-4xl font-semibold md:text-[44px]">
                        6+
                     </EditorHeading>
                     <EditorParagraph className="mt-2">
                        Number of Students
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="pointer-events-none absolute -top-120 left-1/2 h-[1200px] w-[1800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(97,95,255,0.4)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Overview;
