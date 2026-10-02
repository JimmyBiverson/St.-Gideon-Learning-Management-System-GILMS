import { Form, Link, usePage } from '@inertiajs/react';
import {
   FileQuestion,
   GraduationCap,
   Heart,
   ListFilter,
   LoaderCircle,
   Settings as SettingsIcon,
   ShoppingBag,
   UserCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { TabsContent } from '@/components/ui/tabs';
import useScreen from '@/hooks/use-screen';
import LandingLayout from '@/layouts/landing';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import TabLists from './tab-lists';

const Layout = ({ children, tab }: { children: ReactNode; tab?: string }) => {
   const { screen } = useScreen();
   const [open, setOpen] = useState(false);
   const closeMenu = () => setOpen(false);
   const { props } = usePage<SharedData>();
   const { translate, auth } = props;
   const { button } = translate;

   const tabs = useMemo(
      () => [
         {
            id: 'courses',
            name: button.courses,
            slug: 'courses',
            Icon: GraduationCap,
         },
         {
            id: 'exams',
            name: 'Exams',
            slug: 'exams',
            Icon: FileQuestion,
         },
         {
            id: 'products',
            name: 'Products',
            slug: 'products',
            Icon: ShoppingBag,
         },
         {
            id: 'wishlist',
            name: button.wishlist,
            slug: 'wishlist',
            Icon: Heart,
         },
         {
            id: 'profile',
            name: button.profile,
            slug: 'profile',
            Icon: UserCircle,
         },
         {
            id: 'settings',
            name: button.settings,
            slug: 'settings',
            Icon: SettingsIcon,
         },
      ],
      [button],
   );

   return (
      <LandingLayout language={true}>
         <div className="container py-12">
            <Tabs
               value={tab}
               defaultValue={tabs[0].slug}
               className="flex items-start gap-6 lg:gap-10"
            >
               <Card className="sticky top-24 hidden w-full max-w-[270px] border-none p-4 md:block">
                  <TabLists tabs={tabs} onNavigate={closeMenu} />
               </Card>

               <div className="w-full">
                  {!auth.user.email_verified_at && (
                     <div className="mb-6 rounded-md bg-red-50 p-6">
                        {status === 'verification-link-sent' ? (
                           <p className="mb-4 text-center text-sm font-medium text-green-600">
                              A new verification link has been sent to the email
                              address you provided during registration.
                           </p>
                        ) : (
                           <p className="mb-4 text-center text-sm font-medium text-red-500">
                              Your email is not verified yet. Please verify your
                              email address by clicking on the link we just
                              emailed to you.
                           </p>
                        )}

                        <Form {...send.form()}>
                           {({ processing }) => (
                              <div className="flex items-center justify-center gap-4 text-center">
                                 <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="secondary"
                                 >
                                    {processing && (
                                       <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Resend verification email
                                 </Button>

                                 <Link href={logout()} method="post">
                                    <Button>Log out</Button>
                                 </Link>
                              </div>
                           )}
                        </Form>
                     </div>
                  )}

                  {/*
                   * One drawer for the whole dashboard, mounted outside the
                   * tab panels. Inside them it was destroyed and rebuilt on
                   * every tab change, so its open state survived the swap and
                   * the drawer came back already open over the new page.
                   */}
                  {screen < 768 && (
                     <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                           <Button size="icon" variant="outline">
                              <ListFilter className="h-5 w-5" />
                           </Button>
                        </SheetTrigger>

                        <SheetContent
                           side="left"
                           className="w-[230px] border-border p-0"
                        >
                           <SheetHeader className="sr-only">
                              <SheetTitle>Student navigation</SheetTitle>
                              <SheetDescription>
                                 Navigate to student dashboard sections.
                              </SheetDescription>
                           </SheetHeader>
                           <ScrollArea className="h-full w-full">
                              <TabLists tabs={tabs} onNavigate={closeMenu} />
                           </ScrollArea>
                        </SheetContent>
                     </Sheet>
                  )}

                  {tabs.map(({ id, slug }) => (
                     <TabsContent key={id} value={slug} className="m-0">
                        {children}
                     </TabsContent>
                  ))}

                  {/*
                   * The become-instructor form is reachable at
                   * /student/instructor but is not one of the tabs, so it
                   * needs a panel of its own or the page renders empty.
                   */}
                  <TabsContent value="instructor" className="m-0">
                     {children}
                  </TabsContent>
               </div>
            </Tabs>
         </div>
      </LandingLayout>
   );
};

export default Layout;
