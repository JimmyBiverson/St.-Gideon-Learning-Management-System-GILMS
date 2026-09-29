import { router, usePage } from '@inertiajs/react';
import type { LucideProps } from 'lucide-react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboard, logout } from '@/routes';
import student from '@/routes/student';

interface TabListsProps {
   tabs: {
      id: string;
      name: string;
      slug: string;
      Icon: React.ForwardRefExoticComponent<
         Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >;
   }[];
   /**
    * Called before a visit starts so a mobile drawer hosting this list can
    * dismiss itself immediately. The visit is not awaited: closing first is
    * what makes the tap feel instant, and an aborted visit still leaves the
    * menu closed rather than stuck.
    */
   onNavigate?: () => void;
}

const TabLists = ({ tabs, onNavigate }: TabListsProps) => {
   const { props } = usePage<StudentDashboardProps>();
   const { auth, system, instructor, translate } = props;
   const { button, common } = translate;

   const runNavigation = (visit: () => void) => {
      onNavigate?.();
      visit();
   };

   return (
      <div className="w-[230px]">
         <div className="mb-6 flex flex-col items-center">
            <div className="h-[120px] w-[120px] overflow-hidden rounded-full">
               <img
                  alt={`${auth.user.name}'s profile`}
                  src={auth.user.photo || '/assets/icons/avatar.png'}
                  className="h-full w-full content-center object-cover"
               />
            </div>

            <h6 className="mt-8 mb-1 font-bold">{auth.user.name}</h6>

            <p className="text-sm text-muted-foreground">{auth.user.email}</p>
         </div>

         {instructor && instructor.status === 'approved' && (
            <Button
               variant="ghost"
               className="mb-2 h-10 w-full justify-start gap-3 rounded-lg px-5 py-3 text-start"
               onClick={() => runNavigation(() => router.get(dashboard()))}
            >
               <LayoutDashboard className="h-4 w-4" />
               <span>{common.dashboard}</span>
            </Button>
         )}

         <TabsList className="grid h-auto grid-cols-1 gap-2 bg-transparent p-0">
            {tabs.map(({ id, name, slug, Icon }) => (
               <TabsTrigger
                  key={id}
                  value={slug}
                  className="relative flex h-10 cursor-pointer items-center justify-start gap-3 rounded-lg px-4 text-start font-normal text-sidebar-accent-foreground/80 hover:bg-muted hover:text-sidebar-accent-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:hover:bg-primary/15"
                  onClick={() =>
                     runNavigation(() => router.get(student.index({ tab: slug })))
                  }
               >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
               </TabsTrigger>
            ))}

            <Button
               variant="ghost"
               className="h-10 w-full justify-start gap-3 !px-4 font-normal text-sidebar-accent-foreground/80 hover:bg-red-100 hover:text-red-500"
               onClick={() => runNavigation(() => router.post(logout()))}
            >
               <LogOut className="h-4 w-4" />
               <span>{button.logout}</span>
            </Button>
         </TabsList>

         {((system.sub_type === 'collaborative' && !instructor) ||
            (instructor && instructor.status !== 'approved')) && (
            <Button
               variant="outline"
               className="mt-6 w-full"
               onClick={() =>
                  runNavigation(() =>
                     router.get(
                        student.index({
                           tab: 'instructor',
                        }),
                     ),
                  )
               }
            >
               {button.become_instructor}
            </Button>
         )}
      </div>
   );
};

export default TabLists;

// peer/menu-button flex w-full items-center overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:text-sidebar-accent-foreground text-sm h-10 cursor-pointer gap-3 px-3 hover:bg-transparent active:bg-transparent
