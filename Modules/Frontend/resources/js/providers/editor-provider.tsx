import { createContext, useEffect, useReducer } from 'react';
import { duplicateElement } from '@/frontend/lib/duplicate-element';
import { findElementById } from '@/frontend/lib/find-element';
import { moveElement } from '@/frontend/lib/move-element-helpers';

/**
 * Convert EditorElement array back to serialized JSON format
 * This is used to persist changes made to nested editor elements inside DynamicContent
 */
const editorElementsToSerializedJson = (elements: EditorElement[]): any[] => {
   return elements.map((element) => {
      return {
         type: '__editor_element__',
         element: element,
      };
   });
};

const initialEditorState: EditorState['editor'] = {
   theme: 'light',
   device: 'Desktop',
   previewMode: false,
   liveMode: false,
   elements: [
      {
         content: [],
         id: '__body',
         name: 'Body',
         type: '__body',
         styles: {},
      },
   ],
   selectedElement: {
      id: '',
      content: [],
      name: '',
      styles: {},
      type: null,
   },
   projectPageId: '',
   activeTab:
      (typeof window !== 'undefined' &&
         (localStorage.getItem('project-tab-name') as any)) ||
      'Settings',
   compactSidebar: true,
   windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
   activeLocale: '',
   isDefaultLocale: true,
   translations: {},
};

const initialHistoryState: HistoryState = {
   currentIndex: 0,
   history: [initialEditorState],
};

const initialState: EditorState = {
   editor: initialEditorState,
   history: initialHistoryState,
};

const addElement = (
   elements: EditorElement[],
   action: EditorAction,
): EditorElement[] => {
   if (action.type !== 'ADD_ELEMENT') {
      throw Error(
         'You sent the wrong action type to the Add Element editor state',
      );
   }

   // if content exists then add elementDetails via payload, if not then handle nested content recursively
   return elements.map((element) => {
      if (element.id === action.payload.containerId) {
         // Handle direct array content
         if (Array.isArray(element.content)) {
            return {
               ...element,
               content: [...element.content, action.payload.elementDetails],
            };
         } else if (
            // Handle content with { placement, children } structure (dropdownMenuContent, popoverContent)
            element.content &&
            typeof element.content === 'object' &&
            'children' in element.content &&
            Array.isArray(element.content.children)
         ) {
            return {
               ...element,
               content: {
                  ...element.content,
                  children: [
                     ...element.content.children,
                     action.payload.elementDetails,
                  ],
               },
            };
         }
      } else if (element.content && Array.isArray(element.content)) {
         return {
            ...element,
            content: addElement(element.content, action),
         };
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         return {
            ...element,
            content: {
               ...element.content,
               children: addElement(element.content.children, action),
            },
         };
      }

      return element;
   });
};

