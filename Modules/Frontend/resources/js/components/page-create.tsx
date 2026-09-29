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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/frontend-pages';
import { Form } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface Props {
   projectId: number;
   triggerHandler: ReactNode;
}

const PageCreate = ({ projectId, triggerHandler }: Props) => {
   const [modal, setModal] = useState<boolean>(false);
   const [pageType, setPageType] = useState('inner');

   return (
      <Dialog open={modal} onOpenChange={setModal}>
         <DialogTrigger asChild>{triggerHandler}</DialogTrigger>

         <DialogContent className="max-w-xl p-4 md:p-6">
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
               Add a new page to your project
            </DialogDescription>

            <Form
               {...store.form()}
               onSuccess={() => setModal(false)}
               className="space-y-5"
            >
               {({ processing, errors }) => (
                  <>
                     <input type="hidden" name="project_id" value={projectId} />
                     <div className="grid gap-2">
                        <Label htmlFor="title">Page Title</Label>
                        <Input
                           id="title"
                           type="text"
                           name="title"
                           required
                           autoFocus
                           placeholder="Enter page title (e.g., Home, About, Contact)"
                        />
                        <InputError message={errors.title as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="description">
                           Description (Optional)
                        </Label>
                        <Textarea
                           id="description"
                           name="description"
                           rows={4}
                           placeholder="Brief description of this page"
                           className="min-h-[100px]"
                        />
                        <InputError message={errors.description as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label>URL</Label>
                        <Input
                           required
                           type="text"
                           name="url"
                           placeholder="Enter page URL"
                        />
                        <InputError message={errors.url as string} />
                     </div>

                     <div className="grid gap-2">
                        <Label>Page Type</Label>
                        <input type="hidden" name="type" value={pageType} />
                        <Select
                           value={pageType}
                           onValueChange={(value) => setPageType(value)}
                           disabled={processing}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select page type" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="inner">Inner</SelectItem>
                           </SelectContent>
                        </Select>
                        <InputError message={errors.type as string} />
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
                           Create Page
                        </LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default PageCreate;
