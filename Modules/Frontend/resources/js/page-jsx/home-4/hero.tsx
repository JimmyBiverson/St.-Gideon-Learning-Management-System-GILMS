import {
   EditorButton,
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorIcon,
   EditorImage,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Hero = () => {
   return (
      <EditorDiv>
         <EditorDiv className="relative mx-auto max-w-[1440px]">
            <EditorSection className="relative pt-20">
               <EditorDiv className="relative z-10 grid grid-cols-1 items-center gap-x-20">
                  <EditorDiv className="mx-auto mb-16 max-w-[712px] text-center">
                     <EditorHeading className="mb-4 text-4xl font-bold md:text-5xl md:leading-14 md:font-extrabold">
                        Mastering Figma A Beginner's Guide to Digital Design
                     </EditorHeading>
                     <EditorParagraph className="mb-6 text-lg text-muted-foreground md:px-8">
                        Learn with a dedicated instructor guiding you every step
                        of the way. Gain hands-on experience, develop real-world
                        design skills, And achieve your creative goals with
                        confidence.
                     </EditorParagraph>

                     <EditorDiv className="mb-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                        <EditorLink
                           type="inertia"
                           href="/courses/all"
                           className="cursor-pointer"
                        >
                           <EditorButton className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white shadow-lg">
                              Browse Courses
                           </EditorButton>
                        </EditorLink>

                        <EditorLink type="inertia" href="/about-us">
                           <EditorButton className="w-auto cursor-pointer px-6 py-3">
                              Learn More
                           </EditorButton>
                        </EditorLink>
                     </EditorDiv>

                     <EditorDiv>
                        <EditorDiv className="flex items-center justify-center gap-2">
                           <EditorDiv className="flex items-center justify-center">
                              <EditorIcon
                                 name="star"
                                 className="h-4 w-4 p-0 text-yellow-500"
                              />
                              <EditorIcon
                                 name="star"
                                 className="h-4 w-4 p-0 text-yellow-500"
                              />
                              <EditorIcon
                                 name="star"
                                 className="h-4 w-4 p-0 text-yellow-500"
                              />
                              <EditorIcon
                                 name="star"
                                 className="h-4 w-4 p-0 text-yellow-500"
                              />
                              <EditorIcon
                                 name="star"
                                 className="h-4 w-4 p-0 text-yellow-500"
                              />
                           </EditorDiv>
                           <EditorParagraph className="font-medium">
                              5.0
                           </EditorParagraph>
                        </EditorDiv>
                        <EditorParagraph className="text-sm text-muted-foreground">
                           +2000 readers worldwide
                        </EditorParagraph>
                     </EditorDiv>
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="relative z-10 mx-auto max-w-[780px] overflow-hidden rounded-3xl shadow-card-hover md:rounded-4xl">
                  <EditorImage
                     src="/assets/images/intro/home-4/hero-image.png"
                     alt=""
                     className="mx-auto w-full"
                  />
               </EditorDiv>

               <EditorDiv className="pointer-events-none absolute -top-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(89,85,220,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
               <EditorDiv className="pointer-events-none absolute -top-40 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,190,0,0.4)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
            </EditorSection>

            <EditorImage
               src="/assets/images/intro/home-4/hero-bg.png"
               alt=""
               className="absolute bottom-0 w-full object-cover"
            />
         </EditorDiv>

         <EditorContainer className="pt-10">
            <EditorDynamicWrapper
               api="api/collections/sponsors/top"
               apiMethod="GET"
               componentRef="top-sponsors-carousel-1"
            />
         </EditorContainer>
      </EditorDiv>
   );
};

export default Hero;
