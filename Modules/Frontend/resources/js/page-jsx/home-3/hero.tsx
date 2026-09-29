import {
   EditorButton,
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Hero = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="flex flex-col items-center justify-between gap-20 md:gap-10 lg:flex-row">
            {/* Left Content */}
            <EditorDiv className="animate-fade-in relative w-full space-y-8 md:max-w-[480px] lg:space-y-10">
               <EditorDiv className="relative z-10">
                  <EditorParagraph className="mb-2 text-lg font-medium text-secondary-foreground">
                     YOUR JOURNEY BEGINS HERE
                  </EditorParagraph>
                  <EditorHeading className="text-3xl leading-tight font-bold md:text-4xl lg:text-[44px] lg:leading-14">
                     Grow Your Knowledge with Leading Online Courses
                  </EditorHeading>
                  <EditorParagraph className="mt-5 text-lg">
                     Start learning today with top-rated courses and instructors
                     Take your team's learning and development to new heights
                  </EditorParagraph>
               </EditorDiv>

               <EditorLink
                  href="/courses/all"
                  type="inertia"
                  className="relative z-10 mb-10 md:mb-14"
               >
                  <EditorButton className="cursor-pointer">
                     Browse Courses
                  </EditorButton>
               </EditorLink>

               <EditorDiv className="relative z-10 flex items-center justify-center gap-2.5 lg:justify-start">
                  <EditorDiv className="animate-fade-in p-2.5">
                     <EditorHeading
                        level="h6"
                        className="text-lg font-bold lg:text-xl"
                     >
                        68k+
                     </EditorHeading>
                     <EditorParagraph className="text-sm text-muted-foreground">
                        Students
                     </EditorParagraph>
                  </EditorDiv>
                  <EditorDiv className="animate-fade-in p-2.5">
                     <EditorHeading
                        level="h6"
                        className="text-lg font-bold lg:text-xl"
                     >
                        1.2k+
                     </EditorHeading>
                     <EditorParagraph className="text-sm text-muted-foreground">
                        Courses
                     </EditorParagraph>
                  </EditorDiv>
                  <EditorDiv className="animate-fade-in p-2.5">
                     <EditorHeading
                        level="h6"
                        className="text-lg font-bold lg:text-xl"
                     >
                        850+
                     </EditorHeading>
                     <EditorParagraph className="text-sm text-muted-foreground">
                        Awards
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="pointer-events-none absolute -top-100 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']"></EditorDiv>
            </EditorDiv>

            {/* Right Image */}
            <EditorDiv className="relative w-full max-w-[680px]">
               <EditorImage
                  src="/assets/images/intro/home-3/hero-image.png"
                  alt="Student learning online"
                  className="relative z-10 w-full"
               />

               <EditorDiv className="pointer-events-none absolute -right-40 -bottom-40 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-40 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Hero;
