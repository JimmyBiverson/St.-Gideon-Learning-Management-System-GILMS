import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import productRoutes from '@/routes/product';
import { details } from '@/routes/products';
import { Form, Link, useForm, usePage } from '@inertiajs/react';
import {
   AlertTriangle,
   BadgeCheck,
   ChevronDown,
   Eye,
   Send,
   ShieldAlert,
   XCircle,
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
};

const ProductUpdateHeader = () => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<ProductUpdateProps>();
   const user = props.auth.user;
   const { product, approvalStatus } = props;
   const statuses = props.statuses.filter(
      (status) => status !== product.status,
   );
   const { approve_able, validation_messages } = approvalStatus;

   const { data, setData } = useForm({ feedback: '' });

   return (
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
         <Button variant="outline" asChild>
            <Link
               href={details({
                  slug: product.slug,
                  id: product.id,
               })}
            >
               <Eye className="mr-1.5 h-4 w-4" />
               Preview
            </Link>
         </Button>

         {approve_able && user.role !== 'instructor' ? (
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button
                     type="button"
                     className={cn(
                        'border px-3 py-1.5 text-xs font-semibold capitalize shadow-sm transition-all',
                        STATUS_CONFIG[
                           product.status as keyof typeof STATUS_CONFIG
                        ]?.bg || STATUS_CONFIG.draft.bg,
                     )}
                  >
                     <span className="relative flex h-2 w-2">
                        <span
                           className={cn(
                              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                              STATUS_CONFIG[
                                 product.status as keyof typeof STATUS_CONFIG
                              ]?.ping || STATUS_CONFIG.draft.ping,
                           )}
                        ></span>
                        <span
                           className={cn(
                              'relative inline-flex h-2 w-2 rounded-full',
                              STATUS_CONFIG[
                                 product.status as keyof typeof STATUS_CONFIG
                              ]?.dot || STATUS_CONFIG.draft.dot,
                           )}
                        ></span>
                     </span>
                     {product.status}
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
                        Change the status of this product and provide optional
                        feedback.
                     </p>
                  </DialogHeader>

                  <Form
                     {...productRoutes.status.form(product.id)}
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
                                 Status
                              </Label>
                              <Select required name="status">
                                 <SelectTrigger className="w-full border-input bg-background capitalize">
                                    <SelectValue placeholder="Select the approval status" />
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
                                 Feedback (Optional)
                              </Label>
                              <Textarea
                                 value={data.feedback}
                                 onChange={(e) =>
                                    setData('feedback', e.target.value)
                                 }
                                 rows={4}
                              />
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
                                 Submit
                              </LoadingButton>
                           </div>
                        </>
                     )}
                  </Form>
               </DialogContent>
            </Dialog>
         ) : (
            <span
               className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize select-none',
                  STATUS_CONFIG[product.status as keyof typeof STATUS_CONFIG]
                     ?.bg || STATUS_CONFIG.draft.bg,
               )}
            >
               <span className="relative flex h-2 w-2">
                  <span
                     className={cn(
                        'relative inline-flex h-2 w-2 rounded-full',
                        STATUS_CONFIG[
                           product.status as keyof typeof STATUS_CONFIG
                        ]?.dot || STATUS_CONFIG.draft.dot,
                     )}
                  ></span>
               </span>
               {product.status}
            </span>
         )}

         {approve_able ? (
            user.role === 'instructor' &&
            product.status !== 'approved' &&
            product.status !== 'pending' && (
               <Form {...productRoutes.status.form(product.id)}>
                  {({ processing }) => (
                     <>
                        <input type="hidden" name="status" value="pending" />
                        <LoadingButton loading={processing}>
                           <Send className="mr-1.5 h-4 w-4" />
                           Submit for Approval
                        </LoadingButton>
                     </>
                  )}
               </Form>
            )
         ) : (
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button
                     variant="outline"
                     className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-500/30 dark:text-amber-400 dark:hover:bg-amber-950/20"
                  >
                     <AlertTriangle className="mr-1.5 h-4 w-4" />
                     Submit for Approval
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                     <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <ShieldAlert className="h-5 w-5 text-amber-500" />
                        Approval Requirements
                     </DialogTitle>
                     <p className="text-sm text-muted-foreground">
                        Resolve the following before submitting the product for
                        review.
                     </p>
                  </DialogHeader>

                  <div className="space-y-2.5 pt-2">
                     {validation_messages.map((message, index) => (
                        <div
                           key={index}
                           className="flex items-start gap-2.5 rounded-lg border bg-card p-3 text-sm text-foreground shadow-sm"
                        >
                           <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                           <span className="leading-snug">{message}</span>
                        </div>
                     ))}
                  </div>
               </DialogContent>
            </Dialog>
         )}
      </div>
   );
};

export default ProductUpdateHeader;
