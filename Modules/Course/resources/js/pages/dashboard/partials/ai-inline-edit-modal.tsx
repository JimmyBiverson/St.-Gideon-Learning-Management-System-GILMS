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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import { useRef, useState } from 'react';

export interface QuestionCountLabels {
   single: string;
   multiple: string;
   boolean: string;
}

interface Props {
   title: string;
   description?: string;
   actionUrl: string;
   onSuccess?: () => void;
   handler: React.ReactNode;
   options?: Record<string, unknown>;
   /** When true, show numeric inputs for single / multiple / true–false counts before the prompt. */
   questionCountFields?: boolean;
   countLabels?: QuestionCountLabels;
   submitButtonLabel?: string;
   promptLabel?: string;
   promptPlaceholder?: string;
}

const AiInlineEditModal = ({
   title,
   description,
   actionUrl,
   onSuccess,
   handler,
   options,
   questionCountFields = false,
   countLabels,
   submitButtonLabel = 'Update with AI',
   promptLabel = 'Your instruction',
   promptPlaceholder = 'e.g. Make this more engaging and professional…',
}: Props) => {
   const [open, setOpen] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [singleCount, setSingleCount] = useState(0);
   const [multipleCount, setMultipleCount] = useState(0);
   const [booleanCount, setBooleanCount] = useState(0);
   const [processing, setProcessing] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const submitGuardRef = useRef(false);

   const totalQuestions = singleCount + multipleCount + booleanCount;
   const canSubmit =
      prompt.trim().length > 0 && (!questionCountFields || totalQuestions >= 1);

   const handleSubmit = () => {
      if (!canSubmit || submitGuardRef.current) {
         return;
      }

      submitGuardRef.current = true;
      setProcessing(true);
      setError(null);

      const payload: Record<string, unknown> = {
         prompt,
         ...options,
      };

      if (questionCountFields) {
         payload.single_count = singleCount;
         payload.multiple_count = multipleCount;
         payload.boolean_count = booleanCount;
      }

      router.post(actionUrl, payload, {
         preserveScroll: true,
         onFinish: () => {
            submitGuardRef.current = false;
            setProcessing(false);
         },
         onSuccess: (page) => {
            const flash = (page.props as { flash?: { error?: string | null } })
               .flash;

            if (flash?.error) {
               setError(flash.error);

               return;
            }

            setPrompt('');
            setSingleCount(0);
            setMultipleCount(0);
            setBooleanCount(0);
            setOpen(false);
            onSuccess?.();
         },
         onError: (errors) => {
            const first = Object.values(errors)[0] as string;
            setError(first ?? 'Something went wrong. Please try again.');
         },
      });
   };

   const handleOpenChange = (value: boolean) => {
      if (!value) {
         setPrompt('');
         setSingleCount(0);
         setMultipleCount(0);
         setBooleanCount(0);
         setError(null);
      }

      setOpen(value);
   };

   const labels = countLabels ?? {
      single: 'Single choice',
      multiple: 'Multiple choice',
      boolean: 'True / false',
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-900/30">
                     <Bot className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  {title}
               </DialogTitle>
               {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
               )}
            </DialogHeader>

            <div className="space-y-4">
               {questionCountFields && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                     <div className="space-y-1.5">
                        <Label htmlFor="ai-quiz-single">{labels.single}</Label>
                        <Input
                           id="ai-quiz-single"
                           type="number"
                           min={0}
                           max={50}
                           value={singleCount}
                           onChange={(e) =>
                              setSingleCount(
                                 Math.min(
                                    50,
                                    Math.max(
                                       0,
                                       parseInt(e.target.value, 10) || 0,
                                    ),
                                 ),
                              )
                           }
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="ai-quiz-multiple">
                           {labels.multiple}
                        </Label>
                        <Input
                           id="ai-quiz-multiple"
                           type="number"
                           min={0}
                           max={50}
                           value={multipleCount}
                           onChange={(e) =>
                              setMultipleCount(
                                 Math.min(
                                    50,
                                    Math.max(
                                       0,
                                       parseInt(e.target.value, 10) || 0,
                                    ),
                                 ),
                              )
                           }
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="ai-quiz-boolean">
                           {labels.boolean}
                        </Label>
                        <Input
                           id="ai-quiz-boolean"
                           type="number"
                           min={0}
                           max={50}
                           value={booleanCount}
                           onChange={(e) =>
                              setBooleanCount(
                                 Math.min(
                                    50,
                                    Math.max(
                                       0,
                                       parseInt(e.target.value, 10) || 0,
                                    ),
                                 ),
                              )
                           }
                        />
                     </div>
                  </div>
               )}

               <div className="space-y-1.5">
                  <Label htmlFor="ai-inline-prompt">{promptLabel}</Label>
                  <Textarea
                     id="ai-inline-prompt"
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder={promptPlaceholder}
                     rows={4}
                     autoFocus={!questionCountFields}
                  />
               </div>

               {questionCountFields && totalQuestions < 1 && (
                  <p className="text-xs text-muted-foreground">
                     Enter how many questions of each type the AI should create
                     (at least one in total), then describe topics and
                     difficulty.
                  </p>
               )}

               {error && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                     {error}
                  </p>
               )}
            </div>

            <DialogFooter className="gap-2">
               <DialogClose asChild>
                  <Button type="button" variant="outline">
                     Cancel
                  </Button>
               </DialogClose>
               <LoadingButton
                  loading={processing}
                  disabled={!canSubmit || processing}
                  onClick={handleSubmit}
               >
                  {submitButtonLabel}
               </LoadingButton>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default AiInlineEditModal;
