import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/marksheet/templates';
import { Link } from '@inertiajs/react';
import { ClipboardList, Plus } from 'lucide-react';
import MarkSheetCard from '../components/marksheet-card';

interface MarksheetPageProps extends SharedData {
   templates: MarksheetTemplate[];
}

const MarksheetIndex = ({ templates }: MarksheetPageProps) => {
   const examTemplates = templates.filter(
      (template) => template.type === 'exam',
   );
   const courseTemplates = templates.filter(
      (template) => template.type === 'course',
   );

   return (
      <>
         <Breadcrumbs
            title="Marksheets"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Marksheet Templates' },
            ]}
            action={
               <Link href={create()}>
                  <Button>
                     <Plus className="h-4 w-4" />
                     Create Template
                  </Button>
               </Link>
            }
            className="mb-4"
         />

         <div className="pb-6">
            <h6 className="mb-3 text-xl font-semibold">
               Course Marksheet Templates
            </h6>

            {courseTemplates.length === 0 ? (
               <Card className="p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                     <ClipboardList className="mb-4 h-16 w-16 text-muted-foreground" />
                     <h3 className="mb-2 text-xl font-semibold">
                        No marksheet templates yet
                     </h3>
                     <p className="mb-4 text-muted-foreground">
                        Create your first marksheet template to get started
                     </p>
                     <Link href={create()}>
                        <Button>
                           <Plus className="h-4 w-4" />
                           Create Your First Template
                        </Button>
                     </Link>
                  </div>
               </Card>
            ) : (
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {courseTemplates.map((template) => (
                     <MarkSheetCard
                        key={template.id}
                        type="course"
                        template={template}
                     />
                  ))}
               </div>
            )}
         </div>
      </>
   );
};

MarksheetIndex.layout = (page: React.ReactNode) => (
   <DashboardLayout children={page} />
);

export default MarksheetIndex;
