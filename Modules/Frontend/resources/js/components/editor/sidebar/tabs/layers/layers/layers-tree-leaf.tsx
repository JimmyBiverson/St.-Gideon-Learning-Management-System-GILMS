import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
   CheckSquareIcon,
   ChevronDownIcon,
   ChevronsUpDownIcon,
   FileTextIcon,
   FolderIcon,
   ImageIcon,
   LayoutGridIcon,
   Link2Icon,
   ListIcon,
   MenuIcon,
   MessageSquareIcon,
   MonitorPlayIcon,
   MousePointerClick,
   PanelLeftIcon,
   RadioIcon,
   SparklesIcon,
   SquareIcon,
   StarIcon,
   Tag,
   TextCursorInput,
   TypeIcon,
   VideoIcon,
} from 'lucide-react';
import React from 'react';

interface LayersTreeLeafProps extends React.HTMLAttributes<HTMLDivElement> {
   item: EditorElement;
   isSelected?: boolean;
   type: EditorBtns;
}

const LayersTreeLeaf: React.FC<LayersTreeLeafProps> = ({
   className,
   item,
   isSelected,
   type,
   ...props
}) => {
   let Icon: LucideIcon | undefined = undefined;

   switch (type) {
      case 'video':
         Icon = VideoIcon;
         break;
      case 'link':
         Icon = Link2Icon;
         break;
      case 'image':
         Icon = ImageIcon;
         break;
      case 'input':
         Icon = TextCursorInput;
         break;
      case 'label':
         Icon = Tag;
         break;
      case 'button':
         Icon = MousePointerClick;
         break;
      case 'heading':
         Icon = TypeIcon;
         break;
      case 'paragraph':
         Icon = FileTextIcon;
         break;
      case 'span':
         Icon = SparklesIcon;
         break;
      case 'iframe':
         Icon = MonitorPlayIcon;
         break;
      case 'icon':
         Icon = StarIcon;
         break;
      case 'checkbox':
         Icon = CheckSquareIcon;
         break;
      case 'radio':
         Icon = RadioIcon;
         break;
      case 'select':
         Icon = ChevronDownIcon;
         break;
      case 'textarea':
         Icon = FileTextIcon;
         break;
      case 'form':
         Icon = SquareIcon;
         break;
      case 'ul':
      case 'li':
         Icon = ListIcon;
         break;
      case 'div':
         Icon = SquareIcon;
         break;
      case 'header':
      case 'footer':
      case 'nav':
      case 'article':
      case 'aside':
         Icon = LayoutGridIcon;
         break;
      case 'dropdownMenu':
      case 'dropdownMenuTrigger':
      case 'dropdownMenuContent':
      case 'dropdownMenuLabel':
      case 'dropdownMenuItem':
         Icon = MenuIcon;
         break;
      case 'popover':
      case 'popoverTrigger':
      case 'popoverContent':
         Icon = MessageSquareIcon;
         break;
      case 'drawer':
      case 'drawerTrigger':
      case 'drawerContent':
         Icon = PanelLeftIcon;
         break;
      case 'accordion':
      case 'accordionItem':
      case 'accordionTrigger':
      case 'accordionContent':
         Icon = ChevronsUpDownIcon;
         break;
      case 'tabs':
      case 'tabsList':
      case 'tabsTrigger':
      case 'tabsContent':
         Icon = FolderIcon;
         break;
   }

   return (
      <div
         className={cn(
            'flex w-full cursor-pointer items-center border-l p-3',
            className,
         )}
         {...props}
      >
         {Icon && (
            <Icon
               className="mr-2 h-5 w-5 text-muted-foreground"
               aria-hidden="true"
            />
         )}
         <span className="inline-flex w-full flex-grow items-center justify-between gap-2 truncate text-sm">
            {item.name}{' '}
            {isSelected && (
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            )}
         </span>
      </div>
   );
};

LayersTreeLeaf.displayName = LayersTreeLeaf.name;

export default LayersTreeLeaf;
