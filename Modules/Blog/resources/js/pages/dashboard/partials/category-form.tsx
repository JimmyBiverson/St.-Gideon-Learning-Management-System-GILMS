import IconPicker from '@/components/icon-picker';
import InputError from '@/components/input-error';
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
import {
   update as updateCategory,
   store as storeCategory,
} from '@/routes/blogs/categories';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: BlogCategory;
}

const CategoryForm = ({ title, handler, category }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { dashboard, input, button } = translate;
   const [open, setOpen] = useState(false);
   const [openIcon, setOpenIcon] = useState(false);

   const { data, setData } = useForm({
      status: category ? category.status : 'active',
      icon: category ? category.icon : '',
   });

   const formDefinition = category
      ? updateCategory.form.put(category.id)
      : storeCategory.form();

   const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
         setData('status', category ? category.status : 'active');
         setData('icon', category ? category.icon : '');
      }

      setOpen(nextOpen);
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Form
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  icon: data.icon,
                  status: data.status,
               })}
               options={{ preserveScroll: true }}
               onSuccess={() => setOpen(false)}
            >
               {({ processing, errors }) => (
                  <>
                     <div className="space-y-4 py-4">
                        <div className="space-y-2">
                           <Label htmlFor="name">{input.title}</Label>
                           <Input
                              id="name"
                              name="name"
                              defaultValue={category ? category.name : ''}
                              className={errors.name ? 'border-red-500' : ''}
                              placeholder={dashboard.enter_category_name}
                           />
                           <InputError message={errors.name as string} />
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
                           <InputError message={errors.icon as string} />

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
                           <Label htmlFor="status">
                              {input.category_status}
                           </Label>
                           <Select
                              value={data.status}
                              onValueChange={(v) => setData('status', v)}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="active">
                                    {dashboard.active}
                                 </SelectItem>
                                 <SelectItem value="inactive">
                                    {dashboard.inactive}
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <InputError message={errors.status as string} />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="description">
                              {(dashboard as any).subtitle_80_char}
                           </Label>
                           <Textarea
                              id="description"
                              name="description"
                              defaultValue={category?.description || ''}
                              className={
                                 errors.description ? 'border-red-500' : ''
                              }
                              placeholder={dashboard.enter_category_description}
                              maxLength={80}
                              rows={3}
                           />
                           <InputError message={errors.description as string} />
                        </div>
                     </div>

                     <DialogFooter>
                        <DialogClose>
                           <Button type="button" variant="outline">
                              {button.close}
                           </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                           {category ? button.update : button.create}
                        </Button>
                     </DialogFooter>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default CategoryForm;
