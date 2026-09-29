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
      <EditorSection className="py-20">
         <EditorContainer className="relative z-10">
            <EditorDiv className="mx-auto w-full max-w-[820px] rounded-2xl bg-[#007867] px-6 py-20 md:rounded-3xl md:px-10">
               <EditorDiv className="mx-auto w-full max-w-[420px] text-center text-white">
                  <EditorHeading className="text-2xl leading-tight font-bold text-white md:text-3xl md:leading-9">
                     Subscribe Our Newsletter
                  </EditorHeading>
                  <EditorParagraph className="mt-3 mb-6">
                     Subscribe to our newsletter to get the latest news and
                     updates. We will not spam you.
                  </EditorParagraph>

                  {/* Subscribe Input Placeholder */}
                  <EditorDynamicWrapper componentRef="email-subscribe-input" />
               </EditorDiv>
            </EditorDiv>

            <EditorDiv className="pointer-events-none absolute -top-80 -left-60 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>

            <EditorDiv className="pointer-events-none absolute -right-60 -bottom-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default CallToAction;
