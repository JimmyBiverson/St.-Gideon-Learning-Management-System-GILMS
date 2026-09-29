import { Form, useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useCallback, useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onFileChangePreview } from '@/lib/inertia';
import { update } from '@/routes/student/profile';

interface SocialLink {
   host: string;
   profile_link: string;
}

type SocialLinksMap = {
   website: string;
   facebook: string;
   twitter: string;
   linkedin: string;
};

const buildSocialLinksMap = (socialLinksData: unknown): SocialLinksMap => {
   const linkMap: SocialLinksMap = {
      website: '',
      facebook: '',
      twitter: '',
      linkedin: '',
   };

   try {
      if (!socialLinksData) {
         return linkMap;
      }

      const links: SocialLink[] =
         typeof socialLinksData === 'string'
            ? JSON.parse(socialLinksData)
            : (socialLinksData as SocialLink[]);

      links.forEach((link) => {
         if (link.host in linkMap) {
            linkMap[link.host as keyof SocialLinksMap] = link.profile_link;
         }
      });
   } catch {
      // Invalid social_links payload
   }

   return linkMap;
};

const MyProfile = () => {
   const { auth, errors, translate } = usePage<SharedData>().props;
   const { button, input } = translate;
   const user = auth.user;
   const [userPhoto, setUserPhoto] = useState(user.photo);
   const { data, setData } = useForm<{ socialLinks: SocialLinksMap }>({
      socialLinks: buildSocialLinksMap(user.social_links),
   });

   const formatSocialLinks = useCallback((links: SocialLinksMap): string => {
      const formattedLinks = Object.entries(links)
         .filter(([_, value]) => value)
         .map(([host, profile_link]) => ({ host, profile_link }));

      return JSON.stringify(formattedLinks);
   }, []);

   const updateSocialLink = useCallback(
      (platform: keyof SocialLinksMap, value: string) => {
         setData('socialLinks', { ...data.socialLinks, [platform]: value });
      },
      [data.socialLinks, setData],
   );

   return (
      <Form
         {...update.form()}
         transform={(formData) => ({
            ...formData,
            social_links: formatSocialLinks(data.socialLinks),
         })}
         encType="multipart/form-data"
         options={{ preserveScroll: true }}
      >
         {({ processing }) => (
            <div className="grid grid-cols-1 gap-6 rounded-lg bg-card p-6 md:grid-cols-2">
               <div className="col-span-full space-y-1">
                  <div className="h-[150px] w-[150px] rounded-full border border-dashed border-border p-1.5">
                     <div className="relative h-full w-full overflow-hidden rounded-full border border-border">
                        <img
                           alt={`${auth.user.name}'s profile`}
                           src={userPhoto || '/assets/icons/avatar.png'}
                           className="h-full w-full content-center object-cover"
                        />

                        <label
                           htmlFor="formFile"
                           className="absolute right-0 bottom-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 bg-black/50 text-primary-foreground opacity-0 transition-opacity duration-300 hover:opacity-100"
                        >
                           <Camera className="h-7 w-7" />
                           <span className="text-xs">{button.upload}</span>
                        </label>

                        <input
                           hidden
                           type="file"
                           id="formFile"
                           name="photo"
                           accept="image/*"
                           onChange={(e) =>
                              onFileChangePreview(e, setUserPhoto)
                           }
                        />
                     </div>
                  </div>

                  {errors.photo && (
                     <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
                  )}
               </div>

               <div className="space-y-4">
                  <Label htmlFor="name">{input.name}</Label>
                  <Input
                     id="name"
                     type="text"
                     name="name"
                     defaultValue={user.name || ''}
                     placeholder={input.full_name_placeholder}
                  />
                  <InputError message={errors.name} />
               </div>

               <div className="space-y-4">
                  <Label htmlFor="website">{input.website}</Label>
                  <Input
                     id="website"
                     type="url"
                     value={data.socialLinks.website}
                     onChange={(e) =>
                        updateSocialLink('website', e.target.value)
                     }
                     placeholder={input.https_placeholder}
                  />
               </div>

               <div>
                  <Label htmlFor="facebook">{input.facebook}</Label>
                  <Input
                     id="facebook"
                     type="url"
                     value={data.socialLinks.facebook}
                     onChange={(e) =>
                        updateSocialLink('facebook', e.target.value)
                     }
                     placeholder={input.https_placeholder}
                  />
               </div>

               <div>
                  <Label htmlFor="twitter">{input.twitter}</Label>
                  <Input
                     id="twitter"
                     type="url"
                     value={data.socialLinks.twitter}
                     onChange={(e) =>
                        updateSocialLink('twitter', e.target.value)
                     }
                     placeholder={input.https_placeholder}
                  />
               </div>

               <div>
                  <Label htmlFor="linkedin">{input.linkedin}</Label>
                  <Input
                     id="linkedin"
                     type="url"
                     value={data.socialLinks.linkedin}
                     onChange={(e) =>
                        updateSocialLink('linkedin', e.target.value)
                     }
                     placeholder={input.https_placeholder}
                  />
               </div>

               <div className="col-span-full">
                  <LoadingButton
                     type="submit"
                     loading={processing}
                     className="col-span-full"
                  >
                     {button.update} Profile
                  </LoadingButton>
               </div>
            </div>
         )}
      </Form>
   );
};

export default MyProfile;
