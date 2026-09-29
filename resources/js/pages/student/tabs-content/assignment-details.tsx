import {
   AlertCircle,
   Calendar,
   CheckCircle,
   Clock,
   FileText,
} from 'lucide-react';
import { Renderer } from '@/components/rich-editor';
import { formatDate, formatDateShort } from '@/lib/date';

interface Props {
   assignment: CourseAssignment;
   deadlinePassed: boolean;
}

const AssignmentDetails = ({ assignment, deadlinePassed }: Props) => {
   return (
      <div className="space-y-6">
         {/* Assignment Info */}
         <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
               <Calendar className="h-5 w-5 text-primary" />
               <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="text-sm text-muted-foreground">
                     {formatDateShort(assignment.deadline)}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
               <FileText className="h-5 w-5 text-primary" />
               <div>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="font-medium">{assignment.total_mark}</p>
               </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
               <CheckCircle className="h-5 w-5 text-primary" />
               <div>
                  <p className="text-sm text-muted-foreground">Pass Marks</p>
                  <p className="font-medium">{assignment.pass_mark}</p>
               </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
               <Clock className="h-5 w-5 text-primary" />
               <div>
                  <p className="text-sm text-muted-foreground">
                     Retake Allowed
                  </p>
                  <p className="font-medium">
                     {assignment.retake}{' '}
                     {assignment.retake > 1 ? 'times' : 'time'}
                  </p>
               </div>
            </div>
         </div>

         {/* Deadline Warning */}
         {deadlinePassed && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
               <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-medium">Deadline expired</p>
               </div>
               <p className="mt-1 text-sm text-muted-foreground">
                  {assignment.late_submission
                     ? `Late submission is allowed until ${formatDate(assignment.late_deadline || '')} with ${assignment.late_total_mark} marks.`
                     : 'Late submission is not allowed for this assignment.'}
               </p>
            </div>
         )}

         {/* Overview Section */}
         {assignment.summary && (
            <>
               <h3 className="text-lg font-semibold">OVERVIEW</h3>
               <Renderer value={assignment.summary} />
            </>
         )}
      </div>
   );
};

export default AssignmentDetails;