const updateElement = (
   elements: EditorElement[],
   action: EditorAction,
): EditorElement[] => {
   if (action.type !== 'UPDATE_ELEMENT') {
      throw Error(
         'You sent the wrong action type to the Update Element editor state',
      );
   }

   // if element exists then update elementDetails via payload, if not then handle nested content recursively
   return elements.map((element) => {
      if (element.id === action.payload.elementDetails.id) {
         return {
            ...element,
            ...action.payload.elementDetails,
         };
      } else if (element.content && Array.isArray(element.content)) {
         const updatedContent = updateElement(element.content, action);

         // If this is a dynamicContent element, re-serialize the updated content
         // back to the customCode field so changes persist on reload
         if (element.type === 'dynamicContent') {
            // Re-serialize the updated content back to JSON format
            const serialized = editorElementsToSerializedJson(updatedContent);

            return {
               ...element,
               content: updatedContent,
               customCode: JSON.stringify(serialized),
            };
         }

         return {
            ...element,
            content: updatedContent,
         };
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         // Handle content with { placement, children } structure (dropdownMenuContent, popoverContent)
         const updatedChildren = updateElement(
            element.content.children,
            action,
         );

         return {
            ...element,
            content: {
               ...element.content,
               children: updatedChildren,
            },
         };
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'code' in element.content
      ) {
         // Handle customCode elements which store serialized content in content.code
         // Parse the code, update nested elements, then re-serialize
         try {
            const parsed = JSON.parse(element.content.code as string);

            // Check if the parsed content contains the element we're updating
            const containsUpdate = (obj: any): boolean => {
               if (!obj) {
                  return false;
               }

               if (
                  obj.type === '__editor_element__' &&
                  obj.element?.id === action.payload.elementDetails.id
               ) {
                  return true;
               }

               if (Array.isArray(obj)) {
                  return obj.some((item) => containsUpdate(item));
               }

               if (typeof obj === 'object' && obj.children) {
                  return containsUpdate(obj.children);
               }

               return false;
            };

            if (containsUpdate(parsed)) {
               // Update the element in the parsed structure
               const updateInParsed = (obj: any): any => {
                  if (!obj) {
                     return obj;
                  }

                  if (
                     obj.type === '__editor_element__' &&
                     obj.element?.id === action.payload.elementDetails.id
                  ) {
                     return {
                        ...obj,
                        element: {
                           ...obj.element,
                           ...action.payload.elementDetails,
                        },
                     };
                  }

                  if (Array.isArray(obj)) {
                     return obj.map((item) => updateInParsed(item));
                  }

                  if (typeof obj === 'object' && obj.children) {
                     return {
                        ...obj,
                        children: updateInParsed(obj.children),
                     };
                  }

                  return obj;
               };

               const updatedParsed = updateInParsed(parsed);

               return {
                  ...element,
                  content: {
                     ...element.content,
                     code: JSON.stringify(updatedParsed),
                  },
               };
            }
         } catch (e) {
            console.error('[customCode] Failed to update nested element:', e);
         }
      }

      return element;
   });
};

const deleteElement = (elements: EditorElement[], action: EditorAction) => {
   if (action.type !== 'DELETE_ELEMENT') {
      throw Error(
         'You sent the wrong action type to the Delete Element editor state',
      );
   }

   const elementToDelete = action.payload.elementDetails;

   // Special handling for tabsTrigger deletion - also delete corresponding tabsContent
   if (elementToDelete.type === 'tabsTrigger') {
      // Find parent tabs element
      const findParentTabs = (
         els: EditorElement[],
         triggerId: string,
      ): EditorElement | null => {
         for (const el of els) {
            if (el.type === 'tabs') {
               const tabsList = Array.isArray(el.content)
                  ? el.content.find((child) => child.type === 'tabsList')
                  : null;
               const triggers =
                  tabsList && Array.isArray(tabsList.content)
                     ? tabsList.content
                     : [];
               const triggerIndex = triggers.findIndex(
                  (t) => t.id === triggerId,
               );

               if (triggerIndex !== -1) {
                  return el;
               }
            }

            if (Array.isArray(el.content)) {
               const found = findParentTabs(el.content, triggerId);

               if (found) {
                  return found;
               }
            }
         }

         return null;
      };

      const parentTabs = findParentTabs(elements, elementToDelete.id);

      if (parentTabs && Array.isArray(parentTabs.content)) {
         const tabsList = parentTabs.content.find(
            (child) => child.type === 'tabsList',
         );
         const triggers =
            tabsList && Array.isArray(tabsList.content) ? tabsList.content : [];
         const triggerIndex = triggers.findIndex(
            (t) => t.id === elementToDelete.id,
         );

         if (triggerIndex !== -1) {
            const tabsContents = parentTabs.content.filter(
               (child) => child.type === 'tabsContent',
            );
            const correspondingContent = tabsContents[triggerIndex];

            // Delete both trigger and corresponding content
            const filteredElements = elements.filter((element) => {
               if (
                  element.id === elementToDelete.id ||
                  (correspondingContent &&
                     element.id === correspondingContent.id)
               ) {
                  return false;
               } else if (element.content && Array.isArray(element.content)) {
                  element.content = element.content.filter((child) => {
                     if (
                        child.id === elementToDelete.id ||
                        (correspondingContent &&
                           child.id === correspondingContent.id)
                     ) {
                        return false;
                     } else if (child.content && Array.isArray(child.content)) {
                        child.content = deleteElement(child.content, {
                           ...action,
                           payload: {
                              ...action.payload,
                              elementDetails: {
                                 ...action.payload.elementDetails,
                                 id: elementToDelete.id,
                              },
                           },
                        });

                        if (correspondingContent) {
                           child.content = child.content.filter(
                              (c) => c.id !== correspondingContent.id,
                           );
                        }
                     }

                     return true;
                  });
               }

               return true;
            });

            return filteredElements;
         }
      }
   }

   // Standard deletion for other elements
   return elements.filter((element) => {
      if (element.id === action.payload.elementDetails.id) {
         return false;
      } else if (element.content && Array.isArray(element.content)) {
         element.content = deleteElement(element.content, action);
      } else if (
         element.content &&
         typeof element.content === 'object' &&
         'children' in element.content &&
         Array.isArray(element.content.children)
      ) {
         // Handle content with { placement, children } structure (dropdownMenuContent, popoverContent)
         element.content = {
            ...element.content,
            children: deleteElement(element.content.children, action),
         };
      }

      return true;
   });
};

