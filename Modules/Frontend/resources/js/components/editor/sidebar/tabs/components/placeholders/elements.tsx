import AccordionPlaceholder from './components/accordion-placeholder';
import ArticlePlaceholder from './components/article-placeholder';
import AsidePlaceholder from './components/aside-placeholder';
import ButtonPlaceholder from './components/button-placeholder';
import CheckboxPlaceholder from './components/checkbox-placeholder';
import DrawerPlaceholder from './components/drawer-placeholder';
import DropdownMenuPlaceholder from './components/dropdown-menu-placeholder';
import FooterPlaceholder from './components/footer-placeholder';
import FormPlaceholder from './components/form-placeholder';
import HeaderPlaceholder from './components/header-placeholder';
import HeadingPlaceholder from './components/heading-placeholder';
import IconPlaceholder from './components/icon-placeholder';
import IframePlaceholder from './components/iframe-placeholder';
import ImagePlaceholder from './components/image-placeholder';
import InputPlaceholder from './components/input-placeholder';
import LabelPlaceholder from './components/label-placeholder';
import LinkPlaceholder from './components/link-placeholder';
import LiPlaceholder from './components/list-item-placeholder';
import UlPlaceholder from './components/list-placeholder';
import NavPlaceholder from './components/nav-placeholder';
import ParagraphPlaceholder from './components/paragraph-placeholder';
import PopoverPlaceholder from './components/popover-placeholder';
import RadioPlaceholder from './components/radio-placeholder';
import SelectPlaceholder from './components/select-placeholder';
import SpanPlaceholder from './components/span-placeholder';
import TabsPlaceholder from './components/tabs-placeholder';
import TextareaPlaceholder from './components/textarea-placeholder';
import VideoPlaceholder from './components/video-placeholder';

const ELEMENTS_PLACEHOLDERS: ComponentElement[] = [
   // Text Elements
   {
      placeholder: <HeadingPlaceholder />,
      label: 'Heading',
      id: 'heading',
      group: 'elements',
   },
   {
      placeholder: <ParagraphPlaceholder />,
      label: 'Paragraph',
      id: 'paragraph',
      group: 'elements',
   },
   {
      placeholder: <SpanPlaceholder />,
      label: 'Span',
      id: 'span',
      group: 'elements',
   },

   // Media Elements
   {
      placeholder: <ImagePlaceholder />,
      label: 'Image',
      id: 'image',
      group: 'elements',
   },
   {
      placeholder: <VideoPlaceholder />,
      label: 'Video',
      id: 'video',
      group: 'elements',
   },
   {
      placeholder: <IframePlaceholder />,
      label: 'Iframe',
      id: 'iframe',
      group: 'elements',
   },
   {
      placeholder: <IconPlaceholder />,
      label: 'Icon',
      id: 'icon',
      group: 'elements',
   },

   // Link
   {
      placeholder: <LinkPlaceholder />,
      label: 'Link',
      id: 'link',
      group: 'elements',
   },
   {
      placeholder: <ButtonPlaceholder />,
      label: 'Button',
      id: 'button',
      group: 'elements',
   },

   // Form Elements
   {
      placeholder: <FormPlaceholder />,
      label: 'Form',
      id: 'form',
      group: 'elements',
   },
   {
      placeholder: <InputPlaceholder />,
      label: 'Input',
      id: 'input',
      group: 'elements',
   },
   {
      placeholder: <TextareaPlaceholder />,
      label: 'Textarea',
      id: 'textarea',
      group: 'elements',
   },
   {
      placeholder: <SelectPlaceholder />,
      label: 'Select',
      id: 'select',
      group: 'elements',
   },
   {
      placeholder: <CheckboxPlaceholder />,
      label: 'Checkbox',
      id: 'checkbox',
      group: 'elements',
   },
   {
      placeholder: <RadioPlaceholder />,
      label: 'Radio',
      id: 'radio',
      group: 'elements',
   },
   {
      placeholder: <LabelPlaceholder />,
      label: 'Label',
      id: 'label',
      group: 'elements',
   },

   // List
   {
      placeholder: <UlPlaceholder />,
      label: 'Ul',
      id: 'ul',
      group: 'elements',
   },
   {
      placeholder: <LiPlaceholder />,
      label: 'Li',
      id: 'li',
      group: 'elements',
   },

   // Semantic HTML Elements
   {
      placeholder: <HeaderPlaceholder />,
      label: 'Header',
      id: 'header',
      group: 'elements',
   },
   {
      placeholder: <NavPlaceholder />,
      label: 'Nav',
      id: 'nav',
      group: 'elements',
   },
   {
      placeholder: <FooterPlaceholder />,
      label: 'Footer',
      id: 'footer',
      group: 'elements',
   },
   {
      placeholder: <ArticlePlaceholder />,
      label: 'Article',
      id: 'article',
      group: 'elements',
   },
   {
      placeholder: <AsidePlaceholder />,
      label: 'Aside',
      id: 'aside',
      group: 'elements',
   },

   // Interactive Elements
   {
      placeholder: <DropdownMenuPlaceholder />,
      label: 'Dropdown',
      id: 'dropdownMenu',
      group: 'elements',
   },

   {
      placeholder: <PopoverPlaceholder />,
      label: 'Popover',
      id: 'popover',
      group: 'elements',
   },
   {
      placeholder: <AccordionPlaceholder />,
      label: 'Accordion',
      id: 'accordion',
      group: 'elements',
   },
   {
      placeholder: <TabsPlaceholder />,
      label: 'Tabs',
      id: 'tabs',
      group: 'elements',
   },
   {
      placeholder: <DrawerPlaceholder />,
      label: 'Drawer',
      id: 'drawer',
      group: 'elements',
   },
];

export default ELEMENTS_PLACEHOLDERS;
