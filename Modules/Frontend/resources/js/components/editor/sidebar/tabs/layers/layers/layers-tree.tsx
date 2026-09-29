import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React from 'react';
import LayersTreeItem from './layers-tree-item';

export type LayersTreeProps = React.HTMLAttributes<HTMLDivElement> & {
   data: EditorElement[] | EditorElement;
   onSelectChange?: (item: EditorElement | undefined) => void;
   expandAll?: boolean;
};

const LayersTree: React.FC<LayersTreeProps> = ({
   data,
   onSelectChange,
   expandAll,
   className,
   ...props
}) => {
   const handleSelectChange = React.useCallback(
      (item: EditorElement | undefined) => {
         if (onSelectChange) {
            onSelectChange(item);
         }
      },
      [onSelectChange],
   );

   const expandedItemIds = React.useMemo(() => {
      const ids: string[] = [];

      function walkTreeItems(items: EditorElement[] | EditorElement) {
         if (items instanceof Array) {
            for (let i = 0; i < items.length; i++) {
               ids.push(items[i]!.id);

               if (walkTreeItems(items[i]!) && !expandAll) {
                  return true;
               }

               if (!expandAll) {
                  ids.pop();
               }
            }
         } else if (!expandAll) {
            return true;
         } else if (Array.isArray(items.content)) {
            return walkTreeItems(items.content);
         }
      }

      walkTreeItems(data);

      return ids;
   }, [data, expandAll]);

   return (
      <div className={cn('overflow-hidden', className)}>
         <ScrollArea>
            <div className="relative">
               <LayersTreeItem
                  data={data}
                  handleSelectChange={handleSelectChange}
                  expandedItemIds={expandedItemIds}
                  {...props}
               />
            </div>
         </ScrollArea>
      </div>
   );
};

LayersTree.displayName = LayersTree.name;

export default LayersTree;
