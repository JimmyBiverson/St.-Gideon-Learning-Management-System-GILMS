import { usePage } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import LiveClassStatus from '@/components/live-class-status';
import { Renderer } from '@/components/rich-editor';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const CourseLiveClasses = () => {
   const { props } = usePage<StudentCourseProps>();
   const { course, live_classes, zoomConfig } = props;

   return (
      <div className="space-y-4">
         {live_classes.length <= 0 ? (
            <div className="p-8 text-center">
               <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
               <h3 className="mb-2 text-lg font-medium">
                  No Live Classes Scheduled
               </h3>
               <p className="text-gray-500">
                  Schedule your first live class to get started with Zoom.
               </p>
            </div>
         ) : (
            live_classes.map((liveClass) => {
               return (
                  <Card key={liveClass.id} className="space-y-4 p-4">
                     <p className="text-base font-medium">
                        {liveClass.class_topic}
                     </p>

                     <div className="flex items-center justify-between gap-2">
                        <div className="space-y-3 text-sm text-muted-foreground">
                           <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                 {format(
                                    parseISO(liveClass.class_date_and_time),
                                    'p',
                                 )}
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                 {format(
                                    parseISO(liveClass.class_date_and_time),
                                    'PPP',
                                 )}
                              </span>
                           </div>
                        </div>

                        <div className="flex flex-col gap-2">
                           <LiveClassStatus
                              courseId={course.id}
                              liveClass={liveClass}
                              zoomConfig={zoomConfig}
                           />
                        </div>
                     </div>

                     {liveClass.class_note && (
                        <Accordion type="single" collapsible className="w-full">
                           <AccordionItem
                              value="item-1"
                              className="overflow-hidden rounded-lg border-none bg-muted"
                           >
                              <AccordionTrigger className="[&[data-state=open]]:!bg-secondary-100er px-3 py-1.5 text-sm font-normal hover:no-underline">
                                 Class Note
                              </AccordionTrigger>
                              <AccordionContent className="p-3">
                                 <Renderer value={liveClass.class_note} />
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     )}
                  </Card>
               );
            })
         )}
      </div>
   );
};

export default CourseLiveClasses;
