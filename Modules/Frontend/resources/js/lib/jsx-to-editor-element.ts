import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import type { ReactElement } from 'react';
import React from 'react';
import { elementData } from '@/frontend/lib/element-data';

/**
 * Convert EditorElement array back to serialized JSON format
 * This is the reverse of deserializeToReact - used to persist changes
 * made to nested editor elements inside DynamicContent
 */
export const editorElementsToSerializedJson = (
   elements: EditorElement[],
): any[] => {
   return elements.map((element) => {
      // Return the element wrapped in the __editor_element__ marker
      // This matches the format used by serializeReactElement
      return {
         type: '__editor_element__',
         element: element,
      };
   });
};

// Component name to EditorElement type mapping
const componentTypeMap: Record<string, EditorBtns> = {
   EditorBody: '__body',
   EditorButton: 'button',
   EditorParagraph: 'paragraph',
   EditorHeading: 'heading',
   EditorLink: 'link',
   EditorSpan: 'span',
   EditorDiv: 'div',
   EditorSection: 'section',
   EditorContainer: 'container',
   EditorHeader: 'header',
   EditorFooter: 'footer',
   EditorNav: 'nav',
   EditorArticle: 'article',
   EditorAside: 'aside',
   EditorForm: 'form',
   EditorList: 'ul',
   EditorListItem: 'li',
   EditorInput: 'input',
   EditorTextarea: 'textarea',
   EditorSelect: 'select',
   EditorCheckbox: 'checkbox',
   EditorRadio: 'radio',
   EditorLabel: 'label',
   EditorImage: 'image',
   EditorVideo: 'video',
   EditorIframe: 'iframe',
   EditorHr: 'hr',
   EditorCustomCode: 'customCode',
   EditorDynamicContent: 'dynamicContent',
   EditorDynamicWrapper: 'dynamicWrapper',
   EditorIcon: 'icon',
   // Dropdown Menu
   EditorDropdownMenu: 'dropdownMenu',
   EditorDropdownMenuTrigger: 'dropdownMenuTrigger',
   EditorDropdownMenuContent: 'dropdownMenuContent',
   EditorDropdownMenuLabel: 'dropdownMenuLabel',
   EditorDropdownMenuItem: 'dropdownMenuItem',
   // Popover
   EditorPopover: 'popover',
   EditorPopoverTrigger: 'popoverTrigger',
   EditorPopoverContent: 'popoverContent',
   // Drawer
   EditorDrawer: 'drawer',
   EditorDrawerTrigger: 'drawerTrigger',
   EditorDrawerContent: 'drawerContent',
   // Accordion
   EditorAccordion: 'accordion',
   EditorAccordionItem: 'accordionItem',
   EditorAccordionTrigger: 'accordionTrigger',
   EditorAccordionContent: 'accordionContent',
   // Tabs
   EditorTabs: 'tabs',
   EditorTabsList: 'tabsList',
   EditorTabsTrigger: 'tabsTrigger',
   EditorTabsContent: 'tabsContent',
};

// Get friendly name from component type
const getElementName = (componentName: string): string => {
   const nameMap: Record<string, string> = {
      EditorBody: 'Body',
      EditorButton: 'Button',
      EditorParagraph: 'Paragraph',
      EditorText: 'Text',
      EditorHeading: 'Heading',
      EditorLink: 'Link',
      EditorSpan: 'Span',
      EditorDiv: 'Div',
      EditorSection: 'Section',
      EditorContainer: 'Container',
      EditorHeader: 'Header',
      EditorFooter: 'Footer',
      EditorNav: 'Nav',
      EditorArticle: 'Article',
      EditorAside: 'Aside',
      EditorCustomCode: 'Custom Code',
      EditorDynamicContent: 'Dynamic Content',
      EditorDynamicWrapper: 'Dynamic Wrapper',
      EditorForm: 'Form',
      EditorList: 'List',
      EditorListItem: 'ListItem',
      EditorInput: 'Input',
      EditorTextarea: 'Textarea',
      EditorSelect: 'Select',
      EditorCheckbox: 'Checkbox',
      EditorRadio: 'Radio',
      EditorLabel: 'Label',
      EditorImage: 'Image',
      EditorVideo: 'Video',
      EditorIframe: 'Iframe',
      EditorHr: 'Hr',
      // Dropdown Menu
      EditorDropdownMenu: 'Dropdown Menu',
      EditorDropdownMenuTrigger: 'Dropdown Trigger',
      EditorDropdownMenuContent: 'Dropdown Content',
      EditorDropdownMenuLabel: 'Dropdown Label',
      EditorDropdownMenuItem: 'Dropdown Item',
      // Popover
      EditorPopover: 'Popover',
      EditorPopoverTrigger: 'Popover Trigger',
      EditorPopoverContent: 'Popover Content',
      // Drawer
      EditorDrawer: 'Drawer',
      EditorDrawerTrigger: 'Drawer Trigger',
      EditorDrawerContent: 'Drawer Content',
      // Accordion
      EditorAccordion: 'Accordion',
      EditorAccordionItem: 'Accordion Item',
      EditorAccordionTrigger: 'Accordion Trigger',
      EditorAccordionContent: 'Accordion Content',
      // Tabs
      EditorTabs: 'Tabs',
      EditorTabsList: 'Tabs List',
      EditorTabsTrigger: 'Tabs Trigger',
      EditorTabsContent: 'Tabs Content',
   };

   return nameMap[componentName] || componentName;
};

