import ActionsDropdown from '@/components/actions-dropdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { getQueryParams } from '@/lib/route';
import { cn, systemCurrency } from '@/lib/utils';
import examAttempts from '@/routes/exam-attempts';
import { destroy, details, edit, index } from '@/routes/exams';
import { Link, router, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronsUpDown, Eye } from 'lucide-react';

const ExamTableColumn = (): ColumnDef<Exam>[] => {
   const { isAdmin } = useAuth();
   const { props, url } = usePage<SharedData>();
   const { system } = props;
   const { amount } = systemCurrency(system.fields['selling_currency']);
   const urlParams = getQueryParams(url);
   const statuses = ['all', 'draft', 'published', 'archived'];

   return [
      {
         accessorKey: 'instructor',
         header: ({ column }) => {
            return (
               <div className="flex items-center pl-1">
                  <Button
                     variant="ghost"
                     className="p-0 hover:bg-transparent"
                     onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                     }
                  >
                     Instructor
                     <ArrowUpDown />
                  </Button>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="pl-4">
               <p className="mb-0.5 text-base font-medium">
                  {row.original.instructor.user.name}
               </p>
               <p className="text-xs text-muted-foreground">
                  {row.original.instructor.user.email}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'title',
         header: 'Exam Title',
         cell: ({ row }) => (
            <div className="py-1">
               <Link
                  href={details({
                     slug: row.original.slug,
                     id: Number(row.original.id),
                  })}
                  className="font-medium hover:underline"
               >
                  {row.getValue('title')}
               </Link>
               <p className="text-xs text-muted-foreground">
                  {row.original.exam_category.title}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: ({ column }) => (
            <div className="flex justify-center">
               <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center">
                     <Button
                        variant="ghost"
                        className="text-muted-foreground capitalize"
                     >
                        <span>{urlParams['status'] ?? 'Status'}</span>
                        <ChevronsUpDown className="h-3 w-3 text-gray-700" />
                     </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="center" className="min-w-[72px]">
                     {statuses.map((status) => (
                        <DropdownMenuItem
                           key={status}
                           onClick={() =>
                              router.get(
                                 index({
                                    mergeQuery: {
                                       ...urlParams,
                                       status,
                                    },
                                 }),
                              )
                           }
                           className={cn(
                              'cursor-pointer text-center capitalize',
                              urlParams['status'] === status && 'bg-gray-100',
                           )}
                        >
                           {status}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-center py-1">
               <Badge
                  variant={
                     row.getValue('status') === 'published'
                        ? 'default'
                        : 'secondary'
                  }
                  className="capitalize"
               >
                  {row.getValue('status')}
               </Badge>
            </div>
         ),
      },
      {
         accessorKey: 'level',
         header: () => <div className="text-center">Level</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center">
               {row.getValue('level') ? (
                  <Badge variant="outline" className="capitalize">
                     {row.getValue('level')}
                  </Badge>
               ) : (
                  '--'
               )}
            </div>
         ),
      },
      {
         accessorKey: 'enrollments_count',
         header: ({ column }) => (
            <div className="flex items-center justify-center">
               <Button
                  variant="ghost"
                  onClick={() =>
                     column.toggleSorting(column.getIsSorted() === 'asc')
                  }
               >
                  Enrollments
                  <ArrowUpDown />
               </Button>
            </div>
         ),
         cell: ({ row }) => (
            <div className="py-1 text-center">
               {row.getValue('enrollments_count') || 0}
            </div>
         ),
      },
      {
         accessorKey: 'pricing_type',
         header: () => <div className="text-center">Price</div>,
         cell: ({ row }) => {
            const discountPrice = row.original.discount_price
               ? Number(row.original.discount_price)
               : null;
            const price = row.original.price ? Number(row.original.price) : 0;
            const displayPrice = discountPrice || price;

            return (
               <div className="py-1 text-center">
                  {row.original.pricing_type === 'paid' ? (
                     <span className="font-semibold">
                        {amount(displayPrice)}
                     </span>
                  ) : (
                     <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600"
                     >
                        Free
                     </Badge>
                  )}
               </div>
            );
         },
      },
      {
         accessorKey: 'attempts_count',
         header: () => <div className="text-center">Attempts</div>,
         cell: ({ row }) => {
            const { id, attempts_count } = row.original;

            return (
               <div className="py-1 text-center">
                  <Button asChild variant="outline">
                     <Link href={examAttempts.index(id)}>
                        <Eye />
                        {attempts_count}
                        {attempts_count > 1 ? ' Attempt' : ' Attempts'}
                     </Link>
                  </Button>
               </div>
            );
         },
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">Actions</div>,
         cell: ({ row }) => {
            const { id, title, slug } = row.original;

            return (
               <div className="flex justify-end py-1 pr-4">
                  <ActionsDropdown
                     routes={[
                        {
                           label: 'View',
                           method: 'get',
                           route: details.url({ slug, id }),
                        },
                        {
                           label: 'Edit',
                           method: 'get',
                           route: edit.url(id),
                        },
                        {
                           label: 'Delete',
                           method: 'delete',
                           route: destroy.url(id),
                           message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
                           role: isAdmin,
                        },
                     ]}
                  />
               </div>
            );
         },
      },
   ];
};

export default ExamTableColumn;
