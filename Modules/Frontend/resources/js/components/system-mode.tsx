import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { update } from '@/routes/system-type';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const SystemMode = () => {
   const { props } = usePage<FrontendPagesProps>();
   const { settings, button, input } = props.translate;
   const [modal, setModal] = useState<boolean>(false);
   const [systemType, setSystemType] = useState<string>(props.system.sub_type);

   return (
      <div>
         <Select
            name="system-type"
            value={props.system.sub_type}
            onValueChange={(value) => {
               setModal(true);
               setSystemType(value);
            }}
         >
            <SelectTrigger className="cursor-pointer">
               <SelectValue placeholder={input.system_type_placeholder} />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="collaborative" className="cursor-pointer">
                  {button.collaborative}
               </SelectItem>
               <SelectItem value="administrative" className="cursor-pointer">
                  {button.administrative}
               </SelectItem>
            </SelectContent>
         </Select>

         <Dialog open={modal} onOpenChange={setModal}>
            <DialogContent className="px-6 py-8 sm:max-w-[425px]">
               <div className="rounded-xl bg-destructive/5 p-4">
                  <p className="text-center text-sm text-destructive">
                     {settings.update_system_type_warning}
                  </p>
               </div>

               <div className="mb-0 flex items-center justify-center gap-6">
                  <Button
                     onClick={() => setModal(false)}
                     className="border border-destructive bg-transparent px-5 text-destructive hover:bg-transparent"
                  >
                     Cancel
                  </Button>

                  <Button
                     type="button"
                     onClick={() => {
                        router.post(
                           update(),
                           {
                              sub_type: systemType,
                           },
                           {
                              onSuccess: () => {
                                 setModal(false);
                              },
                           },
                        );
                     }}
                     className="hover:bg-primary-hover bg-primary px-5"
                  >
                     Submit
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default SystemMode;