/**
 * Get default className and styles from element-data definitions
 */
const getElementDefaults = (
   elementType: EditorBtns,
): { className: string; styles: React.CSSProperties } => {
   // Map element types to their data keys (handle special cases)
   const dataKey = elementType as keyof typeof elementData;
   const elementDef = elementData[dataKey];

   if (elementDef && 'elementDetails' in elementDef) {
      return {
         className: elementDef.elementDetails.className || '',
         styles: elementDef.elementDetails.styles || {},
      };
   }

   return { className: '', styles: {} };
};

// Container elements that accept children
const containerElements = [
   'section',
   'container',
   'div',
   'header',
   'footer',
   'nav',
   'article',
   'aside',
   'form',
   'ul',
   'li',
   '__body',
   '2Col',
   '3Col',
   'link', // Links can contain other elements like buttons
   'dynamicContent', // Custom wrapper that accepts editable children
   // NOTE: dynamicWrapper is NOT a container - it stores component refs, not children
   // Dropdown Menu containers
   'dropdownMenu',
   'dropdownMenuContent',
   // Popover containers
   'popover',
   'popoverContent',
   // Drawer containers
   'drawer',
   'drawerContent',
   // Accordion containers
   'accordion',
   'accordionItem',
   'accordionContent',
   'accordionTrigger',
   // Trigger elements (can contain children like accordionTrigger)
   'dropdownMenuTrigger',
   'popoverTrigger',
   'drawerTrigger',
   'tabsTrigger',
   // Tabs containers
   'tabs',
   'tabsList',
   'tabsContent',
];

// Serialize React element to JSON (like CustomCode does)
// Returns either serialized JSON or an EditorElement if it's an editor component
const serializeReactElement = (
   node: any,
   allowMixedContent: boolean = false,
): any => {
   if (typeof node === 'string' || typeof node === 'number') {
      return { type: '__text__', value: String(node) };
   }

   if (!node) {
      return null;
   }

   if (Array.isArray(node)) {
      return node
         .map((n) => serializeReactElement(n, allowMixedContent))
         .filter(Boolean);
   }

   if (typeof node === 'object' && node.type) {
      const componentName =
         typeof node.type === 'function'
            ? (node.type as any).displayName ||
              node.type.name ||
              '__anonymous__'
            : String(node.type);

      // Check if this is an editor component that should remain editable
      if (allowMixedContent && componentTypeMap[componentName]) {
         // This is an editor element - convert it properly instead of serializing
         const converted = jsxToEditorElement(node);

         if (converted) {
            // Return a special marker so we know this is an EditorElement
            return { type: '__editor_element__', element: converted };
         }
      }

      const props = node.props || {};
      const { children: nodeChildren, ...restProps } = props;

      return {
         type: componentName,
         props: restProps,
         children: nodeChildren
            ? serializeReactElement(nodeChildren, allowMixedContent)
            : null,
      };
   }

   return null;
};

