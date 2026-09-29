import IconPicker from '@/components/icon-picker';
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
import { store, update } from '@/routes/course-categories';
import { Form, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: CourseCategory;
}

const CategoryForm = ({ title, category, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const [openIcon, setOpenIcon] = useState(false);
   const { dashboard, input, button } = useLang();

   const { data, setData } = useForm({ icon: category ? category.icon : '' });

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
               setData('icon', category ? category.icon : '');
            } else {
               setOpenIcon(false);
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
                  {...(category
                     ? update.form({ category: category.id })
                     : store.form())}
                  transform={(formData) => ({
                     ...formData,
                     icon: data.icon,
                  })}
                  onSuccess={() => {
                     setOpen(false);
                  }}
                  options={{ preserveScroll: true }}
                  className="space-y-4 p-0.5"
               >
                  {({ processing, errors }) => (
                     <>
                        <div>
                           <Label>{input.title}</Label>
                           <Input
                              required
                              type="text"
                              name="title"
                              defaultValue={category?.title || ''}
                              placeholder={input.title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>
                        <div>
                           <Label>{input.category_icon}</Label>
                           <Input
                              required
                              readOnly
                              type="text"
                              value={data.icon}
                              placeholder={input.icon_placeholder}
                              onClick={() => setOpenIcon(true)}
                           />
                           <InputError message={errors.icon} />

                           <Dialog open={openIcon} onOpenChange={setOpenIcon}>
                              <DialogContent className="p-0">
                                 <ScrollArea className="max-h-[90vh] p-6">
                                    <DialogHeader className="mb-6">
                                       <DialogTitle>
                                          {dashboard.icon_picker}
                                       </DialogTitle>
                                    </DialogHeader>

                                    <IconPicker
                                       onSelect={(selectedIcon) => {
                                          setData('icon', selectedIcon);
                                          setOpenIcon(false);
                                       }}
                                    />
                                 </ScrollArea>
                              </DialogContent>
                           </Dialog>
                        </div>
                        <div>
                           <Label>{input.category_status}</Label>
                           <Select
                              name="status"
                              defaultValue={
                                 category ? String(category.status) : '1'
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
                              defaultValue={category?.description || ''}
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
