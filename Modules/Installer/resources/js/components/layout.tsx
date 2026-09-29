import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
   return (
      <div className="min-h-screen bg-gray-900 px-6 py-10">
         <div className="mx-auto w-full max-w-[750px] bg-background dark:bg-gray-950">
            <div className="p-6 pb-0 md:p-10 md:pb-0">
               <h5 className="text-center text-3xl font-semibold">
                  App Installation
               </h5>
            </div>

            <div className="p-6 md:p-10">{children}</div>
         </div>
      </div>
   );
};

export default Layout;
