import { cn } from '@/lib/utils';
import { Link as InertiaLink } from '@inertiajs/react';
import React from 'react';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import { useTranslatableText } from '@/frontend/hooks/use-translatable-text';
import ElementWrapper from '../element-wrapper';

interface LinkProps {
   element: EditorElement;
}

const EditorLink: React.FC<LinkProps> = ({ element }) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const linkRef = React.useRef<HTMLAnchorElement>(null);

   const content = element.content;
   const hasChildren = Array.isArray(content);

   const { value: translatableValue, commit } = useTranslatableText(
      element,
      'innerText',
   );
   const innerText =
      !hasChildren && typeof content === 'object'
         ? translatableValue || 'Link'
         : 'Link';

   // Check htmlAttributes first (where settings panel saves), then fallback to content.href
   const href =
      element.htmlAttributes?.href ||
      (!hasChildren && typeof content === 'object' && 'href' in content
         ? content.href
         : '#');

   // Get type from htmlAttributes (default to 'native')
   const linkType =
      (element.htmlAttributes?.type as 'native' | 'inertia') || 'native';

   // Update innerText only when content changes from external source (text-only mode)
   React.useEffect(() => {
      if (
         !hasChildren &&
         linkRef.current &&
         linkRef.current.innerText !== innerText
      ) {
         linkRef.current.innerText = innerText as string;
      }
   }, [innerText, hasChildren]);

   const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
         event.preventDefault();
      }
   };

   const { id, type } = element;
   const childIds = hasChildren
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   if (!hasChildren) {
      // Live mode: render clean link without wrapper
      if (editor.liveMode) {
         // Recreate event handler functions from strings
         const eventHandlersRaw = element.htmlAttributes?.eventHandlers || {};
         const eventHandlers: Record<string, any> = {};
         Object.keys(eventHandlersRaw).forEach((key) => {
            const handlerString = eventHandlersRaw[key];

            if (typeof handlerString === 'string') {
               try {
                  eventHandlers[key] = new Function(
                     'return ' + handlerString,
                  )();
               } catch (error) {
                  console.error(
                     `Failed to recreate event handler ${key}:`,
                     error,
                  );
               }
            } else if (typeof handlerString === 'function') {
               eventHandlers[key] = handlerString;
            }
         });

         if (linkType === 'inertia') {
            return (
               <InertiaLink
                  href={href as string}
                  className={cn('inline-block', element.className)}
                  style={element.styles}
                  {...eventHandlers}
               >
                  {innerText as string}
               </InertiaLink>
            );
         }

         return (
            <a
               href={href as string}
               className={cn('inline-block', element.className)}
               style={element.styles}
               {...eventHandlers}
            >
               {innerText as string}
            </a>
         );
      }

      // Editor mode: Text-only mode with contentEditable
      return (
         <ElementWrapper
            tag="a"
            element={element}
            wrapperClassName="relative inline-block"
            htmlAttributes={{
               ref: linkRef,
               href: undefined, // Always undefined in editor mode
            }}
            contentEditable={!editor.liveMode}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning
            onBlur={(e) => {
               const newInnerText = (e.target as HTMLAnchorElement).innerText;

               // Only dispatch if content actually changed
               if (newInnerText !== innerText) {
                  commit(newInnerText);
               }
            }}
         >
            {innerText as string}
         </ElementWrapper>
      );
   }

   // Container mode: render children
   // Live mode: render clean link with children
   if (editor.liveMode) {
      // Recreate event handler functions from strings
      const eventHandlersRaw = element.htmlAttributes?.eventHandlers || {};
      const eventHandlers: Record<string, any> = {};
      Object.keys(eventHandlersRaw).forEach((key) => {
         const handlerString = eventHandlersRaw[key];

         if (typeof handlerString === 'string') {
            try {
               eventHandlers[key] = new Function('return ' + handlerString)();
            } catch (error) {
               console.error(`Failed to recreate event handler ${key}:`, error);
            }
         } else if (typeof handlerString === 'function') {
            eventHandlers[key] = handlerString;
         }
      });

      return linkType === 'inertia' ? (
         <InertiaLink
            href={href as string}
            className={cn('inline-block', element.className)}
            style={element.styles}
            {...eventHandlers}
         >
            {Array.isArray(content) && (
               <SortableList items={childIds} id={id} content={content} />
            )}
         </InertiaLink>
      ) : (
         <a
            href={href as string}
            className={cn('inline-block', element.className)}
            style={element.styles}
            {...eventHandlers}
         >
            {Array.isArray(content) && (
               <SortableList items={childIds} id={id} content={content} />
            )}
         </a>
      );
   }

   // Editor mode: container with wrapper
   return (
      <ElementWrapper
         tag="a"
         element={element}
         isContainer={true}
         wrapperClassName={cn('relative inline-block transition-all', {
            'p-2': !editor.liveMode && !editor.previewMode,
         })}
         htmlAttributes={{
            href: undefined, // Always undefined in editor mode
         }}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorLink;
