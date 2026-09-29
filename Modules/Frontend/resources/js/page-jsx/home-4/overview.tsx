import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorIcon,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Overview = () => {
   const stats = [
      {
         icon: 'users',
         count: '68k+',
         bg_color: 'rgba(249,217,128,1)',
         text_color: 'rgba(20,26,33,1)',
         image: '/assets/images/intro/home-4/overview-1.png',
         title: 'Join 68k+ students already mastering new skills.',
      },
      {
         icon: 'download',
         count: '32k+',
         bg_color: 'rgba(112,78,231,1)',
         text_color: 'rgba(255,255,255,1)',
         image: '/assets/images/intro/home-4/overview-2.png',
         title: 'Downloaded over 32,000 times by users worldwide.',
      },
      {
         icon: 'heart',
         count: '45k+',
         bg_color: 'rgba(223,200,253,1)',
         text_color: 'rgba(20,26,33,1)',
         image: '/assets/images/intro/home-4/overview-3.png',
         title: 'Loved by learners with 45k+ great reviews.',
      },
      {
         icon: 'award',
         count: '1.2k+',
         bg_color: 'rgba(0,120,103,1)',
         text_color: 'rgba(255,255,255,1)',
         image: '/assets/images/intro/home-4/overview-4.png',
         title: 'Recognized with more than 1,200 prestigious accolades.',
      },
   ];

   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
               {stats.map((stat, index) => (
                  <EditorDiv
                     key={index}
                     className="relative overflow-hidden rounded-3xl border-none px-6 py-10 shadow-none md:py-12"
                     styles={{
                        backgroundColor: stat.bg_color,
                        color: stat.text_color,
                     }}
                  >
                     <EditorImage
                        src={stat.image}
                        alt=""
                        className="absolute top-0 right-0 w-full max-w-[100px]"
                     />

                     <EditorDiv
                        className="flex h-14 w-14 items-center justify-center rounded-full"
                        styles={{
                           backgroundColor: `${stat.text_color.replace('1)', '0.1)')}`,
                        }}
                     >
                        <EditorIcon
                           name={stat.icon}
                           className="h-8 w-8"
                           styles={{ color: stat.text_color }}
                        />
                     </EditorDiv>

                     <EditorHeading
                        level="h3"
                        className="mt-8 text-3xl font-semibold md:text-4xl"
                        styles={{ color: stat.text_color }}
                     >
                        {stat.count}
                     </EditorHeading>
                     <EditorParagraph
                        className="mt-4 text-sm"
                        styles={{ color: stat.text_color }}
                     >
                        {stat.title}
                     </EditorParagraph>
                  </EditorDiv>
               ))}
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Overview;
