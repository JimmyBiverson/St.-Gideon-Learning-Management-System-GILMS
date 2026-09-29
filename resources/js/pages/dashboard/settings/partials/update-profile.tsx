import { Form, useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useCallback, useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TagInput from '@/components/tag-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { onFileChangePreview } from '@/lib/inertia';
import { update } from '@/routes/instructor';

interface SocialLink {
   host: string;
   profile_link: string;
}

type SocialLinksMap = {
   website: string;
   github: string;
   twitter: string;
   linkedin: string;
};

const emptySocialLinks = (): SocialLinksMap => ({
   website: '',
   github: '',
   twitter: '',
   linkedin: '',
});

const parseSocialLinks = (socialLinksData: unknown): SocialLinksMap => {
   if (!socialLinksData) {
      return emptySocialLinks();
   }

   try {
      const links: SocialLink[] =
         typeof socialLinksData === 'string'
            ? JSON.parse(socialLinksData)
            : (socialLinksData as SocialLink[]);

      const linkMap = emptySocialLinks();

      links.forEach((link) => {
         if (link.host in linkMap) {
            linkMap[link.host as keyof SocialLinksMap] = link.profile_link;
         }
      });

      return linkMap;
   } catch {
      return emptySocialLinks();
   }
};

const UpdateProfile = ({ instructor }: { instructor: Instructor }) => {
   const { auth, errors } = usePage<SharedData>().props;
   const user = auth.user;

   // Parse skills if they're stored as a string
   const initialSkills = instructor?.skills
      ? typeof instructor.skills === 'string'
         ? JSON.parse(instructor.skills)
         : instructor.skills
      : [];

   const [userPhoto, setUserPhoto] = useState(user.photo);
   const { data, setData } = useForm({
      socialLinks: parseSocialLinks(user.social_links),
      skills: initialSkills as any[],
   });

   const formatSocialLinks = useCallback((links: SocialLinksMap): any[] => {
      return Object.entries(links)
         .filter(([_, value]) => value)
         .map(([host, profile_link]) => ({ host, profile_link }));
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
            user_id: user.id,
            skills: data.skills,
         })}
         className="space-y-6 rounded-lg border bg-card p-6 shadow"
      >
         {({ processing }) => (
            <>
               <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex w-full flex-col items-center space-y-3 text-center md:max-w-[160px]">
                     <div className="relative mb-4 h-[100px] w-[100px]">
                        {userPhoto ? (
                           <img
                              alt="item-1"
                              src={userPhoto}
                              className="h-[100px] w-[100px] rounded-full object-cover"
                           />
                        ) : (
                           <div className="h-[100px] w-[100px] rounded-full bg-gray-300"></div>
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
                           type="file"
                           id="formFileSm"
                           name="photo"
                           onChange={(e) =>
                              onFileChangePreview(e, setUserPhoto)
                           }
                        />
                     </div>

                     <small className="text-xs text-gray-500">
                        Allowed: JPG, JPEG, PNG, SVG File, Maximum 2MB
                     </small>

                     {errors.photo && (
                        <p className="mt-1 text-sm text-red-500">
                           {errors.photo}
                        </p>
                     )}
                  </div>

                  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                     <div>
                        <Label>Website</Label>
                        <Input
                           type="url"
                           value={data.socialLinks.website}
                           onChange={(e) =>
                              updateSocialLink('website', e.target.value)
                           }
                           placeholder="https://example.com"
                        />
                     </div>

                     <div>
                        <Label>GitHub</Label>
                        <Input
                           type="url"
                           value={data.socialLinks.github}
                           onChange={(e) =>
                              updateSocialLink('github', e.target.value)
                           }
                           placeholder="https://github.com/my-profile"
                        />
                     </div>

                     <div>
                        <Label>Twitter</Label>
                        <Input
                           type="url"
                           value={data.socialLinks.twitter}
                           onChange={(e) =>
                              updateSocialLink('twitter', e.target.value)
                           }
                           placeholder="https://twitter.com/my-profile"
                        />
                     </div>

                     <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                           id="linkedin"
                           value={data.socialLinks.linkedin}
                           onChange={(e) =>
                              updateSocialLink('linkedin', e.target.value)
                           }
                           placeholder="https://linkedin.com/my-profile"
                        />
                     </div>
                  </div>
               </div>

               <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                     id="name"
                     name="name"
                     defaultValue={user.name || ''}
                     placeholder="John Doe"
                  />
                  <InputError message={errors.name} />
               </div>

               {((user.role === 'admin' && user.instructor_id) ||
                  user.role === 'instructor') && (
                  <>
                     <div>
                        <Label>Designation</Label>
                        <Input
                           name="designation"
                           defaultValue={instructor?.designation || ''}
                           placeholder="Software Engineer"
                        />
                        <InputError message={errors.designation} />
                     </div>
                     {user.role === 'instructor' && (
                        <div>
                           <Label>Resume</Label>
                           <Input readOnly type="file" name="resume" />
                           <InputError message={errors.resume} />
                        </div>
                     )}
                     <div>
                        <Label>Skills</Label>
                        <TagInput
                           defaultTags={data.skills}
                           placeholder="Enter the skills as a tag"
                           onChange={(values: any) => setData('skills', values)}
                        />
                     </div>
                     <div>
                        <Label>Biography</Label>
                        <Textarea
                           rows={5}
                           required
                           name="biography"
                           defaultValue={instructor?.biography || ''}
                           placeholder="Write about yourself"
                        />
                        <InputError message={errors.biography} />
                     </div>
                  </>
               )}

               <div className="flex items-center justify-end">
                  <LoadingButton loading={processing}>
                     Save Changes
                  </LoadingButton>
               </div>
            </>
         )}
      </Form>
   );
};

export default UpdateProfile;
