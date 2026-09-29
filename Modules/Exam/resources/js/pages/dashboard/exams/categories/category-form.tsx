import IconPickerDialog from '@/components/icon-picker-dialog';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
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
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/use-lang';
import { store, update } from '@/routes/exam-categories';
import { Form, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: ExamCategory;
}

const CategoryForm = ({ title, category, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const { input, button } = useLang();
   const { data, setData } = useForm({ icon: category?.icon || '' });

   const formDefinition = category ? update.form(category.id) : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
               setData('icon', category?.icon || '');
            }
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
                  {...formDefinition}
                  transform={(formData) => ({
                     ...formData,
                     icon: data.icon,
                  })}
                  encType="multipart/form-data"
                  options={{ preserveScroll: true }}
                  onSuccess={() => {
                     setOpen(false);
                  }}
                  className="space-y-4 p-0.5"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{input.title}</Label>
                           <Input
                              required
                              type="text"
                              name="title"
                              defaultValue={category ? category.title : ''}
                              placeholder={input.title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>
                        <div>
                           <Label>{input.category_icon}</Label>
                           <IconPickerDialog
                              name="icon"
                              value={data.icon || ''}
                              placeholder="Pick your category icon"
                              onSelect={(icon) => setData('icon', icon)}
                           />
                           <InputError message={errors.icon} />
                        </div>
                        <div>
                           <Label>{input.category_status}</Label>
                           <Select
                              name="status"
                              defaultValue={
                                 category ? (category.status ? '1' : '0') : '1'
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder={input.status_placeholder}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="1">Active</SelectItem>
                                 <SelectItem value="0">Inactive</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div>
                           <Label>{input.description}</Label>
                           <Textarea
                              name="description"
                              defaultValue={
                                 category ? category.description : ''
                              }
                              placeholder={input.description_placeholder}
                           />
                           <InputError message={errors.description} />
                        </div>
                        <div>
                           <Label>{input.thumbnail}</Label>
                           <Input
                              type="file"
                              name="thumbnail"
                              accept="image/*"
                           />
                           <InputError message={errors.thumbnail} />
                        </div>

                        <DialogFooter className="flex justify-end space-x-2 pt-4">
                           <DialogClose asChild>
                              <Button type="button" variant="outline">
                                 {button.close}
                              </Button>
                           </DialogClose>

                           <LoadingButton loading={processing}>
                              {button.save_changes}
                           </LoadingButton>
                        </DialogFooter>
                     </>
                  )}
               </Form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default CategoryForm;
