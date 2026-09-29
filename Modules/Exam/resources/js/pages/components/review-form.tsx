import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { store, update } from '@/routes/exam-reviews';
import { Form, useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface Props {
   examId: number;
   review?: ExamReview;
   handler: React.ReactNode;
   onSuccess?: () => void;
}

const ReviewForm = ({ examId, review, handler, onSuccess }: Props) => {
   const [open, setOpen] = useState(false);
   const [hoveredRating, setHoveredRating] = useState(0);
   const [formKey, setFormKey] = useState(0);
   const { data, setData } = useForm({ rating: review?.rating || 5 });
   const formDefinition = review
      ? update.form.put({ review: Number(review.id) })
      : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (!nextOpen) {
               setData('rating', review?.rating || 5);
               setHoveredRating(0);
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {review ? 'Edit Review' : 'Write a Review'}
               </DialogTitle>
            </DialogHeader>

            <Form
               key={formKey}
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  exam_id: examId,
                  rating: data.rating,
               })}
               options={{ preserveScroll: true }}
               onSuccess={() => {
                  setFormKey((k) => k + 1);
                  setOpen(false);
                  onSuccess?.();
               }}
            >
               {({ errors, processing }) => (
                  <>
                     <div className="space-y-4 py-4">
                        <div>
                           <Label>Rating *</Label>
                           <div className="mt-2 flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setData('rating', star)}
                                    className="transition-transform hover:scale-110"
                                 >
                                    <Star
                                       className={cn(
                                          'h-8 w-8',
                                          star <= (hoveredRating || data.rating)
                                             ? 'fill-yellow-400 text-yellow-400'
                                             : 'fill-gray-200 text-gray-200',
                                       )}
                                    />
                                 </button>
                              ))}
                           </div>
                           <InputError message={errors.rating} />
                        </div>

                        <div>
                           <Label htmlFor="review">
                              Your Review (Optional)
                           </Label>
                           <Textarea
                              id="review"
                              name="review"
                              defaultValue={review?.review || ''}
                              placeholder="Share your experience with this exam..."
                              rows={4}
                              className="mt-2"
                           />
                           <InputError message={errors.review} />
                        </div>
                     </div>

                     <DialogFooter className="gap-2">
                        <DialogClose asChild>
                           <Button type="button" variant="outline">
                              Cancel
                           </Button>
                        </DialogClose>
                        <LoadingButton
                           loading={processing}
                           disabled={processing}
                        >
                           {review ? 'Update Review' : 'Submit Review'}
                        </LoadingButton>
                     </DialogFooter>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default ReviewForm;
