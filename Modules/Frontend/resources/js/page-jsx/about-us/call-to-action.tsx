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
      <EditorSection className="bg-secondary-100er border-t border-secondary-100 py-20">
         <EditorContainer className="space-y-5 rounded-4xl bg-[rgba(0,114,98,1)] bg-[url('/assets/images/intro/home-1/cta-bg-vector.png')] bg-cover bg-center px-6 py-[104px] text-center text-white">
            <EditorHeading className="text-2xl leading-tight font-bold md:text-3xl md:leading-9">
               Subscribe to our newsletter to get the latest news and updates
            </EditorHeading>

            <EditorDiv className="mx-auto w-full max-w-[420px] text-center">
               <EditorParagraph className="mb-3">
                  Subscribe to our newsletter to get the latest news and
                  updates. We will not spam you.
               </EditorParagraph>

               <EditorDynamicWrapper componentRef="email-subscribe-input" />
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default CallToAction;
