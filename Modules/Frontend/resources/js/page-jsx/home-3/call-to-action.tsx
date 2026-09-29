import {
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const CallToAction = () => {
   return (
      <EditorDiv className="bg-[#004B50] py-20">
         <EditorSection className="space-y-5 text-center text-white">
            <EditorHeading className="text-2xl leading-tight font-bold md:text-3xl md:leading-9">
               Subscribe for course updates & discounts
            </EditorHeading>

            <EditorDiv className="mx-auto w-full max-w-[420px] text-center">
               <EditorParagraph className="mb-3">
                  Subscribe to our newsletter to get the latest news and
                  updates. We will not spam you.
               </EditorParagraph>

               {/* Subscribe Input Placeholder */}
               <EditorDynamicWrapper componentRef="email-subscribe-input" />
            </EditorDiv>

            <EditorDiv className="flex items-center justify-center">
               <EditorDiv className="flex -space-x-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                  <EditorImage
                     className="!h-11 !w-11 rounded-full"
                     src="/assets/avatars/avatar-1.png"
                     alt=""
                  />
                  <EditorImage
                     className="!h-11 !w-11 rounded-full"
                     src="/assets/avatars/avatar-2.png"
                     alt=""
                  />
                  <EditorImage
                     className="!h-11 !w-11 rounded-full"
                     src="/assets/avatars/avatar-3.png"
                     alt=""
                  />
                  <EditorImage
                     className="!h-11 !w-11 rounded-full"
                     src="/assets/avatars/avatar-4.png"
                     alt=""
                  />
                  <EditorImage
                     className="!h-11 !w-11 rounded-full"
                     src="/assets/avatars/avatar-5.png"
                     alt=""
                  />
               </EditorDiv>
               <EditorParagraph className="font-medium">
                  +2000 readers worldwide
               </EditorParagraph>
            </EditorDiv>
         </EditorSection>
      </EditorDiv>
   );
};

export default CallToAction;
