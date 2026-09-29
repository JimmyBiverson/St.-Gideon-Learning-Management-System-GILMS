import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import setGlobalColorTheme from '@/lib/theme-colors';
import { update } from '@/routes/system';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const FrontendSystem = () => {
   const { props } = usePage<SystemSettingsProps>();
   const [modal, setModal] = useState<boolean>(false);

   const frontendHandler = () => {
      router.post(
         update(props.system.id),
         {
            ...props.system.fields,
            frontend: !props.system.fields.frontend,
         },
         {
            onSuccess: (res: any) => {
               setModal(false);
               const { system, frontend, appearance } = res.props;

               if (system.fields.frontend) {
                  setGlobalColorTheme(
                     appearance,
                     frontend?.theme_color as ThemeColors,
                  );
               } else {
                  setGlobalColorTheme(appearance, 'Zinc');
               }
            },
         },
      );
   };

   const disable =
      'When disable this then the website frontend system will back to the previous system where able to customize the frontend from the home page directly. Are you sure you want to disable frontend page editor?';
   const enable =
      'Enabling frontend page editor will allow you to edit the frontend of your website by the nocode editor. After enabling this, your current frontend system will be disabled. Are you sure you want to enable frontend page editor?';

   return (
      <Dialog open={modal} onOpenChange={setModal}>
         <DialogTrigger>
            <Tooltip>
               <TooltipTrigger>
                  <Button className="px-3">
                     {props.system.fields.frontend ? 'Disable' : 'Enable'}{' '}
                     <span>Page Editor</span>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>{props.system.fields.frontend ? disable : enable}</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>

         <DialogContent className="px-6 py-8 sm:max-w-[425px]">
            <div
               className={`rounded-xl p-4 ${
                  props.system.fields.frontend
                     ? 'bg-destructive/5'
                     : 'bg-blue-500/10'
               }`}
            >
               <p
                  className={`text-sm ${
                     props.system.fields.frontend
                        ? 'text-destructive'
                        : 'text-blue-600 dark:text-blue-400'
                  }`}
               >
                  {props.system.fields.frontend ? disable : enable}
               </p>
            </div>

            <div className="mt-3 flex items-center justify-end gap-6">
               <Button onClick={() => setModal(false)} variant="outline">
                  Cancel
               </Button>
               <Button
                  className={`px-5 ${
                     props.system.fields.frontend
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  onClick={frontendHandler}
               >
                  {props.system.fields.frontend ? 'Disable' : 'Enable'}
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default FrontendSystem;
