import Breadcrumbs from '@/components/breadcrumbs';
import { useLang } from '@/hooks/use-lang';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/blogs';
import type { ReactNode } from 'react';
import BlogForm from './partials/blog-form';

const CreateBlog = ({ blog }: BlogCreateEditProps) => {
   const { dashboard, button } = useLang();

   return (
      <>
         <Breadcrumbs
            title={
               blog
                  ? `${button.update} ${dashboard.blog}`
                  : `${button.create} ${dashboard.blog}`
            }
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: dashboard.blog, href: index.url() },
               { title: `${blog ? button.update : button.create} New Blog` },
            ]}
            className="mb-4"
         />

         <BlogForm />
      </>
   );
};

CreateBlog.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default CreateBlog;
