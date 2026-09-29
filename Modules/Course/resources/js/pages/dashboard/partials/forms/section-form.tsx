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
import { ScrollArea } from '@/components/ui/scroll-area';
import { store, update } from '@/routes/section';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   section?: CourseSection;
}

const SectionForm = ({ title, section, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;
   const sectionSort = section ? section.sort : props.lastSectionSort + 1;

   const formDefinition = section
      ? update.form.put(Number(section.id))
      : store.form();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  {...formDefinition}
                  transform={(data) => ({
                     ...data,
                     sort: sectionSort,
                     course_id: props.course.id,
                  })}
                  onSuccess={() => setOpen(false)}
                  className="space-y-4 p-0.5"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{dashboard.section_title}</Label>
                           <Input
                              required
                              type="text"
                              name="title"
                              defaultValue={section?.title || ''}
                              placeholder={input.section_title_placeholder}
                           />
                           <InputError message={errors.title} />
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

export default SectionForm;
