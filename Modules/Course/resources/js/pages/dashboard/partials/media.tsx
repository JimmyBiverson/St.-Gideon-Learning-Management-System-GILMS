import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/video-player';
import { useDeferredCallback } from '@/hooks/use-deferred-callback';
import { usePlugin } from '@/hooks/use-plugin';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/courses';
import { Form, router, useForm, usePage } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AiInlineEditModal from './ai-inline-edit-modal';

const Media = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;
   const { tab, course } = props;
   const aiAssistantEnabled = usePlugin('AIAssistant');

   const [isSubmit, setIsSubmit] = useState(false);
   const [isFileSelected, setIsFileSelected] = useState(false);

   const [previewBanner, setPreviewBanner] = useState(course.banner);
   const [thumbnailBanner, setThumbnailBanner] = useState(course.thumbnail);

   const { data, setData } = useForm({
      preview: course.preview || '',
      preview_type: 'video_url',
   });

   const submitRef = useRef<(() => void) | null>(null);
   const { runDeferred } = useDeferredCallback();

   const handleSubmit = (submit: () => void) => {
      if (data.preview_type === 'video_url') {
         submit();

         return;
      }

      if (isFileSelected) {
         setIsSubmit(true);
      } else {
         submit();
      }
   };

   // Memoize the entire VideoPlayer component to prevent re-renders
   const memoizedVideoPlayer = useMemo(() => {
      if (!course.preview) {
         return null;
      }

      return (
         <Card className="mt-2 flex max-h-[580px] items-center justify-center overflow-hidden border-none">
            <VideoPlayer
               source={{
                  type: 'video' as const,
                  sources: [
                     {
                        src: course.preview || '',
                        type: 'video/mp4' as const,
                     },
                  ],
               }}
            />
         </Card>
      );
   }, [course.preview]);

   const onFileChangePreview = (
      e: React.ChangeEvent<HTMLInputElement>,
      previewSetter: React.Dispatch<React.SetStateAction<string | undefined>>,
   ) => {
      const file = e.target.files?.[0];

      if (file) {
         previewSetter(URL.createObjectURL(file));
      }
   };

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form({ id: course.id })}
            className="space-y-4"
            options={{ preserveScroll: true }}
            transform={(formData) => ({
               ...formData,
               tab: tab as string,
               preview_type: data.preview_type,
               preview: data.preview,
            })}
         >
            {({ processing, errors, submit }) => {
               submitRef.current = submit;

               return (
                  <>
                     <div>
                        <Label>{dashboard.thumbnail}</Label>

                        <div className="mb-1.5 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                           <Input
                              type="file"
                              name="thumbnail"
                              onChange={(e) =>
                                 onFileChangePreview(e, setThumbnailBanner)
                              }
                           />
                           {aiAssistantEnabled && (
                              <AiInlineEditModal
                                 title="Generate Thumbnail with AI"
                                 description="Describe the thumbnail you want — e.g. 'Abstract Python code blocks with a clean blue gradient'."
                                 actionUrl={`/dashboard/courses/ai/${course.id}/thumbnail`}
                                 onSuccess={() =>
                                    router.reload({ preserveScroll: true })
                                 }
                                 handler={
                                    <Button
                                       type="button"
                                       variant="outline"
                                       className="h-10 gap-1.5 rounded-lg border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950/30"
                                    >
                                       <Bot />
                                       Generate with AI
                                    </Button>
                                 }
                              />
                           )}
                        </div>
                        <InputError message={errors.thumbnail} />

                        <img
                           src={
                              thumbnailBanner ||
                              '/assets/images/blank-image.jpg'
                           }
                           alt=""
                           className="mt-2 w-full max-w-sm rounded-md"
                        />
                     </div>

                     <div>
                        <Label>{dashboard.banner}</Label>
                        <Input
                           type="file"
                           name="banner"
                           onChange={(e) =>
                              onFileChangePreview(e, setPreviewBanner)
                           }
                        />
                        <InputError message={errors.banner} />

                        <img
                           src={
                              previewBanner || '/assets/images/blank-image.jpg'
                           }
                           alt=""
                           className="mt-2 w-full max-w-sm rounded-md"
                        />
                     </div>

                     <Separator />

                     <div>
                        <Label>{dashboard.preview_video_type}</Label>
                        <RadioGroup
                           defaultValue={data.preview_type}
                           onValueChange={(value) =>
                              setData('preview_type', value)
                           }
                           className="flex flex-wrap items-center gap-5 pt-3"
                        >
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 className="cursor-pointer"
                                 id="video_url"
                                 value="video_url"
                              />
                              <Label
                                 htmlFor="video_url"
                                 className="mb-0 capitalize"
                              >
                                 {dashboard.video_url}
                              </Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 className="cursor-pointer"
                                 id="video"
                                 value="video"
                              />
                              <Label
                                 htmlFor="video"
                                 className="mb-0 capitalize"
                              >
                                 {dashboard.video_file}
                              </Label>
                           </div>
                        </RadioGroup>
                        <InputError message={errors.preview_type} />
                     </div>

                     <div>
                        <Label>Preview Video</Label>
                        {data.preview_type === 'video_url' ? (
                           <Input
                              type="url"
                              value={data.preview}
                              placeholder={(input as any).video_url_placeholder}
                              onChange={(e) =>
                                 setData('preview', e.target.value)
                              }
                           />
                        ) : (
                           <ChunkedUploaderInput
                              isSubmit={isSubmit}
                              additional={{
                                 course_id: course.id,
                                 section_id: course.course_section_id,
                              }}
                              filetype={data.preview_type}
                              delayUpload={true}
                              onFileSelected={() => {
                                 setIsFileSelected(true);
                              }}
                              onFileUploaded={(fileData) => {
                                 flushSync(() => {
                                    setData('preview', fileData.file_url);
                                 });
                                 runDeferred(() => {
                                    submitRef.current?.();
                                    setIsSubmit(false);
                                    setIsFileSelected(false);
                                 });
                              }}
                              onError={() => {
                                 setIsSubmit(false);
                                 setIsFileSelected(false);
                              }}
                              onCancelUpload={() => {
                                 setIsSubmit(false);
                                 setIsFileSelected(false);
                              }}
                           />
                        )}
                        <InputError message={errors.preview} />
                        <p className="text-xs text-gray-500">
                           {data.preview_type === 'video_url'
                              ? 'Supported URL: youtube or vimeo'
                              : 'Supported Video file: .mp4 or .webm or .ogg'}
                        </p>

                        {memoizedVideoPlayer}
                     </div>

                     <LoadingButton
                        type="button"
                        loading={processing || isSubmit}
                        disabled={processing || isSubmit}
                        onClick={() => handleSubmit(submit)}
                        className="float-end mt-4"
                     >
                        {button.save_changes}
                     </LoadingButton>
                  </>
               );
            }}
         </Form>
      </Card>
   );
};

Media.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Media;
