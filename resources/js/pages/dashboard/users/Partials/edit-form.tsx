import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { update } from '@/routes/users';

interface Props {
   user: User;
   actionComponent: ReactNode;
}

const EditForm = ({ user, actionComponent }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { dashboard, input, button, common } = translate;
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{dashboard.update_user}</DialogTitle>

               <Form
                  {...update.form(user.id)}
                  transform={(formData) => ({
                     ...formData,
                     status: Number(formData.status),
                  })}
                  options={{ preserveScroll: true }}
                  onSuccess={() => {
                     setOpen(false);
                  }}
                  className="space-y-4 text-start"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{input.name}</Label>
                           <Input
                              required
                              name="name"
                              defaultValue={user.name}
                           />
                           <InputError message={errors.name} />
                        </div>

                        <div>
                           <Label>{input.status}</Label>
                           <Select
                              name="status"
                              defaultValue={user.status === 1 ? '1' : '0'}
                           >
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder={
                                       dashboard.select_approval_status
                                    }
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="1">
                                    {common.active}
                                 </SelectItem>
                                 <SelectItem value="0">
                                    {common.inactive}
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <InputError message={errors.status} />
                        </div>

                        <LoadingButton loading={processing} className="w-full">
                           {button.submit}
                        </LoadingButton>
                     </>
                  )}
               </Form>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default EditForm;
