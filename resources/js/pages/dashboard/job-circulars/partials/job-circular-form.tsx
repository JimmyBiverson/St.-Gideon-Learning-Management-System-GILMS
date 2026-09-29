import { Form, usePage } from '@inertiajs/react';
import { Briefcase, DollarSign, FileText, Save } from 'lucide-react';
import { useState } from 'react';
import Combobox from '@/components/combobox';
import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import { Editor } from '@/components/rich-editor';
import Switch from '@/components/switch';
import TagInput from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import currencies from '@/data/currencies';
import { generateSlug } from '@/lib/utils';
import { store, update } from '@/routes/job-circulars';

interface FormProps extends SharedData {
   jobTypes: Record<string, string>;
   workTypes: Record<string, string>;
   experienceLevels: Record<string, string>;
   statuses: Record<string, string>;
}

const JobCircularForm = ({ jobCircular }: { jobCircular?: JobCircular }) => {
   const { props } = usePage<FormProps>();
   const { jobTypes, workTypes, experienceLevels, statuses, translate } = props;
   const { dashboard, input, button } = translate;

   const [data, setData] = useState({
      slug: jobCircular?.slug ?? '',
      description: jobCircular?.description ?? '',
      salary_currency: jobCircular?.salary_currency ?? 'USD',
      salary_negotiable: jobCircular?.salary_negotiable ?? false,
      skills_required: jobCircular?.skills_required ?? [''],
      application_deadline: jobCircular?.application_deadline ?? new Date(),
   });

   const formDefinition = jobCircular
      ? update.form(jobCircular.id)
      : store.form();

   return (
      <Form
         {...formDefinition}
         className="space-y-6 pb-12"
         transform={(formData) => ({ ...formData, ...data })}
         options={{ preserveScroll: true }}
      >
         {({ errors, processing }) => (
            <>
               <Card>
                  <CardHeader className="p-4 sm:p-6">
                     <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {dashboard.basic_information}
                     </CardTitle>
                     <CardDescription>
                        {dashboard.provide_essential_job_details}
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                     <div className="grid gap-4 md:grid-cols-2">
                        <div>
                           <Label>{input.job_title}</Label>
                           <Input
                              name="title"
                              defaultValue={jobCircular?.title ?? ''}
                              onChange={(e) => {
                                 const nextTitle = e.target.value;
                                 setData((prev) => ({
                                    ...prev,
                                    slug: generateSlug(nextTitle),
                                 }));
                              }}
                              placeholder={input.job_title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>

                        <div>
                           <Label>{input.url_slug}</Label>
                           <Input
                              name="slug"
                              value={data.slug}
                              onChange={(e) =>
                                 setData((prev) => ({
                                    ...prev,
                                    slug: e.target.value,
                                 }))
                              }
                              placeholder={input.url_slug_placeholder}
                           />
                           <InputError message={errors.slug} />
                        </div>
                     </div>

                     <div>
                        <Label>{input.job_description}</Label>
                        <Editor
                           ssr={true}
                           output="html"
                           placeholder={{
                              paragraph: input.job_description_placeholder,
                              imageCaption: input.image_url_placeholder,
                           }}
                           contentMinHeight={256}
                           contentMaxHeight={640}
                           initialContent={data.description}
                           onContentChange={(value) =>
                              setData((prev) => ({
                                 ...prev,
                                 description: value as string,
                              }))
                           }
                        />
                        <InputError message={errors.description} />
                     </div>

                     <div className="grid gap-4 md:grid-cols-2">
                        <div>
                           <Label>{input.status}</Label>
                           <Select
                              name="status"
                              defaultValue={jobCircular?.status ?? ''}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(statuses).map(
                                    ([key, label]) => (
                                       <SelectItem key={key} value={key}>
                                          {String(label)}
                                       </SelectItem>
                                    ),
                                 )}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.status} />
                        </div>

                        <div>
                           <Label>{input.contact_email}</Label>
                           <Input
                              type="email"
                              name="contact_email"
                              defaultValue={jobCircular?.contact_email ?? ''}
                              placeholder={input.contact_email_placeholder}
                           />
                           <InputError message={errors.contact_email} />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="p-4 sm:p-6">
                     <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        {dashboard.job_details}
                     </CardTitle>
                     <CardDescription>
                        {dashboard.job_details_title}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                     <div className="grid gap-4 md:grid-cols-4">
                        <div>
                           <Label htmlFor="job_type">{input.job_type}</Label>
                           <Select
                              name="job_type"
                              defaultValue={jobCircular?.job_type ?? ''}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(jobTypes).map(
                                    ([key, label]) => (
                                       <SelectItem key={key} value={key}>
                                          {String(label)}
                                       </SelectItem>
                                    ),
                                 )}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.job_type} />
                        </div>

                        <div>
                           <Label>{input.work_type}</Label>
                           <Select
                              name="work_type"
                              defaultValue={jobCircular?.work_type ?? ''}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(workTypes).map(
                                    ([key, label]) => (
                                       <SelectItem key={key} value={key}>
                                          {String(label)}
                                       </SelectItem>
                                    ),
                                 )}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.work_type} />
                        </div>

                        <div>
                           <Label>{input.experience_level}</Label>
                           <Select
                              name="experience_level"
                              defaultValue={jobCircular?.experience_level ?? ''}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(experienceLevels).map(
                                    ([key, label]) => (
                                       <SelectItem key={key} value={key}>
                                          {String(label)}
                                       </SelectItem>
                                    ),
                                 )}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.experience_level} />
                        </div>

                        <div>
                           <Label>{input.positions_available}</Label>
                           <Input
                              min="1"
                              max="100"
                              type="number"
                              name="positions_available"
                              defaultValue={
                                 jobCircular?.positions_available ?? 1
                              }
                           />
                           <InputError message={errors.positions_available} />
                        </div>
                     </div>

                     <div className="grid gap-4 md:grid-cols-2">
                        <div>
                           <Label>{input.location}</Label>
                           <Input
                              name="location"
                              type="text"
                              defaultValue={jobCircular?.location ?? ''}
                              placeholder={input.location_placeholder}
                           />
                           <InputError message={errors.location} />
                        </div>

                        <div>
                           <Label>{input.application_deadline}</Label>
                           <DateTimePicker
                              date={new Date(data.application_deadline)}
                              setDate={(date) =>
                                 setData((prev) => ({
                                    ...prev,
                                    application_deadline: date ?? new Date(),
                                 }))
                              }
                           />
                           <InputError message={errors.application_deadline} />
                        </div>
                     </div>

                     <div>
                        <Label>{input.skills_required}</Label>
                        <TagInput
                           defaultTags={data.skills_required}
                           placeholder={input.skills_tag_placeholder}
                           onChange={(values: string[]) =>
                              setData((prev) => ({
                                 ...prev,
                                 skills_required: values,
                              }))
                           }
                        />
                        <InputError message={errors.skills_required} />
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="p-4 sm:p-6">
                     <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        {dashboard.salary_information}
                     </CardTitle>
                     <CardDescription>
                        {dashboard.salary_information_title}
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                     <div className="flex items-center space-x-2">
                        <Switch
                           id="salary_negotiable"
                           name="salary_negotiable"
                           defaultChecked={data.salary_negotiable}
                           onCheckedChange={(checked) =>
                              setData((prev) => ({
                                 ...prev,
                                 salary_negotiable: checked,
                              }))
                           }
                        />
                        <Label htmlFor="salary_negotiable" className="mb-0">
                           {input.salary_is_negotiable}
                        </Label>
                     </div>

                     {!data.salary_negotiable && (
                        <div className="grid gap-4 md:grid-cols-3">
                           <div>
                              <Label>{input.currency}</Label>
                              <Combobox
                                 data={currencies}
                                 placeholder={input.currency_placeholder}
                                 defaultValue={data.salary_currency}
                                 onSelect={(selected) =>
                                    setData((prev) => ({
                                       ...prev,
                                       salary_currency: selected.value,
                                    }))
                                 }
                              />
                              <InputError message={errors.salary_currency} />
                           </div>

                           <div>
                              <Label>{input.minimum_salary}</Label>
                              <Input
                                 min="0"
                                 type="number"
                                 name="salary_min"
                                 defaultValue={
                                    jobCircular?.salary_min?.toString() ?? ''
                                 }
                                 placeholder={input.minimum_salary_placeholder}
                              />
                              <InputError message={errors.salary_min} />
                           </div>

                           <div>
                              <Label>{input.maximum_salary}</Label>
                              <Input
                                 min="0"
                                 type="number"
                                 name="salary_max"
                                 defaultValue={
                                    jobCircular?.salary_max?.toString() ?? ''
                                 }
                                 placeholder={input.maximum_salary_placeholder}
                              />
                              <InputError message={errors.salary_max} />
                           </div>
                        </div>
                     )}
                  </CardContent>
               </Card>

               <Button
                  type="submit"
                  disabled={processing}
                  className="float-right mt-2"
               >
                  <Save className="h-4 w-4" />
                  {`${jobCircular ? button.update : button.create} Circular`}
               </Button>
            </>
         )}
      </Form>
   );
};

export default JobCircularForm;
