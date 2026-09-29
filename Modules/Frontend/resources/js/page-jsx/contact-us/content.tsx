import {
   EditorContainer,
   EditorDiv,
   EditorHeading,
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
                  Contact Us
               </EditorHeading>

               <EditorDiv className="space-y-6">
                  <EditorParagraph className="text-center">
                     We're here to help! Whether you have questions about our
                     courses, need technical support, or want to provide
                     feedback, we'd love to hear from you. Here are the best
                     ways to get in touch with our team.
                  </EditorParagraph>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        General Inquiries
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        For general questions about Mentor, our courses, or our
                        platform, please email us at:
                     </EditorParagraph>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">Email:</EditorSpan>{' '}
                        <EditorSpan>info@example.com</EditorSpan>
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        Technical Support
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        If you're experiencing technical issues or need help
                        with your account, our support team is ready to assist
                        you:
                     </EditorParagraph>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">Email:</EditorSpan>{' '}
                        <EditorSpan>support@uilib.com</EditorSpan>
                     </EditorDiv>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">
                           Response Time:
                        </EditorSpan>
                        <EditorSpan>
                           We typically respond to support requests within 24
                           hours.
                        </EditorSpan>
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        Partnership &amp; Business Inquiries
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        Interested in partnering with Mentor or have
                        business-related questions? Contact our business
                        development team.
                     </EditorParagraph>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">Email:</EditorSpan>{' '}
                        <EditorSpan>partnerships@example.com</EditorSpan>
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        Career Opportunities
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        Looking to join our team? Visit our Careers page or send
                        your resume to:
                     </EditorParagraph>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">Email:</EditorSpan>{' '}
                        <EditorSpan>careers@example.com</EditorSpan>
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        Feedback &amp; Suggestions
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        We value your feedback and are always looking for ways
                        to improve. Share your thoughts and suggestions with us:
                     </EditorParagraph>
                     <EditorDiv className="flex items-center gap-2 text-sm">
                        <EditorSpan className="font-bold">Email:</EditorSpan>{' '}
                        <EditorSpan>feedback@example.com</EditorSpan>
                     </EditorDiv>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        Office Address
                     </EditorHeading>
                     <EditorHeading className="mb-3 text-base font-bold">
                        Mentor Headquarters
                     </EditorHeading>
                     <EditorParagraph>
                        123 Education Street Learning City, LC 12345 United
                        States
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Content;
