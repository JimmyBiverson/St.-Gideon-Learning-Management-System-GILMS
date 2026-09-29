import { mergeAttributes } from '@tiptap/core';
import { Image as TiptapImage } from '@tiptap/extension-image';

declare module '@tiptap/core' {
   interface Commands<ReturnType> {
      customImage: {
         insertImage: (options: {
            src: string;
            alt?: string;
            width?: number;
            height?: number;
         }) => ReturnType;
      };
   }
}

export const Image = TiptapImage.extend({
   addAttributes() {
      return {
         src: {
            default: '',
            parseHTML: (element) => element.getAttribute('src'),
            renderHTML: (attributes) => ({ src: attributes.src }),
         },
         alt: {
            default: undefined,
            parseHTML: (element) => element.getAttribute('alt'),
            renderHTML: (attrs) => {
               if (!attrs.alt) {
                  return {};
               }

               return { alt: attrs.alt };
            },
         },
         width: {
            default: null,
            parseHTML: (element) => {
               const widthStyle = element.style.width;

               if (widthStyle) {
                  const match = widthStyle.match(/(\d+)%/);

                  return match ? Number.parseInt(match[1]) : null;
               }

               return null;
            },
            renderHTML: (attrs) => {
               if (!attrs.width) {
                  return {};
               }

               return { width: `${attrs.width}%` };
            },
         },
         naturalWidth: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-width'),
            renderHTML: (attrs) => ({ 'data-width': attrs.naturalWidth }),
         },
         naturalHeight: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-height'),
            renderHTML: (attrs) => ({ 'data-height': attrs.naturalHeight }),
         },
         placement: {
            default: 'center',
            parseHTML: (element) => {
               const style = element.style;

               if (style.marginLeft === '0' && style.marginRight === 'auto') {
                  return 'left';
               }

               if (style.marginLeft === 'auto' && style.marginRight === '0') {
                  return 'right';
               }

               return 'center';
            },
            renderHTML: (attrs) => {
               if (!attrs.placement || attrs.placement === 'center') {
                  return {};
               }

               let marginLeft = 'auto';
               let marginRight = 'auto';

               if (attrs.placement === 'left') {
                  marginLeft = '0';
                  marginRight = 'auto';
               } else if (attrs.placement === 'right') {
                  marginLeft = 'auto';
                  marginRight = '0';
               }

               return { marginLeft, marginRight };
            },
         },
      };
   },

   parseHTML() {
      return [{ tag: 'img' }];
   },

   renderHTML({ HTMLAttributes }) {
      // Merge attributes and handle placement styles
      const merged = mergeAttributes(
         this.options.HTMLAttributes,
         HTMLAttributes,
      );

      // Convert marginLeft and marginRight to inline style
      if (merged.marginLeft || merged.marginRight) {
         const marginLeft = merged.marginLeft || 'auto';
         const marginRight = merged.marginRight || 'auto';
         const marginStyle = `margin-left: ${marginLeft}; margin-right: ${marginRight};`;

         // Remove margin attributes and add/update style
         delete merged.marginLeft;
         delete merged.marginRight;
         merged.style = merged.style
            ? `${merged.style}; ${marginStyle}`
            : marginStyle;
      }

      return ['img', merged];
   },

   addCommands() {
      return {
         ...this.parent?.(),
         insertImage:
            ({ width, height, ...options }) =>
            ({ commands }) => {
               return commands.setImage({
                  ...options,
                  naturalWidth: width,
                  naturalHeight: height,
               } as any);
            },
      };
   },

   //   addProseMirrorPlugins() {
   //     return [
   //       ImagePlugin({
   //         name: this.name,
   //       }),
   //     ];
   //   },
});

export default Image;
