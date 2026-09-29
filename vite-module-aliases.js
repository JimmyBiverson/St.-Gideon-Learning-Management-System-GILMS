import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createModuleViteAliases() {
   return [
      {
         find: '@/billing',
         replacement: path.resolve(__dirname, 'Modules/Billing/resources/js'),
      },
      {
         find: '@/blog',
         replacement: path.resolve(__dirname, 'Modules/Blog/resources/js'),
      },
      {
         find: '@/course',
         replacement: path.resolve(__dirname, 'Modules/Course/resources/js'),
      },
      {
         find: '@/exam',
         replacement: path.resolve(__dirname, 'Modules/Exam/resources/js'),
      },
      {
         find: '@/frontend',
         replacement: path.resolve(__dirname, 'Modules/Frontend/resources/js'),
      },
      {
         find: '@/installer',
         replacement: path.resolve(__dirname, 'Modules/Installer/resources/js'),
      },
      {
         find: '@/language',
         replacement: path.resolve(__dirname, 'Modules/Language/resources/js'),
      },
      {
         find: '@/maintenance',
         replacement: path.resolve(
            __dirname,
            'Modules/Maintenance/resources/js',
         ),
      },
      {
         find: '@/certification',
         replacement: path.resolve(
            __dirname,
            'Modules/Certification/resources/js',
         ),
      },
      {
         find: '@/aiassistant',
         replacement: path.resolve(__dirname, 'Modules/AIAssistant/resources/js'),
      },
      {
         find: '@/store',
         replacement: path.resolve(__dirname, 'Modules/Store/resources/js'),
      },
      //   {
      //       find: '@',
      //       replacement: path.resolve(__dirname, 'resources/js'),
      //   },
   ];
}
