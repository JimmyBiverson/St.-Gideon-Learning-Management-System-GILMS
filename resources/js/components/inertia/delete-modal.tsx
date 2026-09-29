import { router, usePage } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Props {
   message?: string;
   routePath: string;
   actionComponent: React.ReactNode;
}

const DeleteModal = (props: Props) => {
   const page = usePage<SharedData>();
   const { button, frontend } = page.props.translate;

   const { message, routePath, actionComponent } = props;
   const [modal, setModal] = useState<boolean>(false);

   const handleOpen = () => {
      setModal((prev) => !prev);
   };

   const deleteHandler = () => {
      router.delete(routePath, {
         preserveScroll: true,
         onSuccess: () => {
            setModal(false);
         },
      });
   };

   return (
      <Dialog open={modal} onOpenChange={setModal}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>

         <DialogContent className="p-6 sm:max-w-[400px]">
            <div className="flex flex-col gap-4">
               {/* Icon & Header (Left aligned) */}
               <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                     <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                     {message ? frontend.delete_warning : 'Delete Warning'}
                  </h3>
               </div>

               {/* Description (Left aligned) */}
               <p className="text-sm leading-relaxed text-muted-foreground">
                  {message ?? frontend.delete_warning}
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
                     onClick={deleteHandler}
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

export default DeleteModal;
