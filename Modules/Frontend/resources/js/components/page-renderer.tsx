import { lazy, Suspense } from 'react';

// Lazy load heavy components only when needed
const ElementRender = lazy(() =>
   import('../page-jsx/page-renderer').then((module) => ({
      default: module.default,
   })),
);

interface Props {
   pageData: any;
}

const FrontendPageRenderer = ({ pageData }: Props) => {
   return (
      <Suspense
         fallback={
            <div className="flex min-h-screen items-center justify-center">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            </div>
         }
      >
         <ElementRender pageData={pageData} />
      </Suspense>
   );
};

export default FrontendPageRenderer;
