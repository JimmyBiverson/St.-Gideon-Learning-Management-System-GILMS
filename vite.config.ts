import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { createModuleViteAliases } from './vite-module-aliases';

export default defineConfig({
   plugins: [
      laravel({
         input: ['resources/css/app.css', 'resources/js/app.tsx'],
         refresh: true,
      }),
      inertia(),
      react({
         // Section templates under page-jsx are invoked as plain functions from
         // editor palette data (e.g. Hero1()) during module init; the React Compiler
         // assumes components only run under React's dispatcher, which breaks that pattern.
         //
         // React Compiler is a production-only optimisation — running it on every
         // HMR cycle in dev mode multiplies per-file Babel transform cost significantly.
         babel: (id) => ({
            plugins:
               process.env.NODE_ENV === 'production' && !id.includes('page-jsx')
                  ? ['babel-plugin-react-compiler']
                  : [],
         }),
      }),
      tailwindcss(),
      wayfinder({
         formVariants: true,
      }),
   ],
   resolve: {
      dedupe: ['react', 'react-dom'],
      tsconfigPaths: true,
      alias: createModuleViteAliases(),
   },
   optimizeDeps: {
      // These are heavy, multi-package libraries that are only ever pulled in
      // by specific lazily-loaded Inertia pages (editors, charts, uploaders).
      // Without listing them here, Vite only discovers them the first time you
      // navigate to a page that uses them, which forces a dependency
      // re-optimization + full page reload mid-session. Pre-bundling them all
      // upfront moves that cost to server start instead of scattering it
      // across your editing session.
      include: [
         '@tiptap/react',
         '@tiptap/starter-kit',
         '@tiptap/extension-bubble-menu',
         '@tiptap/extension-bullet-list',
         '@tiptap/extension-character-count',
         '@tiptap/extension-code-block-lowlight',
         '@tiptap/extension-color',
         '@tiptap/extension-highlight',
         '@tiptap/extension-image',
         '@tiptap/extension-link',
         '@tiptap/extension-list-keymap',
         '@tiptap/extension-ordered-list',
         '@tiptap/extension-placeholder',
         '@tiptap/extension-subscript',
         '@tiptap/extension-superscript',
         '@tiptap/extension-table',
         '@tiptap/extension-table-cell',
         '@tiptap/extension-table-header',
         '@tiptap/extension-table-row',
         '@tiptap/extension-text-align',
         '@tiptap/extension-text-style',
         '@tiptap/extension-underline',
         'codemirror',
         '@codemirror/autocomplete',
         '@codemirror/closebrackets',
         '@codemirror/lang-css',
         '@codemirror/lang-html',
         '@codemirror/lang-json',
         '@codemirror/lint',
         '@codemirror/matchbrackets',
         'recharts',
         'jspdf',
         'embla-carousel-react',
         'embla-carousel-autoplay',
         '@zoom/meetingsdk',
         '@yaireo/tagify',
         'react-google-recaptcha',
         'tus-js-client',
         'rehype-parse',
         'rehype-react',
      ],
   },
   server: {
      // Pre-transform the entry point and shared UI/layout files on server
      // start so the first request for them isn't a cold compile.
      warmup: {
         clientFiles: [
            './resources/js/app.tsx',
            './resources/js/components/ui/*.tsx',
            './resources/js/layouts/**/*.tsx',
         ],
      },
   },
   esbuild: {
      drop:
         process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
   } as any,
   build: {
      cssCodeSplit: true,
      minify: true,
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      // rollupOptions: {
      //    output: {
      //       manualChunks(id) {
      //          if (id.includes('node_modules')) {
      //             if (id.includes('@inertiajs')) {
      //                return 'inertia';
      //             }

      //             if (id.includes('react-dom')) {
      //                return 'react-dom';
      //             }

      //             if (id.includes('react') || id.includes('scheduler')) {
      //                return 'react';
      //             }

      //             if (id.includes('ziggy-js') || id.includes('wayfinder')) {
      //                return 'routing';
      //             }

      //             if (id.includes('@tiptap') || id.includes('prosemirror')) {
      //                return 'editor';
      //             }

      //             if (id.includes('@codemirror') || id.includes('@lezer') || id.includes('codemirror')) {
      //                return 'codemirror';
      //             }

      //             if (id.includes('@radix-ui') || id.includes('radix-ui')) {
      //                return 'ui-radix';
      //             }

      //             if (id.includes('lucide-react')) {
      //                return 'icons';
      //             }

      //             if (id.includes('@zoom')) {
      //                return 'zoom';
      //             }

      //             if (id.includes('jspdf') || id.includes('html2canvas')) {
      //                return 'pdf';
      //             }

      //             if (id.includes('recharts') || id.includes('d3-')) {
      //                return 'charts';
      //             }

      //             return 'vendor';
      //          }
      //       },
      //    },
      // },
   },
});
