import Breadcrumbs from '@/components/breadcrumbs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/marksheet/templates';
import MarksheetBuilderForm from '../components/marksheet-builder-form';

const MarksheetBuilder = ({ template }: MarksheetBuilderPageProps) => {
   return (
      <>
         <Breadcrumbs
            title={
               template
                  ? 'Edit Marksheet Template'
                  : 'Create Marksheet Template'
            }
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Marksheets', href: index.url() },
               { title: `${template ? 'Edit' : 'Create'} Marksheet Template` },
            ]}
            className="mb-4"
         />

         <MarksheetBuilderForm template={template} />
      </>
   );
};

MarksheetBuilder.layout = (page: React.ReactNode) => (
   <DashboardLayout children={page} />
);

export default MarksheetBuilder;
