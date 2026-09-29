import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';

import Footer from './partials/footer';
import Navbar from './partials/navbar';
import Style from './partials/style';
import Website from './partials/website';

export interface SystemProps extends SharedData {
   system: Settings<SystemFields>;
}

const System = () => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, button } = translate;

   return (
      <>
         <Breadcrumbs
            title={settings.system_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'System Settings' },
            ]}
            className="mb-4"
         />

         <Tabs defaultValue="website" className="md:px-3">
            <div className="overflow-x-auto overflow-y-hidden">
               <TabsList className="h-13 px-2">
                  <TabsTrigger
                     value="website"
                     className="h-10 cursor-pointer px-6"
                  >
                     {button.website}
                  </TabsTrigger>
                  <TabsTrigger
                     value="navbar"
                     className="h-10 cursor-pointer px-6"
                  >
                     {button.navbar}
                  </TabsTrigger>
                  <TabsTrigger
                     value="footer"
                     className="h-10 cursor-pointer px-6"
                  >
                     {button.footer}
                  </TabsTrigger>
                  <TabsTrigger
                     value="style"
                     className="h-10 cursor-pointer px-6"
                  >
                     {button.style}
                  </TabsTrigger>
               </TabsList>
            </div>

            <TabsContent value="website">
               <Website />
            </TabsContent>
            <TabsContent value="navbar">
               <Navbar />
            </TabsContent>
            <TabsContent value="footer">
               <Footer />
            </TabsContent>
            <TabsContent value="style">
               <Style />
            </TabsContent>
         </Tabs>
      </>
   );
};

System.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default System;
