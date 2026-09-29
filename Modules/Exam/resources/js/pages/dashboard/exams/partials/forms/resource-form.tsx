import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { useDeferredCallback } from '@/hooks/use-deferred-callback';
import { getFileMetadata } from '@/lib/file-metadata';
import { store, update } from '@/routes/exam-resources';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface Props {
   title: string;
   handler: React.ReactNode;
   resource?: ExamResource;
}

const ResourceForm = ({ title, handler, resource }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const [fileSelected, setFileSelected] = useState(false);
   const [chunkUploading, setChunkUploading] = useState(false);
   const submitRef = useRef<(() => void) | null>(null);
   const { runDeferred } = useDeferredCallback();

   const { exam, translate } = usePage<ExamUpdateProps>().props;
   const { input, button } = translate;

   const { data, setData, reset } = useForm({
      type: resource?.type ?? 'document',
      title: resource?.title ?? '',
      resource: resource?.resource ?? '',
      resource_url: '',
      exam_id: exam.id,
   });

   const handleSubmit = (submit: () => void) => {
      if (data.type === 'link') {
         submit();

         return;
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
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
            }

            reset();
            setFileSelected(false);
            setChunkUploading(false);
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  key={formKey}
                  {...(resource ? update.form(resource.id) : store.form())}
                  options={{ preserveScroll: true }}
                  transform={(current) => ({ ...current, ...data })}
                  onSuccess={() => {
                     reset();
                     setOpen(false);
                  }}
                  className="space-y-4"
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
                                 onChange={(e) =>
                                    setData('title', e.target.value)
                                 }
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
                                       <SelectItem
                                          key={type.value}
                                          value={type.value}
                                       >
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
                                    onChange={(e) =>
                                       setData('resource', e.target.value)
                                    }
                                 />
                                 <InputError message={errors.resource} />
                              </div>
                           ) : (
                              <div>
                                 <Label>Resource</Label>

                                 <ChunkedUploaderInput
                                    isSubmit={chunkUploading}
                                    filetype={data.type}
                                    delayUpload={true}
                                    additional={{
                                       exam_id: exam.id,
                                    }}
                                    onFileSelected={(file) => {
                                       setFileSelected(true);
                                       getFileMetadata(file).then(
                                          (metadata) => {
                                             setData(
                                                'title',
                                                metadata.name ?? '',
                                             );
                                          },
                                       );
                                    }}
                                    onFileUploaded={(fileData) => {
                                       flushSync(() => {
                                          setData(
                                             'resource_url',
                                             fileData.file_url,
                                          );
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

                           <LoadingButton
                              type="button"
                              loading={processing || chunkUploading}
                              disabled={processing || chunkUploading}
                              onClick={() => handleSubmit(submit)}
                           >
                              {resource ? 'Update' : button.submit}
                           </LoadingButton>
                        </>
                     );
                  }}
               </Form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default ResourceForm;
