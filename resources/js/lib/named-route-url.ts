import { home as homeIndex } from '@/routes';
import aiassistant from '@/routes/aiassistant';
import blogs from '@/routes/blogs';
import category from '@/routes/category';
import course from '@/routes/course';
import courseAssignments from '@/routes/course-assignments';
import courseCoupons from '@/routes/course-coupons';
import courseEnrollments from '@/routes/course-enrollments';
import courses from '@/routes/courses';
import examCoupons from '@/routes/exam-coupons';
import examEnrollments from '@/routes/exam-enrollments';
import exams from '@/routes/exams';
import frontend from '@/routes/frontend';
import homeModule from '@/routes/home';
import inner from '@/routes/inner';
import instructors from '@/routes/instructors';
import jobCirculars from '@/routes/job-circulars';
import newsletters from '@/routes/newsletters';
import notifications from '@/routes/notifications';
import paymentReports from '@/routes/payment-reports';
import payouts from '@/routes/payouts';
import users from '@/routes/users';
import type { RouteQueryOptions } from '@/wayfinder';

/**
 * Build a GET URL from a Laravel route name and merged params (path + query),
 * matching Ziggy's route(name, params) behavior for table filters and footers.
 */
export function namedRouteUrl(
   routeName: string,
   merged: Record<string, unknown>,
): string {
   const m: Record<string, unknown> = { ...merged };

   const q = (omit: string[]): RouteQueryOptions => {
      const query: Record<string, string | number | boolean> = {};

      for (const [k, v] of Object.entries(m)) {
         if (omit.includes(k)) {
            continue;
         }

         if (v === undefined || v === null || v === '') {
            continue;
         }

         if (typeof v === 'object') {
            continue;
         }

         query[k] = v as string | number | boolean;
      }

      return { query };
   };

   switch (routeName) {
      case 'home':
         return homeIndex.url(q([]));

      case 'aiassistant.index':
         return aiassistant.index.url(q([]));

      case 'home.demo': {
         const slug = String(m.slug ?? '');

         if (!slug) {
            throw new Error(
               'namedRouteUrl(home.demo): slug is required (pass routeParams.slug).',
            );
         }

         return homeModule.demo.url(slug, q(['slug']));
      }

      case 'category.courses':
         return category.courses.url(
            {
               category: String(m.category ?? 'all'),
               category_child:
                  m.category_child !== undefined && m.category_child !== ''
                     ? String(m.category_child)
                     : '',
            },
            q(['category', 'category_child']),
         );

      case 'category.exams':
         return category.exams.url(
            {
               category:
                  m.category !== undefined && m.category !== ''
                     ? String(m.category)
                     : 'all',
            },
            q(['category']),
         );

      case 'blogs.index':
         return blogs.index.url(q([]));

      case 'blogs.visit':
         return blogs.visit.url(String(m.category ?? 'all'), q(['category']));

      case 'newsletters.index':
         return newsletters.index.url(q([]));

      case 'course.details':
         return course.details.url(
            {
               slug: String(m.slug ?? ''),
               id: Number(m.id),
            },
            q(['slug', 'id']),
         );

      case 'course.play.start':
         return course.play.start.url(
            {
               type: String(m.type ?? ''),
               watch_history: Number(m.watch_history),
               lesson_id: String(m.lesson_id ?? ''),
            },
            q(['type', 'watch_history', 'lesson_id']),
         );

      case 'users.index':
         return users.index.url(q([]));

      case 'exam-coupons.index':
         return examCoupons.index.url(q([]));

      case 'Course-coupons.index':
      case 'course-coupons.index':
         return courseCoupons.index.url(q([]));

      case 'instructors.index':
         return instructors.index.url(q([]));

      case 'instructors.applications':
         return instructors.applications.url(q([]));

      case 'notifications.index':
         return notifications.index.url(q([]));

      case 'job-circulars.index':
         return jobCirculars.index.url(q([]));

      case 'exam-enrollments.index':
         return examEnrollments.index.url(q([]));

      case 'course-enrollments.index':
         return courseEnrollments.index.url(q([]));

      case 'inner.page':
         return inner.page.url(String(m.slug ?? ''), q(['slug']));

      case 'exams.index':
         return exams.index.url(q([]));

      case 'exams.details':
         return exams.details.url(
            {
               slug: String(m.slug ?? ''),
               id: Number(m.id),
            },
            q(['slug', 'id']),
         );

      case 'exams.edit':
         return exams.edit.url(Number(m.exam), q(['exam']));

      case 'courses.index':
         return courses.index.url(q([]));

      case 'courses.edit':
         return courses.edit.url(String(m.course ?? ''), q(['course']));

      case 'course-assignments.index':
         return courseAssignments.index.url(
            String(m.course_id ?? ''),
            q(['course_id']),
         );

      case 'course-assignments.submissions':
         return courseAssignments.submissions.url(
            [String(m.course_id ?? ''), String(m.assignment_id ?? '')],
            q(['course_id', 'assignment_id']),
         );

      case 'payouts.index':
         return payouts.index.url(q([]));

      case 'payouts.history':
         return payouts.history.url(q([]));

      case 'payouts.request':
         return payouts.request.url(q([]));

      case 'payment-reports.offline.index':
         return paymentReports.offline.index.url(q([]));

      case 'payment-reports.online.index':
         return paymentReports.online.index.url(q([]));

      case 'frontend.api':
         return frontend.api.url(q([]));

      default:
         throw new Error(
            `namedRouteUrl: unsupported route name "${routeName}".`,
         );
   }
}
