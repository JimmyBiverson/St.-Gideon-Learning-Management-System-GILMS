import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Partners = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto mb-10 text-center md:max-w-xl">
               <EditorParagraph className="mb-1 font-medium text-secondary-foreground">
                  Partners
               </EditorParagraph>
               <EditorHeading className="mb-4 text-3xl font-bold sm:text-4xl">
                  Trusted by Leading Companies
               </EditorHeading>
               <EditorParagraph className="text-muted-foreground">
                  We collaborate with industry leaders to provide world-class
                  education
               </EditorParagraph>
            </EditorDiv>

            <EditorDiv className="p-y-12 md:p-y-16 grid grid-cols-2 justify-center gap-12 md:grid-cols-3 lg:grid-cols-6">
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-1.png"
                  alt=""
               />
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-2.png"
                  alt=""
               />
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-3.png"
                  alt=""
               />
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-4.png"
                  alt=""
               />
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-5.png"
                  alt=""
               />
               <EditorImage
                  className="w-full"
                  src="/assets/logos/logo-6.png"
                  alt=""
               />
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Partners;
