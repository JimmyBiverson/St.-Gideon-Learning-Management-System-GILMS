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
                  Terms and Conditions
               </EditorHeading>

               <EditorDiv className="space-y-6">
                  <EditorParagraph>
                     Welcome to Mentor. By accessing and using our platform, you
                     agree to comply with and be bound by the following terms
                     and conditions. Please read these terms carefully before
                     using our services.
                  </EditorParagraph>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        1. Acceptance of Terms
                     </EditorHeading>
                     <EditorParagraph>
                        By accessing and using the website and services, you
                        accept and agree to be bound by the terms and
                        conditions. If you do not agree to any part of these
                        terms, you should not use our services.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        2. Use of the Platform
                     </EditorHeading>
                     <EditorParagraph>
                        You may use Mentor for lawful purposes only. You must
                        not use our platform in any way that breaches any
                        applicable local, national, or international law or
                        regulation.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        3. Account Registration
                     </EditorHeading>
                     <EditorParagraph>
                        To access certain features of Mentor, you may be
                        required to create an account. You agree to provide
                        accurate and complete information during the
                        registration process and to keep your account
                        information up to date.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        4. User Conduct
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        You agree not to use Mentor to:
                     </EditorParagraph>
                     <EditorList className="ml-6 space-y-2">
                        <EditorListItem className="flex items-start gap-2">
                           <EditorSpan>•</EditorSpan>
                           <EditorParagraph>
                              Post, upload, or distribute any content that is
                              unlawful, defamatory, abusive, or otherwise
                              objectionable.
                           </EditorParagraph>
                        </EditorListItem>
                        <EditorListItem className="flex items-start gap-2">
                           <EditorSpan>•</EditorSpan>
                           <EditorParagraph>
                              Impersonate any person or entity, or falsely state
                              or otherwise misrepresent your affiliation with a
                              person or entity.
                           </EditorParagraph>
                        </EditorListItem>
                        <EditorListItem className="flex items-start gap-2">
                           <EditorSpan>•</EditorSpan>
                           <EditorParagraph>
                              Infringe upon the intellectual rights of others.
                           </EditorParagraph>
                        </EditorListItem>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        5. Intellectual Property
                     </EditorHeading>
                     <EditorParagraph>
                        All content on Mentor, including but not limited to
                        text, graphics, logos, and software, is the property of
                        Mentor or its content suppliers and is protected by
                        international copyright laws. You may not reproduce,
                        distribute, or create derivative works from any content
                        without our prior written consent.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        6. Payment and Refunds
                     </EditorHeading>
                     <EditorParagraph>
                        Certain courses and services on Mentor may be offered
                        for a fee. All payments are non-refundable unless
                        otherwise stated in our Refund Policy. Before making any
                        payment, please review the terms applicable to the
                        specific course or service.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        7. Termination
                     </EditorHeading>
                     <EditorParagraph>
                        Mentor reserves the right to terminate or suspend your
                        account and access to our platform at any time, without
                        prior notice, for any reason, including if we believe
                        you have violated these terms or engaged in any
                        fraudulent or illegal activity.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        8. Disclaimer of Warranties
                     </EditorHeading>
                     <EditorParagraph>
                        Mentor is provided on an "as is" and "as available"
                        basis without any warranties of any kind, either express
                        or implied. We do not guarantee that our services will
                        be uninterrupted, secure, or error-free.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        9. Limitation of Liability
                     </EditorHeading>
                     <EditorParagraph>
                        In no event shall Mentor, nor any of our officers,
                        directors, employees, or agents, be liable for any
                        indirect, incidental, special, consequential, or
                        punitive damages, or any loss of profits or revenues,
                        whether incurred directly or indirectly, or any loss of
                        data, use, goodwill, or other intangible losses,
                        resulting from your access to or use of or inability to
                        use our services.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        10. Changes to Terms
                     </EditorHeading>
                     <EditorParagraph>
                        Mentor reserves the right to modify these terms at any
                        time. We will notify you of any changes by posting the
                        new terms on this page. Your continued use of the
                        platform after any changes constitutes your acceptance
                        of the new terms.
                     </EditorParagraph>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        11. Governing Law
                     </EditorHeading>
                     <EditorParagraph>
                        These terms and conditions are governed by and construed
                        in accordance with the laws of the jurisdiction in which
                        Mentor operates, without regard to its conflict of law
                        principles.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Content;
