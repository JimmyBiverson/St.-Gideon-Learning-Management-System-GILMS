import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import DataTable from '@/frontend/components/table';
import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface CoursesCollectionProps {
   data: { best: Course | null; top: Course[]; new: Course[] };
   courses: Pagination<Course>;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemId: number | string,
   ) => void;
}

const CoursesCollection = ({
   data,
   courses,
   onInsert,
}: CoursesCollectionProps) => {
   const [value, setValue] = useState('best');

   const renderCourseRow = (
      course: Course,
      category: FrontendPageAPIParams,
   ) => (
      <TableRow key={course.id}>
         <TableCell>
            <img
               src={course.thumbnail || '/placeholder.jpg'}
               alt={course.title}
               className="h-12 w-20 rounded object-cover"
            />
         </TableCell>
         <TableCell className="font-medium">{course.title}</TableCell>
         <TableCell>{course.enrollments_count || 0} enrollments</TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="courses"
               category={category}
               itemId={course.id}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card className="relative space-y-6 py-6">
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Courses</CardTitle>
               <ApiCopy value={`api/collections/courses/${value}`} />
            </div>

            <Dialog>
               <DialogTrigger>
                  <Button variant="outline" className="capitalize">
                     Select {value} Course
                  </Button>
               </DialogTrigger>
               <DialogContent className="p-0">
                  <ScrollArea className="max-h-[90vh]">
                     <DataTable
                        type="courses"
                        title="Courses"
                        data={courses}
                        selectedIds={
                           value === 'best'
                              ? ([data.best?.id] as number[])
                              : value === 'top'
                                ? (data.top.map((cat) => cat.id) as number[])
                                : (data.new.map((cat) => cat.id) as number[])
                        }
                        onCourseSelect={(id) =>
                           onInsert(
                              'courses',
                              value as FrontendPageAPIParams,
                              id,
                           )
                        }
                     />
                  </ScrollArea>
               </DialogContent>
            </Dialog>
         </CardHeader>

         <CardContent>
            <Tabs
               defaultValue="best"
               className="w-full"
               value={value}
               onValueChange={setValue}
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="best" className="cursor-pointer">
                     Best Course
                  </TabsTrigger>
                  <TabsTrigger value="top" className="cursor-pointer">
                     Top Courses
                  </TabsTrigger>
                  <TabsTrigger value="new" className="cursor-pointer">
                     New Courses
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="best">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Enrollments</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.best ? (
                           renderCourseRow(data.best, 'best')
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No best course selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>

               <TabsContent value="top">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Enrollments</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((course) =>
                              renderCourseRow(course, 'top'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top courses selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>

               <TabsContent value="new">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Enrollments</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((course) =>
                              renderCourseRow(course, 'new'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new courses selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>
            </Tabs>
         </CardContent>
      </Card>
   );
};

export default CoursesCollection;
