import { nanoid } from 'nanoid';
import accordion from './accordion';
import accordionContent from './accordionContent';
import accordionItem from './accordionItem';
import accordionTrigger from './accordionTrigger';
import article from './article';
import aside from './aside';
import button from './button';
import checkbox from './checkbox';
import container from './container';
import customCode from './customCode';
import div from './div';
import drawer from './drawer';
import drawerContent from './drawerContent';
import drawerTrigger from './drawerTrigger';
import dropdownMenu from './dropdownMenu';
import dropdownMenuContent from './dropdownMenuContent';
import dropdownMenuItem from './dropdownMenuItem';
import dropdownMenuLabel from './dropdownMenuLabel';
import dropdownMenuTrigger from './dropdownMenuTrigger';
import dynamicContent from './dynamicContent';
import footer from './footer';
import form from './form';
import header from './header';
import heading from './heading';
import hr from './hr';
import icon from './icon';
import iframe from './iframe';
import image from './image';
import input from './input';
import label from './label';
import li from './li';
import link from './link';
import nav from './nav';
import paragraph from './paragraph';
import popover from './popover';
import popoverContent from './popoverContent';
import popoverTrigger from './popoverTrigger';
import radio from './radio';
import section from './section';
import select from './select';
import span from './span';
import tabs from './tabs';
import tabsContent from './tabsContent';
import tabsList from './tabsList';
import tabsTrigger from './tabsTrigger';
import textarea from './textarea';
import threeCol from './threeCol';
import twoCol from './twoCol';
import ul from './ul';
import video from './video';

/**
 * Recursively regenerate UUIDs for element and nested content
 */
function regenerateIds(element: any): any {
   if (Array.isArray(element)) {
      return element.map((item: any) => regenerateIds(item));
   }

   if (typeof element === 'object' && element !== null) {
      const newElement: any = { ...element };

      // Regenerate ID if present
      if ('id' in newElement) {
         newElement.id = nanoid();
      }

      // Recursively process content if it's an array or object
      if ('content' in newElement) {
         if (Array.isArray(newElement.content)) {
            newElement.content = newElement.content.map((item: any) =>
               regenerateIds(item),
            );
         } else if (
            typeof newElement.content === 'object' &&
            newElement.content !== null
         ) {
            newElement.content = { ...newElement.content };
         }
      }

      return newElement;
   }

   return element;
}

export function getElementData(
   id: string,
   name: keyof typeof elementData,
): any {
   const data = elementData[name];

   // Deep clone and regenerate all UUIDs
   const elementDetails = regenerateIds(data.elementDetails);

   return {
      containerId: id,
      elementDetails,
   };
}

export const elementData = {
   image,
   section,
   container,
   link,
   video,
   input,
   label,
   button,
   heading,
   paragraph,
   span,
   div,
   textarea,
   select,
   checkbox,
   radio,
   form,
   iframe,
   ul,
   li,
   article,
   nav,
   header,
   footer,
   aside,
   hr,
   '2Col': twoCol,
   '3Col': threeCol,
   customCode,
   dynamicContent,
   dynamicWrapper: {
      elementDetails: {
         content: {
            componentRef: '',
            api: '',
         },
         id: nanoid(),
         name: 'Dynamic Wrapper',
         type: 'dynamicWrapper' as const,
         className: '',
         styles: {},
      },
   },

   dropdownMenu,
   dropdownMenuTrigger,
   dropdownMenuContent,
   dropdownMenuLabel,
   dropdownMenuItem,

   popover,
   popoverTrigger,
   popoverContent,

   drawer,
   drawerTrigger,
   drawerContent,

   accordion,
   accordionItem,
   accordionTrigger,
   accordionContent,

   tabs,
   tabsList,
   tabsTrigger,
   tabsContent,

   icon,
};
