import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { edit, index } from '@/routes/courses';
import { router } from '@inertiajs/react';
import {
   BookText,
   CircleDollarSign,
   FilePenLine,
   FlaskConical,
   FolderInput,
   Settings,
   TvMinimalPlay,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import Basic from './partials/basic';
import CourseUpdateHeader from './partials/course-update-header';
import Curriculum from './partials/curriculum';
import Info from './partials/info';
import LiveClass from './partials/live-class';
import Media from './partials/media';
import Pricing from './partials/pricing';
import SEO from './partials/seo';

const Update = (props: CourseUpdateProps) => {
   const { tab, course, translate } = props;
   const { button } = translate;

   const tabs = [
      {
         id: nanoid(),
         name: button.curriculum,
         slug: 'curriculum',
         Icon: FilePenLine,
         Component: Curriculum,
      },
      {
         id: nanoid(),
         name: button.live_class,
         slug: 'live-class',
         Icon: TvMinimalPlay,
         Component: LiveClass,
      },
      {
         id: nanoid(),
         name: button.basic,
         slug: 'basic',
         Icon: Settings,
         Component: Basic,
      },
      {
         id: nanoid(),
         name: button.pricing,
         slug: 'pricing',
         Icon: CircleDollarSign,
         Component: Pricing,
      },
      {
         id: nanoid(),
         name: button.info,
         slug: 'info',
         Icon: BookText,
         Component: Info,
      },
      {
         id: nanoid(),
         name: button.media,
         slug: 'media',
         Icon: FolderInput,
         Component: Media,
      },
      {
         id: nanoid(),
         name: button.seo,
         slug: 'seo',
         Icon: FlaskConical,
         Component: SEO,
      },
   ];

   return (
      <section className="space-y-6">
         <Breadcrumbs
            title={'Manage Course Contents'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Courses', href: index.url() },
               { title: course.title || 'Edit Course' },
            ]}
            action={<CourseUpdateHeader />}
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
                              edit(
                                 { course: Number(course.id) },
                                 { query: { tab: slug } },
                              ),
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
