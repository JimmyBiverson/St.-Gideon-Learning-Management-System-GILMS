import Tabs from '@/components/tabs';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import ResourceForm from './forms/resource-form';
import ResourceList from './resource-list';

interface Props {
   title: string;
   handler: React.ReactNode;
   lesson: SectionLesson;
   resource?: LessonResource;
}

const ResourceModal = ({ title, handler, lesson }: Props) => {
   const [open, setOpen] = useState(false);
   const [tab, setTab] = useState('list');

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="h-11 w-full">
                     <TabsTrigger value="list" className="h-9 w-full">
                        Resource List
                     </TabsTrigger>
                     <TabsTrigger value="add" className="h-9 w-full">
                        Add Resource
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="cursor-default">
                     <ResourceList lesson={lesson} setOpen={setOpen} />
                  </TabsContent>

                  <TabsContent value="add" className="space-y-4 p-0.5">
                     <ResourceForm
                        lesson={lesson}
                        setTab={setTab}
                        setIsOpen={setOpen}
                     />
                  </TabsContent>
               </Tabs>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default ResourceModal;
