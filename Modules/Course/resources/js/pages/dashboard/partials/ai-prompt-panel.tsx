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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { router } from '@inertiajs/react';
import { Bot, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export interface AiSelectField {
   name: string;
   label: string;
   placeholder?: string;
   required?: boolean;
   options: { label: string; value: string }[];
}

interface Props {
   title: string;
   description?: string;
   actionUrl: string;
   extraData?: Record<string, string | number | boolean | null | undefined>;
   selectFields?: AiSelectField[];
   onSuccess?: () => void;
   handler: React.ReactNode;
}

const AiPromptPanel = ({
   title,
   description,
   actionUrl,
   extraData = {},
   selectFields = [],
   onSuccess,
   handler,
}: Props) => {
   const { user } = useAuth();
   const [open, setOpen] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [processing, setProcessing] = useState(false);
   const [thumbnailGenerate, setThumbnailGenerate] = useState(false);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [fieldValues, setFieldValues] = useState<Record<string, string>>(() =>
      Object.fromEntries(selectFields.map((f) => [f.name, ''])),
   );

   const setFieldValue = (name: string, value: string) => {
      setFieldValues((prev) => ({ ...prev, [name]: value }));
   };

   const isFormValid =
      prompt.trim().length > 0 &&
      selectFields.filter((f) => f.required).every((f) => fieldValues[f.name]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
         return;
      }

      setProcessing(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      router.post(
         actionUrl,
         {
            prompt,
            generate_thumbnail: thumbnailGenerate,
            ...extraData,
            ...fieldValues,
         },
         {
            onSuccess: (page) => {
               const props = page.props as Record<string, unknown>;
               const flash = props.flash as
                  | { success?: string | null; error?: string | null }
                  | undefined;

               if (flash?.error) {
                  setErrorMessage(flash.error);
                  setProcessing(false);

                  return;
               }

               setSuccessMessage(
                  flash?.success ?? 'Done! The AI has completed the task.',
               );
               setProcessing(false);
               onSuccess?.();
            },
            onError: (errors) => {
               const firstError = Object.values(errors)[0] as string;
               setErrorMessage(
                  firstError ?? 'Something went wrong. Please try again.',
               );
               setProcessing(false);
            },

            onFinish: () => {
               setProcessing(false);
            },
         },
      );
   };

   const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (!nextOpen) {
         setPrompt('');
         setSuccessMessage(null);
         setErrorMessage(null);
         setThumbnailGenerate(false);
         setFieldValues(
            Object.fromEntries(selectFields.map((f) => [f.name, ''])),
         );
      }
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0 sm:max-w-lg">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-5">
                  <div className="mb-2 flex items-center gap-2">
                     <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                        <Bot className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                     </div>
                     <DialogTitle>{title}</DialogTitle>
                  </div>
                  {description && (
                     <p className="text-sm text-muted-foreground">
                        {description}
                     </p>
                  )}
               </DialogHeader>

               {successMessage ? (
                  <div className="space-y-4">
                     <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-green-800 dark:text-green-200">
                           {successMessage}
                        </p>
                     </div>
                     <DialogFooter>
                        <DialogClose asChild>
                           <Button variant="outline">Close</Button>
                        </DialogClose>
                     </DialogFooter>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="flex items-center space-x-2">
                        <Switch
                           id="thumbnail-generate"
                           className="cursor-pointer"
                           onCheckedChange={(checked) => {
                              setThumbnailGenerate(checked);
                           }}
                        />

                        <Label
                           htmlFor="thumbnail-generate"
                           className="mb-0 cursor-pointer"
                        >
                           Thumbnail Generation
                        </Label>
                     </div>

                     {selectFields.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                           {selectFields.map((field) => (
                              <div key={field.name} className="space-y-1.5">
                                 <Label htmlFor={`ai-field-${field.name}`}>
                                    {field.label}
                                    {field.required && (
                                       <span className="ml-0.5 text-destructive">
                                          *
                                       </span>
                                    )}
                                 </Label>
                                 <Select
                                    value={fieldValues[field.name]}
                                    onValueChange={(v) =>
                                       setFieldValue(field.name, v)
                                    }
                                    disabled={processing}
                                 >
                                    <SelectTrigger
                                       id={`ai-field-${field.name}`}
                                    >
                                       <SelectValue
                                          placeholder={
                                             field.placeholder ??
                                             `Select ${field.label}`
                                          }
                                       />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {field.options.map((opt) => (
                                          <SelectItem
                                             key={opt.value}
                                             value={opt.value}
                                          >
                                             {opt.label}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                           ))}
                        </div>
                     )}

                     <div className="space-y-2">
                        <Label htmlFor="ai-prompt">Your instructions</Label>
                        <Textarea
                           id="ai-prompt"
                           rows={5}
                           placeholder="Describe what you want the AI to generate or change..."
                           value={prompt}
                           onChange={(e) => setPrompt(e.target.value)}
                           disabled={processing}
                           className="resize-none"
                        />
                        {errorMessage && (
                           <p className="text-sm text-destructive">
                              {errorMessage}
                           </p>
                        )}
                     </div>

                     {processing && (
                        <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400">
                           <div className="flex gap-1">
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                           </div>
                           <span>AI is working on it...</span>
                        </div>
                     )}

                     <DialogFooter className="gap-2">
                        <DialogClose asChild>
                           <Button
                              type="button"
                              variant="outline"
                              disabled={processing}
                           >
                              Cancel
                           </Button>
                        </DialogClose>
                        <LoadingButton
                           loading={processing}
                           disabled={!isFormValid}
                        >
                           Generate with AI
                        </LoadingButton>
                     </DialogFooter>
                  </form>
               )}
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default AiPromptPanel;
