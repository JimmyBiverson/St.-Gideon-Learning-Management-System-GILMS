import Combobox from '@/components/combobox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Bot, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ComboboxOption {
   id?: number | string;
   child_id?: number | string;
   label: string;
   value: string;
}

interface Props {
   title: string;
   description?: string;
   actionUrl: string;
   extraData?: Record<string, string | number | boolean | null | undefined>;
   categoryLabel: string;
   categoryPlaceholder: string;
   languageLabel: string;
   languagePlaceholder: string;
   categoryData: ComboboxOption[];
   languageData: ComboboxOption[];
   onSuccess?: () => void;
   handler: React.ReactNode;
}

const CourseAiGeneratePanel = ({
   title,
   description,
   actionUrl,
   extraData = {},
   categoryLabel,
   categoryPlaceholder,
   languageLabel,
   languagePlaceholder,
   categoryData,
   languageData,
   onSuccess,
   handler,
}: Props) => {
   const [open, setOpen] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [processing, setProcessing] = useState(false);
   const [thumbnailGenerate, setThumbnailGenerate] = useState(false);
   const [textContentGenerate, setTextContentGenerate] = useState(false);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [sectionCount, setSectionCount] = useState('3');
   const [textLessonsPerSection, setTextLessonsPerSection] = useState('1');
   const [faqCount, setFaqCount] = useState('3');
   const [requirementCount, setRequirementCount] = useState('3');
   const [outcomeCount, setOutcomeCount] = useState('4');
   const [categoryId, setCategoryId] = useState('');
   const [categoryChildId, setCategoryChildId] = useState('');
   const [language, setLanguage] = useState('');
   const [formKey, setFormKey] = useState(0);

   const parseCount = (
      value: string,
      min: number,
      max: number,
   ): number | null => {
      const parsed = Number.parseInt(value, 10);

      if (Number.isNaN(parsed) || parsed < min || parsed > max) {
         return null;
      }

      return parsed;
   };

   const parsedSectionCount = parseCount(sectionCount, 1, 20);
   const parsedFaqCount = parseCount(faqCount, 0, 20);
   const parsedRequirementCount = parseCount(requirementCount, 0, 20);
   const parsedOutcomeCount = parseCount(outcomeCount, 0, 20);
   const parsedTextLessonsPerSection = textContentGenerate
      ? parseCount(textLessonsPerSection, 1, 10)
      : 1;

   const isFormValid =
      prompt.trim().length > 0 &&
      parsedSectionCount !== null &&
      parsedFaqCount !== null &&
      parsedRequirementCount !== null &&
      parsedOutcomeCount !== null &&
      (!textContentGenerate || parsedTextLessonsPerSection !== null) &&
      categoryId !== '' &&
      language !== '';

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
            generate_thumbnail: thumbnailGenerate ? 1 : 0,
            generate_text_lessons: textContentGenerate ? 1 : 0,
            section_count: parsedSectionCount,
            text_lessons_per_section: textContentGenerate
               ? Number(parsedTextLessonsPerSection)
               : 0,
            faq_count: parsedFaqCount,
            requirement_count: parsedRequirementCount,
            outcome_count: parsedOutcomeCount,
            category_id: categoryId,
            category_child_id: categoryChildId || undefined,
            language,
            ...extraData,
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

   const resetForm = () => {
      setPrompt('');
      setSuccessMessage(null);
      setErrorMessage(null);
      setThumbnailGenerate(false);
      setTextContentGenerate(false);
      setSectionCount('3');
      setTextLessonsPerSection('1');
      setFaqCount('3');
      setRequirementCount('3');
      setOutcomeCount('4');
      setCategoryId('');
      setCategoryChildId('');
      setLanguage('');
      setFormKey((key) => key + 1);
   };

   const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (!nextOpen) {
         resetForm();
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
                  <form
                     onSubmit={handleSubmit}
                     className="grid grid-cols-1 space-y-4 gap-x-3 sm:grid-cols-2"
                  >
                     <div className="col-span-full grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                           <Label htmlFor="ai-course-category">
                              {categoryLabel}{' '}
                              <span className="text-destructive">*</span>
                           </Label>
                           <Combobox
                              key={`ai-category-${formKey}`}
                              data={categoryData}
                              placeholder={categoryPlaceholder}
                              onSelect={(selected) => {
                                 setCategoryId(String(selected.id ?? ''));
                                 setCategoryChildId(
                                    selected.child_id
                                       ? String(selected.child_id)
                                       : '',
                                 );
                              }}
                           />
                        </div>
                        <div className="space-y-1.5">
                           <Label htmlFor="ai-course-language">
                              {languageLabel}{' '}
                              <span className="text-destructive">*</span>
                           </Label>
                           <Combobox
                              key={`ai-language-${formKey}`}
                              data={languageData}
                              placeholder={languagePlaceholder}
                              onSelect={(selected) => {
                                 setLanguage(selected.value);
                              }}
                           />
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <Label htmlFor="section-count">
                           Number of sections{' '}
                           <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           id="section-count"
                           type="number"
                           min={1}
                           max={20}
                           value={sectionCount}
                           onChange={(e) => setSectionCount(e.target.value)}
                           disabled={processing}
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="outcome-count">
                           Number of outcomes{' '}
                           <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           id="outcome-count"
                           type="number"
                           min={0}
                           max={20}
                           value={outcomeCount}
                           onChange={(e) => setOutcomeCount(e.target.value)}
                           disabled={processing}
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="faq-count">
                           Number of FAQs{' '}
                           <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           id="faq-count"
                           type="number"
                           min={0}
                           max={20}
                           value={faqCount}
                           onChange={(e) => setFaqCount(e.target.value)}
                           disabled={processing}
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="requirement-count">
                           Number of requirements{' '}
                           <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           id="requirement-count"
                           type="number"
                           min={0}
                           max={20}
                           value={requirementCount}
                           onChange={(e) => setRequirementCount(e.target.value)}
                           disabled={processing}
                        />
                     </div>

                     <div className="col-span-full space-y-2">
                        <Label htmlFor="ai-prompt">Your instructions</Label>
                        <Textarea
                           id="ai-prompt"
                           rows={5}
                           placeholder="Describe the course topic, audience, goals, and tone..."
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

                     <div className="flex items-center space-x-2">
                        <Switch
                           id="thumbnail-generate"
                           className="cursor-pointer"
                           checked={thumbnailGenerate}
                           onCheckedChange={setThumbnailGenerate}
                           disabled={processing}
                        />
                        <Label
                           htmlFor="thumbnail-generate"
                           className="mb-0 cursor-pointer"
                        >
                           Thumbnail Generation
                        </Label>
                     </div>

                     <div className="flex items-center space-x-2">
                        <Switch
                           id="text-content-generate"
                           className="cursor-pointer"
                           checked={textContentGenerate}
                           onCheckedChange={setTextContentGenerate}
                           disabled={processing}
                        />
                        <Label
                           htmlFor="text-content-generate"
                           className="mb-0 cursor-pointer"
                        >
                           Text Lesson Generation
                        </Label>
                     </div>

                     <div className="col-span-full space-y-3">
                        {textContentGenerate && (
                           <div className="space-y-1.5 pl-1">
                              <Label htmlFor="text-lessons-per-section">
                                 Text lessons per section{' '}
                                 <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                 id="text-lessons-per-section"
                                 type="number"
                                 min={1}
                                 max={10}
                                 value={textLessonsPerSection}
                                 onChange={(e) =>
                                    setTextLessonsPerSection(e.target.value)
                                 }
                                 disabled={processing}
                              />
                              <p className="text-xs text-muted-foreground">
                                 After each section is created, the AI generates
                                 that many text lessons based on the section
                                 title.
                              </p>
                           </div>
                        )}
                     </div>

                     {processing && (
                        <div className="col-span-full flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400">
                           <div className="flex gap-1">
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                           </div>
                           <span>
                              AI is building your course (this may take a
                              minute)...
                           </span>
                        </div>
                     )}

                     <DialogFooter className="col-span-full gap-2">
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

export default CourseAiGeneratePanel;
