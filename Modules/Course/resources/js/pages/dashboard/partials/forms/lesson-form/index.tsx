import BunnyUploaderInput from '@/components/bunny-uploader-input';
import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import Tabs from '@/components/tabs';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useDeferredCallback } from '@/hooks/use-deferred-callback';
import { usePlugin } from '@/hooks/use-plugin';
import { getFileMetadata } from '@/lib/file-metadata';
import { cn } from '@/lib/utils';
import { store, update } from '@/routes/lesson';
import { Form, router, useForm, usePage } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AiInlineEditModal from '../../ai-inline-edit-modal';
import LessonType from './lesson-type';

interface Props {
   title: string;
   lesson?: SectionLesson;
   handler: React.ReactNode;
   sectionId: string | number;
}

const LessonForm = ({ title, handler, lesson, sectionId }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const [isSubmit, setIsSubmit] = useState(false);
   const [lessonType, setLessonType] = useState('type');
   const [isFileSelected, setIsFileSelected] = useState(false);
   const [aiPrompt, setAiPrompt] = useState('');
   const [aiTitle, setAiTitle] = useState('');
   const [aiProcessing, setAiProcessing] = useState(false);
   const [aiError, setAiError] = useState<string | null>(null);
   const submitRef = useRef<(() => void) | null>(null);
   const titleInputRef = useRef<HTMLInputElement | null>(null);
   const { runDeferred } = useDeferredCallback();
   const aiAssistantEnabled = usePlugin('AIAssistant');

   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { input, button, dashboard } = translate;

   const { data, setData, reset } = useForm({
      is_free: lesson?.is_free ? '1' : '0',
      lesson_type: lesson?.lesson_type ?? 'video',
      lesson_provider: lesson?.lesson_provider ?? '',
      lesson_src: lesson?.lesson_src ?? '',
      lesson_src_new: '',
      chunked_upload_id_new: '',
      duration: lesson?.duration ?? '00:00:00',
      summary: lesson?.summary ?? '',
   });

   const isTextAiFlow = data.lesson_type === 'text_ai';
   const courseId = lesson ? lesson.course_id : props.course.id;

   const isFileUpload = ['video', 'document', 'image'].includes(
      data.lesson_type,
   );

   const handleAiGenerate = () => {
      if (aiPrompt.trim().length < 5) {
         setAiError(
            dashboard.ai_prompt_min_length ??
               'Please enter at least 5 characters.',
         );

         return;
      }

      setAiProcessing(true);
      setAiError(null);

      router.post(
         `/dashboard/courses/${courseId}/sections/${sectionId}/ai/lesson`,
         {
            prompt: aiPrompt,
            title: aiTitle.trim() || undefined,
            is_free: String(data.is_free) === '1',
         },
         {
            preserveScroll: true,
            onSuccess: (page) => {
               const flash = (page.props as { flash?: { error?: string } })
                  .flash;

               if (flash?.error) {
                  setAiError(flash.error);
                  setAiProcessing(false);

                  return;
               }

               reset();
               setAiPrompt('');
               setAiTitle('');
               setOpen(false);
               setAiProcessing(false);
            },
            onError: (errors) => {
               const firstError = Object.values(errors)[0] as string;
               setAiError(
                  firstError ?? 'Something went wrong. Please try again.',
               );
               setAiProcessing(false);
            },
            onFinish: () => setAiProcessing(false),
         },
      );
   };

   const handleSubmit = (submit: () => void) => {
      if (isFileUpload && isFileSelected) {
         setIsSubmit(true);

         return;
      }

      submit();
   };

   const formDefinition = lesson
      ? update.form.put({ id: Number(lesson.id) })
      : store.form();

   // Shared between ChunkedUploaderInput (local/s3/r2) and BunnyUploaderInput
   // — both providers report progress through the same callback shape, so
   // the lesson save flow doesn't need to know which one is active.
   const handleFileSelected = (file: File) => {
      setIsFileSelected(true);
      getFileMetadata(file).then((metadata) => {
         if (titleInputRef.current) {
            titleInputRef.current.value = metadata.name;
         }

         setData('duration', metadata.duration || '00:00:00');
      });
   };

   const handleFileUploaded = (fileData: ChunkUploadedFileData) => {
      flushSync(() => {
         if (data.lesson_type === 'video') {
            setData('chunked_upload_id_new', fileData.upload_id);
         } else {
            setData('lesson_src_new', fileData.file_url);
         }
      });
      runDeferred(() => {
         submitRef.current?.();
         setIsFileSelected(false);
         setIsSubmit(false);
      });
   };

   const handleUploadError = () => {
      setIsSubmit(false);
   };

   const handleUploadCancel = () => {
      setIsSubmit(false);
   };

   const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Ensure the value is in the HH:mm:ss format
      const formattedTime = value.match(
         /^([0-2]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      );

      if (formattedTime) {
         setData('duration', value);
      }
   };

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            if (isSubmit && !nextOpen) {
               setOpen(true);

               return;
            }

            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
               reset();
               setLessonType(lesson ? 'form' : 'type');
               setIsSubmit(false);
               setIsFileSelected(false);
               setAiPrompt('');
               setAiTitle('');
               setAiError(null);
               setAiProcessing(false);
            } else {
               reset();
               setLessonType('type');
               setAiPrompt('');
               setAiTitle('');
               setAiError(null);
               setAiProcessing(false);
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-6">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Form
               key={formKey}
               {...formDefinition}
               options={{ preserveScroll: true }}
               transform={(formData) => ({
                  ...formData,
                  ...data,
                  lesson_src:
                     data.lesson_type === 'text'
                        ? data.lesson_src
                        : formData.lesson_src,
                  course_id: lesson ? lesson.course_id : props.course.id,
                  course_section_id: sectionId,
               })}
               onSuccess={() => {
                  reset();
                  setOpen(false);
                  setIsSubmit(false);
                  setIsFileSelected(false);
               }}
            >
               {({ errors, processing, submit }) => {
                  submitRef.current = submit;

                  return (
                     <>
                        <Tabs
                           value={lesson ? 'form' : lessonType}
                           onValueChange={setLessonType}
                        >
                           <TabsContent value="type">
                              <LessonType
                                 value={data.lesson_type}
                                 onChange={(value) =>
                                    setData('lesson_type', value)
                                 }
                              />
                           </TabsContent>

                           <TabsContent value="ai" className="space-y-4 p-0.5">
                              <p className="text-sm text-muted-foreground">
                                 {dashboard.text_lesson_ai_description ??
                                    'Describe the lesson you want. The AI will generate rich text content in the same format as your course description.'}
                              </p>

                              <div>
                                 <Label>
                                    {input.title}{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                       ({dashboard.optional ?? 'optional'})
                                    </span>
                                 </Label>
                                 <Input
                                    value={aiTitle}
                                    onChange={(e) => setAiTitle(e.target.value)}
                                    placeholder={
                                       dashboard.ai_lesson_title_placeholder ??
                                       'Leave blank to let AI choose a title'
                                    }
                                 />
                              </div>

                              <div>
                                 <Label htmlFor="ai-lesson-prompt">
                                    {dashboard.ai_prompt_label ??
                                       'Your instructions'}{' '}
                                    *
                                 </Label>
                                 <Textarea
                                    id="ai-lesson-prompt"
                                    value={aiPrompt}
                                    onChange={(e) =>
                                       setAiPrompt(e.target.value)
                                    }
                                    placeholder={
                                       dashboard.text_lesson_ai_placeholder ??
                                       'e.g. Write a beginner-friendly lesson on variables in Python with examples…'
                                    }
                                    rows={5}
                                 />
                                 {aiError && (
                                    <p className="mt-2 text-sm text-destructive">
                                       {aiError}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <Label>{input.lesson_type}</Label>
                                 <RadioGroup
                                    defaultValue={
                                       String(data.is_free) === '1'
                                          ? 'free'
                                          : 'paid'
                                    }
                                    className="flex items-center space-x-4 pt-2 pb-1"
                                    onValueChange={(value) =>
                                       setData(
                                          'is_free',
                                          value === 'free' ? '1' : '0',
                                       )
                                    }
                                 >
                                    {props.prices.map((price) => (
                                       <div
                                          key={price}
                                          className="flex items-center space-x-2"
                                       >
                                          <RadioGroupItem
                                             className="cursor-pointer"
                                             id={`ai-${price}`}
                                             value={price}
                                          />
                                          <Label
                                             htmlFor={`ai-${price}`}
                                             className="mb-0 capitalize"
                                          >
                                             {price}
                                          </Label>
                                       </div>
                                    ))}
                                 </RadioGroup>
                              </div>
                           </TabsContent>

                           <TabsContent value="form">
                              <ScrollArea className="h-[calc(100vh-200px)]">
                                 <div className="space-y-4 p-0.5">
                                    {lesson?.lesson_type === 'text' &&
                                       aiAssistantEnabled && (
                                          <AiInlineEditModal
                                             title={
                                                dashboard.edit_text_lesson_ai ??
                                                'Edit text lesson with AI'
                                             }
                                             description={
                                                dashboard.edit_text_lesson_ai_description ??
                                                'Describe how you want to change the lesson title or body.'
                                             }
                                             actionUrl={`/dashboard/courses/${courseId}/lessons/${lesson.id}/ai`}
                                             submitButtonLabel={
                                                dashboard.generate_with_ai ??
                                                'Update with AI'
                                             }
                                             onSuccess={() => {
                                                setOpen(false);
                                                router.reload({
                                                   preserveScroll: true,
                                                });
                                             }}
                                             handler={
                                                <Button
                                                   type="button"
                                                   variant="secondary"
                                                   className="w-full gap-2 text-violet-700 dark:text-violet-400"
                                                >
                                                   <Bot className="h-4 w-4" />
                                                   <span>
                                                      {dashboard.edit_with_ai ??
                                                         'Edit with AI'}
                                                   </span>
                                                </Button>
                                             }
                                          />
                                       )}

                                    <div>
                                       <Label>{input.title} *</Label>
                                       <Input
                                          required
                                          name="title"
                                          ref={titleInputRef}
                                          defaultValue={lesson?.title || ''}
                                          placeholder={input.title}
                                       />
                                       <InputError message={errors.title} />
                                    </div>

                                    {/* Conditional Fields */}
                                    {['video_url'].includes(
                                       data.lesson_type,
                                    ) && (
                                       <>
                                          <div>
                                             <Label htmlFor="lesson_provider">
                                                {input.video_url_provider}
                                             </Label>
                                             <Select
                                                required
                                                name="lesson_provider"
                                                defaultValue={
                                                   data.lesson_provider || ''
                                                }
                                                onValueChange={(provider) =>
                                                   setData(
                                                      'lesson_provider',
                                                      provider,
                                                   )
                                                }
                                             >
                                                <SelectTrigger className="w-full">
                                                   <SelectValue
                                                      placeholder={
                                                         input.provider_placeholder
                                                      }
                                                   />
                                                </SelectTrigger>
                                                <SelectContent>
                                                   <SelectItem value="youtube">
                                                      YouTube
                                                   </SelectItem>
                                                </SelectContent>
                                             </Select>
                                          </div>

                                          <div>
                                             <Label>
                                                Video URL
                                                <span className="text-xs text-gray-500">
                                                   (Provide the shareable url
                                                   only)
                                                </span>
                                             </Label>
                                             <Input
                                                required
                                                name="lesson_src"
                                                defaultValue={
                                                   lesson?.lesson_src || ''
                                                }
                                                placeholder={`Type your ${data.lesson_provider} video url`}
                                             />
                                             <InputError
                                                message={errors.lesson_src}
                                             />
                                          </div>
                                       </>
                                    )}

                                    {['video', 'document', 'image'].includes(
                                       data.lesson_type,
                                    ) && (
                                       <div>
                                          <Label>
                                             {input.select} {data.lesson_type}
                                          </Label>

                                          {data.lesson_type === 'video' &&
                                          props.videoProvider === 'bunny' ? (
                                             <BunnyUploaderInput
                                                isSubmit={isSubmit}
                                                delayUpload={true}
                                                onFileSelected={
                                                   handleFileSelected
                                                }
                                                onFileUploaded={
                                                   handleFileUploaded
                                                }
                                                onError={handleUploadError}
                                                onCancelUpload={
                                                   handleUploadCancel
                                                }
                                             />
                                          ) : (
                                             <ChunkedUploaderInput
                                                isSubmit={isSubmit}
                                                additional={{
                                                   section_id: sectionId,
                                                   course_id:
                                                      lesson?.course_id ||
                                                      props.course.id,
                                                }}
                                                filetype={
                                                   data.lesson_type === 'video'
                                                      ? 'lesson_video'
                                                      : data.lesson_type
                                                }
                                                delayUpload={true}
                                                onFileSelected={
                                                   handleFileSelected
                                                }
                                                onFileUploaded={
                                                   handleFileUploaded
                                                }
                                                onError={handleUploadError}
                                                onCancelUpload={
                                                   handleUploadCancel
                                                }
                                             />
                                          )}
                                       </div>
                                    )}

                                    {data.lesson_type === 'embed' && (
                                       <div>
                                          <Label>
                                             Embed source
                                             <span className="text-xs text-gray-500">
                                                (Provide the source url only)
                                             </span>
                                          </Label>
                                          <Textarea
                                             required
                                             name="embed_source"
                                             placeholder={
                                                input.embed_source_placeholder
                                             }
                                             defaultValue={
                                                lesson?.embed_source || ''
                                             }
                                             rows={4}
                                          />
                                          <InputError
                                             message={errors.embed_source}
                                          />
                                       </div>
                                    )}

                                    {data.lesson_type === 'text' && (
                                       <div>
                                          <Label>{input.your_text}</Label>
                                          <Editor
                                             ssr={true}
                                             output="html"
                                             placeholder={{
                                                paragraph:
                                                   'Type your content here...',
                                                imageCaption:
                                                   'Type caption for image (optional)',
                                             }}
                                             contentMinHeight={256}
                                             contentMaxHeight={640}
                                             initialContent={data.lesson_src}
                                             onContentChange={(value) =>
                                                setData((prev: any) => ({
                                                   ...prev,
                                                   lesson_src: value as string,
                                                }))
                                             }
                                          />
                                          <InputError
                                             message={errors.lesson_src}
                                          />
                                       </div>
                                    )}

                                    {['video_url', 'video'].includes(
                                       data.lesson_type,
                                    ) && (
                                       <div>
                                          <Label htmlFor="duration">
                                             {input.duration}
                                          </Label>
                                          <Input
                                             required
                                             maxLength={8}
                                             type="text"
                                             name="duration"
                                             value={data.duration}
                                             placeholder="00:00:00"
                                             onChange={onDurationChange}
                                             readOnly={
                                                data.lesson_type === 'video'
                                             }
                                          />
                                          <InputError
                                             message={errors.duration}
                                          />
                                       </div>
                                    )}

                                    <div>
                                       <Label htmlFor="summary">Summary</Label>
                                       <Editor
                                          ssr={true}
                                          output="html"
                                          placeholder={{
                                             paragraph:
                                                'Type your content here...',
                                             imageCaption:
                                                'Type caption for image (optional)',
                                          }}
                                          contentMinHeight={256}
                                          contentMaxHeight={640}
                                          initialContent={data.summary}
                                          onContentChange={(value) =>
                                             setData('summary', value as string)
                                          }
                                       />
                                       <InputError message={errors.summary} />
                                    </div>

                                    <div>
                                       <Label>Lesson type</Label>
                                       <RadioGroup
                                          required
                                          defaultValue={
                                             data.is_free ? 'free' : 'paid'
                                          }
                                          className="flex items-center space-x-4 pt-2 pb-1"
                                          onValueChange={(value) =>
                                             setData(
                                                'is_free',
                                                value === 'free' ? 1 : 0,
                                             )
                                          }
                                       >
                                          {props.prices.map((price) => (
                                             <div
                                                key={price}
                                                className="flex items-center space-x-2"
                                             >
                                                <RadioGroupItem
                                                   className="cursor-pointer"
                                                   id={price}
                                                   value={price}
                                                />
                                                <Label
                                                   htmlFor={price}
                                                   className="mb-0 capitalize"
                                                >
                                                   {price}
                                                </Label>
                                             </div>
                                          ))}
                                       </RadioGroup>
                                       <InputError message={errors.is_free} />
                                    </div>
                                 </div>
                              </ScrollArea>
                           </TabsContent>

                           <DialogFooter className="w-full justify-between space-x-2 pt-8">
                              <div className="flex w-full items-center gap-4">
                                 <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                       {button.close}
                                    </Button>
                                 </DialogClose>

                                 {!lesson && !(processing || isSubmit) && (
                                    <TabsList className="p-0">
                                       <TabsTrigger
                                          asChild
                                          value={isTextAiFlow ? 'ai' : 'form'}
                                          className={cn(
                                             lessonType === 'form' ||
                                                lessonType === 'ai'
                                                ? 'hidden'
                                                : 'block',
                                          )}
                                       >
                                          <Button>{button.next}</Button>
                                       </TabsTrigger>

                                       <TabsTrigger
                                          asChild
                                          value="type"
                                          className={cn(
                                             lessonType === 'type'
                                                ? 'hidden'
                                                : 'block',
                                          )}
                                       >
                                          <Button>{button.back}</Button>
                                       </TabsTrigger>
                                    </TabsList>
                                 )}
                              </div>

                              {lessonType === 'ai' && (
                                 <LoadingButton
                                    type="button"
                                    loading={aiProcessing}
                                    disabled={
                                       aiProcessing ||
                                       aiPrompt.trim().length < 5
                                    }
                                    onClick={handleAiGenerate}
                                 >
                                    {dashboard.generate_with_ai ??
                                       'Generate with AI'}
                                 </LoadingButton>
                              )}

                              {(lesson || lessonType === 'form') &&
                                 lessonType !== 'ai' && (
                                    <LoadingButton
                                       type="button"
                                       loading={processing || isSubmit}
                                       disabled={processing || isSubmit}
                                       onClick={() => handleSubmit(submit)}
                                    >
                                       {lesson
                                          ? `${button.update} Lesson`
                                          : button.add_lesson}
                                    </LoadingButton>
                                 )}
                           </DialogFooter>
                        </Tabs>
                     </>
                  );
               }}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default LessonForm;
