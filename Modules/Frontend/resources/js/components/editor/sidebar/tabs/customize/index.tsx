import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MousePointerClick } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useEditor } from '@/frontend/hooks/use-editor';
import { isTranslatableField } from '@/frontend/hooks/use-translatable-text';
import AccordionSettings from './accordion';
import ButtonSettings from './button';
import Classes from './classes';
import DecorationsSettings from './decorations';
import DimensionsSettings from './dimensions';
import DropdownPopoverSettings from './dropdown-popover-content';
import DynamicWrapperSettings from './dynamic-wrapper';
import IconSettings from './icon';
import ImageSettings from './image';
import InputSettings from './input';
import LabelSettings from './label';
import LayoutSettings from './layout';
import LinkSettings from './link';
import SelectSettings from './select';
import TypographySettings from './typography';
import VideoSettings from './video';

const SettingsTab = () => {
   const { editor, dispatch } = useEditor();

   // Style/layout accordions are read-only while translating a non-default
   // locale — only the "Custom" accordion's translatable text fields stay
   // editable, so every language shares one structure and one look.
   const styleLockClassName = !editor.editor.isDefaultLocale
      ? 'pointer-events-none opacity-50'
      : undefined;

   const handleChangeCustomValues = (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      const settingProperty = e.target.id;
      const value = e.target.value;

      // Non-default locale sessions only ever write to the translation
      // overlay, and only for known-translatable fields — this mirrors
      // useTranslatableText's commit() for the inline canvas fields, kept
      // separate here because these Customize-tab inputs share one generic
      // onChange handler across several unrelated element types.
      if (!editor.editor.isDefaultLocale) {
         if (!isTranslatableField(settingProperty)) {
            return;
         }

         dispatch({
            type: 'SET_TRANSLATION',
            payload: {
               elementId: editor.editor.selectedElement.id,
               field: settingProperty,
               value,
            },
         });

         return;
      }

      const styleObject = {
         [settingProperty]: value,
      };

      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: {
               ...editor.editor.selectedElement,
               content: {
                  ...editor.editor.selectedElement.content,
                  ...styleObject,
               },
            },
         },
      });
   };

   const handleChangeHtmlAttributes = (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      // href/htmlAttributes are out of translation scope entirely (see plan)
      // and must never be mutated from a non-default-locale session.
      if (!editor.editor.isDefaultLocale) {
         return;
      }

      const attributeName = e.target.id;
      const value = e.target.value;

      const updatedElement = {
         ...editor.editor.selectedElement,
         htmlAttributes: {
            ...editor.editor.selectedElement.htmlAttributes,
            [attributeName]: value,
         },
      };

      // For link elements, also update content.href for backward compatibility
      if (
         editor.editor.selectedElement.type === 'link' &&
         attributeName === 'href' &&
         typeof editor.editor.selectedElement.content === 'object' &&
         !Array.isArray(editor.editor.selectedElement.content)
      ) {
         updatedElement.content = {
            ...(editor.editor.selectedElement.content as any),
            href: value,
         };
      }

      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: updatedElement,
         },
      });
   };

   const handleOnChanges = (e: any) => {
      // Styles are locked to the default locale (see styleLockClassName
      // above); this is the data-layer half of that guard.
      if (!editor.editor.isDefaultLocale) {
         return;
      }

      const styleSettings = e.target.id;
      const value = e.target.value;
      const styleObject = {
         [styleSettings]: value,
      };

      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: {
               ...editor.editor.selectedElement,
               styles: {
                  ...editor.editor.selectedElement.styles,
                  ...styleObject,
               },
            },
         },
      });
   };

   if (!editor.editor.selectedElement.id) {
      return (
         <>
            <div className="p-6 text-left">
               <h3 className="text-lg font-semibold">Styles</h3>
               <p className="text-sm text-muted-foreground">
                  Show your creativity! You can customize every component as you
                  like.
               </p>
            </div>
            <div className="my-28 flex items-center justify-center px-6">
               <div className="mx-auto flex w-full max-w-[200px] flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                  <MousePointerClick className="h-6 w-6" />
                  Pick the component you want to customize
               </div>
            </div>
         </>
      );
   }

   return (
      <TooltipProvider delayDuration={300}>
         <div className="p-6 text-left">
            <h3 className="text-lg font-semibold">Styles</h3>
            <p className="text-sm text-muted-foreground">
               You can customize every component as you like.
            </p>
         </div>

         <Accordion
            type="multiple"
            className="w-full"
            defaultValue={[
               'Custom',
               'Typography',
               'Dimensions',
               'Decorations',
               'Layout',
               'Classes',
            ]}
         >
            <AccordionItem value="Classes" className="border-y-[1px] px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Classes
               </AccordionTrigger>
               <AccordionContent
                  className={cn('flex flex-col gap-4', styleLockClassName)}
               >
                  <Classes />
               </AccordionContent>
            </AccordionItem>

            {(editor.editor.selectedElement.type === 'link' ||
               editor.editor.selectedElement.type === 'video' ||
               editor.editor.selectedElement.type === 'image' ||
               editor.editor.selectedElement.type === 'input' ||
               editor.editor.selectedElement.type === 'label' ||
               editor.editor.selectedElement.type === 'button' ||
               editor.editor.selectedElement.type === 'select' ||
               editor.editor.selectedElement.type === 'icon' ||
               editor.editor.selectedElement.type === 'customCode' ||
               editor.editor.selectedElement.type === 'accordion' ||
               editor.editor.selectedElement.type === 'dynamicWrapper' ||
               editor.editor.selectedElement.type === 'dropdownMenuContent' ||
               editor.editor.selectedElement.type === 'popoverContent' ||
               editor.editor.selectedElement.type === 'drawerContent') && (
               <AccordionItem value="Custom" className="px-6 py-0">
                  <AccordionTrigger className="!no-underline">
                     Custom
                  </AccordionTrigger>
                  <AccordionContent>
                     <LinkSettings
                        changeHtmlAttributes={handleChangeHtmlAttributes}
                     />

                     <ImageSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <VideoSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <InputSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <LabelSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <ButtonSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <SelectSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     {(editor.editor.selectedElement.type ===
                        'dropdownMenuContent' ||
                        editor.editor.selectedElement.type ===
                           'popoverContent' ||
                        editor.editor.selectedElement.type ===
                           'drawerContent') && (
                        <DropdownPopoverSettings
                           changeCustomValues={handleChangeCustomValues}
                        />
                     )}

                     <IconSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <DynamicWrapperSettings
                        changeCustomValues={handleChangeCustomValues}
                     />

                     <AccordionSettings />
                  </AccordionContent>
               </AccordionItem>
            )}

            <AccordionItem
               value="Typography"
               className="border-y-[1px] px-6 py-0"
            >
               <AccordionTrigger className="!no-underline">
                  Typography
               </AccordionTrigger>
               <AccordionContent
                  className={cn('flex flex-col gap-4', styleLockClassName)}
               >
                  <TypographySettings onChange={handleOnChanges} />
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Decorations" className="px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Decorations
               </AccordionTrigger>
               <AccordionContent
                  className={cn('flex flex-col gap-4', styleLockClassName)}
               >
                  <DecorationsSettings onChange={handleOnChanges} />
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Layout" className="px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Layout
               </AccordionTrigger>
               <AccordionContent
                  className={cn('flex flex-col gap-4', styleLockClassName)}
               >
                  <LayoutSettings onChange={handleOnChanges} />
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Dimensions" className="border-b-0 px-6 py-0">
               <AccordionTrigger className="!no-underline">
                  Dimensions
               </AccordionTrigger>
               <AccordionContent className={styleLockClassName}>
                  <DimensionsSettings onChange={handleOnChanges} />
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </TooltipProvider>
   );
};

export default SettingsTab;
