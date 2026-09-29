import { nanoid } from 'nanoid';

import Blogs1 from '@/frontend/page-jsx/home-1/blogs';
import CallToAction1 from '@/frontend/page-jsx/home-1/call-to-action';
import FAQs1 from '@/frontend/page-jsx/home-1/faqs';
import Hero1 from '@/frontend/page-jsx/home-1/hero';
import NewCourses1 from '@/frontend/page-jsx/home-1/new-courses';
import Overview1 from '@/frontend/page-jsx/home-1/overview';
import Partners1 from '@/frontend/page-jsx/home-1/partners';
import TopCategories1 from '@/frontend/page-jsx/home-1/top-categories';
import TopCourses1 from '@/frontend/page-jsx/home-1/top-courses';
import TopInstructors1 from '@/frontend/page-jsx/home-1/top-instructors';

import CallToAction2 from '@/frontend/page-jsx/home-2/call-to-action';
import Hero2 from '@/frontend/page-jsx/home-2/hero';
import NewCourses2 from '@/frontend/page-jsx/home-2/new-courses';
import Overview2 from '@/frontend/page-jsx/home-2/overview';
import Partners2 from '@/frontend/page-jsx/home-2/partners';
import Testimonials2 from '@/frontend/page-jsx/home-2/testimonials';
import TopCategories2 from '@/frontend/page-jsx/home-2/top-categories';
import TopCourses2 from '@/frontend/page-jsx/home-2/top-courses';
import TopInstructors2 from '@/frontend/page-jsx/home-2/top-instructors';

import CallToAction3 from '@/frontend/page-jsx/home-3/call-to-action';
import CategoryCourses1 from '@/frontend/page-jsx/home-3/category-courses';
import Features1 from '@/frontend/page-jsx/home-3/features';
import Hero3 from '@/frontend/page-jsx/home-3/hero';
import NewCourses3 from '@/frontend/page-jsx/home-3/new-courses';
import Overview3 from '@/frontend/page-jsx/home-3/overview';
import Testimonials3 from '@/frontend/page-jsx/home-3/testimonials';
import TopCategories3 from '@/frontend/page-jsx/home-3/top-categories';

import CallToAction4 from '@/frontend/page-jsx/home-4/call-to-action';
import FAQs2 from '@/frontend/page-jsx/home-4/faqs';
import Hero4 from '@/frontend/page-jsx/home-4/hero';
import Instructor4 from '@/frontend/page-jsx/home-4/instructor';
import Overview4 from '@/frontend/page-jsx/home-4/overview';
import Statistics1 from '@/frontend/page-jsx/home-4/statistics';
import Testimonials4 from '@/frontend/page-jsx/home-4/testimonials';
import TopCategories4 from '@/frontend/page-jsx/home-4/top-categories';
import BestCourse2 from '@/frontend/page-jsx/home-4/top-course';

import FAQs3 from '@/frontend/page-jsx/home-5/faqs';
import Hero5 from '@/frontend/page-jsx/home-5/hero';
import Statistics2 from '@/frontend/page-jsx/home-5/statistics';
import Testimonials5 from '@/frontend/page-jsx/home-5/testimonials';
import TopCategories5 from '@/frontend/page-jsx/home-5/top-categories';
import BestCourse1 from '@/frontend/page-jsx/home-5/top-course';

