import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from './loading-button';
import { Card } from './ui/card';

/** Breeze-style account deletion URL; add a matching DELETE route in Laravel for production use. */
const PROFILE_DESTROY_PATH = '/settings/profile';

export default function DeleteUser() {
   const passwordInput = useRef<HTMLInputElement>(null);

   return (
      <Card className="space-y-6 p-6">
         <header>
            <h3 className="mb-0.5 text-base font-medium">Delete account</h3>
            <p className="text-sm text-muted-foreground">
               Delete your account and all of its resources
            </p>
         </header>

         <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
            <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
               <p className="font-medium">Warning</p>
               <p className="text-sm">
                  Please proceed with caution, this cannot be undone.
               </p>
            </div>

            <Dialog>
               <DialogTrigger asChild>
                  <Button
                     variant="destructive"
                     className="text-primary-foreground"
                  >
                     Delete account
                  </Button>
               </DialogTrigger>

               <DialogContent>
                  <DialogTitle>
                     Are you sure you want to delete your account?
                  </DialogTitle>
                  <DialogDescription>
                     Once your account is deleted, all of its resources and data
                     will also be permanently deleted. Please enter your
                     password to confirm you would like to permanently delete
                     your account.
                  </DialogDescription>
                  <Form
                     method="delete"
                     action={PROFILE_DESTROY_PATH}
                     options={{ preserveScroll: true }}
                     onError={() => passwordInput.current?.focus()}
                     resetOnSuccess
                     className="space-y-6"
                  >
                     {({ errors, processing, resetAndClearErrors }) => (
                        <>
                           <div className="grid gap-2">
                              <Label htmlFor="password" className="sr-only">
                                 Password
                              </Label>

                              <Input
                                 id="password"
                                 type="password"
                                 name="password"
                                 ref={passwordInput}
                                 placeholder="Password"
                                 autoComplete="current-password"
                              />

                              <InputError message={errors.password} />
                           </div>

                           <DialogFooter className="gap-2">
                              <DialogClose asChild>
                                 <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => resetAndClearErrors()}
                                 >
                                    Cancel
                                 </Button>
                              </DialogClose>

                              <LoadingButton
                                 variant="destructive"
                                 loading={processing}
                                 className="text-primary-foreground"
                              >
                                 Delete account
                              </LoadingButton>
                           </DialogFooter>
                        </>
                     )}
                  </Form>
               </DialogContent>
            </Dialog>
         </div>
      </Card>
   );
}
