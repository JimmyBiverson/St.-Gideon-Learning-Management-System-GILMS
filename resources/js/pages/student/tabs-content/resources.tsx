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

const Resources = () => {
   const { props } = usePage<StudentCourseProps>();
   const { resources } = props;

   return (
      <div className="space-y-8">
         {resources && resources.length > 0 ? (
            resources.map((section) => (
               <Card key={section.id}>
                  {/* Module Header */}
                  <div className="rounded-t-lg bg-muted px-4 py-3">
                     <h3 className="text-lg font-semibold">
                        Module: {section.title}
                     </h3>
                  </div>

                  {/* Lessons Table */}
                  <div className="space-y-4 p-4">
                     {section.section_lessons &&
                     section.section_lessons.length > 0 ? (
                        section.section_lessons.map((lesson) =>
                           lesson.resources && lesson.resources.length > 0 ? (
                              <div
                                 key={lesson.id}
                                 className="rounded-md border"
                              >
                                 {/* Lesson Title */}
                                 <div className="p-4">
                                    <p className="text-base font-medium">
                                       <span className="font-semibold">
                                          Lesson:
                                       </span>{' '}
                                       {lesson.title}
                                    </p>
                                 </div>

                                 {/* Resources Table */}
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
                                          {lesson.resources.map((resource) => (
                                             <TableRow
                                                key={resource.id}
                                                className="hover:bg-muted/30"
                                             >
                                                <TableCell className="px-4 py-3 font-medium">
                                                   {resource.title}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-muted-foreground">
                                                   {formatDate(
                                                      resource.created_at,
                                                   )}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-right">
                                                   <div className="flex items-center justify-end gap-2">
                                                      <Button
                                                         asChild
                                                         size="sm"
                                                         variant="secondary"
                                                      >
                                                         <a
                                                            target="_blank"
                                                            href={
                                                               resource.resource
                                                            }
                                                         >
                                                            {resource.type ===
                                                            'link' ? (
                                                               <>
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
                              </div>
                           ) : null,
                        )
                     ) : (
                        <div className="py-8 text-center text-muted-foreground">
                           No lessons found in this module.
                        </div>
                     )}
                  </div>
               </Card>
            ))
         ) : (
            <div className="py-12 text-center">
               <p className="text-lg text-muted-foreground">
                  No resources available for this course yet.
               </p>
            </div>
         )}
      </div>
   );
};

export default Resources;
