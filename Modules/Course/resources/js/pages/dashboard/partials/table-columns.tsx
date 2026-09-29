import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { systemCurrency } from '@/lib/utils';
import { index } from '@/routes/course-assignments';
import { destroy, edit } from '@/routes/courses';
import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import CourseStatusFilter from './course-status-filter';

interface TableColumnProps {
   isAdmin: boolean;
   system: SharedData['system'];
   translate: SharedData['translate'];
}

const TableColumn = ({
   isAdmin,
   system,
   translate,
}: TableColumnProps): ColumnDef<Course>[] => {
   const { table, common } = translate;
   const { amount } = systemCurrency(system.fields['selling_currency']);

   return [
      {
         accessorKey: 'name',
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  className="ml-1 hover:bg-transparent"
                  onClick={() =>
                     column.toggleSorting(column.getIsSorted() === 'asc')
                  }
               >
                  {table.name}
                  <ArrowUpDown />
               </Button>
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
         header: table.course_title,
         cell: ({ row }) => (
            <div className="py-1 capitalize">
               <Link href={edit(row.original.id)}>{row.getValue('title')}</Link>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: () => (
            <div className="flex justify-center">
               <CourseStatusFilter />
            </div>
         ),
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               {row.getValue('status')}
            </div>
         ),
      },
      {
         accessorKey: 'category',
         header: () => {
            return (
               <div className="flex items-center justify-center">
                  <p>Category</p>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               <p>{row.original.course_category.title}</p>
            </div>
         ),
      },
      {
         accessorKey: 'category_child',
         header: () => {
            return (
               <div className="flex items-center justify-center">
                  <p className="whitespace-nowrap">{table.category_child}</p>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               <p>{row.original.course_category_child?.title || '--'}</p>
            </div>
         ),
      },
      {
         accessorKey: 'price',
         header: ({ column }) => (
            <div className="flex items-center justify-center">
               <Button
                  variant="ghost"
                  onClick={() =>
                     column.toggleSorting(column.getIsSorted() === 'asc')
                  }
               >
                  {common.price}
                  <ArrowUpDown />
               </Button>
            </div>
         ),
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               <p>
                  {row.original.price
                     ? amount(row.original.price)
                     : common.free}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'assignments_count',
         header: () => <div className="text-center">Assignments</div>,
         cell: ({ row }) => {
            const { id, assignments_count } = row.original;

            return (
               <div className="py-1 text-center">
                  <Button asChild variant="outline">
                     <Link href={index(id)}>
                        <Eye className="h-4 w-4" />
                        {assignments_count ?? 0}
                        {(assignments_count ?? 0) > 1
                           ? ' Assignments'
                           : ' Assignment'}
                     </Link>
                  </Button>
               </div>
            );
         },
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">{table.action}</div>,
         cell: ({ row }) => {
            const course = row.original;

            return (
               <div className="flex justify-end py-1 pr-4">
                  <ActionsDropdown
                     className="max-w-36"
                     routes={[
                        {
                           label: 'Edit',
                           method: 'get',
                           route: edit.url(course.id),
                        },
                        {
                           label: 'Delete',
                           method: 'delete',
                           route: destroy.url(course.id),
                           message: table.delete_course_warning,
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

export default TableColumn;
