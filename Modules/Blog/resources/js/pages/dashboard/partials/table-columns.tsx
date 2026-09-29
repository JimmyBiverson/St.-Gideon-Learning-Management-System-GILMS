import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { destroy, edit, preview } from '@/routes/blogs';
import { Link, router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Pencil } from 'lucide-react';

const TableColumn = (translate: LanguageTranslations): ColumnDef<Blog>[] => {
   const { table, input } = translate;

   return [
      {
         accessorKey: 'creator',
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  className="ml-1 hover:bg-transparent"
                  onClick={() =>
                     column.toggleSorting(column.getIsSorted() === 'asc')
                  }
               >
                  {table.creator}
                  <ArrowUpDown />
               </Button>
            );
         },
         cell: ({ row }) => (
            <div className="pl-4">
               <p className="mb-0.5 text-base font-medium">
                  {row.original.user.name}
               </p>
               <p className="text-xs text-muted-foreground">
                  {row.original.user.email}
               </p>
            </div>
         ),
         sortingFn: (a, b) =>
            a.original.user.name.localeCompare(b.original.user.name),
      },
      {
         accessorKey: 'title',
         header: table.title,
         cell: ({ row }) => (
            <div className="py-1 capitalize">
               <Link href={edit(row.original.id)}>{row.getValue('title')}</Link>
            </div>
         ),
      },
      {
         accessorKey: 'category',
         header: () => (
            <div className="flex items-center justify-center">
               <p>{input.category}</p>
            </div>
         ),
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               <p>{row.original.category?.name ?? '--'}</p>
            </div>
         ),
         sortingFn: (a, b) =>
            (a.original.category?.name || '').localeCompare(
               b.original.category?.name || '',
            ),
      },
      {
         accessorKey: 'status',
         header: ({ column }) => (
            <div className="flex items-center justify-center">
               <Button
                  variant="ghost"
                  onClick={() =>
                     column.toggleSorting(column.getIsSorted() === 'asc')
                  }
               >
                  {table.status}
                  <ArrowUpDown />
               </Button>
            </div>
         ),
         cell: ({ row }) => (
            <div className="py-1 text-center capitalize">
               {row.getValue('status')}
            </div>
         ),
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">{table.action}</div>,
         cell: ({ row }) => {
            const blog = row.original;

            return (
               <div className="flex justify-end gap-2 py-1 pr-4">
                  <ActionsDropdown
                     routes={[
                        {
                           label: 'Delete',
                           method: 'delete',
                           route: destroy.url(blog.id),
                           message: `Are you sure you want to delete this blog?`,
                        },
                     ]}
                     component={
                        <>
                           <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start has-[svg]:!px-2"
                           >
                              <a target="_blank" href={preview.url(blog.uuid)}>
                                 <Eye size={15} />
                                 View
                              </a>
                           </Button>

                           <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start has-[svg]:!px-2"
                              onClick={() => router.get(edit(blog.id))}
                           >
                              <Pencil size={15} />
                              Edit
                           </Button>
                        </>
                     }
                  />
               </div>
            );
         },
      },
   ];
};

export default TableColumn;
