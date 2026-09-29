import { Head } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { AppShell } from '@/layouts/dashboard/partials/app-shell';
import Main from '../main';
import DashboardHeader from './header';
import DashboardSidebar from './sidebar';

interface Props {
   headTitle?: string;
}

const DashboardLayout = (props: PropsWithChildren<Props>) => {
   const { children, headTitle } = props;

   return (
      <Main>
         {headTitle && <Head title={headTitle} />}
         <AppShell variant="sidebar">
            <DashboardSidebar />

            <div className="relative flex h-svh w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl">
               <DashboardHeader />

               <div className="flex-1 overflow-y-auto pt-16 pb-6">
                  <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6">
                     {children}
                  </div>
               </div>
            </div>
         </AppShell>
      </Main>
   );
};

export default DashboardLayout;
