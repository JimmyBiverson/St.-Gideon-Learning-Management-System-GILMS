import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import ELEMENTS_PLACEHOLDERS from '@/frontend/components/editor/sidebar/tabs/components/placeholders/elements';
import LAYOUTS_PLACEHOLDERS from '@/frontend/components/editor/sidebar/tabs/components/placeholders/layouts';

const ComponentsTab = () => {
   return (
      <>
         <div className="p-6 text-left">
            <h3 className="text-lg font-semibold">Components</h3>
            <p className="text-sm text-muted-foreground">
               You can drag and drop components on the canvas.
            </p>
         </div>
         <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['Layout', 'Elements']}
         >
            <AccordionItem value="Layout" className="border-y px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Layout
               </AccordionTrigger>
               <AccordionContent className="flex flex-wrap gap-2">
                  {LAYOUTS_PLACEHOLDERS.map((element) => (
                     <div
                        key={element.id}
                        className="flex flex-col items-center justify-center"
                     >
                        {element.placeholder}
                        <span className="mt-1 text-xs">{element.label}</span>
                     </div>
                  ))}
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Elements" className="px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Elements
               </AccordionTrigger>
               <AccordionContent className="flex flex-wrap gap-2">
                  {ELEMENTS_PLACEHOLDERS.map((element) => (
                     <div
                        key={element.id}
                        className="flex flex-col items-center justify-center"
                     >
                        {element.placeholder}
                        <span className="mt-1 text-xs">{element.label}</span>
                     </div>
                  ))}
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </>
   );
};

export default ComponentsTab;
