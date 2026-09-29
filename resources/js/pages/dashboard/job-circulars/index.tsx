import { Link, router, usePage } from '@inertiajs/react';
import {
   Briefcase,
   BriefcaseBusiness,
   Building2,
   Calendar,
   Edit,
   Eye,
   MapPin,
   PauseCircle,
   PlayCircle,
   Plus,
   TrendingUp,
} from 'lucide-react';
import type { ReactNode } from 'react';
import ActionsDropdown from '@/components/actions-dropdown';
import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import {
   create,
   destroy,
   edit,
   show,
   toggleStatus,
} from '@/routes/job-circulars';

interface JobCircularsPageProps extends SharedData {
   jobCirculars: Pagination<JobCircular>;
   jobTypes: Record<string, string>;
   workTypes: Record<string, string>;
   experienceLevels: Record<string, string>;
   statuses: Record<string, string>;
}

const JobCircularsIndex = () => {
   const { props } = usePage<JobCircularsPageProps>();
   const {
      jobCirculars,
      jobTypes,
      workTypes,
      experienceLevels,
      statuses,
      translate,
   } = props;
   const { dashboard, button } = translate;

   const getStatusBadge = (status: string) => {
      const variants: Record<
         string,
         'default' | 'secondary' | 'destructive' | 'outline'
      > = {
         draft: 'outline',
         active: 'default',
         paused: 'secondary',
         closed: 'destructive',
         expired: 'destructive',
      };

      return (
         <Badge variant={variants[status] || 'outline'}>
            {statuses[status] || status}
         </Badge>
      );
   };

   const handleToggleStatus = (jobId: number) => {
      router.put(
         toggleStatus(jobId),
         {},
         {
            preserveState: true,
            preserveScroll: true,
         },
      );
   };

   return (
      <>
         <Breadcrumbs
            title="Job Circulars"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Job Circulars' },
            ]}
            action={
               <Button asChild className="h-9 px-4">
                  <Link href={create()}>
                     <Plus />
                     Job Circular
                  </Link>
               </Button>
            }
            className="mb-4"
         />

         {/* Job Circulars List */}
         <Card>
            <TableFilter
               data={jobCirculars}
               title="Job Circulars List"
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="job-circulars.index"
               filterKey="jobs"
            />

            <CardContent className="p-4 pt-0 sm:p-6 md:pt-0">
               {jobCirculars.data.length > 0 ? (
                  <div className="space-y-4">
                     {jobCirculars.data.map((job) => (
                        <div
                           key={job.id}
                           className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                           <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:gap-4">
                              <div className="flex-1 space-y-4">
                                 <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold">
                                       {job.title}
                                    </h3>
                                    {getStatusBadge(job.status)}
                                 </div>

                                 <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                       <MapPin className="h-4 w-4" />
                                       {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Briefcase className="h-4 w-4" />
                                       {jobTypes[job.job_type]}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Building2 className="h-4 w-4" />
                                       {workTypes[job.work_type]}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <TrendingUp className="h-4 w-4" />
                                       {experienceLevels[job.experience_level]}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <BriefcaseBusiness className="h-4 w-4" />
                                       {job.positions_available} Position
                                       {job.positions_available !== 1
                                          ? 's'
                                          : ''}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Calendar className="h-4 w-4" />
                                       {new Date(
                                          job.application_deadline,
                                       ).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                       })}
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-2">
                                 <ActionsDropdown
                                    routes={[
                                       {
                                          label: 'Delete',
                                          method: 'delete',
                                          route: destroy.url(job.id),
                                          message: `Are you sure you want to delete this job circular?`,
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
                                             <Link
                                                href={show({
                                                   job_circular: job.uuid,
                                                })}
                                             >
                                                <Eye size={15} />
                                                View
                                             </Link>
                                          </Button>

                                          <Button
                                             asChild
                                             variant="ghost"
                                             size="sm"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Link
                                                href={edit({
                                                   job_circular: Number(job.id),
                                                })}
                                             >
                                                <Edit size={15} />
                                                Edit
                                             </Link>
                                          </Button>

                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="w-full justify-start has-[svg]:!px-2"
                                             onClick={() =>
                                                handleToggleStatus(
                                                   Number(job.id),
                                                )
                                             }
                                          >
                                             {job.status === 'active' ? (
                                                <>
                                                   <PauseCircle size={15} />
                                                   Pause
                                                </>
                                             ) : (
                                                <>
                                                   <PlayCircle size={15} />
                                                   Activate
                                                </>
                                             )}
                                          </Button>
                                       </>
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-12 text-center">
                     <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                     <h3 className="mt-4 text-lg font-semibold">
                        {dashboard.no_job_circulars_found}
                     </h3>
                     <p className="mt-2 text-sm text-muted-foreground">
                        Get started by creating your first job circular.
                     </p>

                     <Button className="mt-4" asChild>
                        <Link href={create()}>
                           <Plus className="h-4 w-4" />
                           {button.create_job}
                        </Link>
                     </Button>
                  </div>
               )}
            </CardContent>

            <TableFooter
               className="border-none p-5 pt-0 sm:p-6 md:pt-0"
               routeName="job-circulars.index"
               paginationInfo={jobCirculars}
               paginationKey="jobs"
            />
         </Card>
      </>
   );
};

JobCircularsIndex.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default JobCircularsIndex;
