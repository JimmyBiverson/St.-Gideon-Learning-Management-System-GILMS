import { Form } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/use-lang';
import { onFileChangePreview } from '@/lib/inertia';
import { generatePropertyFields } from '@/lib/page';
import { update } from '@/routes/page/section';
import { useSectionEditor } from './context';
import Fields from './fields';

const cloneSectionProperties = (
   properties: PageSection['properties'],
): PageSection['properties'] => structuredClone(properties);

const EditForm = () => {
   const { input, button, frontend } = useLang();
   const { section, setOpen, open, isSubmit, setIsSubmit } = useSectionEditor();
   const [isFileSelected, setIsFileSelected] = useState(false);
   const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
      section.thumbnail || null,
   );
   const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
      section.background_image || null,
   );

   const [sectionProperties, setSectionProperties] = useState<
      PageSection['properties']
   >(() => cloneSectionProperties(section.properties));

   const [videoUrl, setVideoUrl] = useState(() => section.video_url ?? '');

   const submitRef = useRef<(() => void) | null>(null);

   const reset = (...keys: 'video_url'[]) => {
      if (keys.length === 0) {
         setSectionProperties(cloneSectionProperties(section.properties));
         setVideoUrl(section.video_url ?? '');
         setThumbnailPreview(section.thumbnail || null);
         setBackgroundPreview(section.background_image || null);
         setIsFileSelected(false);

         return;
      }

      keys.forEach((key) => {
         if (key === 'video_url') {
            setVideoUrl(section.video_url ?? '');
         }
      });
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setSectionProperties(cloneSectionProperties(section.properties));
         setVideoUrl(section.video_url ?? '');
         setThumbnailPreview(section.thumbnail || null);
         setBackgroundPreview(section.background_image || null);
      }, 0);

      return () => clearTimeout(timer);
   }, [section]);

   const propertyFields = useMemo(
      () => generatePropertyFields(sectionProperties),
      [sectionProperties],
   );

   const handleSubmit = (submit: () => void) => {
      if (isFileSelected) {
         setIsSubmit(true);

         return;
      }

      submit();
   };

   const submitForm = () => {
      submitRef.current?.();
   };

   const handlePropertyChange = (name: string, value: unknown) => {
      setSectionProperties((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   useEffect(() => {
      let timer: NodeJS.Timeout;

      if (!open) {
         timer = setTimeout(() => reset(), 0);
      }

      return () => timer && clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when dialog closes only
   }, [open]);

   const formDefinition = update.form.post({ id: section.id });

   const formRemountKey = `section-edit-${section.id}-${section.updated_at}`;

   return (
      <Form
         key={formRemountKey}
         {...formDefinition}
         transform={(formData) => ({
            ...formData,
            properties: sectionProperties,
            video_url: videoUrl,
            active: section.active,
            sort: section.sort,
         })}
         options={{ preserveScroll: true }}
         onSuccess={() => {
            reset();
            setOpen(false);
            setIsSubmit(false);
            setIsFileSelected(false);
         }}
         onError={() => {
            setIsSubmit(false);
            setIsFileSelected(false);
         }}
      >
         {({ errors, processing, submit }) => {
            submitRef.current = submit;

            return (
               <div>
                  <div className="space-y-6">
                     {section.flags.title && (
                        <div className="space-y-2">
                           <Label htmlFor="title">{input.title}</Label>
                           <Input
                              type="text"
                              id="title"
                              name="title"
                              defaultValue={section.title ?? ''}
                              placeholder={input.title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>
                     )}

                     {section.flags.sub_title && (
                        <div className="space-y-2">
                           <Label htmlFor="sub_title">{input.sub_title}</Label>
                           <Input
                              type="text"
                              id="sub_title"
                              name="sub_title"
                              defaultValue={section.sub_title ?? ''}
                              placeholder={input.title_placeholder}
                           />
                           <InputError message={errors.sub_title} />
                        </div>
                     )}

                     {section.flags.description && (
                        <div className="space-y-2">
                           <Label htmlFor="description">
                              {input.description}
                           </Label>
                           <Textarea
                              id="description"
                              name="description"
                              defaultValue={section.description || ''}
                              placeholder={input.description_placeholder}
                              rows={3}
                           />
                           <InputError message={errors.description} />
                        </div>
                     )}

                     {section.flags.thumbnail && (
                        <div className="space-y-2">
                           <Label htmlFor="thumbnail">{input.thumbnail}</Label>
                           <Input
                              type="file"
                              id="thumbnail"
                              name="thumbnail"
                              accept="image/*"
                              onChange={(e) =>
                                 onFileChangePreview(e, setThumbnailPreview)
                              }
                              className="cursor-pointer"
                           />
                           <InputError message={errors.thumbnail} />

                           {thumbnailPreview && (
                              <img
                                 src={thumbnailPreview}
                                 alt="Thumbnail Preview"
                                 className="h-32 w-auto rounded-lg border object-cover shadow-sm"
                              />
                           )}
                        </div>
                     )}

                     {section.flags.video_url && (
                        <div className="space-y-2">
                           <Label htmlFor="video_url">
                              {input.preview_video}
                           </Label>

                           <ChunkedUploaderInput
                              isSubmit={isSubmit}
                              filetype={'video'}
                              delayUpload={false}
                              onFileSelected={() => {
                                 setIsFileSelected(true);
                              }}
                              onFileUploaded={(fileData) => {
                                 flushSync(() => {
                                    setVideoUrl(fileData.file_url ?? '');
                                 });
                                 setTimeout(() => {
                                    submitForm();
                                    reset('video_url');
                                    setIsSubmit(false);
                                    setIsFileSelected(false);
                                 }, 0);
                              }}
                              onError={() => {
                                 setIsSubmit(false);
                              }}
                              onCancelUpload={() => {
                                 setIsSubmit(false);
                              }}
                           />

                           {errors.video_url && (
                              <p className="mt-1 text-sm text-red-600">
                                 {errors.video_url}
                              </p>
                           )}
                        </div>
                     )}

                     {section.flags.background_image && (
                        <div className="space-y-2">
                           <Label htmlFor="background_image">
                              {input.background_image}
                           </Label>
                           <Input
                              type="file"
                              id="background_image"
                              name="background_image"
                              onChange={(e) =>
                                 onFileChangePreview(e, setBackgroundPreview)
                              }
                           />
                           <InputError message={errors.background_image} />

                           {backgroundPreview && (
                              <img
                                 src={backgroundPreview}
                                 alt="Background Image Preview"
                                 className="h-32 w-auto rounded-lg border object-cover shadow-sm"
                              />
                           )}
                        </div>
                     )}

                     {section.flags.background_color && (
                        <div className="space-y-2">
                           <Label htmlFor="background_color">
                              {input.background_color}
                           </Label>
                           <Input
                              type="color"
                              id="background_color"
                              name="background_color"
                              defaultValue={
                                 section.background_color || '#000000'
                              }
                           />
                           <InputError message={errors.background_color} />
                        </div>
                     )}

                     {propertyFields.length > 0 && (
                        <div className="">
                           <h3 className="text-lg font-medium">
                              {frontend.section_properties}
                           </h3>

                           <div className="mt-4 space-y-6">
                              {propertyFields.map((field, index) => {
                                 return (
                                    <Fields
                                       key={`${field.name}-${index}`}
                                       field={field}
                                       onChange={(value) =>
                                          handlePropertyChange(
                                             field.name,
                                             value,
                                          )
                                       }
                                    />
                                 );
                              })}
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="mt-8 flex justify-end">
                     <LoadingButton
                        type="button"
                        loading={processing || isSubmit}
                        disabled={processing || isSubmit}
                        onClick={() => handleSubmit(submit)}
                     >
                        {button.save}
                     </LoadingButton>
                  </div>
               </div>
            );
         }}
      </Form>
   );
};

export default EditForm;
