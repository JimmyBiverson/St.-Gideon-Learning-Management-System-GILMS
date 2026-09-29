import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { edit, index } from '@/routes/exams';
import { router } from '@inertiajs/react';
import {
   BookText,
   CircleDollarSign,
   FileText,
   FlaskConical,
   FolderInput,
   HelpCircle,
   ListTodo,
   Settings,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import ExamUpdateHeader from './partials/exam-update-header';
import Basic from './partials/tabs-content/basic';
import Info from './partials/tabs-content/info';
import Media from './partials/tabs-content/media';
import Pricing from './partials/tabs-content/pricing';
import Questions from './partials/tabs-content/questions';
import Resources from './partials/tabs-content/resources';
import SEO from './partials/tabs-content/seo';
import ExamSettings from './partials/tabs-content/settings';

const Update = (props: ExamUpdateProps) => {
   const { tab, exam } = props;

   const tabs = [
      {
         id: nanoid(),
         name: 'Questions',
         slug: 'questions',
         Icon: HelpCircle,
         Component: Questions,
      },
      {
         id: nanoid(),
         name: 'Resources',
         slug: 'resources',
         Icon: ListTodo,
         Component: Resources,
      },
      {
         id: nanoid(),
         name: 'Basic',
         slug: 'basic',
         Icon: Settings,
         Component: Basic,
      },
      {
         id: nanoid(),
         name: 'Pricing',
         slug: 'pricing',
         Icon: CircleDollarSign,
         Component: Pricing,
      },
      {
         id: nanoid(),
         name: 'Settings',
         slug: 'settings',
         Icon: BookText,
         Component: ExamSettings,
      },
      {
         id: nanoid(),
         name: 'Info',
         slug: 'info',
         Icon: FileText,
         Component: Info,
      },
      {
         id: nanoid(),
         name: 'Media',
         slug: 'media',
         Icon: FolderInput,
         Component: Media,
      },
      {
         id: nanoid(),
         name: 'SEO',
         slug: 'seo',
         Icon: FlaskConical,
         Component: SEO,
      },
   ];

   return (
      <section className="space-y-6">
         <Breadcrumbs
            title={'Manage Exam Contents'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exams', href: index.url() },
               { title: exam.title || 'Questions' },
            ]}
            action={<ExamUpdateHeader />}
            className="mb-4"
         />

         <Tabs
            value={tab ?? tabs[0].slug}
            className="grid grid-rows-1 gap-5 md:grid-cols-4"
         >
            <div className="col-span-full md:col-span-1">
               <TabsList className="horizontal-tabs-list space-y-1">
                  {tabs.map(({ id, name, slug, Icon }) => (
                     <TabsTrigger
                        key={id}
                        value={slug}
                        className="horizontal-tabs-trigger"
                        onClick={() =>
                           router.get(
                              edit(exam.id, {
                                 query: { tab: slug },
                              }),
                           )
                        }
                     >
                        <Icon className="h-4 w-4" />
                        <span>{name}</span>
                     </TabsTrigger>
                  ))}
               </TabsList>
            </div>

            <div className="col-span-full md:col-span-3">
               {tabs.map(({ id, slug, Component }) => (
                  <TabsContent key={id} value={slug} className="m-0">
                     <Component />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </section>
   );
};

Update.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Update;
