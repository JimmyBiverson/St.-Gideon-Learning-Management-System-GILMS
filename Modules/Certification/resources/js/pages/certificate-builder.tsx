import Breadcrumbs from '@/components/breadcrumbs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/certificate/templates';
import CertificateBuilderForm from '../components/certificate-builder-form';

const CertificateBuilder = ({ template }: CertificateBuilderPageProps) => {
   return (
      <>
         <Breadcrumbs
            title={template ? 'Edit Certificate' : 'Create Certificate'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Certificates', href: index.url() },
               {
                  title: `${template ? 'Edit' : 'Create'} Certificate Template`,
               },
            ]}
            className="mb-4"
         />

         <CertificateBuilderForm template={template} />
      </>
   );
};

CertificateBuilder.layout = (page: React.ReactNode) => (
   <DashboardLayout children={page} />
);

export default CertificateBuilder;
