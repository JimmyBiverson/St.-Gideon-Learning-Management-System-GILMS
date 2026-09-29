import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const CallToAction = () => {
   return (
      <EditorSection className="bg-secondary-100er py-20">
         <EditorContainer className="rounded-4xl bg-[rgba(0,114,98,1)]">
            <EditorDiv className="space-y-5 bg-[url('/assets/images/intro/home-1/cta-bg-vector.png')] bg-cover bg-center px-6 py-14 text-center text-white">
               <EditorHeading className="text-2xl leading-tight font-bold md:text-3xl md:leading-9">
                  Subscribe Our Newsletter
               </EditorHeading>

               <EditorDiv className="mx-auto w-full max-w-[420px] text-center">
                  <EditorParagraph className="mb-3">
                     Subscribe to our newsletter to get the latest news and
                     updates. We will not spam you.
                  </EditorParagraph>

                  {/* <SubscribeInput
                            buttonText={ctaSection?.properties?.button_text}
                        /> */}
               </EditorDiv>

               <EditorDiv className="flex items-center justify-center">
                  <EditorDiv className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-1.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-2.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-3.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-4.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-5.png"
                        alt=""
                     />
                     <EditorImage
                        className="!h-8 !w-8 rounded-full"
                        src="/assets/avatars/avatar-6.png"
                        alt=""
                     />
                  </EditorDiv>
                  <EditorParagraph className="font-medium">
                     +2000 readers worldwide
                  </EditorParagraph>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default CallToAction;
