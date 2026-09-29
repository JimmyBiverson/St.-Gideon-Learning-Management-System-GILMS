import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorLink,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const TopInstructors = () => {
   const instructors = [
      {
         name: 'Sarah Johnson',
         role: 'Lead Instructor',
         image: '/assets/images/users/user-1.jpg',
      },
      {
         name: 'Michael Chen',
         role: 'Course Designer',
         image: '/assets/images/users/user-2.jpg',
      },
      {
         name: 'Emily Rodriguez',
         role: 'Learning Experience Manager',
         image: '/assets/images/users/user-3.jpg',
      },
      {
         name: 'David Thompson',
         role: 'Technology Director',
         image: '/assets/images/users/user-4.jpg',
      },
      {
         name: 'Lisa Wang',
         role: 'Student Success Coordinator',
         image: '/assets/images/users/user-5.jpg',
      },
      {
         name: 'James Miller',
         role: 'Content Strategist',
         image: '/assets/images/users/user-6.jpg',
      },
      {
         name: 'Amanda Davis',
         role: 'Quality Assurance Lead',
         image: '/assets/images/users/user-7.jpg',
      },
      {
         name: 'Robert Kim',
         role: 'Community Manager',
         image: '/assets/images/users/user-8.jpg',
      },
   ];

   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="relative z-10 mx-auto mb-10 max-w-lg text-center">
               <EditorHeading className="mb-2 text-3xl font-bold sm:text-4xl">
                  Meet Our Experts
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  Our team is a group of passionate educators, developers, &
                  designers who believe in the power of learning to change
                  lives.
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
               {instructors.map((instructor, index) => (
                  <EditorLink
                     key={`instructor-${index}`}
                     type="inertia"
                     href={`/instructors/${index + 1}`}
                  >
                     <EditorDiv className="group rounded-2xl border bg-white p-3 shadow-sm transition-shadow hover:shadow-lg">
                        <EditorDiv className="mb-4 h-[260px] overflow-hidden rounded-lg">
                           <EditorImage
                              src={instructor.image}
                              alt={instructor.name}
                              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                           />
                        </EditorDiv>

                        <EditorDiv className="text-center">
                           <EditorHeading className="font-semibold">
                              {instructor.name}
                           </EditorHeading>
                           <EditorParagraph className="text-sm text-muted-foreground">
                              {instructor.role}
                           </EditorParagraph>
                        </EditorDiv>
                     </EditorDiv>
                  </EditorLink>
               ))}
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default TopInstructors;
