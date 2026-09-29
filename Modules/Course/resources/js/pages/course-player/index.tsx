import {
   Sidebar,
   SidebarInset,
   SidebarProvider,
} from '@/components/ui/sidebar';
import Footer from '@/layouts/footer/index';
import Main from '@/layouts/main';
import { getCompletedContents, getCourseCompletion } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Navbar from './layout/navbar';
import ContentList from './partials/content-list';
import ContentSummery from './partials/content-summery';
import LessonViewer from './partials/lesson-viewer';
import QuizViewer from './partials/quiz-viewer';

const Index = (props: CoursePlayerProps) => {
   const { type, watching, watchHistory, direction } = props;
   const [sidebarWidth, setSidebarWidth] = useState(
      'calc(var(--spacing) * 100)',
   );

   const completed = getCompletedContents(watchHistory);
   const completion = getCourseCompletion(props.course, completed);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 880) {
            setSidebarWidth('calc(var(--spacing) * 70)'); // Mobile
         } else if (window.innerWidth < 1024) {
            setSidebarWidth('calc(var(--spacing) * 80)'); // Tablet
         } else {
            setSidebarWidth('calc(var(--spacing) * 100)'); // Desktop
         }
      };

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <SidebarProvider
         className="flex-col"
         style={
            {
               '--sidebar-width': sidebarWidth,
            } as React.CSSProperties
         }
      >
         <Navbar />

         <div className="flex w-full flex-row-reverse">
            <Sidebar
               side={direction === 'rtl' ? 'left' : 'right'}
               className="top-[60px] shadow-lg"
            >
               <ContentList
                  completedContents={completed}
                  courseCompletion={completion}
               />
            </Sidebar>

            <SidebarInset>
               <Main>
                  {type === 'lesson' ? (
                     <>
                        <LessonViewer
                           key={watching.id}
                           lesson={watching as SectionLesson}
                        />
                        <ContentSummery />
                     </>
                  ) : (
                     <QuizViewer quiz={watching as SectionQuiz} />
                  )}

                  <Footer />
               </Main>
            </SidebarInset>
         </div>
      </SidebarProvider>
   );
};

export default Index;
