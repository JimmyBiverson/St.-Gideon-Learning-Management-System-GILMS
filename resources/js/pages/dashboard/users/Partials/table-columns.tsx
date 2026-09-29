import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
import ActionsDropdown from '@/components/actions-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/users';
import EditForm from './edit-form';

const TableColumn = (translate: LanguageTranslations): ColumnDef<User>[] => {
   const { table, common } = translate;

   return [
      {
         accessorKey: 'name',
         header: ({ column }) => {
            return (
               <div className="flex items-center">
                  <Button
                     variant="ghost"
                     className="p-0 hover:bg-transparent"
                     onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                     }
                  >
                     {table.name}
                     <ArrowUpDown />
                  </Button>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Avatar className="h-11 w-11">
                  <AvatarImage
                     src={row.original.photo || ''}
                     className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>

               <div>
                  <p className="mb-0.5 text-base font-medium">
                     {row.original.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                     {row.original.email}
                  </p>
               </div>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: table.status,
         cell: ({ row }) => (
            <div className="capitalize">
               <span>
                  {row.original.status === 1 ? common.active : common.inactive}
               </span>
            </div>
         ),
      },
      {
         accessorKey: 'role',
         header: table.role,
         cell: ({ row }) => (
            <div className="capitalize">
               <span>{row.original.role}</span>
            </div>
         ),
      },
      {
         id: 'actions',
         header: () => <div className="text-end">{table.action}</div>,
         cell: ({ row }) => {
            return (
               <div className="flex justify-end gap-2 py-1 pr-4">
                  <ActionsDropdown
                     routes={[
                        {
                           label: 'Delete',
                           method: 'delete',
                           route: destroy.url(row.original.id),
                           message: table.delete_instructor_warning,
                        },
                     ]}
                     component={
                        <EditForm
                           user={row.original}
                           actionComponent={
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="w-full justify-start has-[svg]:!px-2"
                              >
                                 <Pencil size={15} />
                                 Edit
                              </Button>
                           }
                        />
                     }
                  />
               </div>
            );
         },
      },
   ];
};

export default TableColumn;
