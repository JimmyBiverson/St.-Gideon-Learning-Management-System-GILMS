import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorHeading,
   EditorImage,
   EditorParagraph,
   EditorSection,
} from '@/frontend/lib/components';

const CallToAction = () => {
   return (
      <EditorDiv className="bg-[#004B50] py-[120px]">
         <EditorSection>
            <EditorContainer className="space-y-5 text-center text-white">
               <EditorHeading className="text-2xl leading-tight font-bold md:text-3xl md:leading-9">
                  Subscribe Our Newsletter
               </EditorHeading>

               <EditorDiv className="mx-auto w-full max-w-[420px] text-center">
                  <EditorParagraph className="mb-3">
                     Transform your career with expert-led courses. Join
                     thousands of learners today
                  </EditorParagraph>

                  <EditorDynamicWrapper
                     api=""
                     apiMethod="POST"
                     componentRef="email-subscribe-input"
                  />
               </EditorDiv>

               <EditorDiv className="flex items-center justify-center gap-2">
                  <EditorDiv className="flex -space-x-2">
                     <EditorImage
                        src="/assets/avatars/avatar-1.png"
                        alt="User"
                        className="h-8 w-8 rounded-full ring-2 ring-white grayscale"
                     />
                     <EditorImage
                        src="/assets/avatars/avatar-2.png"
                        alt="User"
                        className="h-8 w-8 rounded-full ring-2 ring-white grayscale"
                     />
                     <EditorImage
                        src="/assets/avatars/avatar-3.png"
                        alt="User"
                        className="h-8 w-8 rounded-full ring-2 ring-white grayscale"
                     />
                     <EditorImage
                        src="/assets/avatars/avatar-4.png"
                        alt="User"
                        className="h-8 w-8 rounded-full ring-2 ring-white grayscale"
                     />
                  </EditorDiv>
                  <EditorParagraph className="font-medium">
                     +12,000 subscribers worldwide
                  </EditorParagraph>
               </EditorDiv>
            </EditorContainer>
         </EditorSection>
      </EditorDiv>
   );
};

export default CallToAction;
