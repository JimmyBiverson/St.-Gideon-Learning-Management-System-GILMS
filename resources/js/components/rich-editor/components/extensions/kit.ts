import type { Extensions } from '@tiptap/core';
import {
   CharacterCount,
   CodeBlock,
   Color,
   Highlight,
   Image,
   ImageCaption,
   ImageFigure,
   Link,
   ListKeymap,
   Placeholder,
   Selection,
   StarterKit,
   Subscript,
   Superscript,
   Table,
   TextAlign,
   TextStyle,
   Underline,
   Youtube,
} from '.';

const ExtensionKit: Extensions = [
   StarterKit.configure({
      horizontalRule: false,
      hardBreak: false,
      codeBlock: false,
      link: false,
      underline: false,
      listKeymap: false,
   }),
   Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: true,
      placeholder: ({ editor, node }) => {
         const placeholder = (
            editor.options.editorProps as {
               placeholder?: { paragraph?: string; imageCaption?: string };
            }
         ).placeholder;

         switch (node.type.name) {
            case ImageCaption.name:
               return placeholder?.imageCaption ?? '';
            default:
               return placeholder?.paragraph ?? '';
         }
      },
   }),
   Selection,
   CharacterCount,
   Underline,
   Superscript,
   Subscript,
   TextAlign.configure({ types: ['heading', 'paragraph'] }),
   TextStyle,
   Color,
   Highlight.configure({ multicolor: true }),
   ListKeymap,
   Link,
   Image,
   ImageFigure,
   CodeBlock,
   Youtube,
   Table,
];

export default ExtensionKit;
