import LandingLayout from '@/layouts/landing';
import { Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import PageRenderer from '@/frontend/page-jsx/page-renderer';
import { useGeneratePageHtml } from '../lib/generate-page-html';

const Index = (props: FrontendPageProps) => {
   const { page } = props;
   const { props: pageProps } = usePage<FrontendPageProps>();
   const { system } = pageProps;
   const pageData = page?.content ? JSON.parse(page.content) : null;

   // Background HTML capture — portal runs in a hidden off-screen container.
   // Does NOT affect what is visible or what SSR renders.
   const { portal } = useGeneratePageHtml(pageData?.[0] ?? null);

   const siteName = system?.fields?.name;
   const pageTitle = page?.title ?? siteName;
   const pageDescription =
      page?.description || system?.fields?.description || '';
   const ogImage = page?.banner || system?.fields?.banner || '';
   const siteUrl = typeof window !== 'undefined' ? window.location.href : '';

   return (
      <>
         <Head>
            <title>{pageTitle}</title>
            {pageDescription && (
               <meta name="description" content={pageDescription} />
            )}

            {/* Open Graph Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={page?.title || siteName} />
            {pageDescription && (
               <meta property="og:description" content={pageDescription} />
            )}
            <meta property="og:site_name" content={siteName} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogImage && <meta property="og:image:width" content="1200" />}
            {ogImage && <meta property="og:image:height" content="630" />}

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={page?.title || siteName} />
            {pageDescription && (
               <meta name="twitter:description" content={pageDescription} />
            )}
            {ogImage && <meta name="twitter:image" content={ogImage} />}
         </Head>

         {pageData ? (
            <>
               {/* Hidden off-screen portal — background HTML capture only.
                   Inherits Inertia context so usePage/Link/API calls all work. */}
               {portal}

               {/* Rendered directly — SSR writes full HTML to page source,
                   client hydrates and makes everything interactive. */}
               <PageRenderer pageData={pageData[0]} />
            </>
         ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
               <div className="mx-4 max-w-md space-y-6 rounded-2xl bg-white p-8 text-center shadow-xl">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                     <svg
                        className="h-12 w-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                     </svg>
                  </div>
                  <div className="space-y-2">
                     <h1 className="text-2xl font-bold">
                        Page Content Not Available
                     </h1>
                     <p className="text-muted-foreground">
                        This page is still being created. The content will
                        appear here once it's ready.
                     </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                     <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                     <span>Building amazing content...</span>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

Index.layout = (page: ReactNode) => (
   <LandingLayout children={page} language={true} />
);

export default Index;
