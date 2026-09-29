type Themes = 'light' | 'dark' | 'system';
type ThemeColors = 'Zinc' | 'Rose' | 'Blue' | 'Green' | 'Orange';
type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet';

type EditorElement = {
   id: string;
   styles: React.CSSProperties;
   name: string;
   type: EditorBtns;
   content:
      | EditorElement[]
      | {
           // Text content
           href?: string;
           innerText?: string;

           // Media
           src?: string;
           alt?: string;
           width?: string;
           height?: string;

           // Form elements
           formTitle?: string;
           formDescription?: string;
           formButton?: string;
           placeholder?: string;
           inputType?: string;
           name?: string;
           value?: string;

           // Button
           buttonType?: 'button' | 'submit' | 'reset';

           // Label
           htmlFor?: string;

           // Textarea
           rows?: number;
           cols?: number;

           // Select
           options?: string[];

           // Checkbox/Radio
           label?: string;
           checked?: boolean;

           // Form
           action?: string;
           method?: string;

           // Video
           videoType?: string;
           controls?: boolean;
           autoplay?: boolean;
           loop?: boolean;

           // Iframe
           title?: string;

           // Heading
           level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

           // List
           listType?: 'ul' | 'ol';
           items?: string[];

           // Icons
           icon?: string; // Lucide icon name
           iconPosition?: 'left' | 'right'; // Icon position relative to text

           // Custom Code
           code?: string; // Raw HTML/React code

           // Dynamic Wrapper
           componentRef?: string; // Reference to registered component
           api?: string; // API endpoint
           apiMethod?: 'GET' | 'POST';
           apiParams?: Record<string, any>;

           // Dropdown Menu
           placement?: 'left' | 'right' | 'center' | 'top' | 'bottom';
           isOpen?: boolean;
           children?: EditorElement[]; // For dropdown content children

           // Accordion
           type?: 'single' | 'multiple';
        };
   className?: string;
   htmlAttributes?: Record<string, any>;
};

type TabsName =
   | 'Customize'
   | 'Components'
   | 'Sections'
   | 'Layers'
   | 'Settings'
   | 'Media';

type Editor = {
   projectPageId: string;
   theme: Themes;
   liveMode: boolean;
   elements: EditorElement[];
   selectedElement: EditorElement;
   device: DeviceTypes;
   previewMode: boolean;
   activeTab: TabsName;
   compactSidebar: boolean;
   windowWidth: number;
   activeLocale: string;
   isDefaultLocale: boolean;
   translations: Record<string, Record<string, string>>;
};

type HistoryState = {
   currentIndex: number;
   history: Editor[];
};

type EditorState = {
   editor: Editor;
   history: HistoryState;
};

type EditorBtns =
   // Layouts
   | 'container'
   | 'section'
   | '__body'
   | '2Col'
   | '3Col'
   | 'div'
   | 'hr'

   // Text Elements
   | 'heading'
   | 'paragraph'
   | 'span'

   // Media Elements
   | 'image'
   | 'video'
   | 'iframe'
   | 'icon'

   // Form Elements
   | 'input'
   | 'textarea'
   | 'select'
   | 'checkbox'
   | 'radio'
   | 'label'
   | 'form'

   // Link
   | 'link'
   | 'button'

   // List
   | 'ul'
   | 'li'

   // Semantic Elements
   | 'article'
   | 'nav'
   | 'header'
   | 'footer'
   | 'aside'

   // Custom Code
   | 'customCode'
   | 'dynamicContent' // Custom wrapper with editable children
   | 'dynamicWrapper' // Wrapper for stateful/functional React components

   // Dropdown Menu Elements
   | 'dropdownMenu'
   | 'dropdownMenuTrigger'
   | 'dropdownMenuContent'
   | 'dropdownMenuLabel'
   | 'dropdownMenuItem'

   // Popover Elements
   | 'popover'
   | 'popoverTrigger'
   | 'popoverContent'

   // Drawer Elements
   | 'drawer'
   | 'drawerTrigger'
   | 'drawerContent'

   // Accordion Elements
   | 'accordion'
   | 'accordionItem'
   | 'accordionTrigger'
   | 'accordionContent'

   // Tabs Elements
   | 'tabs'
   | 'tabsList'
   | 'tabsTrigger'
   | 'tabsContent'

   // Other Elements
   | null;

