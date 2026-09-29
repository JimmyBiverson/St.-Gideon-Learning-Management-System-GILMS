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

const SuccessStatistics = () => {
   const statistics = [
      {
         count: '100+',
         title: 'Courses',
         image: '/assets/images/students-1.jpg',
      },
      {
         count: '300+',
         title: 'Students',
         image: '/assets/images/students-2.jpg',
      },
      {
         count: '40k+',
         title: 'Enrollments',
         image: '/assets/images/students-3.jpg',
      },
   ];

   return (
      <EditorDiv className="overflow-y-hidden bg-cover bg-center py-[120px]">
         <EditorSection>
            <EditorContainer className="relative">
               <EditorDiv className="relative z-10 flex flex-col items-center justify-center gap-7 md:flex-row">
                  <EditorDiv className="relative w-full space-y-7 md:max-w-[384px]">
                     <EditorDiv className="relative z-10 mb-6">
                        <EditorHeading className="text-2xl font-bold md:text-[30px]">
                           Our Success Depends on Our Students Success
                        </EditorHeading>
                        <EditorParagraph className="mt-2 text-muted-foreground">
                           We are proud of our students' achievements. Every
                           milestone they reach is a testament to our commitment
                           to quality education and their dedication to
                           learning.
                        </EditorParagraph>
                     </EditorDiv>

                     <EditorLink href="/courses/all" type="inertia">
                        <EditorButton className="h-10 cursor-pointer bg-linear-to-r from-[#00A67F] to-[#0077B6]">
                           Browse Courses
                        </EditorButton>
                     </EditorLink>

                     <EditorDiv className="relative z-10 flex items-center justify-center gap-2.5 lg:justify-start">
                        {statistics.map((stat, index) => (
                           <EditorDiv key={`item-${index}`}>
                              <EditorHeading className="text-2xl font-bold md:text-[30px]">
                                 {stat.count}
                              </EditorHeading>
                              <EditorParagraph className="text-sm text-muted-foreground">
                                 {stat.title}
                              </EditorParagraph>
                           </EditorDiv>
                        ))}
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv className="grid grid-cols-1 gap-7 md:grid-cols-3">
                     {statistics.map((stat, index) => (
                        <EditorDiv key={`item-${index}`} className="h-[400px]">
                           <EditorImage
                              src={stat.image}
                              alt={stat.title}
                              className="h-full w-full rounded-2xl object-cover object-center"
                           />
                        </EditorDiv>
                     ))}
                  </EditorDiv>
               </EditorDiv>

               <EditorDiv className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,120,103,0.45)_0%,transparent_70%)] opacity-40 content-['']"></EditorDiv>
               <EditorDiv className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-40 content-['']"></EditorDiv>
            </EditorContainer>
         </EditorSection>
      </EditorDiv>
   );
};

export default SuccessStatistics;
