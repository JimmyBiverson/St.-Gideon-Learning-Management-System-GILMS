import {
   EditorContainer,
   EditorDiv,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Partners = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorParagraph className="mb-8 text-center text-muted-foreground">
               Trusted by over 100 leading companies worldwide
            </EditorParagraph>

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
