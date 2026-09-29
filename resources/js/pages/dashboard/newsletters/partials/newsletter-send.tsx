import { Form } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { useLang } from '@/hooks/use-lang';
import { send } from '@/routes/newsletters';

const NewsletterSend = ({ id }: { id: number }) => {
   const [open, setOpen] = useState(false);
   const { dashboard, button } = useLang();

   const users = [
      { title: dashboard.all, value: 'all' },
      { title: dashboard.student, value: 'student' },
      { title: button.instructor, value: 'instructor' },
   ];

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>
            <Button size="icon" variant="ghost" className="rounded-full">
               <Send />
            </Button>
         </DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{dashboard.send_newsletter}</DialogTitle>
               </DialogHeader>

               <Form
                  {...send.form()}
                  options={{ preserveScroll: true }}
                  onSuccess={() => {
                     setOpen(false);
                  }}
                  className="space-y-4 p-0.5"
               >
                  {({ errors, processing }) => (
                     <>
                        <input
                           type="hidden"
                           name="newsletter_id"
                           value={String(id)}
                        />

                        <div>
                           <Label>{dashboard.send_to}</Label>
                           <Select
                              name="user_type"
                              defaultValue={users?.[0]?.value ?? ''}
                           >
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder={dashboard.select_user_type}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 {users.map(({ title, value }) => (
                                    <SelectItem
                                       key={value}
                                       value={value}
                                       className="capitalize"
                                    >
                                       {title}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.user_type} />
                        </div>

                        <DialogFooter className="flex justify-end space-x-2 pt-4">
                           <DialogClose asChild>
                              <Button type="button" variant="outline">
                                 {button.close}
                              </Button>
                           </DialogClose>

                           <LoadingButton loading={processing}>
                              {button.submit}
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

export default NewsletterSend;
