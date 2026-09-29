import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import courseRoutes from '@/routes/course';
import { Form, Link, router, useForm, usePage } from '@inertiajs/react';
import {
   BadgeCheck,
   Eye,
   Play,
   ChevronDown,
   AlertTriangle,
   CheckCircle2,
   XCircle,
   BookOpen,
   Layers,
   HelpCircle,
   Send,
   ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';

const STATUS_CONFIG = {
   approved: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20',
      dot: 'bg-emerald-500',
      ping: 'bg-emerald-400',
   },
   pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20',
      dot: 'bg-amber-500',
      ping: 'bg-amber-400',
   },
   rejected: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20',
      dot: 'bg-rose-500',
      ping: 'bg-rose-400',
   },
   draft: {
      bg: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20 hover:bg-slate-100 dark:hover:bg-slate-500/20',
      dot: 'bg-slate-500',
      ping: 'bg-slate-400',
   },
   upcoming: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20',
      dot: 'bg-blue-500',
      ping: 'bg-blue-400',
   },
};

const CourseUpdateHeader = () => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, button, input, common } = translate;
   const user = props.auth.user;
   const { course, watchHistory, approvalStatus } = props;
   const statuses = props.statuses.filter((status) => status !== course.status);
   const { approve_able, validation_messages, counts } = approvalStatus;

   const { data, setData } = useForm({ feedback: '' });

   return (
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
         {watchHistory ? (
            <Button asChild>
               <Link
                  href={courseRoutes.play.start({
                     type: watchHistory.current_watching_type,
                     watch_history: watchHistory.id,
                     lesson_id: watchHistory.current_watching_id,
                  })}
               >
                  <Play className="mr-1.5 h-4 w-4 fill-current" />
                  Player
               </Link>
            </Button>
         ) : approve_able ? (
            <Button
               onClick={() =>
                  router.post(courseRoutes.play.init(), {
                     course_id: course.id,
                  })
               }
            >
               <Play className="mr-1.5 h-4 w-4 fill-current" />
               Player
            </Button>
         ) : (
            <Button disabled>
               <Play className="mr-1.5 h-4 w-4" />
               Player
            </Button>
         )}

         <Button variant="outline" asChild>
            <Link
               href={courseRoutes.details({
                  slug: course.slug,
                  id: course.id,
               })}
            >
               <Eye className="mr-1.5 h-4 w-4" />
               Preview
            </Link>
         </Button>

         {/* Status Badge */}
         {approve_able && user.role !== 'instructor' ? (
            /* Admin Status Action Dialog */
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button
                     type="button"
                     className={cn(
                        'border px-3 py-1.5 text-xs font-semibold capitalize shadow-sm transition-all',
                        STATUS_CONFIG[
                           course.status as keyof typeof STATUS_CONFIG
                        ]?.bg || STATUS_CONFIG.draft.bg,
                     )}
                  >
                     <span className="relative flex h-2 w-2">
                        <span
                           className={cn(
                              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                              STATUS_CONFIG[
                                 course.status as keyof typeof STATUS_CONFIG
                              ]?.ping || STATUS_CONFIG.draft.ping,
                           )}
                        ></span>
                        <span
                           className={cn(
                              'relative inline-flex h-2 w-2 rounded-full',
                              STATUS_CONFIG[
                                 course.status as keyof typeof STATUS_CONFIG
                              ]?.dot || STATUS_CONFIG.draft.dot,
                           )}
                        ></span>
                     </span>
                     {course.status}
                     <ChevronDown className="ml-0.5 h-3.5 w-3.5 opacity-60" />
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                     <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <BadgeCheck className="h-5 w-5 text-primary" />
                        Update Approval Status
                     </DialogTitle>
                     <p className="text-sm text-muted-foreground">
                        Change the status of this course and provide optional
                        feedback.
                     </p>
                  </DialogHeader>

                  <Form
                     {...courseRoutes.status.form(course.id)}
                     transform={(formData) => ({
                        ...formData,
                        feedback: data.feedback,
                     })}
                     onSuccess={() => {
                        setData('feedback', '');
                        setOpen(false);
                     }}
                     className="space-y-6 pt-4"
                  >
                     {({ errors, processing }) => (
                        <>
                           <div className="space-y-2">
                              <Label className="text-sm font-semibold">
                                 {common.status}
                              </Label>
                              <Select required name="status">
                                 <SelectTrigger className="w-full border-input bg-background capitalize">
                                    <SelectValue
                                       placeholder={
                                          common.select_the_approval_status
                                       }
                                    />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {statuses.map((status) => (
                                       <SelectItem
                                          key={status}
                                          value={status}
                                          className="cursor-pointer capitalize"
                                       >
                                          {status}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.status} />
                           </div>

                           <div className="space-y-2">
                              <Label className="text-sm font-semibold">
                                 {input.feedback} {`(Optional)`}
                              </Label>
                              <div className="rounded-lg border bg-background">
                                 <Editor
                                    ssr={true}
                                    output="html"
                                    placeholder={{
                                       paragraph: input.description_placeholder,
                                       imageCaption:
                                          input.image_url_placeholder,
                                    }}
                                    contentMinHeight={180}
                                    contentMaxHeight={400}
                                    initialContent={data.feedback}
                                    onContentChange={(value) =>
                                       setData('feedback', value as string)
                                    }
                                 />
                              </div>
                              <InputError message={errors.feedback} />
                           </div>

                           <div className="flex justify-end gap-3 pt-2">
                              <Button
                                 type="button"
                                 variant="outline"
                                 onClick={() => setOpen(false)}
                                 disabled={processing}
                              >
                                 Cancel
                              </Button>
                              <LoadingButton
                                 loading={processing}
                                 className="px-6"
                              >
                                 {button.submit}
                              </LoadingButton>
                           </div>
                        </>
                     )}
                  </Form>
               </DialogContent>
            </Dialog>
         ) : (
            /* Static Badge */
            <span
               className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize select-none',
                  STATUS_CONFIG[course.status as keyof typeof STATUS_CONFIG]
                     ?.bg || STATUS_CONFIG.draft.bg,
               )}
            >
               <span className="relative flex h-2 w-2">
                  <span
                     className={cn(
                        'relative inline-flex h-2 w-2 rounded-full',
                        STATUS_CONFIG[
                           course.status as keyof typeof STATUS_CONFIG
                        ]?.dot || STATUS_CONFIG.draft.dot,
                     )}
                  ></span>
               </span>
               {course.status}
            </span>
         )}

         {/* Actions */}
         {approve_able ? (
            user.role === 'instructor' &&
            course.status !== 'approved' &&
            course.status !== 'pending' && (
               <Button
                  onClick={() =>
                     router.put(courseRoutes.status({ id: course.id }), {
                        status: 'pending',
                     })
                  }
               >
                  <Send className="mr-1.5 h-4 w-4" />
                  {button.submit_for_approval}
               </Button>
            )
         ) : (
            /* Requirements / Validation Messages Dialog */
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button
                     variant="outline"
                     className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-500/30 dark:text-amber-400 dark:hover:bg-amber-950/20"
                  >
                     <AlertTriangle className="mr-1.5 h-4 w-4" />
                     {button.submit_for_approval}
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                     <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <ShieldAlert className="h-5 w-5 text-amber-500" />
                        {dashboard.course_approval_status}
                     </DialogTitle>
                     <p className="text-sm text-muted-foreground">
                        Review the current status and checklist items required
                        for submission.
                     </p>
                  </DialogHeader>

                  <div className="space-y-6 pt-4">
                     <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                           <h4 className="mb-1 text-sm leading-none font-semibold">
                              {dashboard.course_needs_attention}
                           </h4>
                           <p className="text-xs text-destructive/90">
                              Please resolve the requirements below before
                              submitting the course.
                           </p>
                        </div>
                     </div>

                     <div className="space-y-2.5">
                        <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                           Pending Requirements
                        </h4>
                        <div className="max-h-[160px] space-y-2 overflow-y-auto pr-1">
                           {validation_messages.map(
                              (message: string, index: number) => (
                                 <div
                                    key={index}
                                    className="flex items-start gap-2.5 rounded-lg border bg-card p-3 text-sm text-foreground shadow-sm"
                                 >
                                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                                    <span className="leading-snug">
                                       {message}
                                    </span>
                                 </div>
                              ),
                           )}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                           {dashboard.course_content_summary}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="flex items-center gap-3 rounded-xl border bg-muted/10 p-3">
                              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                 <Layers className="h-4 w-4" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-muted-foreground">
                                    {dashboard.sections}
                                 </p>
                                 <p className="text-base font-bold">
                                    {counts.sections_count}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 rounded-xl border bg-muted/10 p-3">
                              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                 <BookOpen className="h-4 w-4" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-muted-foreground">
                                    {dashboard.lessons}
                                 </p>
                                 <p className="text-base font-bold">
                                    {counts.lessons_count}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 rounded-xl border bg-muted/10 p-3">
                              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                 <HelpCircle className="h-4 w-4" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-muted-foreground">
                                    {dashboard.quizzes}
                                 </p>
                                 <p className="text-base font-bold">
                                    {counts.quizzes_count}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                              <div className="rounded-lg bg-primary/20 p-2 text-primary">
                                 <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-primary/80">
                                    {dashboard.total_content_items}
                                 </p>
                                 <p className="text-base font-extrabold text-primary">
                                    {counts.total_content_count}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </DialogContent>
            </Dialog>
         )}
      </div>
   );
};

export default CourseUpdateHeader;
