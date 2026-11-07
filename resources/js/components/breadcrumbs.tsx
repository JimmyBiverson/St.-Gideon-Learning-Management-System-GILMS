import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

interface BreadcrumbItemType {
   title: string;
   href?: string;
}

interface BreadcrumbsProps {
   title: string;
   breadcrumbs?: BreadcrumbItemType[];
   action?: React.ReactNode;
   className?: string;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
   const { title, breadcrumbs = [], action, className } = props;

   return (
      <div
         className={cn(
            'flex flex-col gap-6 pb-6 sm:flex-row sm:items-center sm:justify-between',
            className,
         )}
      >
         <div className="min-w-0 flex-1 space-y-2">
            {title && (
               <h1
                  title={title}
                  className="line-clamp-2 text-xl font-semibold tracking-tight break-words text-foreground sm:text-2xl"
               >
                  {title}
               </h1>
            )}

            {breadcrumbs.length > 0 && (
               <Breadcrumb>
                  <BreadcrumbList>
                     {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                           <Fragment key={`breadcrumbs-${index}`}>
                              <BreadcrumbItem>
                                 {isLast || !item.href ? (
                                    <BreadcrumbPage
                                       title={item.title}
                                       className="max-w-[45vw] truncate text-sm capitalize sm:max-w-xs"
                                    >
                                       {item.title}
                                    </BreadcrumbPage>
                                 ) : (
                                    <BreadcrumbLink asChild>
                                       <Link
                                          href={item.href}
                                          className="text-sm capitalize"
                                       >
                                          {item.title}
                                       </Link>
                                    </BreadcrumbLink>
                                 )}
                              </BreadcrumbItem>
                              {!isLast && (
                                 <BreadcrumbSeparator
                                    key={`separator-${index}`}
                                 />
                              )}
                           </Fragment>
                        );
                     })}
                  </BreadcrumbList>
               </Breadcrumb>
            )}
         </div>

         <div className="flex shrink-0 flex-wrap gap-2">{action}</div>
      </div>
   );
};

export default Breadcrumbs;
