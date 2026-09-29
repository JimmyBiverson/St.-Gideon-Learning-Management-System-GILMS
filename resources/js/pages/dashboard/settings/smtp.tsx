import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update as smtpUpdate } from '@/routes/smtp';

type SmtpFormData = SmtpFields & Record<string, string>;

interface Props extends SharedData {
   smtp: Settings<SmtpFormData>;
}

const SMTP = ({ smtp }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button } = translate;

   return (
      <>
         <Breadcrumbs
            title={settings.smtp_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'SMTP Settings' },
            ]}
            className="mb-4"
         />

         <div className="md:px-3">
            <Card className="p-4 sm:p-6">
               <Form
                  {...smtpUpdate.form(Number(smtp.id))}
                  transform={(formData) => ({ ...smtp.fields, ...formData })}
                  options={{ preserveScroll: true }}
                  className="space-y-6"
               >
                  {({ processing, errors }) => (
                     <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                           <div>
                              <Label>{input.mail_driver} *</Label>
                              <Select
                                 name="mail_mailer"
                                 defaultValue={smtp.fields.mail_mailer}
                              >
                                 <SelectTrigger>
                                    <SelectValue
                                       placeholder={input.select_option}
                                    />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="smtp">SMTP</SelectItem>
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.mail_mailer} />
                           </div>

                           <div>
                              <Label>{input.mail_host} *</Label>
                              <Input
                                 name="mail_host"
                                 defaultValue={smtp.fields.mail_host || ''}
                                 placeholder={input.mail_host_placeholder}
                              />
                              <InputError message={errors.mail_host} />
                           </div>

                           <div>
                              <Label>{input.mail_port} *</Label>
                              <Input
                                 name="mail_port"
                                 defaultValue={smtp.fields.mail_port || ''}
                                 placeholder={input.mail_port_placeholder}
                              />
                              <InputError message={errors.mail_port} />
                           </div>

                           <div>
                              <Label>{input.mail_encryption}</Label>
                              <Select
                                 name="mail_encryption"
                                 defaultValue={smtp.fields.mail_encryption}
                              >
                                 <SelectTrigger>
                                    <SelectValue
                                       placeholder={input.select_option}
                                    />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="tls">TLS</SelectItem>
                                    <SelectItem value="ssl">SSL</SelectItem>
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.mail_encryption} />
                           </div>

                           <div>
                              <Label>{input.mail_username} *</Label>
                              <Input
                                 name="mail_username"
                                 defaultValue={smtp.fields.mail_username || ''}
                                 placeholder={input.mail_username_placeholder}
                              />
                              <InputError message={errors.mail_username} />
                           </div>

                           <div>
                              <Label>{input.mail_password} *</Label>
                              <Input
                                 name="mail_password"
                                 defaultValue={smtp.fields.mail_password || ''}
                                 placeholder={input.mail_password_placeholder}
                                 type="password"
                              />
                              <InputError message={errors.mail_password} />
                           </div>

                           <div>
                              <Label>{input.mail_from_address} *</Label>
                              <Input
                                 name="mail_from_address"
                                 defaultValue={
                                    smtp.fields.mail_from_address || ''
                                 }
                                 placeholder={
                                    input.mail_from_address_placeholder
                                 }
                              />
                              <InputError message={errors.mail_from_address} />
                           </div>

                           <div>
                              <Label>{input.mail_from_name} *</Label>
                              <Input
                                 name="mail_from_name"
                                 defaultValue={smtp.fields.mail_from_name || ''}
                                 placeholder={input.mail_from_name_placeholder}
                              />
                              <InputError message={errors.mail_from_name} />
                           </div>
                        </div>

                        <LoadingButton
                           loading={processing}
                           className="float-end"
                        >
                           {button.save_changes}
                        </LoadingButton>
                     </>
                  )}
               </Form>
            </Card>
         </div>
      </>
   );
};

SMTP.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SMTP;
