import { Form, useForm, usePage } from '@inertiajs/react';
import CssEditor from '@/components/css-editor';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { update } from '@/routes/system';

const Style = () => {
   const { props } = usePage<SystemSettingsProps>();
   const { translate } = props;
   const { settings, button } = translate;
   const fields = props.system.fields as SystemFields;

   const { data, setData } = useForm({
      global_style: fields.global_style ?? '',
   });

   return (
      <Card>
         <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2">
               {settings.custom_global_style}
            </CardTitle>
            <CardDescription className="hidden sm:block">
               {settings.css_description}
            </CardDescription>
         </CardHeader>

         <Separator />

         <CardContent className="p-4 sm:p-6">
            <Form
               {...update.form(props.system.id)}
               transform={(formData) => ({
                  ...fields,
                  ...formData,
                  ...data,
               })}
               options={{ preserveScroll: true }}
               className="space-y-6"
            >
               {({ processing, errors }) => (
                  <>
                     {/* CSS Editor */}
                     <div>
                        {/* Fix focus area: set fixed height so editor fills the box; click-to-focus wrapper */}
                        <CssEditor
                           value={data.global_style}
                           setValue={(value) => setData('global_style', value)}
                        />

                        <InputError message={errors.global_style} />
                     </div>

                     <LoadingButton
                        loading={processing}
                        type="submit"
                        className="float-end"
                     >
                        {button.save_changes}
                     </LoadingButton>
                  </>
               )}
            </Form>
         </CardContent>
      </Card>
   );
};

export default Style;
