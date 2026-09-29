import { Form, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { onFileChangePreview } from '@/lib/inertia';
import { update } from '@/routes/instructor';

const Profile = () => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { input, button, dashboard } = translate;
   const { name, photo } = props.auth.user;
   const [imageUrl, setImageUrl] = useState(photo);

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form()}
            className="flex flex-col items-center gap-6 md:flex-row"
         >
            {({ processing, errors }) => (
               <>
                  <div className="flex w-full flex-col items-center text-center md:max-w-[250px]">
                     <div className="relative mb-4 h-[100px] w-[100px] md:h-[120px] md:w-[120px]">
                        {imageUrl ? (
                           <img
                              alt="item-1"
                              src={imageUrl}
                              className="h-[100px] w-[100px] rounded-full md:h-[120px] md:w-[120px]"
                           />
                        ) : (
                           <div className="h-[100px] w-[100px] rounded-full bg-gray-300 md:h-[120px] md:w-[120px]"></div>
                        )}

                        <label
                           htmlFor="formFileSm"
                           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                           <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100">
                              <Camera className="h-6 w-6 text-gray-500" />
                           </div>
                        </label>
                        <input
                           hidden
                           id="formFileSm"
                           type="file"
                           name="photo"
                           onChange={(e) => onFileChangePreview(e, setImageUrl)}
                        />
                     </div>

                     <small className="text-gray-500">
                        {dashboard.image_upload_requirements}
                     </small>

                     {errors.photo && (
                        <p className="mt-1 text-sm text-red-500">
                           {errors.photo}
                        </p>
                     )}
                  </div>

                  <div className="w-full">
                     <div className="mt-6 mb-10">
                        <Input
                           required
                           type="name"
                           name="name"
                           defaultValue={name}
                           placeholder={input.name_placeholder}
                        />

                        <InputError message={errors.name} className="mt-2" />
                     </div>

                     <LoadingButton loading={processing} className="h-9 w-full">
                        {button.save_changes}
                     </LoadingButton>
                  </div>
               </>
            )}
         </Form>
      </Card>
   );
};

export default Profile;