// Convert JSX children to EditorElement content
const convertChildren = (
   children: React.ReactNode,
   allowMixedContent: boolean = false,
): EditorElement[] | { innerText: string } | Record<string, any> => {
   if (!children) {
      return [];
   }

   // Handle string children (text content)
   if (typeof children === 'string') {
      return { innerText: children };
   }

   // Handle array of children
   if (Array.isArray(children)) {
      const elements: EditorElement[] = [];
      children.forEach((child) => {
         if (typeof child === 'string') {
            // Skip empty strings
            if (child.trim()) {
               elements.push({
                  id: nanoid(),
                  name: 'Span',
                  type: 'span',
                  styles: {},
                  className: '',
                  content: { innerText: child },
               });
            }
         } else if (React.isValidElement(child)) {
            const converted = jsxToEditorElement(child);

            // If conversion succeeded, use it
            if (converted) {
               elements.push(converted);
            } else if (allowMixedContent) {
               const serialized = serializeReactElement(child, true);
               elements.push({
                  id: nanoid(),
                  name: 'Custom Code',
                  type: 'customCode',
                  styles: {},
                  className: '',
                  content: {
                     code: JSON.stringify(serialized),
                  },
               });
            }
         }
      });

      return elements;
   }

   // Handle single React element
   if (React.isValidElement(children)) {
      const converted = jsxToEditorElement(children);

      if (converted) {
         return [converted];
      }

      // If conversion failed and mixed content is allowed, serialize as customCode
      if (allowMixedContent) {
         const serialized = serializeReactElement(children);

         return [
            {
               id: nanoid(),
               name: 'Custom Code',
               type: 'customCode',
               styles: {},
               className: '',
               content: {
                  code: JSON.stringify(serialized),
               },
            },
         ];
      }

      return [];
   }

   return [];
};

/**
 * Convert a JSX element to EditorElement structure
 * Automatically generates UUIDs for each element
 */
