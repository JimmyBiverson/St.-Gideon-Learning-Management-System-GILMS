import {
   EditorButton,
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorImage,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Hero = () => {
   return (
      <EditorSection className="pt-20 pb-10">
         <EditorContainer className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-3">
            <EditorDiv className="relative w-full md:max-w-[480px]">
               <EditorDiv className="relative z-10 mb-6">
                  <EditorParagraph className="mb-2 text-lg font-medium text-secondary-foreground">
                     YOUR JOURNEY BEGINS HERE
                  </EditorParagraph>
                  <EditorHeading className="text-3xl leading-tight font-bold md:text-4xl lg:text-[42px] lg:leading-14">
                     Grow Your Knowledge with Leading Online Courses
                  </EditorHeading>
                  <EditorParagraph className="mt-4 text-lg text-muted-foreground">
                     Start learning today with top-rated courses and instructors
                     Take your team's learning and development to new heights
                     Take your team's learning
                  </EditorParagraph>
               </EditorDiv>

               <EditorLink
                  type="inertia"
                  href="/courses/all"
                  className="relative z-10 mb-10 md:mb-14"
               >
                  <EditorButton className="cursor-pointer">
                     Browse Courses
                  </EditorButton>
               </EditorLink>

               <EditorDiv className="relative z-10 flex items-center gap-3">
                  <EditorDiv className="flex -space-x-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                     <EditorImage
                        className="!h-11 !w-11 rounded-full"
                        src="/assets/avatars/avatar-1.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-11 !w-11 rounded-full"
                        src="/assets/avatars/avatar-2.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-11 !w-11 rounded-full"
                        src="/assets/avatars/avatar-3.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-11 !w-11 rounded-full"
                        src="/assets/avatars/avatar-4.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-11 !w-11 rounded-full"
                        src="/assets/avatars/avatar-5.png"
                        alt=""
                     />
                  </EditorDiv>
                  <EditorDiv>
                     <EditorDiv className="flex items-center gap-2">
                        <EditorIcon
                           name="star"
                           className="-mb-0.5 h-4 w-4 p-0 text-yellow-500"
                        />
                        <EditorIcon
                           name="star"
                           className="-mb-0.5 h-4 w-4 p-0 text-yellow-500"
                        />
                        <EditorIcon
                           name="star"
                           className="-mb-0.5 h-4 w-4 p-0 text-yellow-500"
                        />
                        <EditorIcon
                           name="star"
                           className="-mb-0.5 h-4 w-4 p-0 text-yellow-500"
                        />
                        <EditorIcon
                           name="star"
                           className="-mb-0.5 h-4 w-4 p-0 text-yellow-500"
                        />
                        <EditorParagraph className="font-medium">
                           5.0
                        </EditorParagraph>
                     </EditorDiv>

                     <EditorParagraph className="text-sm text-muted-foreground">
                        +2000 readers worldwide
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="pointer-events-none absolute -top-120 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-22 content-['']"></EditorDiv>
            </EditorDiv>

            {/* Right Image */}
            <EditorDiv className="relative w-full max-w-[640px]">
               <EditorImage
                  src="/assets/images/intro/home-1/hero-image.png"
                  alt="Student learning online"
                  className="relative z-10 h-full w-full"
               />

               <EditorDiv className="pointer-events-none absolute -right-120 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Hero;