const sections = [
   {
      name: 'Hero Sections',
      slug: 'hero-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Hero 1',
            component: Hero1(),
            preview: '/assets/sections/home-1/hero.png',
         },
         {
            id: nanoid(),
            name: 'Hero 2',
            component: Hero2(),
            preview: '/assets/sections/home-2/hero.png',
         },
         {
            id: nanoid(),
            name: 'Hero 3',
            component: Hero3(),
            preview: '/assets/sections/home-3/hero.png',
         },
         {
            id: nanoid(),
            name: 'Hero 4',
            component: Hero4(),
            preview: '/assets/sections/home-4/hero.png',
         },
         {
            id: nanoid(),
            name: 'Hero 5',
            component: Hero5(),
            preview: '/assets/sections/home-5/hero.png',
         },
      ],
   },
   {
      name: 'Sponsor Sections',
      slug: 'sponsor-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Sponsor 1',
            component: Partners1(),
            preview: '/assets/sections/home-1/sponsor.png',
         },
         {
            id: nanoid(),
            name: 'Sponsor 2',
            component: Partners2(),
            preview: '/assets/sections/home-2/sponsor.png',
         },
      ],
   },
   {
      name: 'Category Sections',
      slug: 'category-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Top Categories 1',
            component: TopCategories1(),
            preview: '/assets/sections/home-1/top_category.png',
         },
         {
            id: nanoid(),
            name: 'Top Categories 2',
            component: TopCategories2(),
            preview: '/assets/sections/home-2/top_category.png',
         },
         {
            id: nanoid(),
            name: 'Top Categories 3',
            component: TopCategories3(),
            preview: '/assets/sections/home-3/featured_category.png',
         },
         {
            id: nanoid(),
            name: 'Top Categories 4',
            component: TopCategories4(),
            preview: '/assets/sections/home-4/top_category.png',
         },
         {
            id: nanoid(),
            name: 'Top Categories 5',
            component: TopCategories5(),
            preview: '/assets/sections/home-5/top_category.png',
         },
      ],
   },
   {
      name: 'Course Sections',
      slug: 'course-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Top Courses 1',
            component: TopCourses1(),
            preview: '/assets/sections/home-1/top_course.png',
         },
         {
            id: nanoid(),
            name: 'Top Courses 2',
            component: TopCourses2(),
            preview: '/assets/sections/home-2/top_courses.png',
         },
         {
            id: nanoid(),
            name: 'New Courses 1',
            component: NewCourses1(),
            preview: '/assets/sections/home-1/new_course.png',
         },
         {
            id: nanoid(),
            name: 'New Courses 2',
            component: NewCourses2(),
            preview: '/assets/sections/home-2/new_courses.png',
         },
         {
            id: nanoid(),
            name: 'New Courses 3',
            component: NewCourses3(),
            preview: '/assets/sections/home-3/latest_courses.png',
         },
         {
            id: nanoid(),
            name: 'Best Course 1',
            component: BestCourse1(),
            preview: '/assets/sections/home-4/best_course.png',
         },
         {
            id: nanoid(),
            name: 'Best Course 2',
            component: BestCourse2(),
            preview: '/assets/sections/home-5/best_course.png',
         },
         {
            id: nanoid(),
            name: 'Category Courses 1',
            component: CategoryCourses1(),
            preview: '/assets/sections/home-3/category_courses.png',
         },
      ],
   },
   {
      name: 'Overview Sections',
      slug: 'overview-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Overview 1',
            component: Overview1(),
            preview: '/assets/sections/home-1/overview.png',
         },
         {
            id: nanoid(),
            name: 'Overview 2',
            component: Overview2(),
            preview: '/assets/sections/home-2/overview.png',
         },
         {
            id: nanoid(),
            name: 'Overview 3',
            component: Overview3(),
            preview: '/assets/sections/home-3/overview.png',
         },
         {
            id: nanoid(),
            name: 'Overview 4',
            component: Overview4(),
            preview: '/assets/sections/home-4/overview.png',
         },
      ],
   },
   {
      name: 'Instructor Sections',
      slug: 'instructor-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Top Instructors 1',
            component: TopInstructors1(),
            preview: '/assets/sections/home-1/top_instructor.png',
         },
         {
            id: nanoid(),
            name: 'Top Instructors 2',
            component: TopInstructors2(),
            preview: '/assets/sections/home-3/top_instructor.png',
         },
         {
            id: nanoid(),
            name: 'Top Instructor 1',
            component: Instructor4(),
            preview: '/assets/sections/home-4/about_me.png',
         },
      ],
   },
   {
      name: 'Feature Sections',
      slug: 'feature-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Features 1',
            component: Features1(),
            preview: '/assets/sections/home-3/feature_01.png',
         },
      ],
   },
   {
      name: 'Statistics Sections',
      slug: 'statistics-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Statistics 1',
            component: Statistics1(),
            preview: '/assets/sections/home-4/overview.png',
         },
         {
            id: nanoid(),
            name: 'Statistics 2',
            component: Statistics2(),
            preview: '/assets/sections/home-5/overview.png',
         },
      ],
   },
   {
      name: 'Testimonial Sections',
      slug: 'testimonial-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Testimonials 2',
            component: Testimonials2(),
            preview: '/assets/sections/home-2/testimonials.png',
         },
         {
            id: nanoid(),
            name: 'Testimonials 3',
            component: Testimonials3(),
            preview: '/assets/sections/home-3/testimonials.png',
         },
         {
            id: nanoid(),
            name: 'Testimonials 4',
            component: Testimonials4(),
            preview: '/assets/sections/home-4/testimonials.png',
         },
         {
            id: nanoid(),
            name: 'Testimonials 5',
            component: Testimonials5(),
            preview: '/assets/sections/home-5/testimonials.png',
         },
      ],
   },
   {
      name: 'FAQs Sections',
      slug: 'faqs-sections',
      elements: [
         {
            id: nanoid(),
            name: 'FAQs 1',
            component: FAQs1(),
            preview: '/assets/sections/home-1/faq.png',
         },
         {
            id: nanoid(),
            name: 'FAQs 2',
            component: FAQs2(),
            preview: '/assets/sections/home-4/faq.png',
         },
         {
            id: nanoid(),
            name: 'FAQs 3',
            component: FAQs3(),
            preview: '/assets/sections/home-5/faq.png',
         },
      ],
   },
   {
      name: 'Blog Sections',
      slug: 'blog-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Blogs 1',
            component: Blogs1(),
            preview: '/assets/sections/home-1/blog.png',
         },
      ],
   },
   {
      name: 'CTA Sections',
      slug: 'cta-sections',
      elements: [
         {
            id: nanoid(),
            name: 'Call To Action 1',
            component: CallToAction1(),
            preview: '/assets/sections/home-1/cta.png',
         },
         {
            id: nanoid(),
            name: 'Call To Action 2',
            component: CallToAction2(),
            preview: '/assets/sections/home-2/cta.png',
         },
         {
            id: nanoid(),
            name: 'Call To Action 3',
            component: CallToAction3(),
            preview: '/assets/sections/home-3/cta.png',
         },
         {
            id: nanoid(),
            name: 'Call To Action 4',
            component: CallToAction4(),
            preview: '/assets/sections/home-4/newsletter.png',
         },
      ],
   },
];

export default sections;
