import ActionsDropdown from '@/components/actions-dropdown';
import { systemCurrency } from '@/lib/utils';
import { destroy, edit } from '@/routes/products';
import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

interface TableColumnProps {
   isAdmin: boolean;
   system: SharedData['system'];
}

const TableColumn = ({
   isAdmin,
   system,
}: TableColumnProps): ColumnDef<Product>[] => {
   const { amount } = systemCurrency(system.fields['selling_currency']);

   return [
      {
         accessorKey: 'name',
         header: 'Instructor',
         cell: ({ row }) => (
            <div className="pl-4">
               <p className="mb-0.5 text-base font-medium">
                  {row.original.instructor?.user?.name}
               </p>
               <p className="text-xs text-muted-foreground">
                  {row.original.instructor?.user?.email}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'title',
         header: 'Title',
         cell: ({ row }) => (
            <div className="py-1">
               <Link href={edit(row.original.id)}>{row.getValue('title')}</Link>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: () => <div className="text-center">Status</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               {row.getValue('status')}
            </div>
         ),
      },
      {
         accessorKey: 'category',
         header: () => <div className="text-center">Category</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               <p>{row.original.product_category?.title}</p>
            </div>
         ),
      },
      {
         accessorKey: 'price',
         header: () => <div className="text-center">Price</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center">
               <p>{row.original.price ? amount(row.original.price) : 'Free'}</p>
            </div>
         ),
      },
      {
         accessorKey: 'orders_count',
         header: () => <div className="text-center">Orders</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center">
               <Eye className="mr-1 inline h-4 w-4" />
               {row.original.orders_count ?? 0}
            </div>
         ),
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">Actions</div>,
         cell: ({ row }) => {
            const product = row.original;

            return (
               <div className="flex justify-end py-1 pr-4">
                  <ActionsDropdown
                     className="max-w-36"
                     routes={[
                        {
                           label: 'Edit',
                           method: 'get',
                           route: edit.url(product.id),
                        },
                        {
                           label: 'Delete',
                           method: 'delete',
                           route: destroy.url(product.id),
                           message: 'This product will be permanently deleted.',
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
