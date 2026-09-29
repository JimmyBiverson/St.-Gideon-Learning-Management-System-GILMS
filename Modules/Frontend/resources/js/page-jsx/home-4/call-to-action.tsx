import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const CallToAction = () => {
   return (
      <EditorDiv className="bg-[rgba(79,103,254,0.06)] py-20">
         <EditorSection>
            <EditorContainer>
               <EditorDiv className="relative grid grid-cols-1 items-center gap-12 space-y-5 overflow-hidden rounded-2xl bg-[rgba(79,103,254,1)] bg-cover bg-center px-7 py-[60px] text-white md:grid-cols-2 md:px-[120px]">
                  {/* Background Image */}
                  {/* <EditorImage src="/assets/images/intro/home-4/cta-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" /> */}

                  {/* Content - Left Side */}
                  <EditorDiv className="relative z-10 space-y-2">
                     <EditorHeading className="text-2xl leading-tight font-bold text-white md:text-3xl md:leading-9">
                        Subscribe to My Newsletter
                     </EditorHeading>
                     <EditorParagraph className="text-white">
                        Stay ahead in digital design with curated insights,
                        learning tips, and course updates every week.
                     </EditorParagraph>
                  </EditorDiv>

                  {/* Subscribe Input Placeholder */}
                  <EditorDynamicWrapper componentRef="email-subscribe-input" />
               </EditorDiv>
            </EditorContainer>
         </EditorSection>
      </EditorDiv>
   );
};

export default CallToAction;
