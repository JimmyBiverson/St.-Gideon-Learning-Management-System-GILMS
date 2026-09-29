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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

import { formatDatetimeLocal, parseDatetimeLocalForSubmit } from '@/lib/date';
import { store, update } from '@/routes/product-coupons';
import { Form, useForm } from '@inertiajs/react';
import { Shuffle } from 'lucide-react';
import { useRef, useState } from 'react';

const GLOBAL_PRODUCT_VALUE = 'global';

interface Props {
   title: string;
   handler: React.ReactNode;
   coupon?: ProductCoupon;
   products: Product[];
}

const CouponForm = ({ title, handler, coupon, products }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const codeInputRef = useRef<HTMLInputElement | null>(null);

   const { data, setData } = useForm({
      isActive: coupon?.is_active ?? true,
   });

   const generateCode = () => {
      const generated = Math.random()
         .toString(36)
         .substring(2, 10)
         .toUpperCase();

      if (codeInputRef.current) {
         codeInputRef.current.value = generated;
      }
   };

   const formDefinition = coupon
      ? update.form.put({ coupon: coupon.id })
      : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
               setData('isActive', coupon?.is_active ?? true);
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Form
               key={formKey}
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  is_active: data.isActive ? '1' : '0',
                  valid_from:
                     typeof formData.valid_from === 'string' &&
                     formData.valid_from
                        ? parseDatetimeLocalForSubmit(formData.valid_from)
                        : formData.valid_from,
                  valid_to:
                     typeof formData.valid_to === 'string' && formData.valid_to
                        ? parseDatetimeLocalForSubmit(formData.valid_to)
                        : formData.valid_to,
                  product_id:
                     formData.product_id === GLOBAL_PRODUCT_VALUE
                        ? ''
                        : formData.product_id,
               })}
               onSuccess={() => setOpen(false)}
               options={{ preserveScroll: true }}
            >
               {({ processing, errors }) => (
                  <>
                     <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="col-span-2">
                              <Label htmlFor="code">Coupon Code *</Label>
                              <div className="flex gap-2">
                                 <Input
                                    id="code"
                                    ref={codeInputRef}
                                    name="code"
                                    defaultValue={coupon?.code || ''}
                                    placeholder="SUMMER2024"
                                    required
                                 />
                                 <Button
                                    size="lg"
                                    type="button"
                                    variant="outline"
                                    onClick={generateCode}
                                 >
                                    <Shuffle className="h-4 w-4" />
                                 </Button>
                              </div>
                              <InputError message={errors.code} />
                           </div>

                           <div>
                              <Label htmlFor="discount_type">
                                 Discount Type *
                              </Label>
                              <Select
                                 name="discount_type"
                                 defaultValue={
                                    coupon?.discount_type || 'percentage'
                                 }
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="percentage">
                                       Percentage (%)
                                    </SelectItem>
                                    <SelectItem value="fixed">
                                       Fixed Amount ($)
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.discount_type} />
                           </div>

                           <div>
                              <Label htmlFor="discount">Discount Value *</Label>
                              <Input
                                 id="discount"
                                 name="discount"
                                 type="number"
                                 defaultValue={
                                    coupon?.discount?.toString() || '0'
                                 }
                                 min="0"
                                 step="0.01"
                                 required
                              />
                              <InputError message={errors.discount} />
                           </div>

                           <div className="col-span-2">
                              <Label htmlFor="product_id">Select Product</Label>
                              <Select
                                 name="product_id"
                                 defaultValue={
                                    coupon?.product_id?.toString() ||
                                    GLOBAL_PRODUCT_VALUE
                                 }
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="All Products (global coupon)" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value={GLOBAL_PRODUCT_VALUE}>
                                       All Products (global coupon)
                                    </SelectItem>
                                    {products.map((p) => (
                                       <SelectItem
                                          key={p.id}
                                          value={p.id.toString()}
                                       >
                                          {p.title}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.product_id} />
                           </div>

                           <div>
                              <Label htmlFor="valid_from">Valid From *</Label>
                              <Input
                                 id="valid_from"
                                 name="valid_from"
                                 type="datetime-local"
                                 defaultValue={
                                    formatDatetimeLocal(coupon?.valid_from) ||
                                    ''
                                 }
                                 required
                              />
                              <InputError message={errors.valid_from} />
                           </div>

                           <div>
                              <Label htmlFor="valid_to">Valid To *</Label>
                              <Input
                                 id="valid_to"
                                 name="valid_to"
                                 type="datetime-local"
                                 defaultValue={
                                    formatDatetimeLocal(coupon?.valid_to) || ''
                                 }
                                 required
                              />
                              <InputError message={errors.valid_to} />
                           </div>

                           <div>
                              <Label htmlFor="is_active">Status</Label>
                              <Select
                                 name="is_active"
                                 value={data.isActive ? '1' : '0'}
                                 onValueChange={(v) =>
                                    setData('isActive', v === '1')
                                 }
                              >
                                 <SelectTrigger id="is_active">
                                    <SelectValue placeholder="Select status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                     </div>

                     <DialogFooter className="gap-2">
                        <DialogClose asChild>
                           <Button type="button" variant="outline">
                              Cancel
                           </Button>
                        </DialogClose>
                        <LoadingButton
                           loading={processing}
                           disabled={processing}
                        >
                           {coupon ? 'Update' : 'Create'}
                        </LoadingButton>
                     </DialogFooter>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default CouponForm;
