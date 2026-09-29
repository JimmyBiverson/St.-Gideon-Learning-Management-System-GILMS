import type { elementData } from './element-data';
import { getElementData } from './element-data';

type ElementDataKey = keyof typeof elementData;

export const addElement = (
   componentType: EditorBtns,
   id: string,
   dispatch: (value: EditorAction) => void,
) => {
   if (!componentType) {
      return;
   }

   // All element types use the same pattern - just dispatch with element data
   const elementDataMap: Record<Exclude<EditorBtns, null>, ElementDataKey> = {
      // Layouts
      container: 'container',
      section: 'section',
      __body: 'container',
      '2Col': '2Col',
      '3Col': '3Col',
      // Text Elements
      heading: 'heading',
      paragraph: 'paragraph',
      span: 'span',
      // Media Elements
      image: 'image',
      video: 'video',
      iframe: 'iframe',
      icon: 'icon',
      // Form Elements
      input: 'input',
      textarea: 'textarea',
      select: 'select',
      checkbox: 'checkbox',
      radio: 'radio',
      button: 'button',
      label: 'label',
      form: 'form',
      // Link
      link: 'link',
      // List
      ul: 'ul',
      li: 'li',
      // Dynamic Elements
      customCode: 'customCode',
      dynamicContent: 'dynamicContent',
      dynamicWrapper: 'dynamicWrapper',
      // Semantic Elements
      article: 'article',
      nav: 'nav',
      header: 'header',
      footer: 'footer',
      aside: 'aside',
      // Other Elements
      div: 'div',
      hr: 'hr',
      // Dropdown Menu
      dropdownMenu: 'dropdownMenu',
      dropdownMenuTrigger: 'dropdownMenuTrigger',
      dropdownMenuContent: 'dropdownMenuContent',
      dropdownMenuLabel: 'dropdownMenuLabel',
      dropdownMenuItem: 'dropdownMenuItem',
      // Popover
      popover: 'popover',
      popoverTrigger: 'popoverTrigger',
      popoverContent: 'popoverContent',
      // Drawer
      drawer: 'drawer',
      drawerTrigger: 'drawerTrigger',
      drawerContent: 'drawerContent',
      // Accordion
      accordion: 'accordion',
      accordionItem: 'accordionItem',
      accordionTrigger: 'accordionTrigger',
      accordionContent: 'accordionContent',
      // Tabs
      tabs: 'tabs',
      tabsList: 'tabsList',
      tabsTrigger: 'tabsTrigger',
      tabsContent: 'tabsContent',
   };

   const dataKey = elementDataMap[componentType];

   if (dataKey) {
      dispatch({
         type: 'ADD_ELEMENT',
         payload: getElementData(id, dataKey),
      });
   }
};
