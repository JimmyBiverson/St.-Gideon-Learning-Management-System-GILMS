import Main from '@/layouts/main';
import { Head } from '@inertiajs/react';
import EditorNavigation from '@/frontend/components/editor/navbar';
import EditorPageBuilder from '@/frontend/components/editor/page-builder';
import EditorSidebar from '@/frontend/components/editor/sidebar';
import EditorProvider from '@/frontend/providers/editor-provider';

export default function Index({ project, page }: EditorProps) {
   return (
      <EditorProvider projectId={project.id.toString()} pageDetails={page}>
         <Head title={`Edit ${page.title}`} />

         <Main>
            <div id="builderEditor" className="flex bg-background">
               <EditorSidebar />

               <div className="h-screen w-full">
                  <EditorNavigation />

                  <EditorPageBuilder />
               </div>
            </div>
         </Main>
      </EditorProvider>
   );
}
