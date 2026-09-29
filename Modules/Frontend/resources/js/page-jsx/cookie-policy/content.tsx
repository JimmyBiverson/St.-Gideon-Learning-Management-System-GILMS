import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
   EditorList,
   EditorListItem,
   EditorParagraph,
   EditorSection,
   EditorSpan,
} from '@/frontend/lib/components';

const Content = () => {
   return (
      <EditorSection className="py-20">
         <EditorContainer>
            <EditorDiv className="mx-auto max-w-3xl rounded-2xl bg-gray-50 p-8 md:p-12 dark:bg-gray-900">
               <EditorHeading className="mb-8 text-center text-3xl font-bold">
                  Cookie policy
               </EditorHeading>

               <EditorList className="space-y-4 pl-2">
                  <EditorListItem className="flex items-start gap-3">
                     <EditorSpan>1.</EditorSpan>
                     <EditorParagraph>
                        Cookies are small text files that can be used by
                        websites to make a user's experience more efficient.
                     </EditorParagraph>
                  </EditorListItem>
                  <EditorListItem className="flex items-start gap-3">
                     <EditorSpan>2.</EditorSpan>
                     <EditorParagraph>
                        The law states that we can store cookies on your device
                        if they are strictly necessary for the operation of this
                        site. For all other types of cookies we need your
                        permission.
                     </EditorParagraph>
                  </EditorListItem>
                  <EditorListItem className="flex items-start gap-3">
                     <EditorSpan>3.</EditorSpan>
                     <EditorParagraph>
                        This site uses different types of cookies. Some cookies
                        are placed by third party services that appear on our
                        pages.
                     </EditorParagraph>
                  </EditorListItem>
               </EditorList>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Content;
