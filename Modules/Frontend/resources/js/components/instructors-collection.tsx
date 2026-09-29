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

interface InstructorsCollectionProps {
   data: { best: Instructor | null; top: Instructor[]; new: Instructor[] };
   instructors: Pagination<Instructor>;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemId: number | string,
   ) => void;
}

const InstructorsCollection = ({
   data,
   instructors,
   onInsert,
}: InstructorsCollectionProps) => {
   const [value, setValue] = useState('best');

   const renderInstructorRow = (
      instructor: Instructor,
      category: FrontendPageAPIParams,
   ) => (
      <TableRow key={instructor.id}>
         <TableCell>
            <img
               src={instructor.user?.photo || '/placeholder.jpg'}
               alt={instructor.user?.name}
               className="h-12 w-12 rounded-full object-cover"
            />
         </TableCell>
         <TableCell className="font-medium">
            {instructor.user?.name || 'N/A'}
         </TableCell>
         <TableCell>{instructor.user?.email || 'N/A'}</TableCell>
         <TableCell>{instructor.courses_count || 0} courses</TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="instructors"
               category={category}
               itemId={instructor.id}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card className="relative space-y-6 py-6">
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Instructors</CardTitle>
               <ApiCopy value={`api/collections/instructors/${value}`} />
            </div>

            <Dialog>
               <DialogTrigger>
                  <Button variant="outline" className="capitalize">
                     Select {value} Instructor
                  </Button>
               </DialogTrigger>
               <DialogContent className="p-0">
                  <ScrollArea className="max-h-[90vh] p-2">
                     <DataTable
                        type="instructors"
                        title="Instructors"
                        data={instructors}
                        selectedIds={
                           value === 'best'
                              ? ([data.best?.id] as number[])
                              : value === 'top'
                                ? (data.top.map(
                                     (instructor) => instructor.id,
                                  ) as number[])
                                : (data.new.map(
                                     (instructor) => instructor.id,
                                  ) as number[])
                        }
                        onCourseSelect={(id) =>
                           onInsert(
                              'instructors',
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
                     Best Instructor
                  </TabsTrigger>
                  <TabsTrigger value="top" className="cursor-pointer">
                     Top Instructors
                  </TabsTrigger>
                  <TabsTrigger value="new" className="cursor-pointer">
                     New Instructors
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="best">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Photo</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Courses</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.best ? (
                           renderInstructorRow(data.best, 'best')
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No best instructor selected
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
                           <TableHead>Photo</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Courses</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((instructor) =>
                              renderInstructorRow(instructor, 'top'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top instructors selected
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
                           <TableHead>Photo</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Courses</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((instructor) =>
                              renderInstructorRow(instructor, 'new'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new instructors selected
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

export default InstructorsCollection;
