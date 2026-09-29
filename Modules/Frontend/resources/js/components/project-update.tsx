import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { onFileChangePreview } from '@/lib/inertia';
import setGlobalColorTheme, { getThemeColorConfig } from '@/lib/theme-colors';
import { cn } from '@/lib/utils';
import { update as projectsUpdate } from '@/routes/projects';
import { Form } from '@inertiajs/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface Props {
   project: Project;
   triggerHandler: ReactNode;
}

const ProjectUpdate = ({ project, triggerHandler }: Props) => {
   const [modal, setModal] = useState<boolean>(false);
   const [themeColor, setThemeColor] = useState<ThemeColors>(
      project ? project.theme_color : 'Zinc',
   );
   const [faviconUrl, setFaviconUrl] = useState(
      project && project.favicon ? project.favicon : '/favicon.ico',
   );

   const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         onFileChangePreview(e, setFaviconUrl);
      }
   };

   return (
      <Dialog open={modal} onOpenChange={setModal}>
         <DialogTrigger asChild>{triggerHandler}</DialogTrigger>

         <DialogContent className="max-w-xl p-4 md:p-6 [&>#close]:hidden">
            <VisuallyHidden.Root>
               <DialogTitle>
                  {project ? 'Update Project' : 'Create Project'}
               </DialogTitle>
               <DialogDescription>
                  {project
                     ? 'Update your project details'
                     : 'Create a new project'}
               </DialogDescription>
            </VisuallyHidden.Root>

            <Form
               {...projectsUpdate.form.post(Number(project.id))}
               encType="multipart/form-data"
               className="space-y-5"
               onSuccess={(page) => {
                  setModal(false);
                  const { frontend, appearance } = page.props as any;
                  setGlobalColorTheme(
                     appearance,
                     frontend?.theme_color as ThemeColors,
                  );
               }}
            >
               {({ processing, errors }) => (
                  <>
                     <div className="grid gap-2">
                        <Label>Favicon</Label>
                        <div className="flex items-center gap-3">
                           <img
                              className="h-10 w-10 rounded-md border border-gray-200 p-1"
                              src={faviconUrl}
                              alt="Favicon preview"
                           />
                           <label
                              htmlFor="favicon"
                              className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-gray-200 text-sm hover:bg-gray-50"
                           >
                              <span>Upload Favicon</span>
                           </label>
                           <input
                              hidden
                              id="favicon"
                              name="favicon"
                              type="file"
                              accept="image/*"
                              onChange={handleFaviconChange}
                           />
                        </div>
                        <InputError message={errors.favicon as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                           id="name"
                           name="name"
                           type="text"
                           required
                           defaultValue={project?.name || ''}
                           placeholder="Enter your project name"
                        />
                        <InputError message={errors.name as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                           id="title"
                           name="title"
                           type="text"
                           required
                           defaultValue={project?.title || ''}
                           placeholder="Enter your project title"
                        />
                        <InputError message={errors.title as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                           id="description"
                           name="description"
                           rows={6}
                           defaultValue={project?.description || ''}
                           placeholder="Site Description"
                           className="min-h-[100px]"
                        />
                        <InputError message={errors.description as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="theme_color">Theme Color</Label>
                        <input
                           type="hidden"
                           name="theme_color"
                           value={themeColor}
                        />
                        {Object.entries(
                           getThemeColorConfig(themeColor) || {},
                        ).map(([k, v]) => (
                           <input
                              key={k}
                              type="hidden"
                              name={`theme_config[${k}]`}
                              value={String(v)}
                           />
                        ))}
                        <div className="flex flex-wrap items-center gap-3">
                           {availableThemeColors.map(({ name, light }) => (
                              <button
                                 key={name}
                                 type="button"
                                 onClick={() => setThemeColor(name)}
                                 className={cn(
                                    'h-8 w-8 cursor-pointer rounded-full transition-all',
                                    light,
                                    themeColor === name &&
                                       'ring-2 ring-blue-500 ring-offset-2 outline-1 outline-background',
                                 )}
                                 aria-label={`Select ${name} theme`}
                              ></button>
                           ))}
                        </div>
                     </div>

                     <div className="flex items-center justify-end gap-4 pt-4">
                        <Button
                           type="button"
                           variant="outline"
                           disabled={processing}
                           onClick={() => setModal(false)}
                        >
                           Cancel
                        </Button>
                        <LoadingButton loading={processing} type="submit">
                           {project ? 'Update Project' : 'Create Project'}
                        </LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

const availableThemeColors: {
   name: ThemeColors;
   light: string;
   dark: string;
}[] = [
   { name: 'Zinc', light: 'bg-zinc-900', dark: 'bg-zinc-700' },
   { name: 'Rose', light: 'bg-rose-600', dark: 'bg-rose-700' },
   { name: 'Blue', light: 'bg-blue-600', dark: 'bg-blue-700' },
   { name: 'Green', light: 'bg-green-600', dark: 'bg-green-500' },
   { name: 'Orange', light: 'bg-orange-500', dark: 'bg-orange-700' },
];

export default ProjectUpdate;
