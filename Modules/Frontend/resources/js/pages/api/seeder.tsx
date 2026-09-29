import { Button } from '@/components/ui/button';
import { index } from '@/routes/frontend-pages';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { convertPageToEditorElement } from '@/frontend/lib/jsx-to-editor-element';
import aboutUsPageData from '@/frontend/page-jsx/about-us';
import contactUsPageData from '@/frontend/page-jsx/contact-us';
import cookiePolicyPageData from '@/frontend/page-jsx/cookie-policy';
import home1PageData from '@/frontend/page-jsx/home-1';
import home2PageData from '@/frontend/page-jsx/home-2';
import home3PageData from '@/frontend/page-jsx/home-3';
import home4PageData from '@/frontend/page-jsx/home-4';
import home5PageData from '@/frontend/page-jsx/home-5';
import ourTeamPageData from '@/frontend/page-jsx/our-team';
import privacyPolicyPageData from '@/frontend/page-jsx/privacy-policy';
import refundPolicyPageData from '@/frontend/page-jsx/refund-policy';
import termsAndConditionsPageData from '@/frontend/page-jsx/terms-and-conditions';

const Seeder = () => {
   const home1 = convertPageToEditorElement(home1PageData());
   const home2 = convertPageToEditorElement(home2PageData());
   const home3 = convertPageToEditorElement(home3PageData());
   const home4 = convertPageToEditorElement(home4PageData());
   const home5 = convertPageToEditorElement(home5PageData());
   const aboutUs = convertPageToEditorElement(aboutUsPageData());
   const ourTeam = convertPageToEditorElement(ourTeamPageData());
   const contactUs = convertPageToEditorElement(contactUsPageData());
   const cookiePolicy = convertPageToEditorElement(cookiePolicyPageData());
   const privacyPolicy = convertPageToEditorElement(privacyPolicyPageData());
   const refundPolicy = convertPageToEditorElement(refundPolicyPageData());
   const termsAndConditions = convertPageToEditorElement(
      termsAndConditionsPageData(),
   );

   // One-shot seed: listing converted page objects as deps would re-run saves every render (new object identities).

   useEffect(() => {
      // Get CSRF token from meta tag
      const csrfToken = document
         .querySelector('meta[name="csrf-token"]')
         ?.getAttribute('content');

      // Example: Save home-1 page data
      const savePageData = async (slug: string, pageData: any) => {
         try {
            const response = await fetch(
               `${window.location.origin}/api/store-page/${slug}`,
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                     'X-CSRF-TOKEN': csrfToken || '',
                  },
                  body: JSON.stringify({ pageData: [pageData] }),
               },
            );

            await response.json();
         } catch (error) {
            console.error('Error saving page data:', error);
         }
      };

      // Usage with your page data
      savePageData('home-1', home1);
      savePageData('home-2', home2);
      savePageData('home-3', home3);
      savePageData('home-4', home4);
      savePageData('home-5', home5);
      savePageData('about-us', aboutUs);
      savePageData('our-team', ourTeam);
      savePageData('contact-us', contactUs);
      savePageData('cookie-policy', cookiePolicy);
      savePageData('terms-and-conditions', termsAndConditions);
      savePageData('privacy-policy', privacyPolicy);
      savePageData('refund-policy', refundPolicy);
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
         <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
               <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M5 13l4 4L19 7"
                  />
               </svg>
            </div>

            <h1 className="mb-3 text-2xl font-bold">
               Editor Pages Default Content
            </h1>

            <p className="mb-8 text-muted-foreground">
               All home page templates have been successfully saved to the
               database. Your page editor is now ready with default content.
            </p>

            <div className="space-y-3">
               <Link href="/">
                  <Button className="w-full">Back to Home</Button>
               </Link>

               <Link href={index()}>
                  <Button variant="outline" className="w-full">
                     Manage Pages
                  </Button>
               </Link>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
               <p className="text-xs text-gray-500">
                  Pages saved: Home 1, Home 2, Home 3, Home 4
               </p>
            </div>
         </div>
      </div>
   );
};

export default Seeder;
