import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { edit, index } from '@/routes/products';
import { router, usePage } from '@inertiajs/react';
import {
   BookText,
   CircleDollarSign,
   FlaskConical,
   FolderInput,
   Settings,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import Basic from './partials/basic';
import Info from './partials/info';
import Media from './partials/media';
import Pricing from './partials/pricing';
import ProductUpdateHeader from './partials/product-update-header';
import SEO from './partials/seo';

const Update = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { tab, product } = props;

   const tabs = [
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
         name: 'Media & Files',
         slug: 'media',
         Icon: FolderInput,
         Component: Media,
      },
      {
         id: nanoid(),
         name: 'Info',
         slug: 'info',
         Icon: BookText,
         Component: Info,
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
            title={'Manage Product'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Products', href: index.url() },
               { title: product.title || 'Edit Product' },
            ]}
            action={<ProductUpdateHeader />}
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
                                 { product: Number(product.id) },
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
