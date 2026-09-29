import ActionsDropdown from '@/components/actions-dropdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { submissions } from '@/routes/course-assignments';
import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock, Eye, Pencil } from 'lucide-react';
import AssignmentForm from './forms/assignment-form';

const AssignmentTableColumn = (
   slug: string,
   translate: LanguageTranslations,
   enrollmentsCount: number,
): ColumnDef<CourseAssignment>[] => {
   const { table } = translate;

   return [
      {
         accessorKey: 'title',
         header: () => <span className="pl-4">Assignment Details</span>,
         cell: ({ row }) => {
            const assignment = row.original;

            return (
               <div className="space-y-1 py-2">
                  <p className="text-base font-semibold">{assignment.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                     <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Total: {assignment.total_mark}
                     </span>
                     <span className="flex items-center gap-1">
                        Pass: {assignment.pass_mark}
                     </span>
                     <span className="flex items-center gap-1">
                        Retakes: {assignment.retake}
                     </span>
                  </div>
               </div>
            );
         },
      },
      {
         accessorKey: 'deadline',
         header: 'Deadline',
         cell: ({ row }) => {
            const deadline = row.getValue('deadline') as string;
            const isExpired = new Date() > new Date(deadline);

            return (
               <div className="py-2">
                  <div className="flex items-center gap-2">
                     {isExpired ? (
                        <AlertCircle className="h-4 w-4 flex-shrink-0 text-destructive" />
                     ) : (
                        <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                     )}
                     <div>
                        <p
                           className={`text-sm font-medium ${isExpired ? 'text-destructive' : ''}`}
                        >
                           {format(new Date(deadline), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                           {format(new Date(deadline), 'hh:mm a')}
                        </p>
                     </div>
                  </div>
                  {isExpired && (
                     <Badge variant="destructive" className="mt-1 text-xs">
                        Expired
                     </Badge>
                  )}
               </div>
            );
         },
      },
      {
         accessorKey: 'late_submission',
         header: () => <div className="text-center">Late Submission</div>,
         cell: ({ row }) => {
            const assignment = row.original;
            const lateAllowed = assignment.late_submission;

            return (
               <div className="py-2 text-center">
                  <Badge variant={lateAllowed ? 'default' : 'secondary'}>
                     {lateAllowed ? 'Allowed' : 'Not Allowed'}
                  </Badge>
                  {lateAllowed && assignment.late_deadline && (
                     <div className="mt-1 text-xs text-muted-foreground">
                        Until:{' '}
                        {format(new Date(assignment.late_deadline), 'MMM dd')}
                     </div>
                  )}
               </div>
            );
         },
      },
      {
         accessorKey: 'submissions',
         header: () => <div className="text-center">Submissions</div>,
         cell: ({ row }) => {
            const assignment = row.original;

            return (
               <div className="py-2 text-center">
                  <span className="font-semibold">
                     {assignment.submissions_count}
                  </span>{' '}
                  of <span className="font-semibold">{enrollmentsCount}</span>
                  {/* <div className="flex items-center justify-center gap-1">
                     <Users className="text-primary h-4 w-4" />
                     <span className="text-lg font-semibold">{totalSubmissions}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-xs">
                     <span className="text-green-600">✓ {gradedCount}</span>
                     {pendingCount > 0 && <span className="text-orange-600">⏳ {pendingCount}</span>}
                  </div> */}
               </div>
            );
         },
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">{table.action}</div>,
         cell: ({ row }) => {
            const assignment = row.original;

            return (
               <div className="flex justify-end py-2">
                  <ActionsDropdown
                     component={
                        <>
                           <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="w-full justify-start has-[svg]:!px-2"
                           >
                              <Link
                                 href={submissions.url({
                                    course_id: assignment.course_id,
                                    assignment_id: assignment.id,
                                 })}
                              >
                                 <Eye size={15} />
                                 View
                              </Link>
                           </Button>
                           <AssignmentForm
                              title={'Update Assignment'}
                              assignment={assignment}
                              handler={
                                 <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-full justify-start has-[svg]:!px-2"
                                 >
                                    <Pencil size={15} />
                                    Edit
                                 </Button>
                              }
                           />
                        </>
                     }
                  />
               </div>
            );
         },
      },
   ];
};

export default AssignmentTableColumn;
