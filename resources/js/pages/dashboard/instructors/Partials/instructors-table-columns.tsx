import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
import ActionsDropdown from '@/components/actions-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/instructors';
import ApplicationApproval from './application-approval';

const InstructorsTableColumn = (
   isAdmin: boolean,
   translate: LanguageTranslations,
): ColumnDef<Instructor>[] => {
   const { table } = translate;

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
                     src={row.original.user.photo || ''}
                     className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>

               <div>
                  <p className="mb-0.5 text-base font-medium">
                     {row.original.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                     {row.original.user.email}
                  </p>
               </div>
            </div>
         ),
      },
      {
         accessorKey: 'courses',
         header: table.number_of_course,
         cell: ({ row }) => (
            <div className="capitalize">
               <p>{row.original.courses_count}</p>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: table.status,
         cell: ({ row }) => (
            <div className="capitalize">
               <span>{row.original.status}</span>
            </div>
         ),
      },
      {
         id: 'actions',
         header: () => <div className="text-end">{table.action}</div>,
         cell: ({ row }) => {
            return (
               <div className="flex justify-end py-1">
                  <ActionsDropdown
                     routes={
                        isAdmin
                           ? [
                                {
                                   label: 'Delete',
                                   method: 'delete',
                                   route: destroy.url({
                                      instructor: Number(row.original.id),
                                   }),
                                   message: table.delete_instructor_warning,
                                },
                             ]
                           : undefined
                     }
                     component={
                        <ApplicationApproval
                           instructor={row.original}
                           actionComponent={
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="w-full justify-start has-[svg]:!px-2"
                              >
                                 <Pencil size={15} />
                                 {table.status}
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

export default InstructorsTableColumn;
