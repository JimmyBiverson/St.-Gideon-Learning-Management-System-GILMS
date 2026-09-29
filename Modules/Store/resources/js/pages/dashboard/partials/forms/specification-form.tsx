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
import { store, update } from '@/routes/product-specifications';
import { Form, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   productId: string | number;
   handler: React.ReactNode;
   specification?: ProductSpecification;
}

const SpecificationForm = ({
   title,
   productId,
   handler,
   specification,
}: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);

   const { data, setData, reset } = useForm({
      product_id: productId,
      title: specification?.title || '',
      value: specification?.value || '',
   });

   const formDefinition = specification
      ? update.form(specification.id)
      : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);

               if (specification) {
                  setData({
                     product_id: productId,
                     title: specification.title || '',
                     value: specification.value || '',
                  });
               } else {
                  reset();
               }
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent>
            <DialogHeader className="mb-4">
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Form
               key={formKey}
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  ...data,
               })}
               options={{ preserveScroll: true }}
               onSuccess={() => {
                  if (!specification) {
                     reset();
                  }

                  setOpen(false);
               }}
               className="space-y-4"
            >
               {({ errors, processing }) => (
                  <>
                     <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                           required
                           type="text"
                           value={data.title}
                           placeholder="e.g. Format"
                           onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} />
                     </div>

                     <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                           required
                           type="text"
                           value={data.value}
                           placeholder="e.g. PDF, EPUB"
                           onChange={(e) => setData('value', e.target.value)}
                        />
                        <InputError message={errors.value} />
                     </div>

                     <div className="flex justify-end gap-3 pt-2">
                        <LoadingButton loading={processing}>Save</LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default SpecificationForm;
