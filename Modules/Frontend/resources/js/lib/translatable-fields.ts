import {
   TRANSLATABLE_FIELDS,
   type TranslatableField,
} from '@/frontend/hooks/use-translatable-text';

export type TranslatableRow = {
   elementId: string;
   field: TranslatableField;
   elementType: EditorBtns;
   elementName: string;
   defaultValue: string;
};

const isLeafContent = (
   content: EditorElement['content'],
): content is Record<string, any> =>
   !!content && typeof content === 'object' && !Array.isArray(content);

/**
 * Enumerates every translatable scalar text field on a page's element tree.
 * Mirrors the tree shape in find-element.ts / editor-provider.tsx exactly:
 * `content` is either a list of child elements, an object carrying a
 * `children` list (dropdown/popover), or a leaf with scalar fields.
 */
export const walkTranslatableElements = (
   elements: EditorElement[],
): TranslatableRow[] => {
   const rows: TranslatableRow[] = [];

   const visit = (els: EditorElement[]) => {
      for (const element of els) {
         const content = element.content;

         if (Array.isArray(content)) {
            visit(content);

            continue;
         }

         if (
            isLeafContent(content) &&
            'children' in content &&
            Array.isArray((content as any).children)
         ) {
            visit((content as any).children as EditorElement[]);

            continue;
         }

         if (!isLeafContent(content)) {
            continue;
         }

         for (const field of TRANSLATABLE_FIELDS) {
            const value = content[field];

            if (typeof value !== 'string' || value.trim() === '') {
               continue;
            }

            rows.push({
               elementId: element.id,
               field,
               elementType: element.type,
               elementName: element.name,
               defaultValue: value,
            });
         }
      }
   };

   visit(elements);

   return rows;
};
