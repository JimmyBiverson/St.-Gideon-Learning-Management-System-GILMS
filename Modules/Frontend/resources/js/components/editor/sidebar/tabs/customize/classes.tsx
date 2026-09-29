import { Label } from '@/components/ui/label';
import { TailwindClassInput } from '@/frontend/components/editor/tailwind-class-input';
import { useEditor } from '@/frontend/hooks/use-editor';

const Classes = () => {
   const { editor, dispatch } = useEditor();

   // Get default classes for element types that should have them
   const getDefaultClasses = (elementType: EditorBtns | null): string => {
      const defaultClassMap: Record<string, string> = {
         text: 'flex items-center gap-2',
         heading: 'flex items-center gap-2',
         paragraph: 'flex items-center gap-2',
         button: 'flex items-center gap-2',
         label: 'flex items-center gap-2',
         span: 'outline-none',
      };

      return defaultClassMap[elementType as string] || '';
   };

   // Get current classes, with fallback to defaults for elements without className
   const getCurrentClasses = (): string => {
      const className = editor.editor.selectedElement.className;

      // If element has className, use it
      if (className) {
         return className;
      }

      // Otherwise, return default classes for this element type
      return getDefaultClasses(editor.editor.selectedElement.type);
   };

   return (
      <div className="flex flex-col gap-2 px-[1px]">
         <Label>CSS/Tailwind Classes</Label>
         <TailwindClassInput
            id="className"
            placeholder="e.g. flex gap-4 rounded-lg shadow-md"
            value={editor.editor.selectedElement.className || ''}
            onChange={(value: string) => {
               if (!editor.editor.isDefaultLocale) {
                  return;
               }

               dispatch({
                  type: 'UPDATE_ELEMENT',
                  payload: {
                     elementDetails: {
                        ...editor.editor.selectedElement,
                        className: value,
                     },
                  },
               });
            }}
         />
         <p className="text-xs text-muted-foreground">
            Type to see Tailwind CSS autocomplete suggestions. Use ↑↓ arrows to
            navigate, Enter/Tab to select. Use only the suggested Tailwind
            classes for proper styling. Classes without suggestions will be
            consider as custom CSS classes.
         </p>
      </div>
   );
};

export default Classes;
