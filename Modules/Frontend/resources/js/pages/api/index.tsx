import Breadcrumbs from '@/components/breadcrumbs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DashboardLayout from '@/layouts/dashboard/layout';
import { api } from '@/routes/frontend';
import { router } from '@inertiajs/react';
import { Info } from 'lucide-react';
import type { ReactNode } from 'react';
import BlogsCollection from '@/frontend/components/blogs-collection';
import CourseCategoriesCollection from '@/frontend/components/course-categories-collection';
import CoursesCollection from '@/frontend/components/courses-collection';
import InstructorsCollection from '@/frontend/components/instructors-collection';
import SponsorsCollection from '@/frontend/components/sponsors-collection';
import TestimonialsCollection from '@/frontend/components/testimonials-collection';

interface Testimonial {
   name: string;
   image: string;
   rating: number;
   description: string;
}

interface Sponsor {
   image: string;
   url: string;
}

export type FrontendPageAPIParams = 'best' | 'top' | 'new' | 'featured';

export interface ApiPageProps {
   collections: {
      courses?: {
         best: Course | null;
         top: Course[];
         new: Course[];
         featured: Course[];
      };
      exams?: {
         best: Exam | null;
         top: Exam[];
         new: Exam[];
         featured: Exam[];
      };
      blogs?: {
         best: Blog | null;
         top: Blog[];
         new: Blog[];
         featured: Blog[];
      };
      instructors?: {
         best: Instructor | null;
         top: Instructor[];
         new: Instructor[];
         featured: Instructor[];
      };
      course_categories?: {
         best: CourseCategory | null;
         top: CourseCategory[];
         new: CourseCategory[];
         featured: CourseCategory[];
      };
      exam_categories?: {
         best: ExamCategory | null;
         top: ExamCategory[];
         new: ExamCategory[];
         featured: ExamCategory[];
      };
      blog_categories?: {
         best: BlogCategory | null;
         top: BlogCategory[];
         new: BlogCategory[];
         featured: BlogCategory[];
      };
      testimonials?: { top: Testimonial[]; new: Testimonial[] };
      sponsors?: { top: Sponsor[]; new: Sponsor[] };
   };
   courses: Pagination<Course>;
   exams: Pagination<Exam>;
   blogs: Pagination<Blog>;
   instructors: Pagination<Instructor>;
   course_categories: Pagination<CourseCategory>;
   exam_categories: Pagination<CourseCategory>;
   blog_categories: Pagination<BlogCategory>;
}

const ApiPage = ({
   collections,
   courses,
   blogs,
   instructors,
   course_categories,
}: ApiPageProps) => {
   const handleInsert = (
      type: string,
      category: FrontendPageAPIParams,
      itemId: number | string,
   ) => {
      router.put(
         api(),
         {
            type,
            category,
            item_id: itemId,
            action: 'insert',
         },
         {
            preserveScroll: true,
         },
      );
   };

   const handleTestimonialInsert = (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Testimonial,
   ) => {
      router.put(
         api(),
         {
            type,
            category,
            item_data: {
               name: itemData.name,
               image: itemData.image,
               rating: itemData.rating,
               description: itemData.description,
            },
            action: 'insert',
         },
         {
            preserveScroll: true,
         },
      );
   };

   const handleSponsorInsert = (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Sponsor,
   ) => {
      router.put(
         api(),
         {
            type,
            category,
            item_data: {
               image: itemData.image,
               url: itemData.url,
            },
            action: 'insert',
         },
         {
            preserveScroll: true,
         },
      );
   };

   return (
      <>
         <Breadcrumbs
            title="API Collections"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Home Page API Collections' },
            ]}
            className=""
         />

         <Alert className="mb-10 border-blue-500/50 bg-blue-500/10 text-blue-600 dark:border-blue-500/50 dark:text-blue-400">
            <Info className="h-4 w-4" color="currentColor" />
            <AlertTitle>API Integration</AlertTitle>
            <AlertDescription>
               These data collections are fetched and displayed on the
               application's home page via API. Any changes made here will
               reflect on the main website.
            </AlertDescription>
         </Alert>

         <div className="space-y-6">
            <CoursesCollection
               data={
                  collections.courses ??
                  ({ best: null, top: [], new: [] } as {
                     best: Course | null;
                     top: Course[];
                     new: Course[];
                  })
               }
               courses={courses}
               onInsert={handleInsert}
            />

            {/* {collections.exams && (
               <ExamsCollection
                  data={collections.exams}
                  exams={exams}
                  onInsert={handleInsert}
               />
            )} */}

            <BlogsCollection
               data={
                  collections.blogs ??
                  ({ best: null, top: [], new: [] } as {
                     best: Blog | null;
                     top: Blog[];
                     new: Blog[];
                  })
               }
               blogs={blogs}
               onInsert={handleInsert}
            />

            <InstructorsCollection
               data={
                  collections.instructors ??
                  ({ best: null, top: [], new: [], featured: [] } as {
                     best: Instructor | null;
                     top: Instructor[];
                     new: Instructor[];
                     featured: Instructor[];
                  })
               }
               instructors={instructors}
               onInsert={handleInsert}
            />

            <CourseCategoriesCollection
               data={
                  collections.course_categories ??
                  ({ best: null, top: [], new: [], featured: [] } as {
                     best: CourseCategory | null;
                     top: CourseCategory[];
                     new: CourseCategory[];
                     featured: CourseCategory[];
                  })
               }
               categories={course_categories}
               onInsert={handleInsert}
            />

            {/* {collections.exam_categories && (
               <ExamCategoriesCollection
                  data={collections.exam_categories}
                  categories={exam_categories}
                  onInsert={handleInsert}
               />
            )} */}

            {/* {collections.blog_categories && (
               <BlogCategoriesCollection
                  data={collections.blog_categories}
                  categories={blog_categories}
                  onInsert={handleInsert}
               />
            )} */}

            <TestimonialsCollection
               data={
                  collections.testimonials ??
                  ({ top: [], new: [] } as {
                     top: Testimonial[];
                     new: Testimonial[];
                  })
               }
               onInsert={handleTestimonialInsert}
            />

            <SponsorsCollection
               data={
                  collections.sponsors ??
                  ({ top: [], new: [] } as {
                     top: Sponsor[];
                     new: Sponsor[];
                  })
               }
               onInsert={handleSponsorInsert}
            />
         </div>
      </>
   );
};

ApiPage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default ApiPage;
