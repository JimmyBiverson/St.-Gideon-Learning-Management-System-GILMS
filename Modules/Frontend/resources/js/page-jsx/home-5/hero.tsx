import {
   EditorContainer,
   EditorDiv,
   EditorDynamicWrapper,
   EditorSection,
} from '@/frontend/lib/components';

const Hero = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer className="relative">
            <EditorDynamicWrapper
               api="api/collections/courses/top"
               apiMethod="GET"
               componentRef="top-courses-1"
            />

            <EditorDiv className="pointer-events-none absolute -bottom-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>

            <EditorDiv className="pointer-events-none absolute -top-100 -right-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']"></EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Hero;
