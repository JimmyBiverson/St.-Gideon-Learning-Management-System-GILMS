import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import ActionsWrapper from '@/frontend/components/editor/dnd/ActionsWrapper';
import { useEditor } from '@/frontend/hooks/use-editor';
import { addElement } from '@/frontend/lib/add-element';

const LiveElementWrapper = ({
   element,
   children,
   tag: Tag = 'div',
   isContainer = false,
   applyStyles = true,
   wrapperClassName = 'relative',
   htmlAttributes = {},
   contentEditable,
   onKeyDown,
   onBlur,
   suppressContentEditableWarning,
}: ElementWrapperProps) => {
   const styles = applyStyles ? element.styles : {};

   const {
      style: htmlStyle,
      className: htmlClassName,
      ...restHtmlAttributes
   } = htmlAttributes || {};

   const userEventHandlers = React.useMemo(() => {
      const handlersRaw = element.htmlAttributes?.eventHandlers || {};
      const handlers: Record<string, any> = {};

      Object.keys(handlersRaw).forEach((key) => {
         const handlerString = handlersRaw[key];

         if (typeof handlerString === 'string') {
            try {
               // Recreate function from string

               handlers[key] = new Function('return ' + handlerString)();
            } catch (error) {
               console.error(`Failed to recreate event handler ${key}:`, error);
            }
         } else if (typeof handlerString === 'function') {
            // Already a function (from code-based pages)
            handlers[key] = handlerString;
         }
      });

      return handlers;
   }, [element.htmlAttributes?.eventHandlers]);

   const { onClick: userOnClick, ...otherEventHandlers } = userEventHandlers;
   const TagComponent = Tag as any;

   if (contentEditable !== undefined) {
      return (
         <TagComponent
            style={htmlStyle || styles}
            className={cn('outline-none', htmlClassName)}
            {...restHtmlAttributes}
            {...(otherEventHandlers || {})}
            onClick={(e: React.MouseEvent) => {
               userOnClick?.(e as any);
            }}
            contentEditable={contentEditable}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            suppressContentEditableWarning={suppressContentEditableWarning}
         >
            {children}
         </TagComponent>
      );
   }

   return (
      <TagComponent
         style={isContainer ? styles : htmlStyle || styles}
         className={cn(
            wrapperClassName,
            isContainer ? element.className : undefined,
            htmlClassName,
         )}
         {...restHtmlAttributes}
         {...(otherEventHandlers || {})}
         onClick={(e: React.MouseEvent) => {
            userOnClick?.(e as any);
         }}
      >
         {children}
      </TagComponent>
   );
};

type EditableElementWrapperProps = ElementWrapperProps & {
   editor: EditorState['editor'];
   dispatch: React.Dispatch<EditorAction>;
};

const EditableElementWrapper = ({
   element,
   children,
   tag: Tag = 'div',
   isContainer = false,
   applyStyles = true,
   wrapperClassName = 'relative',
   showDeleteButton = true,
   htmlAttributes = {},
   contentEditable,
   onKeyDown,
   onBlur,
   suppressContentEditableWarning,
   editor,
   dispatch,
}: EditableElementWrapperProps) => {
   const { id, type } = element;
   const styles = applyStyles ? element.styles : {};
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
      active,
   } = useSortable({
      id,
      data: {
         element,
         type: 'existing-element',
         containerId: element.id,
      },
      disabled: false,
   });
   const showDropIndicator = isOver && active && isContainer;
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.3 : 1,
   };
   const handleOnClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({
         type: 'CHANGE_CLICKED_ELEMENT',
         payload: { elementDetails: element },
      });
   };
   const handleOnDrop = (event: React.DragEvent) => {
      event.stopPropagation();
      const componentType = event.dataTransfer.getData(
         'componentType',
      ) as EditorBtns;
      addElement(componentType, id, dispatch);
   };
   const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
   };
   const getWrapperDisplay = (): string => {
      if (isContainer) {
         return wrapperClassName || 'relative';
      }

      const blockElements = [
         'hr',
         'dropdownMenuLabel',
         'dropdownMenuItem',
         'accordionItem',
         'tabs',
      ];

      if (blockElements.includes(type as string)) {
         return cn('relative block w-full', wrapperClassName);
      }

      return cn('relative inline-block', wrapperClassName);
   };
   const {
      style: htmlStyle,
      className: htmlClassName,
      ...restHtmlAttributes
   } = htmlAttributes || {};

   const userEventHandlers = React.useMemo(() => {
      const handlersRaw = element.htmlAttributes?.eventHandlers || {};
      const handlers: Record<string, any> = {};

      Object.keys(handlersRaw).forEach((key) => {
         const handlerString = handlersRaw[key];

         if (typeof handlerString === 'string') {
            try {
               handlers[key] = new Function('return ' + handlerString)();
            } catch (error) {
               console.error(`Failed to recreate event handler ${key}:`, error);
            }
         } else if (typeof handlerString === 'function') {
            handlers[key] = handlerString;
         }
      });

      return handlers;
   }, [element.htmlAttributes?.eventHandlers]);

   const { onClick: userOnClick, ...otherEventHandlers } = userEventHandlers;
   const TagComponent = Tag as any;

   if (contentEditable !== undefined) {
      return (
         <div
            ref={setNodeRef}
            style={style}
            className={cn(getWrapperDisplay(), {
               '!border-solid !border-blue-500':
                  editor.selectedElement.id === id,
               '!border !border-dashed': true,
               'z-50': isDragging,
            })}
            onClick={handleOnClick}
         >
            <ActionsWrapper
               id={id}
               element={element}
               listeners={listeners}
               attributes={attributes}
               showDeleteButton={showDeleteButton}
               showDropIndicator={showDropIndicator}
            >
               <TagComponent
                  style={htmlStyle || styles}
                  className={cn('outline-none', htmlClassName)}
                  {...restHtmlAttributes}
                  {...(otherEventHandlers || {})}
                  onClick={(e: React.MouseEvent) => {
                     userOnClick?.(e as any);
                  }}
                  contentEditable={contentEditable}
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  suppressContentEditableWarning={
                     suppressContentEditableWarning
                  }
               >
                  {children}
               </TagComponent>
            </ActionsWrapper>
         </div>
      );
   }

   return (
      <TagComponent
         ref={setNodeRef}
         style={{
            ...(isContainer ? styles : htmlStyle || styles),
            ...style,
         }}
         className={cn(
            getWrapperDisplay(),
            {
               '!border-solid !border-blue-500':
                  editor.selectedElement.id === id,
               '!border !border-dashed': true,
               'z-50': isDragging,
            },
            isContainer ? element.className : undefined,
            htmlClassName,
         )}
         {...restHtmlAttributes}
         onClick={handleOnClick}
         onDrop={isContainer ? handleOnDrop : undefined}
         onDragOver={isContainer ? handleDragOver : undefined}
      >
         <ActionsWrapper
            id={id}
            element={element}
            listeners={listeners}
            attributes={attributes}
            showDeleteButton={showDeleteButton}
            showDropIndicator={showDropIndicator}
         >
            {children}
         </ActionsWrapper>
      </TagComponent>
   );
};

const ElementWrapper = (props: ElementWrapperProps) => {
   const { dispatch, editor: editorState } = useEditor();
   const { editor } = editorState;

   if (editor.liveMode) {
      return <LiveElementWrapper {...props} />;
   }

   return (
      <EditableElementWrapper {...props} editor={editor} dispatch={dispatch} />
   );
};

export default ElementWrapper;
