import { Link, router, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Award, ChevronsUpDown } from 'lucide-react';
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
import examAttempts from '@/routes/exam-attempts';
import studentExam from '@/routes/student/exam';

const ExamAttemptColumn = (
   examId: number | string,
   bestAttemptId?: number | string,
): ColumnDef<ExamAttempt>[] => {
   const page = usePage();
   const urlParams = getQueryParams(page.url);
   const statuses = [
      'all',
      'in_progress',
      'completed',
      'abandoned',
      'submitted',
   ];

   return [
      {
         accessorKey: 'attempt_number',
         header: ({ column }) => {
            return (
               <div className="flex items-center pl-4">
                  <span>Attempt</span>
               </div>
            );
         },
         cell: ({ row }) => (
            <div className="py-1 pl-4">
               <div className="flex items-center gap-2">
                  <p className="font-medium">
                     Attempt #{row.getValue('attempt_number')}
                  </p>
                  {bestAttemptId === row.original.id && (
                     <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-600"
                     >
                        <Award className="mr-1 h-3 w-3" />
                        Best
                     </Badge>
                  )}
               </div>
               <p className="text-xs text-muted-foreground">
                  {new Date(row.original.start_time).toLocaleDateString()} •{' '}
                  {new Date(row.original.start_time).toLocaleTimeString()}
               </p>
            </div>
         ),
      },
      {
         accessorKey: 'obtained_marks',
         header: () => <div className="text-center">Score</div>,
         cell: ({ row }) => {
            const bestScore =
               row.original && Number(row.original.total_marks) > 0
                  ? Math.round(
                       (Number(row.original.obtained_marks) /
                          Number(row.original.total_marks)) *
                          100 *
                          100,
                    ) / 100
                  : 0;

            return (
               <div className="py-1 text-center">
                  <p className="font-semibold">
                     {row.getValue('obtained_marks')}/{row.original.total_marks}
                  </p>
                  <p className="text-xs text-muted-foreground">{bestScore}%</p>
               </div>
            );
         },
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

                  <DropdownMenuContent align="center" className="min-w-[120px]">
                     {statuses.map((status) => (
                        <DropdownMenuItem
                           key={status}
                           onClick={() =>
                              router.get(
                                 studentExam.show({
                                    id: examId,
                                    tab: 'attempts',
                                 }),
                                 { status: status },
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
                  ? 'secondary'
                  : status === 'in_progress'
                    ? 'default'
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
         accessorKey: 'end_time',
         header: 'Duration',
         cell: ({ row }) => {
            const startTime = row.original.start_time;
            const endTime = row.getValue('end_time') as string;

            if (!endTime) {
               return (
                  <div className="py-1 text-center text-muted-foreground">
                     —
                  </div>
               );
            }

            const start = new Date(startTime);
            const end = new Date(endTime);
            const diffMinutes = Math.max(
               0,
               Math.round((end.getTime() - start.getTime()) / 60000),
            );

            return (
               <div className="py-1 text-center">
                  <p className="text-sm">{diffMinutes} min</p>
               </div>
            );
         },
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">Actions</div>,
         cell: ({ row }) => {
            const attempt = row.original;

            return (
               <div className="flex justify-end gap-2 py-1 pr-4">
                  {attempt.status === 'completed' && (
                     <Button asChild variant="secondary" className="h-8">
                        <Link
                           href={studentExam.show(
                              { id: examId, tab: 'attempts' },
                              { query: { attempt: attempt.id } },
                           )}
                        >
                           Result
                        </Link>
                     </Button>
                  )}

                  {attempt.status === 'submitted' && (
                     <Button disabled variant="secondary" className="h-8">
                        Pending
                     </Button>
                  )}

                  {(attempt.status === 'in_progress' ||
                     attempt.status === 'abandoned') && (
                     <Button asChild variant="default" className="h-8">
                        <Link href={examAttempts.take(attempt.id)}>
                           Continue
                        </Link>
                     </Button>
                  )}
               </div>
            );
         },
      },
   ];
};

export default ExamAttemptColumn;
