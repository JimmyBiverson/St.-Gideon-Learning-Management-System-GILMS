import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onFileChangePreview } from '@/lib/inertia';
import { update } from '@/routes/exams';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Media = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { tab, exam } = props;
   const [previewThumbnail, setPreviewThumbnail] = useState(exam.thumbnail);

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form(Number(exam.id))}
            transform={(formData) => ({
               ...formData,
               tab,
            })}
            encType="multipart/form-data"
            className="space-y-4"
         >
            {({ errors, processing }) => (
               <>
                  <div>
                     <Label>Thumbnail</Label>
                     <Input
                        type="file"
                        name="thumbnail"
                        onChange={(e) =>
                           onFileChangePreview(e, setPreviewThumbnail)
                        }
                     />
                     <InputError message={errors.thumbnail} />
                     <p className="mt-1 text-xs text-gray-500">
                        Recommended size: 400x300px. Max size: 2MB
                     </p>

                     {previewThumbnail && (
                        <div className="mt-4">
                           <Label className="mb-2 block">Preview:</Label>
                           <img
                              src={
                                 previewThumbnail ||
                                 '/assets/images/blank-image.jpg'
                              }
                              alt="Thumbnail preview"
                              className="w-full max-w-sm rounded-md"
                           />
                        </div>
                     )}
                  </div>

                  <LoadingButton
                     loading={processing}
                     className="float-end mt-4"
                  >
                     Save Changes
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default Media;
