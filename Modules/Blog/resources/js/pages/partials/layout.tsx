import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { getQueryParams } from '@/lib/route';
import blogs from '@/routes/blogs';
import { router, usePage } from '@inertiajs/react';
import { ListFilter } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import BlogFilter from './blog-filter';

const Layout = ({ children }: { children: ReactNode }) => {
   const { url, props } = usePage<BlogsIndexProps>();
   const { category } = props;
   const [open, setOpen] = useState(false);
   const urlParams = getQueryParams(url);
   const isMobile = useIsMobile();

   const getQueryRoute = (
      newParams: Record<string, string>,
      category: string,
   ) => {
      const updatedParams = { ...urlParams };

      if ('search' in updatedParams) {
         delete updatedParams.search;
      }

      return blogs.visit.url(
         {
            category,
         },
         { query: { ...updatedParams, ...newParams } },
      );
   };

   const gridListHandler = (view: string) => {
      router.get(getQueryRoute({ view }, category?.slug || 'all'));
   };

   return (
      <div className="container flex items-start gap-6 py-6">
         {!isMobile && (
            <Card className="sticky top-24 w-64 p-4">
               <BlogFilter />
            </Card>
         )}

         {/* Main Content */}
         <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  {isMobile && (
                     <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                           <Button size="icon" variant="outline">
                              <ListFilter className="h-5 w-5" />
                           </Button>
                        </SheetTrigger>

                        <SheetContent
                           side="left"
                           className="w-[220px] border-border"
                        >
                           <ScrollArea className="h-full p-4">
                              <BlogFilter setOpen={setOpen} />
                           </ScrollArea>
                        </SheetContent>
                     </Sheet>
                  )}

                  <div>
                     <h2 className="text-lg font-semibold capitalize md:text-2xl md:font-bold">
                        {category ? category?.name : 'All'} Blogs
                     </h2>
                     {category && category.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                           {category?.description}
                        </p>
                     )}
                  </div>
               </div>
            </div>

            {/* Blog Grid */}
            {children}
         </div>
      </div>
   );
};

export default Layout;
