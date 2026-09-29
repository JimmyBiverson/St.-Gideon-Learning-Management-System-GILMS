import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import languages from '@/data/languages';
import { store } from '@/routes/language';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

const AddLanguage = () => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { button, common } = translate;

   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState({
      code: 'en',
      name: 'English',
      nativeName: 'English',
   });

   const transformedLanguages = languages.map((lang) => ({
      label: lang.name,
      value: lang.name,
   }));

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>
            <Button>{button.add_language}</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-xl font-medium">
                  {button.add_language}
               </DialogTitle>
            </DialogHeader>

            <Form
               {...store.form()}
               transform={(data) => ({
                  ...data,
                  ...selected,
               })}
               onSuccess={() => setOpen(false)}
               className="flex h-full flex-col justify-between"
            >
               {({ errors }) => (
                  <>
                     <div>
                        <Label>{common.language}</Label>

                        <Combobox
                           data={transformedLanguages}
                           placeholder="Select a language"
                           defaultValue={
                              languages.find(
                                 (lang) => lang.code === selected.code,
                              )?.name
                           }
                           onSelect={(selectedOption) => {
                              const lang = languages.find(
                                 (lang) => lang.name === selectedOption.value,
                              );

                              if (lang) {
                                 setSelected({
                                    code: lang.code,
                                    name: lang.name,
                                    nativeName: lang.nativeName,
                                 });
                              }
                           }}
                        />

                        <InputError message={errors.code} />
                     </div>

                     <div className="mt-10 flex justify-end gap-4">
                        <Button
                           variant="outline"
                           type="button"
                           onClick={() => setOpen(false)}
                        >
                           {button.cancel}
                        </Button>
                        <Button type="submit">{button.create}</Button>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default AddLanguage;
