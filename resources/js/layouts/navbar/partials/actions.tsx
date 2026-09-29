import { Link, usePage } from '@inertiajs/react';
import Appearance from '@/components/appearance';
import Language from '@/components/language';
import Notification from '@/components/notification';
import ProfileToggle from '@/components/profile-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import login from '@/routes/login';
import register from '@/routes/register';

const Actions = ({ language }: { language: boolean }) => {
   const { props } = usePage<SharedData>();
   const { navbar, translate, system } = props;
   const { isLoggedIn } = useAuth();
   const sortedItems = navbar.navbar_items.toSorted((a, b) => a.sort - b.sort);

   const actionElements = () =>
      sortedItems.map((item) => {
         if (item.slug === 'theme') {
            return <Appearance key={item.id} />;
         } else if (
            system.fields.language_selector &&
            language &&
            item.slug === 'language'
         ) {
            return <Language key={item.id} />;
         } else if (isLoggedIn && item.slug === 'notification') {
            return <Notification key={item.id} />;
         } else {
            return null;
         }
      });

   return (
      <div className="hidden items-center gap-2 md:flex">
         <div className="flex items-center gap-2">{actionElements()}</div>

         {isLoggedIn ? (
            sortedItems.map((item) => {
               if (item.slug === 'profile') {
                  return <ProfileToggle key={item.id} />;
               } else {
                  return null;
               }
            })
         ) : (
            <div className="space-x-2">
               <Button asChild variant="outline">
                  <Link href={register.index()}>
                     {translate.button.sign_up}
                  </Link>
               </Button>
               <Button asChild>
                  <Link href={login.index()}>{translate.button.log_in}</Link>
               </Button>
            </div>
         )}
      </div>
   );
};

export default Actions;
