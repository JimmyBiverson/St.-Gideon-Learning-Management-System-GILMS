import React from 'react';
import ElementRender from '@/frontend/components/editor/sidebar/tabs/components/elements/element-render';
import { EditorContext } from '@/frontend/providers/editor-provider';

interface Props {
   pageData: EditorElement;
}

const PageRenderer = ({ pageData }: Props) => {
   const editorReducer = (state: EditorState): EditorState => {
      return state;
   };

   const editorState = {
      elements: [pageData],
      selectedElement: {
         id: '',
         content: [],
         name: '',
         styles: {},
         type: null,
      },
      device: 'Desktop' as const,
      previewMode: true,
      liveMode: true,
      projectPageId: '',
      activeTab: 'Customize' as const,
      theme: 'system' as Themes,
      compactSidebar: true,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      // Public rendering already receives locale-merged content from the
      // server (see PageController::show), so no client-side overlay is
      // needed here — these exist only to satisfy the Editor type shape.
      activeLocale: '',
      isDefaultLocale: true,
      translations: {},
   };

   const initialState: EditorState = {
      editor: editorState,
      history: {
         currentIndex: 0,
         history: [editorState],
      },
   };

   const [editor, dispatch] = React.useReducer(editorReducer, initialState);

   return (
      <EditorContext.Provider
         value={{
            editor,
            dispatch,
            projectId: '',
            pageDetails: null as any,
         }}
      >
         <ElementRender element={pageData} />
      </EditorContext.Provider>
   );
};

export default PageRenderer;
