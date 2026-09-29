import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementRender from '../element-render';
import ElementWrapper from '../element-wrapper';

interface TabsProps {
   element: EditorElement;
}

const EditorTabs: React.FC<TabsProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;

   const children = Array.isArray(element.content) ? element.content : [];
   const tabsList = children.find((child) => child.type === 'tabsList');
   const tabsContents = children.filter(
      (child) => child.type === 'tabsContent',
   );

   // Get triggers from tabsList
   const triggers =
      tabsList && Array.isArray(tabsList.content) ? tabsList.content : [];

   // State for active tab index (default to 0)
   const [activeTabIndex, setActiveTabIndex] = useState(0);

   // In editor mode, show all content. In live mode, show only active tab content.
   const shouldShowContent = (index: number) => {
      if (editor.liveMode) {
         return index === activeTabIndex;
      }

      return true;
   };

   return (
      <ElementWrapper
         element={element}
         isContainer={false}
         wrapperClassName={cn(element.className, !editor.liveMode ? 'p-2' : '')}
      >
         <div className="w-full">
            {/* Tabs List */}
            {tabsList && (
               <div>
                  {editor.liveMode ? (
                     <div
                        className={tabsList.className}
                        style={tabsList.styles}
                     >
                        {triggers.map((trigger, index) => {
                           // Clone trigger and add data-state attribute for active styling
                           const modifiedTrigger = {
                              ...trigger,
                              htmlAttributes: {
                                 ...(trigger.htmlAttributes || {}),
                                 'data-state':
                                    index === activeTabIndex
                                       ? 'active'
                                       : 'inactive',
                              },
                           };

                           return (
                              <div
                                 key={trigger.id}
                                 style={{ display: 'inline-block' }}
                                 onClickCapture={(e) => {
                                    setActiveTabIndex(index);
                                    e.stopPropagation();
                                 }}
                              >
                                 <ElementRender element={modifiedTrigger} />
                              </div>
                           );
                        })}
                     </div>
                  ) : (
                     <ElementRender element={tabsList} />
                  )}
               </div>
            )}

            {/* Tabs Contents */}
            {tabsContents.map((content, index) => (
               <div
                  key={content.id}
                  className={
                     editor.liveMode && !shouldShowContent(index)
                        ? 'hidden'
                        : ''
                  }
               >
                  <ElementRender element={content} />
               </div>
            ))}
         </div>
      </ElementWrapper>
   );
};

export default EditorTabs;
