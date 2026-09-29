import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import {
   ChevronLeft,
   Component,
   Database,
   Layers,
   Palette,
   Settings,
   SquarePlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditor } from '@/frontend/hooks/use-editor';
import ComponentsTab from './components';
import CustomizeTab from './customize';
import LayersTab from './layers';
import MediaTab from './media';
import SectionsTab from './sections';
import SettingsTab from './settings';

// Structure-only tabs — locked while translating a non-default locale, since
// none of them can change text and all of them can change layout/assets.
const STRUCTURAL_TABS = new Set<TabsName>(['Components', 'Sections', 'Media']);

const EditorTabs = () => {
   const { editor, dispatch } = useEditor();
   const { isDefaultLocale } = editor.editor;

   const handleTabChange = (tab: string) => {
      if (!isDefaultLocale && STRUCTURAL_TABS.has(tab as TabsName)) {
         return;
      }

      dispatch({
         type: 'SET_ACTIVE_TAB',
         payload: { activeTab: tab as TabsName },
      });
   };

   const handleCompactSidebar = () => {
      dispatch({
         type: 'SET_COMPACT_SIDEBAR',
         payload: { compactSidebar: true },
      });
   };

   return (
      <Tabs value={editor.editor.activeTab} className="z-50 gap-0">
         {editor.editor.windowWidth < 1024 && (
            <Button
               size="icon"
               variant="outline"
               className="absolute top-12 right-0 z-50 h-9 w-6 rounded-r-none bg-gray-200 text-gray-500 hover:bg-gray-200 active:bg-gray-200"
               onClick={handleCompactSidebar}
            >
               <ChevronLeft />
            </Button>
         )}

         <TabsList className="flex h-12 w-full items-center justify-between gap-1 px-1.5">
            {tabs.map(({ name, slug, Icon }) => {
               const isLocked =
                  !isDefaultLocale && STRUCTURAL_TABS.has(name as TabsName);

               return (
                  <Tooltip key={slug} delayDuration={100}>
                     <TabsTrigger
                        value={name}
                        className="p-0"
                        onClick={() => handleTabChange(name)}
                        disabled={isLocked}
                        asChild
                     >
                        <TooltipTrigger
                           className={cn(
                              'flex h-full w-full items-center justify-center p-2',
                              isLocked
                                 ? 'cursor-not-allowed opacity-40'
                                 : 'cursor-pointer',
                           )}
                        >
                           <Icon />
                        </TooltipTrigger>
                     </TabsTrigger>

                     <TooltipContent side="bottom">
                        <p>
                           {isLocked
                              ? `${name} (unavailable while translating)`
                              : name}
                        </p>
                     </TooltipContent>
                  </Tooltip>
               );
            })}
         </TabsList>

         <ScrollArea className="h-[calc(100vh-48px)] w-[300px]">
            <TabsContent value="Customize" className="m-0 w-full">
               <CustomizeTab />
            </TabsContent>
            <TabsContent value="Components" className="m-0">
               <ComponentsTab />
            </TabsContent>
            <TabsContent value="Sections" className="m-0">
               <SectionsTab />
            </TabsContent>
            <TabsContent value="Layers" className="m-0">
               <LayersTab />
            </TabsContent>
            <TabsContent value="Settings" className="m-0">
               <SettingsTab />
            </TabsContent>
            <TabsContent value="Media" className="m-0">
               <MediaTab />
            </TabsContent>
         </ScrollArea>
      </Tabs>
   );
};

const tabs = [
   {
      name: 'Customize',
      slug: 'customize',
      Icon: Palette,
   },
   {
      name: 'Components',
      slug: 'components',
      Icon: SquarePlus,
   },
   {
      name: 'Sections',
      slug: 'sections',
      Icon: Component,
   },
   {
      name: 'Layers',
      slug: 'layers',
      Icon: Layers,
   },
   {
      name: 'Settings',
      slug: 'settings',
      Icon: Settings,
   },
   {
      name: 'Media',
      slug: 'media',
      Icon: Database,
   },
];

export default EditorTabs;
