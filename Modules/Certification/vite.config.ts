import path from 'node:path';
import { fileURLToPath } from 'node:url';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
   build: {
      outDir: path.resolve(__dirname, '../../public/build-certification'),
      emptyOutDir: true,
      manifest: true,
   },
   plugins: [
      laravel({
         publicDirectory: path.resolve(__dirname, '../../public'),
         buildDirectory: 'build-certification',
         input: [
            // path.resolve(__dirname, 'resources/js/app.tsx'),
         ],
         refresh: true,
      }),
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'resources/js'),
      },
   },
});
