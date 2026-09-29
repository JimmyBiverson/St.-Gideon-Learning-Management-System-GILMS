import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const Features = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative z-10 grid gap-7 md:grid-cols-3">
            <EditorDiv className="relative overflow-hidden rounded-2xl border border-border shadow-card">
               <EditorDiv className="relative z-10 p-8">
                  <EditorDiv className="space-y-3">
                     <EditorImage
                        src="/assets/icons/globe-earth.png"
                        alt=""
                        className="!h-[60px] w-auto"
                     />
                     <EditorHeading level="h3" className="text-xl font-bold">
                        Learn Anything Anywhere
                     </EditorHeading>
                     <EditorParagraph className="leading-relaxed text-muted-foreground">
                        Where ever you are you can learn using our online
                        education platform. Where ever you are you can learn.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>

            <EditorDiv className="relative overflow-hidden rounded-2xl border border-border shadow-card">
               <EditorDiv className="relative z-10 p-8">
                  <EditorDiv className="space-y-3">
                     <EditorImage
                        src="/assets/icons/student.png"
                        alt=""
                        className="!h-[60px] w-auto"
                     />
                     <EditorHeading level="h3" className="text-xl font-bold">
                        World Class Instructors
                     </EditorHeading>
                     <EditorParagraph className="leading-relaxed text-muted-foreground">
                        Where ever you are you can learn using our online
                        education platform. Where ever you are you can learn.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>

            <EditorDiv className="relative overflow-hidden rounded-2xl border border-border shadow-card">
               <EditorDiv className="relative z-10 p-8">
                  <EditorDiv className="space-y-3">
                     <EditorImage
                        src="/assets/icons/laptop.png"
                        alt=""
                        className="!h-[60px] w-auto"
                     />
                     <EditorHeading level="h3" className="text-xl font-bold">
                        Lifetime Access
                     </EditorHeading>
                     <EditorParagraph className="leading-relaxed text-muted-foreground">
                        Where ever you are you can learn using our online
                        education platform. Where ever you are you can learn.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Features;
