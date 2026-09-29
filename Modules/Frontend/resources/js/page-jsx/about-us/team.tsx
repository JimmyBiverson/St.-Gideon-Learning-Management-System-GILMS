import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Team = () => {
   const teamMembers = [
      {
         name: 'John Doe',
         role: 'CEO & Founder',
         image: '/assets/images/users/user-1.jpg',
      },
      {
         name: 'Jane Smith',
         role: 'Lead Instructor',
         image: '/assets/images/users/user-2.jpg',
      },
      {
         name: 'Mike Johnson',
         role: 'Course Developer',
         image: '/assets/images/users/user-3.jpg',
      },
      {
         name: 'Sarah Williams',
         role: 'Marketing Director',
         image: '/assets/images/users/user-4.jpg',
      },
      {
         name: 'David Brown',
         role: 'Technical Lead',
         image: '/assets/images/users/user-5.jpg',
      },
      {
         name: 'Emily Davis',
         role: 'Content Strategist',
         image: '/assets/images/users/user-6.jpg',
      },
      {
         name: 'Robert Wilson',
         role: 'UX Designer',
         image: '/assets/images/users/user-7.jpg',
      },
      {
         name: 'Lisa Anderson',
         role: 'Community Manager',
         image: '/assets/images/users/user-8.jpg',
      },
   ];

   return (
      <EditorSection className="py-20 md:py-[120px]">
         <EditorContainer>
            <EditorDiv className="flex flex-col items-center justify-center gap-7 md:flex-row">
               <EditorDiv className="relative w-full space-y-7 md:max-w-[384px]">
                  <EditorHeading className="text-2xl font-bold md:text-[30px]">
                     The Minds Behind the Mission
                  </EditorHeading>
                  <EditorParagraph className="mt-4 text-muted-foreground">
                     Meet our passionate team of educators, developers, and
                     designers who believe in the power of learning to change
                     lives. Meet our passionate team of educators, developers,
                     and designers who believe in the power of learning to
                     change lives.
                  </EditorParagraph>
               </EditorDiv>

               <EditorDiv className="grid w-full max-w-[828px] grid-cols-2 gap-7 md:grid-cols-4">
                  {teamMembers.map((member, index) => (
                     <EditorDiv
                        key={`item-${index}`}
                        className="group relative h-[192px] overflow-hidden rounded-lg"
                     >
                        <EditorImage
                           src={member.image}
                           alt={member.name}
                           className="h-[192px] w-full rounded-lg object-cover object-center"
                        />

                        <EditorDiv className="absolute bottom-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col justify-end bg-linear-to-t from-primary p-4 text-center !opacity-0 transition-all duration-200 group-hover:!opacity-100 dark:from-primary-foreground">
                           <EditorParagraph className="font-semibold text-white">
                              {member.name}
                           </EditorParagraph>
                           <EditorParagraph className="text-xs text-white">
                              {member.role}
                           </EditorParagraph>
                        </EditorDiv>
                     </EditorDiv>
                  ))}
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Team;
