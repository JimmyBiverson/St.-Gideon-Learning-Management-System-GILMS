import { Head, Link } from '@inertiajs/react';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { BookOpen, UserCheck, UserPlus, Users, Video } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
   Cell,
   Legend,
   Pie,
   PieChart,
   ResponsiveContainer,
   Tooltip,
} from 'recharts';
import InstructorTableColumn from '@/billing/pages/payouts/partials/payouts-table-columns';
import AdminTableColumn from '@/billing/pages/payouts/partials/request-table-columns';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { cn } from '@/lib/utils';
import { index as payoutsIndex } from '@/routes/payouts';
import { request as payoutsRequestIndex } from '@/routes/payouts';
import RevenueChart from './partials/revenue-chart';

type StatisticsType = {
   courses: number;
   lessons: number;
   enrollments: number;
   students: number;
   instructors: number;
};

type RevenueDataType = Record<string, number>;

type CourseStatusDistributionType = Record<string, number>;

export interface DashboardProps extends SharedData {
   statistics: StatisticsType;
   revenueData: RevenueDataType;
   courseStatusDistribution: CourseStatusDistributionType;
   pendingWithdrawals: Payout[];
}

const Dashboard = (props: DashboardProps) => {
   const {
      auth,
      system,
      statistics,
      courseStatusDistribution,
      pendingWithdrawals,
      translate,
   } = props;
   const { frontend } = translate;
   const isAdmin = auth.user.role === 'admin';

   // Format course status data for pie chart
   const pieChartData = useMemo(() => {
      return Object.entries(courseStatusDistribution).map(([name, value]) => ({
         name,
         value,
      }));
   }, [courseStatusDistribution]);

   const table = useReactTable({
      data: pendingWithdrawals,
      columns: isAdmin
         ? AdminTableColumn(props.translate)
         : InstructorTableColumn(props.translate),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return (
      <div className="space-y-7">
         <Head title={frontend.dashboard} />

         {/* Statistics Cards */}
         <div
            className={cn(
               'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3',
               isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
            )}
         >
            <StatCard
               title={frontend.courses}
               value={statistics.courses}
               icon={<BookOpen className="h-6 w-6 text-blue-500" />}
            />
            <StatCard
               title={frontend.lessons}
               value={statistics.lessons}
               icon={<Video className="h-6 w-6 text-green-500" />}
            />
            <StatCard
               title={frontend.enrollment}
               value={statistics.enrollments}
               icon={<UserCheck className="h-6 w-6 text-amber-500" />}
            />
            <StatCard
               title={frontend.students}
               value={statistics.students}
               icon={<Users className="h-6 w-6 text-purple-500" />}
            />
            {isAdmin && (
               <StatCard
                  title={'Instructors'}
                  value={statistics.instructors}
                  icon={<UserPlus className="h-6 w-6 text-rose-500" />}
               />
            )}
         </div>

         {/* Revenue Chart - Full Width */}
         {system.sub_type === 'collaborative' && <RevenueChart />}

         {/* Course Status Chart */}
         <div className="grid grid-cols-2 gap-6 lg:grid-cols-12">
            <Card className="col-span-full p-6 lg:col-span-4">
               <h3 className="mb-4 text-lg font-medium">
                  {frontend.course_status}
               </h3>

               <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                     <PieChart>
                        <Pie
                           data={pieChartData}
                           cx="50%"
                           cy="50%"
                           innerRadius={0}
                           outerRadius={80}
                           fill="#8884d8"
                           dataKey="value"
                           paddingAngle={0}
                           label={false}
                        >
                           {pieChartData.map((entry, index) => (
                              <Cell
                                 key={`cell-${index}`}
                                 fill={
                                    [
                                       'var(--color-secondary-100)', // Lightest variant
                                       'var(--color-secondary-200)', // Light variant
                                       'var(--color-secondary-300)', // Base color (secondary-foreground)
                                       'var(--color-secondary-400)', // Dark variant
                                       'var(--color-secondary)', // Darkest variant
                                    ][index % 5]
                                 }
                              />
                           ))}
                        </Pie>
                        <Legend
                           layout="horizontal"
                           align="center"
                           verticalAlign="bottom"
                           iconType="circle"
                        />
                        <Tooltip
                           formatter={(value) => [value, frontend.courses]}
                        />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
            </Card>

            {system.sub_type === 'collaborative' ? (
               <Card className="col-span-full lg:col-span-8">
                  <div className="flex items-center justify-between gap-6 p-6">
                     <h3 className="text-lg font-medium">
                        {frontend.latest_pending_withdrawal_request}
                     </h3>

                     <Button asChild variant="outline">
                        <Link
                           href={
                              isAdmin ? payoutsRequestIndex() : payoutsIndex()
                           }
                        >
                           {frontend.view_all}
                        </Link>
                     </Button>
                  </div>

                  <Table className="border-y border-border">
                     <TableHeader table={table} />

                     <TableBody>
                        {table.getRowModel().rows?.length ? (
                           table.getRowModel().rows.map((row) => (
                              <TableRow
                                 key={row.id}
                                 data-state={row.getIsSelected() && 'selected'}
                              >
                                 {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                       {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext(),
                                       )}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell className="h-24 text-center">
                                 {frontend.no_results}
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </Card>
            ) : (
               <div className="col-span-full lg:col-span-8">
                  <RevenueChart />
               </div>
            )}
         </div>
      </div>
   );
};

type StatCardProps = {
   title: string;
   value: number;
   icon: ReactNode;
};

const StatCard = ({ title, value, icon }: StatCardProps) => {
   return (
      <Card className="p-4 sm:p-6">
         <div className="flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-muted-foreground">
                  {title}
               </p>
               <h4 className="mt-1 text-2xl font-semibold">{value}</h4>
            </div>
            <div className="rounded-full bg-gray-100 p-3">{icon}</div>
         </div>
      </Card>
   );
};

Dashboard.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Dashboard;
