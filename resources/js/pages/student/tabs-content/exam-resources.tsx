import { usePage } from '@inertiajs/react';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';

const ExamResources = () => {
   const { exam } = usePage<StudentExamProps>().props;

   return (
      <div className="space-y-8">
         {exam.resources.length > 0 ? (
            <Card>
               <div className="rounded-t-lg bg-muted px-4 py-3">
                  <h3 className="text-lg font-semibold">Exam Resources</h3>
               </div>

               <div className="overflow-hidden border-t">
                  <Table>
                     <TableHeader className="bg-muted/50">
                        <TableRow>
                           <TableHead className="px-4 font-semibold">
                              Title
                           </TableHead>
                           <TableHead className="px-4 font-semibold">
                              Date & Time
                           </TableHead>
                           <TableHead className="px-4 text-right font-semibold">
                              Action
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {exam.resources.map((resource, index) => (
                           <TableRow
                              key={resource.id}
                              className="hover:bg-muted/30"
                           >
                              <TableCell className="px-4 py-3 font-medium">
                                 {resource.title}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-muted-foreground">
                                 {formatDate(resource.created_at)}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <Button
                                       asChild
                                       size="icon"
                                       variant="secondary"
                                       className="h-7 w-7"
                                    >
                                       <a
                                          target="_blank"
                                          href={resource.resource}
                                       >
                                          {resource.type === 'link' ? (
                                             <>
                                                {' '}
                                                <ExternalLink className="h-3 w-3" />
                                                Check
                                             </>
                                          ) : (
                                             <>
                                                <Download className="h-3 w-3" />
                                                Download
                                             </>
                                          )}
                                       </a>
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>
            </Card>
         ) : (
            <div className="py-12 text-center">
               <p className="text-lg text-muted-foreground">
                  No resources available for this exam yet.
               </p>
            </div>
         )}
      </div>
   );
};

export default ExamResources;
