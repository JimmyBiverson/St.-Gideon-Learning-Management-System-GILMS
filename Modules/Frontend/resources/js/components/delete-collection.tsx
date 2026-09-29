import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/routes/frontend';
import { router, usePage } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
   type: string;
   category: FrontendPageAPIParams;
   itemId: number | string;
}

const DeleteCollection = (props: Props) => {
   const page = usePage<SharedData>();
   const { button, frontend } = page.props.translate;
   const { type, category, itemId } = props;
   const [modal, setModal] = useState<boolean>(false);

   const handleOpen = () => {
      setModal((prev) => !prev);
   };

   const handleRemove = () => {
      router.put(
         api(),
         {
            type,
            category,
            item_id: itemId,
            action: 'remove',
         },
         {
            preserveScroll: true,
            onFinish: () => handleOpen(),
         },
      );
   };

   return (
      <Dialog open={modal} onOpenChange={setModal}>
         <DialogTrigger asChild>
            <Button
               size="icon"
               variant="ghost"
               className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
               <Trash2 />
            </Button>
         </DialogTrigger>

         <DialogContent className="p-6 sm:max-w-[400px]">
            <div className="flex flex-col gap-4">
               {/* Icon & Header (Left aligned) */}
               <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                     <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                     Delete Warning
                  </h3>
               </div>

               {/* Description (Left aligned) */}
               <p className="text-sm leading-relaxed text-muted-foreground">
                  {frontend.delete_warning}
               </p>

               {/* Action Buttons (Left aligned) */}
               <div className="mt-2 flex items-center justify-end gap-3">
                  <Button
                     variant="outline"
                     onClick={handleOpen}
                     className="px-5"
                  >
                     {button.cancel}
                  </Button>

                  <Button
                     type="button"
                     variant="destructive"
                     onClick={handleRemove}
                     className="px-5"
                  >
                     {button.delete}
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default DeleteCollection;
