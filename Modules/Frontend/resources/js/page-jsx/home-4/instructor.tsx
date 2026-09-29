import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorImage,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Instructor = () => {
   const leftFeatures = [
      {
         icon: 'graduation-cap',
         title: '10+ Years Experience',
         description:
            'Every course includes real-world projects to help you build a strong, job-ready portfolio',
      },
      {
         icon: 'users',
         title: '15k+ Students Taught',
         description:
            'With over a decade of hands-on experience in web design and development, I bring practical insights you won’t find in textbooks.',
      },
   ];

   const rightFeatures = [
      {
         icon: 'award',
         title: 'Industry Recognition',
         description:
            'My lessons are designed to be simple, clear, and step-by-step — perfect for learners of all levels, especially beginners.',
      },
      {
         icon: 'star',
         title: '4.9 Rating',
         description:
            'You’re never learning alone. I personally respond to questions and offer guidance to help you stay on track.',
      },
   ];

   return (
      <EditorSection className="overflow-y-hidden py-20">
         <EditorContainer className="relative">
            <EditorDiv className="relative z-10 mx-auto mb-10 w-full text-center md:max-w-lg">
               <EditorHeading className="mb-2 text-3xl font-bold sm:text-4xl">
                  Reasons to Learn with Me
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  These are the most popular courses among listen courses
                  learners worldwide these are the most popular courses among
                  listen
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="relative z-10 mx-auto grid w-full max-w-[964px] grid-cols-1 gap-8 md:grid-cols-3">
               {/* Left Column - Features */}
               <EditorDiv className="space-y-12">
                  {leftFeatures.map((item, index) => (
                     <EditorDiv key={index}>
                        <EditorDiv className="h-10 w-10 rounded bg-background p-2 shadow-card-md">
                           <EditorIcon
                              name={item.icon}
                              className="h-6 w-6 text-secondary-foreground"
                           />
                        </EditorDiv>

                        <EditorHeading
                           level="h3"
                           className="pt-4 pb-2 font-semibold"
                        >
                           {item.title}
                        </EditorHeading>
                        <EditorParagraph className="text-sm text-muted-foreground">
                           {item.description}
                        </EditorParagraph>
                     </EditorDiv>
                  ))}
               </EditorDiv>

               {/* Center Column - Instructor Card */}
               <EditorDiv className="space-y-6 rounded-2xl border p-5 !shadow-card-hover">
                  <EditorDiv className="h-[190px] overflow-hidden rounded-lg">
                     <EditorImage
                        className="w-full object-cover object-top"
                        src="/assets/images/users/user-7.jpg"
                        alt="John Doe"
                     />
                  </EditorDiv>

                  <EditorDiv className="space-y-6">
                     <EditorDiv className="space-y-2">
                        <EditorHeading level="h3" className="font-semibold">
                           John Doe
                        </EditorHeading>
                        <EditorParagraph className="text-sm text-muted-foreground">
                           Senior Design Instructor
                        </EditorParagraph>
                        <EditorParagraph className="text-sm text-muted-foreground">
                           Passionate educator dedicated to helping students
                           master modern design tools and techniques.
                        </EditorParagraph>
                     </EditorDiv>

                     <EditorDiv className="flex items-center gap-3 py-0">
                        <EditorLink
                           type="inertia"
                           href="https://facebook.com"
                           className="cursor-pointer"
                        >
                           <EditorDiv className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                              <EditorIcon name="facebook" className="h-4 w-4" />
                           </EditorDiv>
                        </EditorLink>
                        <EditorLink
                           type="inertia"
                           href="https://twitter.com"
                           className="cursor-pointer"
                        >
                           <EditorDiv className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                              <EditorIcon name="twitter" className="h-4 w-4" />
                           </EditorDiv>
                        </EditorLink>
                        <EditorLink
                           type="inertia"
                           href="https://linkedin.com"
                           className="cursor-pointer"
                        >
                           <EditorDiv className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                              <EditorIcon name="linkedin" className="h-4 w-4" />
                           </EditorDiv>
                        </EditorLink>
                     </EditorDiv>
                  </EditorDiv>
               </EditorDiv>

               {/* Right Column - Features */}
               <EditorDiv className="space-y-12">
                  {rightFeatures.map((item, index) => (
                     <EditorDiv key={index}>
                        <EditorDiv className="h-10 w-10 rounded bg-background p-2 shadow-card-md">
                           <EditorIcon
                              name={item.icon}
                              className="h-6 w-6 text-secondary-foreground"
                           />
                        </EditorDiv>

                        <EditorHeading
                           level="h3"
                           className="pt-4 pb-2 font-semibold"
                        >
                           {item.title}
                        </EditorHeading>
                        <EditorParagraph className="text-sm text-muted-foreground">
                           {item.description}
                        </EditorParagraph>
                     </EditorDiv>
                  ))}
               </EditorDiv>
            </EditorDiv>

            <EditorDiv className="pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Instructor;