export const jsxToEditorElement = (
   element: ReactElement,
): EditorElement | null => {
   if (!element || !element.type) {
      return null;
   }

   const componentName =
      typeof element.type === 'function'
         ? (element.type as any).displayName || element.type.name
         : String(element.type);
   const elementType = componentTypeMap[componentName];

   if (!elementType) {
      console.warn(`Unknown component type: ${componentName}`);

      return null;
   }

   const props = (element.props || {}) as any;
   const { className, styles, children, ...otherProps } = props;

   // Determine if this is a container element
   const isContainer = containerElements.includes(elementType);

   // Extract special attributes that need to be stored in htmlAttributes
   const htmlAttributes: Record<string, any> = {};

   // Extract event handlers (onClick, onMouseEnter, etc.)
   const eventHandlers: Record<string, any> = {};
   Object.keys(otherProps).forEach((key) => {
      if (key.startsWith('on') && typeof otherProps[key] === 'function') {
         // Convert function to string for serialization
         const funcString = otherProps[key].toString();
         eventHandlers[key] = funcString;
      }
   });

   // Store event handlers in htmlAttributes
   if (Object.keys(eventHandlers).length > 0) {
      htmlAttributes.eventHandlers = eventHandlers;
   }

   // Extract link-specific attributes
   if (elementType === 'link') {
      if (otherProps.href) {
         htmlAttributes.href = otherProps.href;
      }

      if (otherProps.type) {
         htmlAttributes.type = otherProps.type;
      }
   }

   // Build content based on element type
   let content: EditorElement['content'];

   if (isContainer) {
      // Container elements have array content
      // DynamicContent allows mixed content (editor elements + raw HTML/React)
      const allowMixedContent = elementType === 'dynamicContent';
      const childContent = convertChildren(children, allowMixedContent);

      // Convert childContent to array format
      let childArray: EditorElement[] = [];

      if (Array.isArray(childContent)) {
         childArray = childContent;
      } else if (
         childContent &&
         typeof childContent === 'object' &&
         'innerText' in childContent
      ) {
         // If convertChildren returned { innerText: 'text' }, wrap it in a span element
         childArray = [
            {
               id: nanoid(),
               name: 'Span',
               type: 'span',
               styles: {},
               className: '',
               content: childContent,
            },
         ];
      }

      // Special handling for dropdownMenuContent, popoverContent, and drawerContent
      // They need { placement, children } structure instead of plain array
      if (
         elementType === 'dropdownMenuContent' ||
         elementType === 'popoverContent' ||
         elementType === 'drawerContent'
      ) {
         content = {
            placement: otherProps.placement || 'left',
            children: childArray,
         };
      } else {
         content = childArray;
      }
   } else {
      // Non-container elements
      switch (elementType) {
         case 'paragraph':
         case 'span':
            content =
               typeof children === 'string'
                  ? { innerText: children }
                  : { innerText: '' };
            break;

         case 'heading':
            content = {
               innerText: typeof children === 'string' ? children : 'Heading',
               level: otherProps.level || 'h2',
            };
            break;

         case 'link':
            content = {
               innerText: typeof children === 'string' ? children : 'Link',
               href: otherProps.href || '#', // Also store in content for backward compatibility
            };
            break;

         case 'button':
            content = {
               innerText: typeof children === 'string' ? children : 'Button',
               buttonType: otherProps.buttonType || 'button',
            };
            break;

         case 'input':
            content = {
               placeholder: otherProps.placeholder || 'Enter text...',
               inputType: otherProps.inputType || 'text',
               name: otherProps.name || '',
               value: otherProps.value || '',
            };
            break;

         case 'textarea':
            content = {
               placeholder: otherProps.placeholder || 'Enter text...',
               name: otherProps.name || '',
            };
            break;

         case 'select':
            content = {
               name: otherProps.name || '',
               options: otherProps.options || [],
            };
            break;

         case 'label':
            content = {
               innerText: typeof children === 'string' ? children : 'Label',
               htmlFor: otherProps.htmlFor || '',
            };
            break;

         case 'image':
            content = {
               src: otherProps.src || '',
               alt: otherProps.alt || 'Image',
            };
            break;

         case 'video':
            content = {
               src: otherProps.src || '',
            };
            break;

         case 'iframe':
            content = {
               src: otherProps.src || '',
            };
            break;

         case 'checkbox':
         case 'radio':
            content = {
               label: typeof children === 'string' ? children : 'Checkbox',
               checked: otherProps.checked || false,
               name: otherProps.name || '',
            };
            break;

         case 'customCode': {
            // CustomCode preserves React components for live rendering
            // Serialize React element tree to JSON for storage and re-rendering
            // (serializeReactElement function is defined at module level)
            const serialized = serializeReactElement(children);
            content = {
               code:
                  otherProps.code ||
                  JSON.stringify(serialized) ||
                  '{"type":"__text__","value":"Custom Code Block"}',
            };
            break;
         }

         case 'dynamicWrapper': {
            // DynamicWrapper stores reference to component or API endpoint
            // Does NOT serialize children - preserves full React functionality
            content = {
               componentRef: otherProps.componentRef || '',
               api: otherProps.api || '',
               apiMethod: otherProps.apiMethod || 'GET',
               apiParams: otherProps.apiParams || {},
            };
            break;
         }

         case 'icon':
            content = {
               icon: otherProps.name || 'star',
            };
            break;

         case 'dropdownMenuTrigger':
         case 'popoverTrigger':
         case 'tabsTrigger':
            // These triggers should have innerText content, not children
            // Extract text from children if available
            content = {
               innerText: typeof children === 'string' ? children : 'Trigger',
            };
            break;

         case 'dropdownMenuLabel':
         case 'dropdownMenuItem':
            // Labels and items should have innerText content
            content = {
               innerText: typeof children === 'string' ? children : 'Item',
            };
            break;

         default:
            content = {};
      }
   }

   // Get default className and styles from element-data
   const defaults = getElementDefaults(elementType);

   // Merge JSX className with defaults (JSX classes come after defaults)
   const mergedClassName = cn(defaults.className, className || '');

   // Merge JSX styles with defaults (JSX styles override defaults)
   const mergedStyles = {
      ...defaults.styles,
      ...(styles || {}),
   };

   // Build the EditorElement
   const editorElement: EditorElement = {
      id: nanoid(),
      name: getElementName(componentName),
      type: elementType,
      styles: mergedStyles,
      className: mergedClassName,
      content,
      ...(Object.keys(htmlAttributes).length > 0 ? { htmlAttributes } : {}),
   };

   return editorElement;
};

/**
 * Convert a complete JSX page definition to EditorElement structure
 * The root element should be EditorBody or a container
 */
export const convertPageToEditorElement = (
   pageJSX: ReactElement,
): EditorElement => {
   const converted = jsxToEditorElement(pageJSX);

   if (!converted) {
      throw new Error('Failed to convert page JSX to EditorElement');
   }

   // If the root is not __body, wrap it in a body element
   if (converted.type !== '__body') {
      return {
         id: nanoid(),
         name: 'Body',
         type: '__body',
         styles: {},
         className: '',
         content: [converted],
      };
   }

   return converted;
};
