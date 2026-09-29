import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getQueryParams } from '@/lib/route';
import { cn } from '@/lib/utils';
import { index, review } from '@/routes/exam-attempts';
import { Link, router, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, ListChecks } from 'lucide-react';
import { useState } from 'react';

const ExamAttemptTableColumn = (): ColumnDef<ExamAttempt>[] => {
   const page = usePage<ExamAttemptsProps>();
   const { exam_id } = page.props;
   const urlParams = getQueryParams(page.url);
   const statuses = [
      'all',
      'in_progress',
      'completed',
      'abandoned',
      'submitted',
   ];
   const [reviewAttemptId, setReviewAttemptId] = useState<
      string | number | null
   >(null);

   const handleReviewClick = (attemptId: string | number) => {
      setReviewAttemptId(attemptId);
   };

   const handleResultClick = (attemptId: string | number) => {
      router.get(`/exam-attempts/${attemptId}/result`);
   };

   return [
      // {
      //    accessorKey: 'attempt_number',
      //    header: ({ column }) => {
      //       return (
      //          <div className="flex items-center pl-4">
      //             <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      //                Attempt #
      //                <ArrowUpDown />
      //             </Button>
      //          </div>
      //       );
      //    },
      //    cell: ({ row }) => (
      //       <div className="pl-4">
      //          <p className="text-base font-medium">Attempt #{row.getValue('attempt_number')}</p>
      //       </div>
      //    ),
      // },
      {
         accessorKey: 'user',
         header: ({ column }) => {
            return (
               <div className="flex items-center pl-4">
                  <span>Student</span>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="py-1 pl-4">
               <p className="font-medium">{row.original.user.name}</p>
               <p className="text-xs text-muted-foreground">
                  {row.original.user.email}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'start_time',
         header: 'Started At',
         cell: ({ row }) => (
            <div className="py-1">
               <p className="text-sm">
                  {new Date(row.getValue('start_time')).toLocaleDateString()}
               </p>
               <p className="text-xs text-muted-foreground">
                  {new Date(row.getValue('start_time')).toLocaleTimeString()}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'end_time',
         header: 'Completed At',
         cell: ({ row }) => {
            const endTime = row.getValue('end_time') as string;

            return endTime ? (
               <div className="py-1">
                  <p className="text-sm">
                     {new Date(endTime).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                     {new Date(endTime).toLocaleTimeString()}
                  </p>
               </div>
            ) : (
               <div className="py-1 text-center">--</div>
            );
         },
      },
      // {
      //    accessorKey: 'duration_minutes',
      //    header: () => <div className="text-center">Duration</div>,
      //    cell: ({ row }) => {
      //       const duration = row.getValue('duration_minutes') as number | undefined;
      //       return (
      //          <div className="py-1 text-center">
      //             {duration ? (
      //                <span className="text-sm">
      //                   {Math.floor(duration / 60)}h {duration % 60}m
      //                </span>
      //             ) : (
      //                '--'
      //             )}
      //          </div>
      //       );
      //    },
      // },
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

                  <DropdownMenuContent align="center" className="min-w-[120px]">
                     {statuses.map((status) => (
                        <DropdownMenuItem
                           key={status}
                           onClick={() =>
                              router.get(
                                 index(exam_id, {
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
                           {status.replace('_', ' ')}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         ),
         cell: ({ row }) => {
            const status = row.getValue('status') as string;
            const variant =
               status === 'completed'
                  ? 'default'
                  : status === 'in_progress'
                    ? 'secondary'
                    : 'destructive';

            return (
               <div className="flex justify-center py-1">
                  <Badge variant={variant} className="capitalize">
                     {status.replace('_', ' ')}
                  </Badge>
               </div>
            );
         },
      },
      {
         accessorKey: 'obtained_marks',
         header: () => <div className="text-center">Score</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center">
               <p className="font-semibold">
                  {row.getValue('obtained_marks')}/{row.original.total_marks}
               </p>
               <p className="text-xs text-muted-foreground">
                  {row.original.percentage}%
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'correct_answers',
         header: () => <div className="text-center">Answers</div>,
         cell: ({ row }) => (
            <div className="py-1 text-center">
               <p className="text-sm">
                  <span className="text-green-600">
                     {row.getValue('correct_answers')}
                  </span>{' '}
                  /{' '}
                  <span className="text-red-600">
                     {row.original.incorrect_answers}
                  </span>
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'is_passed',
         header: () => <div className="text-center">Result</div>,
         cell: ({ row }) => {
            const isPassed = row.getValue('is_passed') as boolean;

            return (
               <div className="flex justify-center py-1">
                  {row.original.status === 'completed' ? (
                     <Badge variant={isPassed ? 'default' : 'destructive'}>
                        {isPassed ? 'Passed' : 'Failed'}
                     </Badge>
                  ) : (
                     <span className="text-sm text-muted-foreground">
                        Pending
                     </span>
                  )}
               </div>
            );
         },
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">Actions</div>,
         cell: ({ row }) => {
            const { id } = row.original;

            return (
               <div className="flex justify-end gap-2 py-1 pr-4">
                  <Button
                     asChild
                     variant="outline"
                     className="h-8"
                     title="Review & Grade Attempt"
                  >
                     <Link
                        href={review(
                           { exam_id, id },
                           {
                              mergeQuery: {
                                 ...urlParams,
                                 review: String(id),
                              },
                           },
                        )}
                     >
                        <ListChecks />
                        Review
                     </Link>
                  </Button>
               </div>
            );
         },
      },
   ];
};

export default ExamAttemptTableColumn;
