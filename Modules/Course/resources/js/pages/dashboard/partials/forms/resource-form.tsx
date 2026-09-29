import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { useDeferredCallback } from '@/hooks/use-deferred-callback';
import { getFileMetadata } from '@/lib/file-metadata';
import { store, update } from '@/routes/lesson-resources';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface Props {
   lesson: SectionLesson;
   resource?: LessonResource;
   setTab?: (value: string) => void;
   setIsOpen: (value: boolean) => void;
   setEditId?: (value: string) => void;
}

const ResourceForm = ({
   lesson,
   resource,
   setTab,
   setIsOpen,
   setEditId,
}: Props) => {
   const [fileSelected, setFileSelected] = useState(false);
   const [chunkUploading, setChunkUploading] = useState(false);
   const submitRef = useRef<(() => void) | null>(null);
   const { runDeferred } = useDeferredCallback();

   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { input, button } = translate;

   const { data, setData, reset } = useForm({
      type: resource?.type ?? 'document',
      title: resource?.title ?? '',
      resource: resource?.resource ?? '',
      resource_url: '',
      section_lesson_id: lesson.id,
   });

   const handleSubmit = (submit: () => void) => {
      if (data.type === 'link') {
         submit();
      }

      if (fileSelected) {
         setChunkUploading(true);
      } else {
         submit();
      }
   };

   const resourceTypes = [
      { label: 'Document', value: 'document' },
      { label: 'Image File', value: 'image' },
      { label: 'Video File', value: 'video' },
      { label: 'Zip/Archive', value: 'zip' },
      { label: 'External Link', value: 'link' },
   ];

   return (
      <Form
         {...(resource ? update.form(resource.id) : store.form())}
         options={{ preserveScroll: true }}
         transform={(current) => ({ ...current, ...data })}
         onSuccess={() => {
            reset();
            setIsOpen(true);
            setEditId?.('');
            setTab?.('list');
         }}
         className="space-y-5"
      >
         {({ errors, processing, submit }) => {
            submitRef.current = submit;

            return (
               <>
                  <div>
                     <Label>{input.title}</Label>
                     <Input
                        required
                        name="title"
                        value={data.title}
                        placeholder={input.title}
                        onChange={(e) => setData('title', e.target.value)}
                     />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>Resource Type</Label>
                     <Select
                        required
                        name="type"
                        defaultValue={data.type}
                        onValueChange={(type) => setData('type', type)}
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder={input.select} />
                        </SelectTrigger>
                        <SelectContent>
                           {resourceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                 {type.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  {data.type === 'link' ? (
                     <div>
                        <Label>Resource</Label>
                        <Input
                           required
                           type="url"
                           name="resource"
                           value={data.resource}
                           placeholder={input.url}
                           onChange={(e) => setData('resource', e.target.value)}
                        />
                        <InputError message={errors.resource} />
                     </div>
                  ) : (
                     <div>
                        <Label>Resource</Label>

                        <ChunkedUploaderInput
                           isSubmit={chunkUploading}
                           delayUpload={true}
                           filetype={data.type}
                           additional={{
                              course_id: lesson.course_id,
                              course_section_id: lesson.course_section_id,
                           }}
                           onFileSelected={(file) => {
                              setFileSelected(true);
                              getFileMetadata(file).then((metadata) => {
                                 setData('title', metadata.name ?? '');
                              });
                           }}
                           onFileUploaded={(fileData) => {
                              flushSync(() => {
                                 setData('resource_url', fileData.file_url);
                              });
                              runDeferred(() => {
                                 submitRef.current?.();
                                 setFileSelected(false);
                                 setChunkUploading(false);
                              });
                           }}
                           onError={() => {
                              setFileSelected(false);
                              setChunkUploading(false);
                           }}
                           onCancelUpload={() => {
                              setFileSelected(false);
                              setChunkUploading(false);
                           }}
                        />
                     </div>
                  )}

                  <div className="flex justify-end gap-3">
                     <Button variant="outline" onClick={() => setEditId?.('')}>
                        Cancel
                     </Button>

                     <LoadingButton
                        type="button"
                        loading={processing || chunkUploading}
                        disabled={processing || chunkUploading}
                        onClick={() => handleSubmit(submit)}
                     >
                        {resource ? 'Update' : button.submit}
                     </LoadingButton>
                  </div>
               </>
            );
         }}
      </Form>
   );
};

export default ResourceForm;
