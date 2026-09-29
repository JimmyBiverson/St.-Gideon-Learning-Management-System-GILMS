import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface ExamsCollectionProps {
   data: { best: any | null; top: any[]; new: any[] };
}

const ExamsCollection = ({ data }: ExamsCollectionProps) => {
   const [value, setValue] = useState('best');

   const renderExamRow = (exam: any, category: FrontendPageAPIParams) => (
      <TableRow key={exam.id}>
         <TableCell>
            <img
               src={exam.thumbnail || '/placeholder.jpg'}
               alt={exam.title}
               className="h-12 w-20 rounded object-cover"
            />
         </TableCell>
         <TableCell className="font-medium">{exam.title}</TableCell>
         <TableCell>{exam.course?.title || 'N/A'}</TableCell>
         <TableCell>{exam.quiz_questions_count || 0} questions</TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="exams"
               category={category}
               itemId={exam.id}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card>
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Exams</CardTitle>
               <ApiCopy value={`api/collections/exams/${value}`} />
            </div>
         </CardHeader>
         <CardContent>
            <Tabs
               defaultValue="best"
               className="w-full"
               value={value}
               onValueChange={setValue}
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="best">Best</TabsTrigger>
                  <TabsTrigger value="top">Top</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
               </TabsList>

               <TabsContent value="best">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Icon</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Course</TableHead>
                           <TableHead>Questions</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.best ? (
                           renderExamRow(data.best, 'best')
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No best exam selected
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
                           <TableHead>Icon</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Course</TableHead>
                           <TableHead>Questions</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((exam) => renderExamRow(exam, 'top'))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top exams selected
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
                           <TableHead>Icon</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Course</TableHead>
                           <TableHead>Questions</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((exam) => renderExamRow(exam, 'new'))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new exams selected
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

export default ExamsCollection;
