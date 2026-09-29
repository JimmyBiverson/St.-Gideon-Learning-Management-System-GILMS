import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Renderer } from '@/components/rich-editor';
import LandingLayout from '@/layouts/landing';

import Hero from './partials/hero';
import Sections from './sections';
import Career from './sections/career';

export interface InnerPageProps extends SharedData {
   page: Page;
   topInstructors: Instructor[];
   jobCirculars: Pagination<JobCircular>;
}

const Index = ({ page, jobCirculars }: InnerPageProps) => {
   return (
      <>
         <Head title={page.name} />

         <Hero innerPage={page} />

         {page.sections.length > 0 && <Sections sections={page.sections} />}

         {page.slug === 'careers' && jobCirculars && (
            <Career jobCirculars={jobCirculars} />
         )}

         <div className="container">
            {page.description && (
               <div className="mx-auto my-20 max-w-3xl rounded-2xl bg-muted px-6 py-10 md:px-20">
                  <Renderer value={page.description} />
               </div>
            )}
         </div>
      </>
   );
};

Index.layout = (page: ReactNode) => <LandingLayout children={page} />;

export default Index;
