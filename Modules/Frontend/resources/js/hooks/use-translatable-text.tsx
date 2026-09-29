import { useEditor } from '@/frontend/hooks/use-editor';

/**
 * Translatable scalar text fields on an EditorElement.content object.
 * href, items[], and options[] are intentionally out of scope for v1.
 */
export type TranslatableField =
   | 'innerText'
   | 'alt'
   | 'placeholder'
   | 'label'
   | 'formTitle'
   | 'formDescription'
   | 'formButton'
   // Page-level SEO fields, keyed against the '__page__' sentinel element id
   // rather than a real EditorElement — see settings/index.tsx.
   | 'page_title'
   | 'page_description';

export const TRANSLATABLE_FIELDS: TranslatableField[] = [
   'innerText',
   'alt',
   'placeholder',
   'label',
   'formTitle',
   'formDescription',
   'formButton',
   'page_title',
   'page_description',
];

export const PAGE_SENTINEL_ELEMENT_ID = '__page__';

export const isTranslatableField = (
   field: string,
): field is TranslatableField =>
   (TRANSLATABLE_FIELDS as string[]).includes(field);

const isLeafContent = (
   content: EditorElement['content'],
): content is Record<string, any> =>
   !!content && typeof content === 'object' && !Array.isArray(content);

/**
 * Reads and commits one translatable text field on an element.
 *
 * Default locale: reads/writes `element.content[field]` directly via the
 * existing UPDATE_ELEMENT flow — byte-for-byte the same behavior as before
 * this feature existed.
 *
 * Non-default locale: reads the per-locale translation, falling back to the
 * default-locale text so the canvas never shows a blank or a raw key; writes
 * go to the translations overlay only — `element.content` (the default-locale
 * source) is never touched from a translation session.
 */
export const useTranslatableText = (
   element: EditorElement,
   field: TranslatableField,
) => {
   const { editor, dispatch } = useEditor();
   const { activeLocale, isDefaultLocale, translations } = editor.editor;

   const content = element.content;
   const defaultValue = isLeafContent(content)
      ? ((content[field] as string | undefined) ?? '')
      : '';

   const value = isDefaultLocale
      ? defaultValue
      : (translations[element.id]?.[field] ?? defaultValue);

   const commit = (newValue: string) => {
      if (isDefaultLocale) {
         if (!isLeafContent(content)) {
            return;
         }

         dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
               elementDetails: {
                  ...element,
                  content: { ...content, [field]: newValue },
               },
            },
         });

         return;
      }

      dispatch({
         type: 'SET_TRANSLATION',
         payload: { elementId: element.id, field, value: newValue },
      });
   };

   return { value, commit, activeLocale, isDefaultLocale };
};
