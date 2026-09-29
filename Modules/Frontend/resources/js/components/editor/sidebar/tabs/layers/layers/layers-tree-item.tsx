import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import {
   AppWindowIcon,
   BoxIcon,
   BoxSelectIcon,
   ChevronsUpDownIcon,
   Columns2Icon,
   Columns3Icon,
   FolderIcon,
   LayoutGridIcon,
   Link2Icon,
   ListIcon,
   MenuIcon,
   MessageSquareIcon,
   PanelLeftIcon,
   SquareIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import type { LayersTreeProps } from './layers-tree';
import LayersTreeLeaf from './layers-tree-leaf';

type LayersTreeItemProps = LayersTreeProps & {
   handleSelectChange: (item: EditorElement | undefined) => void;
   expandedItemIds: string[];
};

const LayersTreeItem: React.FC<LayersTreeItemProps> = ({
   className,
   data,
   handleSelectChange,
   expandedItemIds,
   ...props
}) => {
   const { editor } = useEditor();

   return (
      <div role="tree" className={className} {...props}>
         <ul>
            {data instanceof Array ? (
               data.map((item) => {
                  let Icon: LucideIcon | undefined = undefined;

                  switch (item.type) {
                     case 'container':
                        Icon = BoxIcon;
                        break;
                     case '__body':
                        Icon = AppWindowIcon;
                        break;
                     case '2Col':
                        Icon = Columns2Icon;
                        break;
                     case '3Col':
                        Icon = Columns3Icon;
                        break;
                     case 'section':
                        Icon = BoxSelectIcon;
                        break;
                     case 'link':
                        Icon = Link2Icon;
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
                     case 'form':
                        Icon = SquareIcon;
                        break;
                     case 'ul':
                     case 'li':
                        Icon = ListIcon;
                        break;
                     case 'dropdownMenu':
                     case 'dropdownMenuContent':
                        Icon = MenuIcon;
                        break;
                     case 'popover':
                     case 'popoverContent':
                        Icon = MessageSquareIcon;
                        break;
                     case 'drawer':
                     case 'drawerContent':
                        Icon = PanelLeftIcon;
                        break;
                     case 'accordion':
                     case 'accordionItem':
                     case 'accordionContent':
                     case 'accordionTrigger':
                        Icon = ChevronsUpDownIcon;
                        break;
                     case 'tabs':
                     case 'tabsList':
                     case 'tabsContent':
                        Icon = FolderIcon;
                        break;
                  }

                  return (
                     <li key={item.id}>
                        {Array.isArray(item.content) ? (
                           <Accordion
                              type="multiple"
                              defaultValue={expandedItemIds}
                           >
                              <AccordionItem
                                 className={cn('border-b-0 border-l')}
                                 value={item.id}
                              >
                                 <AccordionTrigger
                                    onClick={() => handleSelectChange(item)}
                                    className="w-full p-3"
                                 >
                                    <div className="flex w-full items-center gap-2 pr-2">
                                       {Icon && (
                                          <Icon
                                             className="h-5 w-5 flex-grow text-muted-foreground"
                                             aria-hidden="true"
                                          />
                                       )}
                                       <span className="inline-flex w-full items-center justify-between gap-2 truncate text-sm">
                                          {item.name}
                                          {item.id ===
                                             editor.editor.selectedElement
                                                .id && (
                                             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                          )}
                                       </span>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="pl-4">
                                    {Array.isArray(item.content) &&
                                    !!item.content.length ? (
                                       <LayersTreeItem
                                          data={
                                             item.content ? item.content : item
                                          }
                                          handleSelectChange={
                                             handleSelectChange
                                          }
                                          expandedItemIds={expandedItemIds}
                                       />
                                    ) : (
                                       <p className="w-full text-center text-sm text-muted-foreground">
                                          No content inside.
                                       </p>
                                    )}
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        ) : (
                           <LayersTreeLeaf
                              item={item}
                              isSelected={
                                 item.id === editor.editor.selectedElement.id
                              }
                              type={item.type}
                              onClick={() => handleSelectChange(item)}
                           />
                        )}
                     </li>
                  );
               })
            ) : (
               <li>
                  <LayersTreeLeaf
                     item={data}
                     isSelected={data.id === editor.editor.selectedElement.id}
                     type={data.type}
                     onClick={() => handleSelectChange(data)}
                  />
               </li>
            )}
         </ul>
      </div>
   );
};

LayersTreeItem.displayName = LayersTreeItem.name;

export default LayersTreeItem;
