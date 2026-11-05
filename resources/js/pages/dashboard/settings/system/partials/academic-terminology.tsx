import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/academic-terminology';

const presets = [
   { name: 'School', singular: 'Subject', plural: 'Subjects' },
   { name: 'College / University', singular: 'Course', plural: 'Courses' },
   { name: 'Training institute', singular: 'Module', plural: 'Modules' },
   { name: 'Professional academy', singular: 'Unit', plural: 'Units' },
];

export default function AcademicTerminology() {
   const { academicTerminology } = usePage<
      SharedData & {
         academicTerminology: { singular: string; plural: string };
      }
   >().props;
   const form = useForm(
      academicTerminology ?? { singular: 'Subject', plural: 'Subjects' },
   );

   return (
      <Card className="space-y-6 p-4 sm:p-6">
         <div>
            <h2 className="text-lg font-semibold">
               Academic Terminology Settings
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
               Choose the words your institution uses for learning. Existing
               records and enrollments stay intact.
            </p>
         </div>
         <div className="flex flex-wrap gap-2" aria-label="Terminology presets">
            {presets.map(({ name, singular, plural }) => (
               <Button
                  key={name}
                  type="button"
                  variant="outline"
                  aria-pressed={
                     form.data.singular === singular &&
                     form.data.plural === plural
                  }
                  onClick={() => form.setData({ singular, plural })}
               >
                  {name}
               </Button>
            ))}
         </div>
         <form
            className="space-y-5"
            onSubmit={(event) => {
               event.preventDefault();
               form.put(update.url(), { preserveScroll: true });
            }}
         >
            <div className="grid gap-5 sm:grid-cols-2">
               <div className="space-y-2">
                  <Label htmlFor="academic-singular">Singular name</Label>
                  <Input
                     id="academic-singular"
                     value={form.data.singular}
                     maxLength={40}
                     required
                     onChange={(event) =>
                        form.setData('singular', event.target.value)
                     }
                  />
                  <InputError message={form.errors.singular} />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="academic-plural">Plural name</Label>
                  <Input
                     id="academic-plural"
                     value={form.data.plural}
                     maxLength={40}
                     required
                     onChange={(event) =>
                        form.setData('plural', event.target.value)
                     }
                  />
                  <InputError message={form.errors.plural} />
               </div>
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm" aria-live="polite">
               Preview: Add {form.data.singular} · View {form.data.plural}
            </div>
            <div className="flex items-center gap-3">
               <LoadingButton loading={form.processing}>
                  Save terminology
               </LoadingButton>
               {form.recentlySuccessful && (
                  <p role="status" className="text-sm">
                     Terminology saved.
                  </p>
               )}
            </div>
         </form>
      </Card>
   );
}
