import { router, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import DataSortModal from '@/components/data-sort-modal';
import Switch from '@/components/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import LandingLayout from '@/layouts/landing';
import pageSection from '@/routes/page/section';

interface PageProps {
   page?: Page;
   children: ReactNode;
}

const Layout = ({ page: innerPage, children }: PageProps) => {
   const { props } = usePage<IntroPageProps>();
   const { customize } = props;
   const page = innerPage || props.page;

   const sections = page.sections.filter(
      (section) =>
         section.slug !== 'footer_list_1' &&
         section.slug !== 'footer_list_2' &&
         section.slug !== 'footer_list_3',
   );

   const sectionActiveChange = (id: string | number, active: boolean) => {
      router.post(pageSection.update(id), {
         active,
      });
   };

   return (
      <LandingLayout>
         {customize ? (
            <>
               {customize && page && (
                  <div className="fixed top-20 right-6 z-20">
                     <DataSortModal
                        title="Page Sections"
                        data={sections}
                        handler={
                           <Button size="icon">
                              <Settings className="h-7 w-7" />
                           </Button>
                        }
                        onOrderChange={(newOrder, setOpen) => {
                           router.post(
                              pageSection.sort(),
                              {
                                 sortedData: newOrder,
                              },
                              {
                                 preserveScroll: true,
                                 onSuccess: () => setOpen && setOpen(false),
                              },
                           );
                        }}
                        renderContent={(item) => (
                           <Card className="flex w-full items-center justify-between px-4 py-3">
                              <p>{item.name}</p>

                              <div className="flex items-center space-x-2">
                                 <Label htmlFor="active" className="mb-0">
                                    Active
                                 </Label>
                                 <Switch
                                    id="active"
                                    defaultChecked={item.active}
                                    onCheckedChange={(checked) =>
                                       sectionActiveChange(item.id, checked)
                                    }
                                 />
                              </div>
                           </Card>
                        )}
                     />
                  </div>
               )}

               {/* Content */}
               {children}
            </>
         ) : (
            children
         )}
      </LandingLayout>
   );
};

export default Layout;
