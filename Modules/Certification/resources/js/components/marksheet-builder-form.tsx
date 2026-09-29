import InputError from '@/components/input-error';
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
import { Textarea } from '@/components/ui/textarea';
import { store, update } from '@/routes/marksheet/templates';
import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useState } from 'react';
import MarksheetPreview from './marksheet-preview';

const MarksheetBuilderForm = ({
   template,
}: {
   template?: MarksheetTemplate | null;
}) => {
   const [logoPreview, setLogoPreview] = useState(template?.logo_path);

   const [type, setType] = useState<string>(template?.type || 'course');
   const [name, setName] = useState<string>(
      template?.name || 'My Marksheet Template',
   );
   const [templateData, setTemplateData] = useState(
      template?.template_data || {
         primaryColor: '#1e40af',
         secondaryColor: '#475569',
         backgroundColor: '#ffffff',
         borderColor: '#2563eb',
         headerText: 'Course Marksheet',
         institutionName: 'Institute Name',
         footerText: 'This is an official marksheet',
         fontFamily: 'sans-serif',
      },
   );
   const formDefinition = template
      ? update.form({ id: template.id })
      : store.form();

   return (
      <Form
         {...formDefinition}
         transform={(formData) => ({
            ...formData,
            type,
            name,
            template_data: templateData,
         })}
         options={{ preserveScroll: true }}
         className="grid gap-6 lg:grid-cols-2"
      >
         {({ processing, errors }) => (
            <>
               {/* Form Section */}
               <div className="space-y-6">
                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Set the template name</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="type">Template Type</Label>
                           <Select
                              name="type"
                              value={type}
                              onValueChange={(value) =>
                                 setType(value as string)
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Select template type" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="course">Course</SelectItem>
                                 {/* <SelectItem value="exam">Exam</SelectItem> */}
                              </SelectContent>
                           </Select>
                           {errors.type && (
                              <p className="text-sm text-red-500">
                                 {errors.type as string}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="name">Template Name</Label>
                           <Input
                              id="name"
                              name="name"
                              defaultValue={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g., Modern Blue Marksheet"
                           />
                           {errors.name && (
                              <p className="text-sm text-red-500">
                                 {errors.name as string}
                              </p>
                           )}
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Logo & Branding</CardTitle>
                        <CardDescription>
                           Upload your institution logo
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="logo">Logo Image</Label>
                           <div className="space-y-2">
                              {logoPreview && (
                                 <div className="h-20 w-20 overflow-hidden rounded border">
                                    <img
                                       src={logoPreview}
                                       alt="Logo preview"
                                       className="h-full w-full object-contain"
                                    />
                                 </div>
                              )}
                              <div className="flex-1">
                                 <Input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                       const file = e.target.files?.[0];

                                       if (file) {
                                          setLogoPreview(
                                             URL.createObjectURL(file),
                                          );
                                       }
                                    }}
                                 />
                              </div>
                           </div>
                           <p className="text-xs text-muted-foreground">
                              Recommended: PNG or SVG, max 1MB
                           </p>
                           <InputError message={errors.logo as string} />
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Colors</CardTitle>
                        <CardDescription>
                           Customize the marksheet color scheme
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="primaryColor">
                                 Primary Color
                              </Label>
                              <div className="flex gap-2">
                                 <Input
                                    id="primaryColor"
                                    name="template_data[primaryColor]"
                                    type="color"
                                    value={templateData.primaryColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          primaryColor: e.target.value,
                                       }))
                                    }
                                    className="h-10 w-16"
                                 />
                                 <Input
                                    name="template_data[primaryColor]"
                                    value={templateData.primaryColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          primaryColor: e.target.value,
                                       }))
                                    }
                                    placeholder="#1e40af"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="secondaryColor">
                                 Secondary Color
                              </Label>
                              <div className="flex gap-2">
                                 <Input
                                    id="secondaryColor"
                                    name="template_data[secondaryColor]"
                                    type="color"
                                    value={templateData.secondaryColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          secondaryColor: e.target.value,
                                       }))
                                    }
                                    className="h-10 w-16"
                                 />
                                 <Input
                                    name="template_data[secondaryColor]"
                                    value={templateData.secondaryColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          secondaryColor: e.target.value,
                                       }))
                                    }
                                    placeholder="#475569"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="backgroundColor">
                                 Background Color
                              </Label>
                              <div className="flex gap-2">
                                 <Input
                                    id="backgroundColor"
                                    name="template_data[backgroundColor]"
                                    type="color"
                                    value={templateData.backgroundColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          backgroundColor: e.target.value,
                                       }))
                                    }
                                    className="h-10 w-16"
                                 />
                                 <Input
                                    name="template_data[backgroundColor]"
                                    value={templateData.backgroundColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          backgroundColor: e.target.value,
                                       }))
                                    }
                                    placeholder="#ffffff"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="borderColor">Border Color</Label>
                              <div className="flex gap-2">
                                 <Input
                                    id="borderColor"
                                    name="template_data[borderColor]"
                                    type="color"
                                    value={templateData.borderColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          borderColor: e.target.value,
                                       }))
                                    }
                                    className="h-10 w-16"
                                 />
                                 <Input
                                    name="template_data[borderColor]"
                                    value={templateData.borderColor}
                                    onChange={(e) =>
                                       setTemplateData((prev) => ({
                                          ...prev,
                                          borderColor: e.target.value,
                                       }))
                                    }
                                    placeholder="#2563eb"
                                 />
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Typography</CardTitle>
                        <CardDescription>
                           Choose the font style for your marksheet
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-2">
                           <Label htmlFor="fontFamily">Font Family</Label>
                           <Select
                              name="template_data[fontFamily]"
                              value={templateData.fontFamily}
                              onValueChange={(value) =>
                                 setTemplateData((prev) => ({
                                    ...prev,
                                    fontFamily: value,
                                 }))
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="serif">
                                    Serif (Classic)
                                 </SelectItem>
                                 <SelectItem value="sans-serif">
                                    Sans Serif (Modern)
                                 </SelectItem>
                                 <SelectItem value="monospace">
                                    Monospace (Technical)
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Marksheet Content</CardTitle>
                        <CardDescription>
                           Customize the text content of your marksheet
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="headerText">Header Text</Label>
                           <Input
                              id="headerText"
                              name="template_data[headerText]"
                              value={templateData.headerText}
                              onChange={(e) =>
                                 setTemplateData((prev) => ({
                                    ...prev,
                                    headerText: e.target.value,
                                 }))
                              }
                              placeholder="Course Marksheet"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="institutionName">
                              Institution Name
                           </Label>
                           <Input
                              id="institutionName"
                              name="template_data[institutionName]"
                              value={templateData.institutionName}
                              onChange={(e) =>
                                 setTemplateData((prev) => ({
                                    ...prev,
                                    institutionName: e.target.value,
                                 }))
                              }
                              placeholder="Institute Name"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="footerText">Footer Text</Label>
                           <Textarea
                              id="footerText"
                              name="template_data[footerText]"
                              value={templateData.footerText}
                              onChange={(e) =>
                                 setTemplateData((prev) => ({
                                    ...prev,
                                    footerText: e.target.value,
                                 }))
                              }
                              placeholder="This is an official marksheet"
                              rows={3}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  <Button
                     type="submit"
                     disabled={processing}
                     className="w-full"
                  >
                     <Save className="mr-2 h-4 w-4" />
                     {processing
                        ? 'Saving...'
                        : template
                          ? 'Update Template'
                          : 'Create Template'}
                  </Button>
               </div>

               {/* Preview Section */}
               <div className="lg:sticky lg:top-6">
                  <Card className="py-6">
                     <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>
                           See how your marksheet will look
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <MarksheetPreview
                           template={
                              {
                                 type,
                                 name,
                                 logo: null,
                                 template_data: templateData,
                              } as any
                           }
                           studentName="John Doe"
                           courseName="Sample Course Name"
                           completionDate="January 1, 2025"
                           logoUrl={logoPreview}
                        />
                     </CardContent>
                  </Card>
               </div>
            </>
         )}
      </Form>
   );
};

export default MarksheetBuilderForm;
