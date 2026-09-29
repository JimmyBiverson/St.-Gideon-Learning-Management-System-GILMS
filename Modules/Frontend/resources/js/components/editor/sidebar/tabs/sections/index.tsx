import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { convertPageToEditorElement } from '@/frontend/lib/jsx-to-editor-element';
import sections from './partials/data';

const SectionsTab = () => {
   const { editor, dispatch } = useEditor();
   const [drawerOpen, setDrawerOpen] = useState(false);
   const [sectionComponents, setSectionComponents] = useState(sections);
   const [selectedSection, setSelectedSection] = useState<string | null>(null);

   const handleInsertSection = (
      sectionJSX: React.ReactElement,
      name: string,
   ) => {
      try {
         // Convert JSX section to EditorElement JSON
         const convertedSection = convertPageToEditorElement(sectionJSX);

         // Extract the actual section from the body wrapper
         // convertPageToEditorElement wraps non-body elements in a body
         const sectionElement =
            convertedSection.type === '__body'
               ? (convertedSection.content as EditorElement[])[0]
               : convertedSection;

         // Find the body element in the current editor
         const bodyElement = editor.editor.elements.find(
            (el) => el.type === '__body',
         );

         if (!bodyElement || !Array.isArray(bodyElement.content)) {
            console.error('Body element not found or invalid');

            return;
         }

         // Add section to the end of the body content
         const updatedBody = {
            ...bodyElement,
            content: [...bodyElement.content, sectionElement],
         };

         // Update the body element in the editor
         dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
               elementDetails: updatedBody,
            },
         });
         setDrawerOpen(false);
      } catch (error) {
         console.error(`Failed to insert ${name} section:`, error);
      }
   };

   const sectionHandler = (slug: string, name: string) => {
      const filtered =
         slug === 'all'
            ? sections
            : sections.filter((section) => section.slug === slug);

      setDrawerOpen(true);
      setSectionComponents(filtered);
      setSelectedSection(name);
   };

   return (
      <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
         <DrawerTrigger className="w-full space-y-3 p-5">
            <Button
               variant="ghost"
               onClick={() => sectionHandler('all', 'All Sections')}
               className="flex h-10 w-full items-center justify-between py-0 font-normal capitalize"
            >
               <span>All Sections</span>
               <span>
                  {sections.reduce(
                     (acc, section) => acc + section.elements.length,
                     0,
                  )}
               </span>
            </Button>

            {sections.map((section) => {
               return (
                  <Button
                     key={section.slug}
                     variant="ghost"
                     onClick={() => sectionHandler(section.slug, section.name)}
                     className="flex h-10 w-full items-center justify-between py-0 font-normal capitalize"
                  >
                     <span>{section.name}</span>
                     <span>{section.elements.length}</span>
                  </Button>
               );
            })}
         </DrawerTrigger>

         <DrawerContent className="h-full w-96 rounded-none">
            <div className="z-10 flex items-center justify-between p-5 shadow-card">
               <h6 className="capitalize">{selectedSection}</h6>

               <DrawerClose asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                     <X className="h-5 w-5" />
                  </Button>
               </DrawerClose>
            </div>

            <ScrollArea className="h-[calc(100vh-72px)]">
               <div className="space-y-7 p-5">
                  {sectionComponents.length > 0 ? (
                     sectionComponents.map((component) =>
                        component.elements.map((element) => (
                           <div key={element.id} className="relative">
                              <Badge className="absolute -top-[18px] left-1/2 -translate-x-1/2 rounded-b-none">
                                 {element.name}
                              </Badge>

                              <Card className="group relative overflow-hidden rounded-lg transition-colors duration-200 hover:border-black/30">
                                 <img
                                    src={element.preview}
                                    alt=""
                                    className="w-full"
                                 />
                                 <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black/30 p-5 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <Button
                                       onClick={() =>
                                          handleInsertSection(
                                             element.component,
                                             element.name,
                                          )
                                       }
                                    >
                                       <Plus /> Add
                                    </Button>
                                 </div>
                              </Card>
                           </div>
                        )),
                     )
                  ) : (
                     <div className="p-6 text-center">
                        <h6 className="mb-5">Coming Soon... </h6>
                     </div>
                  )}
               </div>
            </ScrollArea>
         </DrawerContent>
      </Drawer>
   );
};

export default SectionsTab;
