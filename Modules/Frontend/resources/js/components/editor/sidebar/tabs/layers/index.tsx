import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import EditorLayersTree from './layers/layers-tree';

const LayersTab = () => {
   const { pageDetails, dispatch, editor } = useEditor();
   const [elements, setElements] = React.useState<EditorElement[]>(() => {
      if (!pageDetails?.content) {
         return [];
      }

      try {
         const parsed = JSON.parse(pageDetails.content);

         // Check if parsed array has elements and first element has content
         if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.content) {
            return (parsed[0].content as EditorElement[]) || [];
         }

         return [];
      } catch (error) {
         console.error('Failed to parse page content:', error);

         return [];
      }
   });

   // Track last click time for double-click detection
   const lastClickTimeRef = React.useRef<number>(0);
   const lastClickedIdRef = React.useRef<string>('');

   const handleSelectElement = (element: EditorElement | undefined) => {
      if (element) {
         const now = Date.now();
         const timeSinceLastClick = now - lastClickTimeRef.current;
         const isDoubleClick =
            timeSinceLastClick < 300 && lastClickedIdRef.current === element.id;

         lastClickTimeRef.current = now;
         lastClickedIdRef.current = element.id;

         dispatch({
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: {
               elementDetails: element,
               switchTab: isDoubleClick, // Only switch tab on double-click
            },
         });
      }
   };

   React.useEffect(() => {
      if (editor.editor.elements.length) {
         const timer = setTimeout(() => {
            setElements(editor.editor.elements);
         }, 0);

         return () => clearTimeout(timer);
      }
   }, [editor.editor.elements]);

   return (
      <div className="overflow-auto px-6">
         <div className="py-6 text-left">
            <h3 className="text-lg font-semibold">Layers</h3>
            <p className="text-sm text-muted-foreground">
               View the editor in a tree like structure.
            </p>
         </div>
         <EditorLayersTree
            data={elements}
            className="flex-shrink-0"
            onSelectChange={handleSelectElement}
         />
      </div>
   );
};

export default LayersTab;
