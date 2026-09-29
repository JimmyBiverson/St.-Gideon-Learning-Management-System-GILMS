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
import { activate, destroy, edit } from '@/routes/marksheet/templates';
import { Link, router } from '@inertiajs/react';
import { Check, ClipboardList, Edit } from 'lucide-react';
import { useState } from 'react';
import MarksheetPreview from './marksheet-preview';

interface MarkSheetCardProps {
   type: 'course' | 'exam';
   template: MarksheetTemplate;
}

const MarkSheetCard = ({ type, template }: MarkSheetCardProps) => {
   const [previewMarksheet, setPreviewMarksheet] =
      useState<MarksheetTemplate | null>(null);

   const handleMarksheetActivate = (templateId: number) => {
      router.post(
         activate(templateId),
         { type },
         {
            preserveScroll: true,
         },
      );
   };

   const handleMarksheetPreview = (template: MarksheetTemplate) => {
      setPreviewMarksheet(template);
   };

   const handleCloseMarksheetPreview = () => {
      setPreviewMarksheet(null);
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
                  <ClipboardList className="h-5 w-5 text-muted-foreground" />
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
                           'Are you sure you want to delete this marksheet template?',
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
                                 handleMarksheetActivate(template.id as number)
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
                  onClick={() => handleMarksheetPreview(template)}
               >
                  <div
                     className="mb-2 text-xs font-bold"
                     style={{ color: template.template_data.primaryColor }}
                  >
                     {template.template_data.headerText}
                  </div>
                  <div
                     className="text-[8px]"
                     style={{ color: template.template_data.secondaryColor }}
                  >
                     {template.template_data.institutionName}
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

         {/* Marksheet Preview Dialog */}
         {previewMarksheet && (
            <Dialog
               open={!!previewMarksheet}
               onOpenChange={(open) => !open && handleCloseMarksheetPreview()}
            >
               <DialogContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-4xl">
                  <ScrollArea className="max-h-[90vh]">
                     <div className="p-6">
                        <DialogHeader className="mb-6">
                           <DialogTitle>
                              Preview: {previewMarksheet?.name}
                           </DialogTitle>
                        </DialogHeader>

                        <MarksheetPreview
                           template={previewMarksheet}
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

export default MarkSheetCard;
