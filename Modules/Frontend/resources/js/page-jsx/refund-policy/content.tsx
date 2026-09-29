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
                  Refund Policy
               </EditorHeading>

               <EditorDiv className="space-y-6">
                  <EditorParagraph>
                     At Mentor, we strive to provide the best learning
                     experience for our users. We understand that there may be
                     situations where you may need to request a refund. This
                     Refund Policy outlines the conditions and procedures for
                     obtaining a refund for purchases made on our platform.
                  </EditorParagraph>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        1. General Refund Policy
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        Our general refund policy applies to all courses and
                        services offered on Mentor. Refunds will be granted
                        under the following conditions:
                     </EditorParagraph>
                     <EditorList className="ml-4 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Course Not Accessed:
                              </EditorSpan>
                              <EditorSpan>
                                 If you have purchased a course and have not
                                 accessed any of its content, you may request a
                                 full refund within 14 days of the purchase
                                 date.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Technical Issues:
                              </EditorSpan>
                              <EditorSpan>
                                 If you experience technical issues that prevent
                                 you from accessing the course content and we
                                 are unable to resolve the issue, you may
                                 request a refund within 14 days of the purchase
                                 date.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        2. Non-Refundable Items
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        Certain items and services are not refundable. These
                        include:
                     </EditorParagraph>
                     <EditorList className="ml-6 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Downloaded Content:
                              </EditorSpan>
                              <EditorSpan>
                                 Any content that has been downloaded to your
                                 device is non-refundable.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Completed Courses:
                              </EditorSpan>
                              <EditorSpan>
                                 If you have completed a course, it is not
                                 eligible for a refund.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        3. How to Request a Refund
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        To request a refund, please follow these steps:
                     </EditorParagraph>
                     <EditorList className="ml-6 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">1.</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Contact Support:
                              </EditorSpan>
                              <EditorSpan>
                                 Email our support team at{' '}
                                 <EditorSpan className="font-bold">
                                    support@uilib.com
                                 </EditorSpan>{' '}
                                 with your refund request. Include your order
                                 number, the course name, and the reason for the
                                 refund request.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">2.</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Review Process:
                              </EditorSpan>
                              <EditorSpan>
                                 Our support team will review your request and
                                 may contact you for additional information. We
                                 aim to process all refund requests within 5-7
                                 business days.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">3.</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Refund Approval:
                              </EditorSpan>
                              <EditorSpan>
                                 If your refund request meets the conditions
                                 outlined in this policy, we will process the
                                 refund to your original method of payment.
                                 Please allow 5-10 business days for the refund
                                 to appear in your account.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        4. Changes to Refund Policy
                     </EditorHeading>
                     <EditorParagraph>
                        Mentor reserves the right to modify this Refund Policy
                        at any time. We will notify you of any changes by
                        posting the new policy on this page. Your continued use
                        of the platform after any changes constitutes your
                        acceptance of the new policy.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Content;
