import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Hero = () => {
   const heroData = [
      {
         title: 'Our Mission',
         description:
            'To democratize education by making high-quality learning accessible to everyone, everywhere. We strive to bridge the gap between knowledge and application. Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives.',
         image: '/assets/images/team-1.jpg',
      },
      {
         title: 'Our Value',
         description:
            'We believe in fostering a love for lifelong learning through innovative teaching methods, personalized experiences, and supportive communities. Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives.',
         image: '/assets/images/team-2.jpg',
      },
   ];

   return (
      <EditorSection className="py-20 md:py-[120px]">
         <EditorContainer>
            <EditorDiv className="relative z-10 flex flex-col items-center justify-center gap-7 md:flex-row">
               <EditorDiv className="grid w-full max-w-[692px] grid-cols-1 gap-7 md:grid-cols-2">
                  {heroData.map((item, index) => (
                     <EditorDiv key={`image-${index}`} className="h-[356px]">
                        <EditorImage
                           src={item.image}
                           alt={item.title}
                           className="h-full w-full rounded-2xl object-cover object-center"
                        />
                     </EditorDiv>
                  ))}
               </EditorDiv>

               <EditorDiv className="w-full space-y-7 md:max-w-[480px]">
                  {heroData.map((item, index) => (
                     <EditorDiv key={`contents-${index}`} className="space-y-2">
                        <EditorHeading className="text-2xl font-bold md:text-[30px]">
                           {item.title}
                        </EditorHeading>
                        <EditorParagraph className="text-muted-foreground">
                           {item.description}
                        </EditorParagraph>
                     </EditorDiv>
                  ))}
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Hero;
