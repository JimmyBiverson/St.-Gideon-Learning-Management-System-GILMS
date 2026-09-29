import TableFooter from '@/components/table/table-footer';
import { Card } from '@/components/ui/card';
import LandingLayout from '@/layouts/landing';
import { getQueryParams } from '@/lib/route';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import ProductCard from '../../components/product-card';
import Layout from './layout';

const Index = (props: ProductsIndexProps) => {
   const { products, wishlists } = props;
   const { url } = usePage();
   const urlParams = getQueryParams(url);

   return (
      <>
         {products.data.length > 0 ? (
            <div
               className={cn(
                  urlParams['view'] && urlParams['view'] === 'list'
                     ? 'space-y-7'
                     : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
               )}
            >
               {products.data.map((product) => (
                  <ProductCard
                     key={product.id}
                     product={product}
                     wishlists={wishlists}
                  />
               ))}
            </div>
         ) : (
            <Card className="p-10 text-center text-muted-foreground">
               No products found
            </Card>
         )}

         <TableFooter
            className="mt-6 p-5 sm:p-7"
            routeName="products.shop"
            paginationInfo={products}
            paginationKey="products"
         />
      </>
   );
};

Index.layout = (page: ReactNode) => (
   <LandingLayout>
      <Layout>{page}</Layout>
   </LandingLayout>
);

export default Index;