type EditorAction =
   | {
        type: 'ADD_ELEMENT';
        payload: {
           containerId: string;
           elementDetails: EditorElement;
        };
     }
   | {
        type: 'UPDATE_ELEMENT';
        payload: {
           elementDetails: EditorElement;
        };
     }
   | {
        type: 'DUPLICATE_ELEMENT';
        payload: {
           elementDetails: EditorElement;
        };
     }
   | {
        type: 'DELETE_ELEMENT';
        payload: {
           elementDetails: EditorElement;
        };
     }
   | {
        type: 'CHANGE_CLICKED_ELEMENT';
        payload: {
           elementDetails?:
              | EditorElement
              | {
                   id: '';
                   content: [];
                   name: '';
                   styles: object;
                   type: null;
                };
           switchTab?: boolean; // Optional flag to control tab switching
        };
     }
   | {
        type: 'CHANGE_THEME';
        payload: {
           theme: Themes;
        };
     }
   | {
        type: 'CHANGE_DEVICE';
        payload: {
           device: DeviceTypes;
        };
     }
   | {
        type: 'TOGGLE_PREVIEW_MODE';
     }
   | {
        type: 'TOGGLE_LIVE_MODE';
        payload?: {
           value: boolean;
        };
     }
   | { type: 'REDO' }
   | { type: 'UNDO' }
   | {
        type: 'LOAD_DATA';
        payload: {
           elements: EditorElement[];
           withLive: boolean;
        };
     }
   | {
        type: 'CLEAR_HISTORY';
     }
   | {
        type: 'SET_PROJECT_PAGE_ID';
        payload: {
           projectPageId: string;
        };
     }
   | {
        type: 'SET_ACTIVE_TAB';
        payload: {
           activeTab: TabsName;
        };
     }
   | {
        type: 'MOVE_ELEMENT';
        payload: {
           elementId: string;
           targetContainerId: string;
           targetIndex: number;
        };
     }
   | {
        type: 'SET_COMPACT_SIDEBAR';
        payload: {
           compactSidebar: boolean;
        };
     }
   | {
        type: 'SET_WINDOW_WIDTH';
        payload: {
           windowWidth: number;
        };
     }
   | {
        type: 'SET_ACTIVE_LOCALE';
        payload: {
           locale: string;
           isDefault: boolean;
        };
     }
   | {
        type: 'LOAD_TRANSLATIONS';
        payload: {
           translations: Record<string, Record<string, string>>;
        };
     }
   | {
        type: 'SET_TRANSLATION';
        payload: {
           elementId: string;
           field: string;
           value: string;
        };
     };

interface ComponentElement {
   placeholder: React.ReactNode;
   label: string;
   id: EditorBtns;
   group: 'layout' | 'elements';
}

interface MediaFile {
   id: string;
   name: string;
   link: string;
   createdAt: string;
}

// Base props for all editor components
interface BaseComponentProps {
   className?: string;
   styles?: React.CSSProperties;
   children?: React.ReactNode;

   // Event handlers
   onClick?: (event: React.MouseEvent) => void;
   onDoubleClick?: (event: React.MouseEvent) => void;
   onMouseEnter?: (event: React.MouseEvent) => void;
   onMouseLeave?: (event: React.MouseEvent) => void;
   onMouseMove?: (event: React.MouseEvent) => void;
   onMouseDown?: (event: React.MouseEvent) => void;
   onMouseUp?: (event: React.MouseEvent) => void;
   onFocus?: (event: React.FocusEvent) => void;
   onBlur?: (event: React.FocusEvent) => void;
   onKeyDown?: (event: React.KeyboardEvent) => void;
   onKeyUp?: (event: React.KeyboardEvent) => void;
   onKeyPress?: (event: React.KeyboardEvent) => void;
   onChange?: (event: React.ChangeEvent) => void;
   onSubmit?: (event: React.FormEvent) => void;
   onInput?: (event: React.FormEvent) => void;
   onTouchStart?: (event: React.TouchEvent) => void;
   onTouchEnd?: (event: React.TouchEvent) => void;
   onTouchMove?: (event: React.TouchEvent) => void;
}

interface ButtonProps extends BaseComponentProps {
   buttonType?: 'button' | 'submit' | 'reset';
}

interface LinkProps extends BaseComponentProps {
   href?: string;
   type?: 'native' | 'inertia';
}

interface HeadingProps extends BaseComponentProps {
   level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface InputProps extends BaseComponentProps {
   placeholder?: string;
   inputType?: string;
   name?: string;
   value?: string;
}

interface TextareaProps extends BaseComponentProps {
   placeholder?: string;
   name?: string;
   rows?: number;
}

interface SelectProps extends BaseComponentProps {
   name?: string;
   options?: Array<{ value: string; label: string }>;
}

interface ImageProps extends BaseComponentProps {
   src?: string;
   alt?: string;
}

interface VideoProps extends BaseComponentProps {
   src?: string;
}

interface IframeProps extends BaseComponentProps {
   src?: string;
}

interface CustomCodeProps extends BaseComponentProps {
   code?: string;
}

interface IconProps extends BaseComponentProps {
   name?: string;
}

interface DropdownMenuContentProps extends BaseComponentProps {
   placement?: 'left' | 'right' | 'center' | 'top' | 'bottom';
}

interface PopoverContentProps extends BaseComponentProps {
   placement?: 'left' | 'right' | 'center' | 'top' | 'bottom';
}

interface DynamicWrapperProps extends BaseComponentProps {
   componentRef?: string;
   api?: string;
   apiMethod?: 'GET' | 'POST';
   apiParams?: Record<string, any>;
}

interface ElementWrapperProps {
   element: EditorElement;
   children?: React.ReactNode;
   isContainer?: boolean;
   wrapperClassName?: string;
   showDeleteButton?: boolean;
   applyStyles?: boolean;
   htmlAttributes?: React.HTMLAttributes<HTMLElement> & Record<string, any>;
   contentEditable?: boolean;
   onKeyDown?: (e: React.KeyboardEvent) => void;
   onBlur?: (e: React.FocusEvent) => void;
   suppressContentEditableWarning?: boolean;
   tag?: keyof JSX.IntrinsicElements;
   droppableRef?: (element: HTMLElement | null) => void;
   isOver?: boolean;
   active?: any;
}

interface Project extends Base {
   type: string;
   name: string;
   url: string | null;
   title: string | null;
   description: string | null;
   user_id: string | number;
   theme_color: ThemeColors;
   theme_config: string;
   subdomain: string | null;
   pages: ProjectPage[];
   favicon: string | null;
   metadata: any;
}

interface ProjectPage extends Base {
   name: string;
   title: string;
   slug: string;
   project_id: string;
   description: string | null;
   content: string;
   banner: string | null;
   metadata: any;
}
