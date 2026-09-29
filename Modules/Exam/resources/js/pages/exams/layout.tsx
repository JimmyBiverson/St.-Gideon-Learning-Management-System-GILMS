import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { getQueryParams } from '@/lib/route';
import categoryRoutes from '@/routes/category';
import { router, usePage } from '@inertiajs/react';
import { Grid, List, ListFilter } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ExamFilter from './partials/exam-filter';

const Layout = ({ children }: { children: ReactNode }) => {
   const { url, props } = usePage<ExamsIndexProps>();
   const { category, translate } = props;
   const { frontend } = translate;
   const [open, setOpen] = useState(false);
   const urlParams = getQueryParams(url);
   const viewType = urlParams['view'] ?? 'grid';
   const isMobile = useIsMobile();

   const getQueryRoute = (
      newParams: Record<string, string>,
      category?: string,
   ) => {
      const updatedParams = { ...urlParams };

      if ('search' in updatedParams) {
         delete updatedParams.search;
      }

      return categoryRoutes.exams.url(
         {
            category: category || 'all',
         },
         { query: { ...updatedParams, ...newParams } },
      );
   };

   const gridListHandler = (view: string) => {
      router.get(getQueryRoute({ view }, category?.slug));
   };

   return (
      <div className="container flex items-start gap-6 py-6">
         {!isMobile && (
            <Card className="sticky top-24 w-64 p-4">
               <ExamFilter />
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
                              <ExamFilter setOpen={setOpen} />
                           </ScrollArea>
                        </SheetContent>
                     </Sheet>
                  )}

                  <div>
                     <h2 className="text-lg font-semibold capitalize md:text-2xl md:font-bold">
                        {category ? category.title : frontend.all} Exams
                     </h2>
                     {category && category.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                           {category.description}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex gap-2">
                  <TooltipProvider delayDuration={0}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              size="icon"
                              variant={
                                 viewType === 'grid' ? 'default' : 'outline'
                              }
                              onClick={() => gridListHandler('grid')}
                           >
                              <Grid className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{frontend.grid_view}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={0}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              size="icon"
                              variant={
                                 viewType === 'list' ? 'default' : 'outline'
                              }
                              onClick={() => gridListHandler('list')}
                           >
                              <List className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{frontend.list_view}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </div>
            </div>

            {/* Exam Grid */}
            {children}
         </div>
      </div>
   );
};

export default Layout;