// Structure-changing actions are disabled while translating a non-default
// locale (see components/editor/navbar/partials/locale-switcher.tsx) —
// translation sessions may only change text, never layout, so a stale
// locale can never drift out of sync with the default-locale structure.
const STRUCTURAL_ACTION_TYPES = new Set<EditorAction['type']>([
   'ADD_ELEMENT',
   'DELETE_ELEMENT',
   'DUPLICATE_ELEMENT',
   'MOVE_ELEMENT',
]);

const editorReducer = (
   state: EditorState = initialState,
   action: EditorAction,
): EditorState => {
   if (!state.editor.isDefaultLocale && STRUCTURAL_ACTION_TYPES.has(action.type)) {
      console.warn(
         `[editor] Ignored "${action.type}" while translating a non-default locale.`,
      );

      return state;
   }

   switch (action.type) {
      case 'ADD_ELEMENT': {
         const updatedEditor = {
            ...state.editor,
            elements: addElement(state.editor.elements, action),
         };

         const updatedHistory = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...updatedEditor },
         ];

         const newEditorState: EditorState = {
            ...state,
            editor: updatedEditor,
            history: {
               ...state.history,
               history: updatedHistory,
               currentIndex: updatedHistory.length - 1,
            },
         };

         return newEditorState;
      }
      case 'UPDATE_ELEMENT': {
         const updatedElements = updateElement(state.editor.elements, action);
         const isUpdatedElementSelected =
            state.editor.selectedElement.id ===
            action.payload.elementDetails.id;

         const updatedEditor = {
            ...state.editor,
            elements: updatedElements,
            // Keep selected element updated if it's the one being updated
            selectedElement: isUpdatedElementSelected
               ? action.payload.elementDetails
               : state.editor.selectedElement,
         };

         const updatedHistory = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...updatedEditor },
         ];

         const newEditorState: EditorState = {
            ...state,
            editor: updatedEditor,
            history: {
               ...state.history,
               history: updatedHistory,
               currentIndex: updatedHistory.length - 1,
            },
         };

         return newEditorState;
      }
      case 'DELETE_ELEMENT': {
         const updatedElements = deleteElement(state.editor.elements, action);

         const updatedEditor = {
            ...state.editor,
            elements: updatedElements,
         };

         const updatedHistory = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...updatedEditor },
         ];

         const newEditorState: EditorState = {
            ...state,
            editor: updatedEditor,
            history: {
               ...state.history,
               history: updatedHistory,
               currentIndex: updatedHistory.length - 1,
            },
         };

         return newEditorState;
      }
      case 'DUPLICATE_ELEMENT': {
         const duplicatedElements = duplicateElement(
            state.editor.elements,
            action.payload.elementDetails.id,
         );

         const updatedEditor = {
            ...state.editor,
            elements: duplicatedElements,
         };

         const updatedHistory = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...updatedEditor },
         ];

         const newEditorState: EditorState = {
            ...state,
            editor: updatedEditor,
            history: {
               ...state.history,
               history: updatedHistory,
               currentIndex: updatedHistory.length - 1,
            },
         };

         return newEditorState;
      }
      case 'CHANGE_CLICKED_ELEMENT': {
         const shouldSwitchTab = action.payload.switchTab !== false; // Default to true for backward compatibility

         // Find the element from the current tree to avoid stale references
         // This is crucial after undo/redo operations
         let freshElement: EditorElement | null = null;

         if (action.payload.elementDetails?.id) {
            freshElement = findElementById(
               state.editor.elements,
               action.payload.elementDetails.id,
            );
         }

         const clickedState: EditorState = {
            ...state,
            editor: {
               ...state.editor,
               selectedElement: freshElement ||
                  action.payload.elementDetails || {
                     id: '',
                     content: [],
                     name: '',
                     styles: {},
                     type: null,
                  },
               // Auto-switch to Settings tab only if switchTab is not explicitly false
               activeTab:
                  action.payload.elementDetails && shouldSwitchTab
                     ? 'Customize'
                     : state.editor.activeTab,
            },
         };

         return clickedState;
      }
      case 'CHANGE_THEME': {
         const changeDeviceState: EditorState = {
            ...state,
            editor: {
               ...state.editor,
               theme: action.payload.theme,
            },
         };

         return changeDeviceState;
      }
      case 'CHANGE_DEVICE': {
         const changeDeviceState: EditorState = {
            ...state,
            editor: {
               ...state.editor,
               device: action.payload.device,
            },
         };

         return changeDeviceState;
      }
      case 'TOGGLE_PREVIEW_MODE': {
         const togglePreviewState: EditorState = {
            ...state,
            editor: {
               ...state.editor,
               previewMode: !state.editor.previewMode,
            },
         };

         return togglePreviewState;
      }
      case 'TOGGLE_LIVE_MODE': {
         const toggleLiveMode: EditorState = {
            ...state,
            editor: {
               ...state.editor,
               liveMode: action.payload
                  ? action.payload.value
                  : !state.editor.liveMode,
            },
         };

         return toggleLiveMode;
      }
      case 'CLEAR_HISTORY': {
         return {
            ...state,
            history: {
               ...state.history,
               history: [],
               currentIndex: 0,
            },
         };
      }
      case 'REDO': {
         // check if current index is not the last
         if (state.history.currentIndex < state.history.history.length - 1) {
            const nextIndex = state.history.currentIndex + 1;

            const updatedEditor = {
               ...state.history.history[nextIndex],
            };

            const newEditorState: EditorState = {
               ...state,
               editor: updatedEditor,
               history: {
                  ...state.history,
                  currentIndex: nextIndex,
               },
            };

            return newEditorState;
         }

         return state;
      }
      case 'UNDO': {
         // check if current index is not the first
         if (state.history.currentIndex > 0) {
            const prevIndex = state.history.currentIndex - 1;

            const updatedEditor = {
               ...state.history.history[prevIndex],
            };

            const newEditorState: EditorState = {
               ...state,
               editor: updatedEditor,
               history: {
                  ...state.history,
                  currentIndex: prevIndex,
               },
            };

            return newEditorState;
         }

         return state;
      }
      case 'LOAD_DATA': {
         const loadedEditor = {
            ...initialState.editor,
            ...state.editor,
            elements: action.payload.elements || initialEditorState.elements,
            liveMode: !!action.payload.withLive,
         };

         const editorState: EditorState = {
            ...initialState,
            editor: loadedEditor,
            history: {
               currentIndex: 0,
               history: [loadedEditor], // Initialize history with loaded state
            },
         };

         return editorState;
      }
      case 'SET_PROJECT_PAGE_ID': {
         const { projectPageId } = action.payload;

         const updatedEditor = {
            ...state.editor,
            projectPageId,
         };

         const newEditorState = {
            ...state,
            editor: updatedEditor,
         };

         return newEditorState;
      }
      case 'SET_ACTIVE_TAB': {
         const { activeTab } = action.payload;

         // Save to localStorage for persistence
         if (typeof window !== 'undefined') {
            localStorage.setItem('project-tab-name', activeTab);
         }

         const updatedEditor = {
            ...state.editor,
            activeTab,
         };

         const newEditorState = {
            ...state,
            editor: updatedEditor,
         };

         return newEditorState;
      }
      case 'MOVE_ELEMENT': {
         const { elementId, targetContainerId, targetIndex } = action.payload;

         const updatedElements = moveElement(
            state.editor.elements,
            elementId,
            targetContainerId,
            targetIndex,
         );

         const updatedEditor = {
            ...state.editor,
            elements: updatedElements,
         };

         const updatedHistory = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            updatedEditor,
         ];

         const moveState: EditorState = {
            ...state,
            editor: updatedEditor,
            history: {
               ...state.history,
               history: updatedHistory,
               currentIndex: updatedHistory.length - 1,
            },
         };

         return moveState;
      }
      case 'SET_COMPACT_SIDEBAR': {
         const { compactSidebar } = action.payload;

         const updatedEditor = {
            ...state.editor,
            compactSidebar,
         };

         const newEditorState = {
            ...state,
            editor: updatedEditor,
         };

         return newEditorState;
      }
      case 'SET_WINDOW_WIDTH': {
         const { windowWidth } = action.payload;

         const updatedEditor = {
            ...state.editor,
            windowWidth,
         };

         const newEditorState = {
            ...state,
            editor: updatedEditor,
         };

         return newEditorState;
      }
      case 'SET_ACTIVE_LOCALE': {
         const { locale, isDefault } = action.payload;

         return {
            ...state,
            editor: {
               ...state.editor,
               activeLocale: locale,
               isDefaultLocale: isDefault,
               // Cleared here; the caller is responsible for dispatching
               // LOAD_TRANSLATIONS once the new locale's map has been fetched.
               translations: {},
            },
         };
      }
      case 'LOAD_TRANSLATIONS': {
         return {
            ...state,
            editor: {
               ...state.editor,
               translations: action.payload.translations,
            },
         };
      }
      case 'SET_TRANSLATION': {
         const { elementId, field, value } = action.payload;

         return {
            ...state,
            editor: {
               ...state.editor,
               translations: {
                  ...state.editor.translations,
                  [elementId]: {
                     ...state.editor.translations[elementId],
                     [field]: value,
                  },
               },
            },
         };
      }
      default: {
         return state;
      }
   }
};

export type EditorContextData = {
   device: DeviceTypes;
   previewMode: boolean;
   setPreviewMode: (previewMode: boolean) => void;
   setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
   editor: EditorState;
   dispatch: React.Dispatch<EditorAction>;
   projectId: string;
   pageDetails: ProjectPage | null;
}>({
   editor: initialState,
   dispatch: () => undefined,
   projectId: '',
   pageDetails: null,
});

type EditorProps = {
   children: React.ReactNode;
   projectId: string;
   pageDetails: ProjectPage;
};

const EditorProvider: React.FC<EditorProps> = ({
   children,
   projectId,
   pageDetails,
}) => {
   const [editor, dispatch] = useReducer(editorReducer, initialState);

   useEffect(() => {
      const handleResize = () => {
         dispatch({
            type: 'SET_WINDOW_WIDTH',
            payload: { windowWidth: window.innerWidth },
         });
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <EditorContext.Provider
         value={{
            editor,
            dispatch,
            projectId,
            pageDetails,
         }}
      >
         {children}
      </EditorContext.Provider>
   );
};

export default EditorProvider;
