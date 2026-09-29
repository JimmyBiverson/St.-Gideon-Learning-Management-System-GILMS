import ActionsDropdown from '@/components/actions-dropdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { activate, destroy, edit } from '@/routes/certificate/templates';
import { Link, router } from '@inertiajs/react';
import { Award, Check, Edit } from 'lucide-react';
import { useState } from 'react';
import CertificatePreview from './certificate-preview';

interface CertificateCardProps {
   type: 'course' | 'exam';
   template: CertificateTemplate;
}

const CertificateCard = ({ type, template }: CertificateCardProps) => {
   const [previewTemplate, setPreviewTemplate] =
      useState<CertificateTemplate | null>(null);

   const handleActivate = (templateId: number) => {
      router.post(
         activate(templateId),
         { type },
         {
            preserveScroll: true,
         },
      );
   };

   const handlePreview = (template: CertificateTemplate) => {
      setPreviewTemplate(template);
   };

   const handleClosePreview = () => {
      setPreviewTemplate(null);
   };

   return (
      <>
         <Card
            key={template.id}
            className={cn(
               'relative space-y-6 py-4 md:py-6',
               template.is_active
                  ? 'ring-2 ring-foreground'
                  : 'hover:ring-1 hover:ring-foreground',
            )}
         >
            <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6">
               <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  {template.name}
                  {template.is_active && (
                     <Badge variant="default" className="rounded-full">
                        <Check className="mr-1 h-3 w-3" />
                        Active
                     </Badge>
                  )}
               </CardTitle>

               <ActionsDropdown
                  routes={[
                     {
                        label: 'Delete',
                        method: 'delete',
                        route: destroy.url(template.id as number),
                        message:
                           'Are you sure you want to delete this certificate template?',
                     },
                  ]}
                  component={
                     <>
                        {!template.is_active && (
                           <Button
                              size="sm"
                              variant="ghost"
                              className="w-full justify-start has-[svg]:!px-2"
                              onClick={() =>
                                 handleActivate(template.id as number)
                              }
                           >
                              <Check size={15} />
                              Activate
                           </Button>
                        )}
                        <Button
                           asChild
                           size="sm"
                           variant="ghost"
                           className="w-full justify-start has-[svg]:!px-2"
                        >
                           <Link href={edit(template.id)}>
                              <Edit size={15} />
                              Edit
                           </Link>
                        </Button>
                     </>
                  }
               />
            </CardHeader>

            <CardContent className="space-y-4 px-4 md:px-6">
               {/* Mini Preview */}
               <div
                  className="cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:shadow-md"
                  style={{
                     backgroundColor: template.template_data.backgroundColor,
                     borderColor: template.template_data.borderColor,
                  }}
                  onClick={() => handlePreview(template)}
               >
                  <div
                     className="mb-2 text-xs font-bold"
                     style={{ color: template.template_data.primaryColor }}
                  >
                     {template.template_data.titleText}
                  </div>
                  <div
                     className="text-[8px]"
                     style={{ color: template.template_data.secondaryColor }}
                  >
                     {template.template_data.descriptionText}
                  </div>
               </div>

               {/* Color Indicators */}
               <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                     <div
                        className="h-4 w-4 rounded border"
                        style={{
                           backgroundColor: template.template_data.primaryColor,
                        }}
                     />
                     <span className="text-xs">Primary</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div
                        className="h-4 w-4 rounded border"
                        style={{
                           backgroundColor:
                              template.template_data.secondaryColor,
                        }}
                     />
                     <span className="text-xs">Secondary</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Preview Dialog */}
         {previewTemplate && (
            <Dialog
               open={!!previewTemplate}
               onOpenChange={(open) => !open && handleClosePreview()}
            >
               <DialogContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-3xl">
                  <ScrollArea className="max-h-[90vh]">
                     <div className="p-6">
                        <DialogHeader className="mb-6">
                           <DialogTitle>
                              Preview: {previewTemplate?.name}
                           </DialogTitle>
                        </DialogHeader>

                        <CertificatePreview
                           template={previewTemplate}
                           studentName="John Doe"
                           courseName="Sample Course Name"
                           completionDate="January 1, 2025"
                        />
                     </div>
                  </ScrollArea>
               </DialogContent>
            </Dialog>
         )}
      </>
   );
};

export default CertificateCard;
