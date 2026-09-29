import { router, usePage } from '@inertiajs/react';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import ChangeEmail from '@/components/account/change-email';
import ChangePassword from '@/components/account/change-password';
import ForgetPassword from '@/components/account/forget-password';
import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { getQueryParams } from '@/lib/route';
import instructorRoutes from '@/routes/instructor';
import UpdateProfile from './partials/update-profile';

interface Props extends SharedData {
   tab: string;
   instructor: Instructor;
}

const Account = ({ tab, instructor, translate }: Props) => {
   const page = usePage();
   const params = getQueryParams(page.url);
   const { button, settings } = translate;

   const tabs = [
      {
         id: nanoid(),
         slug: 'profile-update',
         title: button.profile_update,
         Component: () => <UpdateProfile instructor={instructor} />,
      },
      {
         id: nanoid(),
         slug: 'change-email',
         title: button.change_email,
         Component: ChangeEmail,
      },
      {
         id: nanoid(),
         slug: 'change-password',
         title: button.change_password,
         Component: ChangePassword,
      },
      {
         id: nanoid(),
         slug: 'forget-password',
         title: button.forget_password,
         Component: ForgetPassword,
      },
      // {
      //    id: nanoid(),
      //    slug: 'delete-account',
      //    title: 'Delete Account',
      //    Component: DeleteUser,
      // },
   ];

   return (
      <>
         <Breadcrumbs
            title={settings.account_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: tab ? tab.split('-').join(' ') : 'Profile Update' },
            ]}
            className="mb-4"
         />

         <Tabs
            value={params['tab'] ?? tabs[0].slug}
            className="grid grid-rows-1 gap-5 md:grid-cols-4 md:px-3"
         >
            <div>
               <TabsList className="horizontal-tabs-list">
                  {tabs.map(({ id, slug, title }) => (
                     <TabsTrigger
                        key={id}
                        value={slug}
                        className="horizontal-tabs-trigger"
                        onClick={() =>
                           router.get(
                              instructorRoutes.index({
                                 query: { tab: slug },
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
               {tabs.map(({ id, slug, Component }) => (
                  <TabsContent key={id} value={slug} className="m-0">
                     <Component />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </>
   );
};

Account.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Account;
