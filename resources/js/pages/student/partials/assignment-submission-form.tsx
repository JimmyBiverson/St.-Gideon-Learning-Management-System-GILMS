import { Form } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
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
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/assignment-submissions';

interface Props {
   assignment: CourseAssignment;
   setDialogOpen: (open: boolean) => void;
}

const AssignmentSubmissionForm = ({ assignment, setDialogOpen }: Props) => {
   const [isSubmit, setIsSubmit] = useState(false);
   const [attachmentType, setAttachmentType] = useState<'url' | 'file'>('url');
   const [uploadedFilePath, setUploadedFilePath] = useState('');

   const submitRef = useRef<(() => void) | null>(null);

   const handleSubmit = (submit: () => void) => {
      if (attachmentType === 'url') {
         submit();

         return;
      }

      setIsSubmit(true);
   };

   return (
      <Form
         {...store.form()}
         transform={(formData) => ({
            ...formData,
            course_assignment_id: assignment.id,
            attachment_type: attachmentType,
            attachment_path: uploadedFilePath,
         })}
         options={{ preserveScroll: true }}
         onSuccess={() => {
            setAttachmentType('url');
            setUploadedFilePath('');
            setIsSubmit(false);
            setDialogOpen(false);
         }}
         onError={() => {
            setIsSubmit(false);
         }}
      >
         {({ errors, processing, submit }) => {
            submitRef.current = submit;

            return (
               <div className="space-y-4">
                  <div className="space-y-3">
                     <Label>Submission Type *</Label>
                     <Select
                        required
                        name="attachment_type"
                        defaultValue={attachmentType}
                        onValueChange={(type) =>
                           setAttachmentType(type as 'url' | 'file')
                        }
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select Submission Type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="url">URL Link</SelectItem>
                           <SelectItem value="file">Upload File</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.attachment_type} />
                  </div>

                  {attachmentType === 'url' && (
                     <div className="space-y-2">
                        <Label htmlFor="url">URL Link *</Label>
                        <Input
                           id="url"
                           type="url"
                           name="attachment_path"
                           placeholder="Enter URL here..."
                           required
                        />
                        <InputError message={errors.attachment_path} />
                        <p className="text-xs text-muted-foreground">
                           Share your GitHub repository, Google Drive, or any
                           public URL
                        </p>
                     </div>
                  )}

                  {attachmentType === 'file' && (
                     <div className="space-y-2">
                        <Label htmlFor="file">Upload File *</Label>
                        <ChunkedUploaderInput
                           isSubmit={isSubmit}
                           additional={{ course_id: assignment.course_id }}
                           filetype={'document'}
                           delayUpload={true}
                           onFileUploaded={(fileData) => {
                              flushSync(() => {
                                 setUploadedFilePath(fileData.file_url ?? '');
                              });
                              submitRef.current?.();
                           }}
                           onError={() => {
                              setIsSubmit(false);
                           }}
                           onCancelUpload={() => {
                              setIsSubmit(false);
                           }}
                        />
                        <InputError message={errors.attachment_path} />
                        <p className="mt-1 text-xs text-muted-foreground">
                           Formats: .JPEG, .PNG, .DOC, .PDF, .ZIP (Max: 10MB)
                        </p>
                     </div>
                  )}

                  <div className="space-y-2">
                     <Label htmlFor="comment">Comment (Optional)</Label>
                     <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Add any notes or comments about your submission..."
                        rows={4}
                     />
                     <InputError message={errors.comment} />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                     <Button
                        type="button"
                        variant="outline"
                        disabled={processing || isSubmit}
                     >
                        Cancel
                     </Button>

                     <LoadingButton
                        type="button"
                        className="gap-2"
                        loading={processing || isSubmit}
                        onClick={() => handleSubmit(submit)}
                     >
                        Submit Assignment
                     </LoadingButton>
                  </div>
               </div>
            );
         }}
      </Form>
   );
};

export default AssignmentSubmissionForm;
