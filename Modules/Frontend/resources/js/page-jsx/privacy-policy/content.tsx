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
                  Privacy Policy
               </EditorHeading>

               <EditorDiv className="space-y-6">
                  <EditorParagraph>
                     Welcome to Mentor. We are committed to protecting your
                     privacy and ensuring that your personal information is
                     handled in a safe and responsible manner. This Privacy
                     Policy outlines how we collect, use, and protect your
                     information when you use our platform.
                  </EditorParagraph>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        1. Information We Collect
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        We collect various types of information in connection
                        with the services we provide, including:
                     </EditorParagraph>
                     <EditorList className="ml-4 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Personal Information:
                              </EditorSpan>
                              <EditorSpan>
                                 When you register for an account, we may
                                 collect personal details such as your name,
                                 email address, phone number, and payment
                                 information.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>

                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Usage Data:
                              </EditorSpan>
                              <EditorSpan>
                                 We collect information about your interactions
                                 with our platform, such as the pages you visit,
                                 the courses you access, and other actions you
                                 take.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Cookies and Tracking Technologies:
                              </EditorSpan>
                              <EditorSpan>
                                 We use cookies and similar technologies to
                                 track your activity on our platform and hold
                                 certain information.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        2. How We Use Your Information
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        We use the information we collect for various purposes,
                        including:
                     </EditorParagraph>
                     <EditorList className="ml-6 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Providing Services:
                              </EditorSpan>
                              <EditorSpan>
                                 To create and manage your account, process
                                 transactions, and provide the courses and
                                 services you request.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Improving Our Platform:
                              </EditorSpan>
                              <EditorSpan>
                                 To analyze usage patterns and improve the
                                 functionality and user experience of our
                                 platform.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Communication:
                              </EditorSpan>
                              <EditorSpan>
                                 To send you updates, newsletters, and other
                                 information that may be of interest to you. You
                                 can opt-out of receiving these communications
                                 at any time.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Security:
                              </EditorSpan>
                              <EditorSpan>
                                 To monitor and protect the security of our
                                 platform and its users.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        3. Sharing Your Information
                     </EditorHeading>
                     <EditorParagraph className="mb-3">
                        We may share your information with third parties in the
                        following circumstances:
                     </EditorParagraph>
                     <EditorList className="ml-6 space-y-2">
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Service Providers:
                              </EditorSpan>
                              <EditorSpan>
                                 We may share your information with third-party
                                 service providers who perform services on our
                                 behalf, such as payment processing, data
                                 analysis, and email delivery.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Legal Requirements:
                              </EditorSpan>
                              <EditorSpan>
                                 We may disclose your information if required to
                                 do so by law or in response to valid requests
                                 by public authorities.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                        <EditorDiv className="flex items-start gap-2">
                           <EditorSpan className="font-bold">•</EditorSpan>
                           <EditorListItem>
                              <EditorSpan className="mx-2 font-bold">
                                 Business Transfers:
                              </EditorSpan>
                              <EditorSpan>
                                 In the event of a merger, acquisition, or sale
                                 of all or a portion of our assets, your
                                 information may be transferred as part of that
                                 transaction.
                              </EditorSpan>
                           </EditorListItem>
                        </EditorDiv>
                     </EditorList>
                  </EditorDiv>

                  <EditorDiv>
                     <EditorHeading className="mb-3 text-lg font-bold">
                        4. Data Security
                     </EditorHeading>
                     <EditorParagraph>
                        We implement appropriate security measures to protect
                        your information from unauthorized access, alteration,
                        disclosure, or destruction. However, no method of
                        transmission over the internet or electronic storage is
                        100% secure, and we cannot guarantee its absolute
                        security.
                     </EditorParagraph>
                  </EditorDiv>
               </EditorDiv>
            </EditorDiv>
         </EditorContainer>
      </EditorSection>
   );
};

export default Content;
