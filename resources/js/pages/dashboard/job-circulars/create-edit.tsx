import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index, show } from '@/routes/job-circulars';
import JobCircularForm from './partials/job-circular-form';

interface Props extends SharedData {
   jobCircular?: JobCircular;
   locations: string[];
   jobTypes: Record<string, string>;
   workTypes: Record<string, string>;
   experienceLevels: Record<string, string>;
   statuses: Record<string, string>;
   currencies: Record<string, string>;
}

const EditJobCircular = ({ jobCircular, translate }: Props) => {
   const { button, common } = translate;

   return (
      <>
         <Breadcrumbs
            title={jobCircular ? 'Edit Circular' : 'Create Circular'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Job Circulars', href: index.url() },
               { title: jobCircular ? button.edit : button.create },
            ]}
            action={
               jobCircular && (
                  <Button asChild variant="outline" className="h-9 px-4">
                     <Link
                        href={show({ job_circular: Number(jobCircular.id) })}
                     >
                        <Eye className="h-4 w-4" />
                        {common.preview}
                     </Link>
                  </Button>
               )
            }
            className="mb-4"
         />

         <JobCircularForm
            key={`${jobCircular?.id}-${jobCircular?.updated_at}`}
            jobCircular={jobCircular}
         />
      </>
   );
};

EditJobCircular.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default EditJobCircular;
