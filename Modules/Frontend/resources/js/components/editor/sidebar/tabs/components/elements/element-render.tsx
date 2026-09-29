import Accordion from './components/editor-accordion';
import AccordionContent from './components/editor-accordion-content';
import AccordionItem from './components/editor-accordion-item';
import AccordionTrigger from './components/editor-accordion-trigger';
import Article from './components/editor-article';
import Aside from './components/editor-aside';
import Button from './components/editor-button';
import Checkbox from './components/editor-checkbox';
import Drawer from './components/editor-drawer';
import DrawerContent from './components/editor-drawer-content';
import DrawerTrigger from './components/editor-drawer-trigger';
import DropdownMenu from './components/editor-dropdown-menu';
import DropdownMenuContent from './components/editor-dropdown-menu-content';
import DropdownMenuItem from './components/editor-dropdown-menu-item';
import DropdownMenuLabel from './components/editor-dropdown-menu-label';
import DropdownMenuTrigger from './components/editor-dropdown-menu-trigger';
import Footer from './components/editor-footer';
import Form from './components/editor-form';
import Header from './components/editor-header';
import Heading from './components/editor-heading';
import Icon from './components/editor-icon';
import Iframe from './components/editor-iframe';
import Image from './components/editor-image';
import Input from './components/editor-input';
import Label from './components/editor-label';
import Link from './components/editor-link';
import Ul from './components/editor-list';
import Li from './components/editor-list-item';
import Nav from './components/editor-nav';
import Paragraph from './components/editor-paragraph';
import Popover from './components/editor-popover';
import PopoverContent from './components/editor-popover-content';
import PopoverTrigger from './components/editor-popover-trigger';
import Radio from './components/editor-radio';
import Select from './components/editor-select';
import Span from './components/editor-span';
import Tabs from './components/editor-tabs';
import TabsContent from './components/editor-tabs-content';
import TabsList from './components/editor-tabs-list';
import TabsTrigger from './components/editor-tabs-trigger';
import Textarea from './components/editor-textarea';
import Video from './components/editor-video';
import DynamicWrapper from './layouts/dynamic-wrapper';
import Body from './layouts/editor-body';
import Container from './layouts/editor-container';
import Div from './layouts/editor-div';
import Hr from './layouts/editor-hr';
import Section from './layouts/editor-section';
import ThreeColumns from './layouts/editor-three-columns';
import TwoColumns from './layouts/editor-two-columns';

type Props = {
   element: EditorElement;
};

const ElementRender = ({ element }: Props) => {
   switch (element.type) {
      // Layouts
      case 'section':
         return <Section element={element} />;
      case 'container':
         return <Container element={element} />;
      case '__body':
         return <Body element={element} />;
      case '2Col':
         return <TwoColumns element={element} />;
      case '3Col':
         return <ThreeColumns element={element} />;
      case 'div':
         return <Div element={element} />;
      case 'dynamicWrapper':
         return <DynamicWrapper element={element} />;
      case 'hr':
         return <Hr element={element} />;

      // Text Elements
      case 'heading':
         return <Heading element={element} />;
      case 'paragraph':
         return <Paragraph element={element} />;
      case 'span':
         return <Span element={element} />;

      // Media Elements
      case 'image':
         return <Image element={element} />;
      case 'video':
         return <Video element={element} />;
      case 'iframe':
         return <Iframe element={element} />;
      case 'icon':
         return <Icon element={element} />;

      // Form Elements
      case 'input':
         return <Input element={element} />;
      case 'textarea':
         return <Textarea element={element} />;
      case 'select':
         return <Select element={element} />;
      case 'checkbox':
         return <Checkbox element={element} />;
      case 'radio':
         return <Radio element={element} />;
      case 'label':
         return <Label element={element} />;
      case 'form':
         return <Form element={element} />;

      // Link
      case 'link':
         return <Link element={element} />;
      case 'button':
         return <Button element={element} />;

      // List
      case 'ul':
         return <Ul element={element} />;
      case 'li':
         return <Li element={element} />;

      // Semantic Elements
      case 'article':
         return <Article element={element} />;
      case 'nav':
         return <Nav element={element} />;
      case 'header':
         return <Header element={element} />;
      case 'footer':
         return <Footer element={element} />;
      case 'aside':
         return <Aside element={element} />;

      // Dropdown Menu Elements
      case 'dropdownMenu':
         return <DropdownMenu element={element} />;
      case 'dropdownMenuTrigger':
         return <DropdownMenuTrigger element={element} />;
      case 'dropdownMenuContent':
         return <DropdownMenuContent element={element} />;
      case 'dropdownMenuLabel':
         return <DropdownMenuLabel element={element} />;
      case 'dropdownMenuItem':
         return <DropdownMenuItem element={element} />;

      // Popover Elements
      case 'popover':
         return <Popover element={element} />;
      case 'popoverTrigger':
         return <PopoverTrigger element={element} />;
      case 'popoverContent':
         return <PopoverContent element={element} />;

      // Drawer Elements
      case 'drawer':
         return <Drawer element={element} />;
      case 'drawerTrigger':
         return <DrawerTrigger element={element} />;
      case 'drawerContent':
         return <DrawerContent element={element} />;

      // Accordion Elements
      case 'accordion':
         return <Accordion element={element} />;
      case 'accordionItem':
         return <AccordionItem element={element} />;
      case 'accordionTrigger':
         return <AccordionTrigger element={element} />;
      case 'accordionContent':
         return <AccordionContent element={element} />;

      // Tabs Elements
      case 'tabs':
         return <Tabs element={element} />;
      case 'tabsList':
         return <TabsList element={element} />;
      case 'tabsTrigger':
         return <TabsTrigger element={element} />;
      case 'tabsContent':
         return <TabsContent element={element} />;

      default:
         return null;
   }
};

export default ElementRender;
