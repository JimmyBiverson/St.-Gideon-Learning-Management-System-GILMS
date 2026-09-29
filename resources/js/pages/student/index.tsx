import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Layout from './partials/layout';
import BecomeInstructor from './tabs-content/become-instructor';
import MyCourses from './tabs-content/my-courses';
import MyExams from './tabs-content/my-exams';
import MyProducts from './tabs-content/my-products';
import MyProfile from './tabs-content/my-profile';
import Settings from './tabs-content/settings';
import Wishlist from './tabs-content/wishlist';

const Index = (props: StudentDashboardProps) => {
   const { translate } = props;
   const { frontend } = translate;

   const renderContent = () => {
      switch (props.tab) {
         case 'courses':
            return <MyCourses />;
         case 'exams':
            return <MyExams />;
         case 'products':
            return <MyProducts />;
         case 'wishlist':
            return <Wishlist />;
         case 'profile':
            return <MyProfile />;
         case 'settings':
            return <Settings />;
         case 'instructor':
            return <BecomeInstructor />;
         default:
            return <></>;
      }
   };

   return (
      <>
         <Head title={frontend.student_dashboard} />

         {renderContent()}
      </>
   );
};

/**
 * Inertia v3 resolves a persistent layout by calling it twice: first with the
 * page props to probe the result, then with the page element, which is the
 * call that is actually rendered. A page prop therefore only ever exists
 * under `props` on the second call, and is at the top level on the first.
 * Reading `page.tab` alone returns undefined on the rendered call, which left
 * the Tabs uncontrolled and pinned to the first trigger on every route;
 * reading `page.props.tab` alone throws on the probe call. Read both.
 */
type StudentLayoutPage = ReactNode & {
   tab?: string;
   props?: StudentDashboardProps;
};

Index.layout = (page: StudentLayoutPage | undefined) => (
   <Layout children={page} tab={page?.props?.tab ?? page?.tab} />
);

export default Index;
