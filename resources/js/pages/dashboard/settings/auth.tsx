import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { getQueryParams } from '@/lib/route';
import auth0Routes from '@/routes/auth0';
import Google from './partials/google';
import Recaptcha from './partials/recaptcha';

interface Props extends SharedData {
   auths: Settings<GoogleAuthFields | RecaptchaAuthFields | any>[];
}

const Auth = ({ auths }: Props) => {
   const { props, url } = usePage<SharedData>();
   const params = getQueryParams(url);

   const tabs = auths.map((auth) => {
      let Component;

      switch (auth.sub_type) {
         case 'google':
            Component = Google;
            break;

         case 'recaptcha':
            Component = Recaptcha;
            break;

         default:
            Component = ({ auth }: { auth: any }) => (
               <div>No component found</div>
            );
            break;
      }

      return {
         ...auth,
         Component,
      };
   });

   return (
      <>
         <Breadcrumbs
            title="Authentication Settings"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Authentication Settings' },
            ]}
            className="mb-4"
         />

         <Tabs
            value={params['tab'] ?? tabs[0].sub_type}
            className="grid grid-rows-1 gap-5 md:grid-cols-4 md:px-3"
         >
            <div>
               <TabsList className="horizontal-tabs-list">
                  {tabs.map(({ id, title, sub_type }) => (
                     <TabsTrigger
                        key={id}
                        value={sub_type}
                        className="horizontal-tabs-trigger"
                        onClick={() =>
                           router.get(
                              auth0Routes.index({
                                 query: { tab: sub_type },
                              }),
                           )
                        }
                     >
                        {title}
                     </TabsTrigger>
                  ))}
               </TabsList>
            </div>

            <div className="md:col-span-3">
               {tabs.map((auth) => (
                  <TabsContent
                     key={auth.id}
                     value={auth.sub_type}
                     className="m-0"
                  >
                     <auth.Component key={auth.id} auth={auth} />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </>
   );
};

Auth.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Auth;
