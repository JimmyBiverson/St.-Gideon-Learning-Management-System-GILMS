import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/certificate/templates';
import { Link } from '@inertiajs/react';
import { Award, Plus } from 'lucide-react';
import CertificateCard from '../components/certificate-card';

interface CertificatePageProps extends SharedData {
   templates: CertificateTemplate[];
}

const CertificateIndex = ({ templates }: CertificatePageProps) => {
   const examTemplates = templates.filter(
      (template) => template.type === 'exam',
   );
   const courseTemplates = templates.filter(
      (template) => template.type === 'course',
   );

   return (
      <>
         <Breadcrumbs
            title="Certificates"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Certificate Templates' },
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

         <h6 className="mb-3 text-xl font-semibold">
            Course Certificate Templates
         </h6>
         {courseTemplates.length === 0 ? (
            <Card className="p-12">
               <div className="flex flex-col items-center justify-center text-center">
                  <Award className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">
                     No certificate templates yet
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                     Create your first certificate template to get started
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
                  <CertificateCard
                     key={template.id}
                     type="course"
                     template={template}
                  />
               ))}
            </div>
         )}

         <h6 className="mt-16 mb-3 text-xl font-semibold">
            Exam Certificate Templates
         </h6>
         {examTemplates.length === 0 ? (
            <Card className="p-12">
               <div className="flex flex-col items-center justify-center text-center">
                  <Award className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">
                     No certificate templates yet
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                     Create your first certificate template to get started
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
               {examTemplates.map((template) => (
                  <CertificateCard
                     key={template.id}
                     type="exam"
                     template={template}
                  />
               ))}
            </div>
         )}
      </>
   );
};

CertificateIndex.layout = (page: React.ReactNode) => (
   <DashboardLayout children={page} />
);

export default CertificateIndex;
