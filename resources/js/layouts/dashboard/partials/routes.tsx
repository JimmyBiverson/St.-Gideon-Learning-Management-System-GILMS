import {
   Award,
   Book,
   Bot,
   Briefcase,
   CreditCard,
   FilePenLine,
   Globe,
   LayoutDashboard,
   Newspaper,
   Palette,
   School,
   Settings,
   ShoppingBag,
   Users,
} from 'lucide-react';
import { pluginEnabled } from '@/lib/plugin';
import { routeLastSegment } from '@/lib/route';
import { dashboard } from '@/routes';
import aiAssistant from '@/routes/aiassistant';
import auth0 from '@/routes/auth0';
import blogs from '@/routes/blogs';
import blogCategories from '@/routes/blogs/categories';
import certificate from '@/routes/certificate';
import categories from '@/routes/course-categories';
import courseCoupons from '@/routes/course-coupons';
import courseEnrollments from '@/routes/course-enrollments';
import courses from '@/routes/courses';
import examCategories from '@/routes/exam-categories';
import examCoupons from '@/routes/exam-coupons';
import examEnrollments from '@/routes/exam-enrollments';
import exams from '@/routes/exams';
import frontend from '@/routes/frontend';
import frontendPages from '@/routes/frontend-pages';
import googleAnalytics from '@/routes/google-analytics';
import instructor from '@/routes/instructor';
import instructors from '@/routes/instructors';
import jobCirculars from '@/routes/job-circulars';
import language from '@/routes/language';
import liveClass from '@/routes/live-class';
import marksheet from '@/routes/marksheet';
import metaPixel from '@/routes/meta-pixel';
import newsletters from '@/routes/newsletters';
import pages from '@/routes/pages';
import paymentsGateways from '@/routes/payment-gateways';
import paymentReportsOffline from '@/routes/payment-reports/offline';
import paymentReportsOnline from '@/routes/payment-reports/online';
import payouts from '@/routes/payouts';
import plugins from '@/routes/plugins';
import productCategories from '@/routes/product-categories';
import productCoupons from '@/routes/product-coupons';
import productOrders from '@/routes/product-orders';
import products from '@/routes/products';
import smtp from '@/routes/smtp';
import storage from '@/routes/storage';
import system from '@/routes/system';
import users from '@/routes/users';

const getDashboardRoutes = (page: SharedData): DashboardRoute[] => {
   const { translate, pluginStatuses } = page;
   const { button } = translate;

   const aiAssistantNavItems = pluginEnabled(pluginStatuses, 'AIAssistant')
      ? [
           {
              Icon: Bot,
              name: 'AI Assistant',
              path: aiAssistant.index.url(),
              slug: routeLastSegment(aiAssistant.index.url()),
              active: true,
              access: ['admin', 'collaborative', 'administrative'],
              children: [],
           },
           {
              Icon: Bot,
              name: 'AI Assistant',
              path: aiAssistant.usage.url(),
              slug: routeLastSegment(aiAssistant.usage.url()),
              active: true,
              access: ['instructor', 'collaborative', 'administrative'],
              children: [],
           },
        ]
      : [];

   return [
      {
         title: button.main_menu || 'Main Menu',
         slug: 'main-menu',
         pages: [
            {
               Icon: LayoutDashboard,
               name: button.dashboard || 'Dashboard',
               path: dashboard.url(),
               slug: routeLastSegment(dashboard.url()),
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [],
            },
            {
               Icon: School,
               name: button.courses || 'Courses',
               path: '',
               slug: 'courses',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: button.categories || 'Categories',
                     path: categories.index.url(),
                     slug: routeLastSegment(categories.index.url()),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.manage_courses || 'Manage Courses',
                     slug: routeLastSegment(courses.index.url()),
                     path: courses.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.create_course || 'Create Course',
                     slug: routeLastSegment(courses.create.url()),
                     path: courses.create.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.course_coupons || 'Course Coupons',
                     slug: routeLastSegment(courseCoupons.index.url()),
                     path: courseCoupons.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.course_enrollments || 'Course Enrollments',
                     slug: routeLastSegment(courseEnrollments.index.url()),
                     path: courseEnrollments.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
               ],
            },
            {
               Icon: Book,
               name: button.exams || 'Exams',
               path: '',
               slug: 'exams',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: button.categories || 'Categories',
                     slug: routeLastSegment(examCategories.index.url()),
                     path: examCategories.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.manage_exams || 'Manage Exams',
                     slug: routeLastSegment(exams.index.url()),
                     path: exams.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.create_exam || 'Create Exam',
                     slug: routeLastSegment(exams.create.url()),
                     path: exams.create.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.exam_coupons || 'Exam Coupons',
                     slug: routeLastSegment(examCoupons.index.url()),
                     path: examCoupons.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.exam_enrollments || 'Exam Enrollments',
                     slug: routeLastSegment(examEnrollments.index.url()),
                     path: examEnrollments.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
               ],
            },
            {
               Icon: ShoppingBag,
               name: 'Store',
               path: '',
               slug: 'store',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: 'Categories',
                     slug: routeLastSegment(productCategories.index.url()),
                     path: productCategories.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: 'Manage Products',
                     slug: routeLastSegment(products.index.url()),
                     path: products.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: 'Create Product',
                     slug: routeLastSegment(products.create.url()),
                     path: products.create.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: 'Product Coupons',
                     slug: routeLastSegment(productCoupons.index.url()),
                     path: productCoupons.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: 'Product Sales',
                     slug: routeLastSegment(productOrders.sales.url()),
                     path: productOrders.sales.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
               ],
            },
            {
               Icon: FilePenLine,
               name: button.blogs || 'Blogs',
               path: '',
               slug: 'blogs',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: button.categories || 'Categories',
                     slug: routeLastSegment(blogCategories.index.url()),
                     path: blogCategories.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.create_blog || 'Create Blog',
                     slug: routeLastSegment(blogs.create.url()),
                     path: blogs.create.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.manage_blog || 'Manage Blog',
                     slug: routeLastSegment(blogs.index.url()),
                     path: blogs.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
               ],
            },
            {
               Icon: Palette,
               name: button.frontend || 'Frontend',
               path: '',
               slug: 'frontend',
               active: true,
               access: ['admin', 'collaborative', 'administrative'],
               children: [
                  {
                     name: button.pages || 'Pages',
                     path: frontendPages.index.url(),
                     slug: routeLastSegment(frontendPages.index.url()),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.page_api || 'Page API',
                     slug: routeLastSegment(frontend.api.url()),
                     path: frontend.api.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
               ],
            },
            {
               Icon: Briefcase,
               name: button.job_circulars || 'Job Circulars',
               path: '',
               slug: 'job-circulars',
               active: true,
               access: ['admin', 'collaborative', 'administrative'],
               children: [
                  {
                     name: button.all_jobs || 'All Jobs',
                     slug: routeLastSegment(jobCirculars.index.url()),
                     path: jobCirculars.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.create_job || 'Create Job',
                     slug: routeLastSegment(jobCirculars.create.url()),
                     path: jobCirculars.create.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
               ],
            },
            {
               Icon: Users,
               name: button.instructors || 'Instructors',
               path: '',
               slug: 'instructors',
               active: true,
               access: ['admin', 'collaborative'],
               children: [
                  {
                     name: button.applications || 'Applications',
                     slug: routeLastSegment(instructors.applications.url()),
                     path: instructors.applications.url({
                        query: { status: 'pending' },
                     }),
                     access: ['admin', 'collaborative'],
                  },
                  {
                     name: button.manage_instructors || 'Manage Instructors',
                     slug: routeLastSegment(instructors.index.url()),
                     path: instructors.index.url(),
                     access: ['admin', 'collaborative'],
                  },
                  {
                     name: button.create_instructor || 'Create Instructor',
                     slug: routeLastSegment(instructors.create.url()),
                     path: instructors.create.url(),
                     access: ['admin', 'collaborative'],
                  },
               ],
            },
            {
               Icon: CreditCard,
               name: 'Billings',
               path: '',
               slug: 'billings',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: 'Configuration',
                     slug: routeLastSegment(paymentsGateways.index.url()),
                     path: paymentsGateways.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },

                  {
                     name: button.online_payments || 'Online Payments',
                     slug: routeLastSegment(paymentReportsOnline.index.url()),
                     path: paymentReportsOnline.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.offline_payments || 'Offline Payments',
                     slug: routeLastSegment(paymentReportsOffline.index.url()),
                     path: paymentReportsOffline.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },

                  {
                     name: button.payout_request || 'Payout Request',
                     slug: routeLastSegment(payouts.request.url()),
                     path: payouts.request.url(),
                     access: ['admin', 'collaborative'],
                  },
                  {
                     name: button.payout_history || 'Payout History',
                     slug: routeLastSegment(payouts.history.url()),
                     path: payouts.history.url(),
                     access: ['admin', 'collaborative'],
                  },

                  {
                     name: button.withdraw || 'Withdraw',
                     slug: routeLastSegment(payouts.index.url()),
                     path: payouts.index.url(),
                     access: ['instructor', 'collaborative'],
                  },
                  {
                     name: button.settings || 'Settings',
                     slug: routeLastSegment(payouts.settings.index.url()),
                     path: payouts.settings.index.url(),
                     access: ['instructor', 'collaborative'],
                  },
               ],
            },
            {
               Icon: Award,
               name: button.certificate || 'Certification',
               path: '',
               slug: 'certification',
               active: true,
               access: ['admin', 'collaborative', 'administrative'],
               children: [
                  {
                     name: button.certificate || 'Certificate',
                     slug: routeLastSegment(certificate.templates.index.url()),
                     path: certificate.templates.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.marksheet || 'Marksheet',
                     slug: routeLastSegment(marksheet.templates.index.url()),
                     path: marksheet.templates.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
               ],
            },
            // AI Assistant routes
            ...aiAssistantNavItems,
            {
               Icon: Newspaper,
               name: button.newsletters || 'Newsletters',
               path: newsletters.index.url(),
               slug: routeLastSegment(newsletters.index.url()),
               active: true,
               access: ['admin', 'collaborative', 'administrative'],
               children: [],
            },
            {
               Icon: Users,
               name: button.all_users || 'All Users',
               path: users.index.url(),
               slug: routeLastSegment(users.index.url()),
               active: true,
               access: ['admin', 'collaborative', 'administrative'],
               children: [],
            },
            {
               Icon: Globe,
               active: true,
               name: button.translation || 'Translation',
               slug: routeLastSegment(language.index.url()),
               path: language.index.url(),
               access: ['admin', 'collaborative', 'administrative'],
               children: [],
            },
            {
               Icon: Settings,
               name: button.settings || 'Settings',
               path: '',
               slug: 'settings',
               active: true,
               access: [
                  'admin',
                  'instructor',
                  'collaborative',
                  'administrative',
               ],
               children: [
                  {
                     name: button.account || 'Account',
                     slug: routeLastSegment(instructor.index.url()),
                     path: instructor.index.url(),
                     access: [
                        'admin',
                        'instructor',
                        'collaborative',
                        'administrative',
                     ],
                  },
                  {
                     name: button.system || 'System',
                     slug: routeLastSegment(system.index.url()),
                     path: system.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.pages || 'Pages',
                     slug: routeLastSegment(pages.index.url()),
                     path: pages.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.storage || 'Storage',
                     slug: routeLastSegment(storage.index.url()),
                     path: storage.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.smtp || 'SMTP',
                     slug: routeLastSegment(smtp.index.url()),
                     path: smtp.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: 'Plugins',
                     slug: routeLastSegment(plugins.index.url()),
                     path: plugins.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.auth || 'Auth',
                     slug: routeLastSegment(auth0.index.url()),
                     path: auth0.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.live_class || 'Live Class',
                     slug: routeLastSegment(liveClass.index.url()),
                     path: liveClass.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.meta_pixel || 'Meta Pixel',
                     slug: routeLastSegment(metaPixel.index.url()),
                     path: metaPixel.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
                  {
                     name: button.google_analytics || 'Google Analytics',
                     slug: routeLastSegment(googleAnalytics.index.url()),
                     path: googleAnalytics.index.url(),
                     access: ['admin', 'collaborative', 'administrative'],
                  },
               ],
            },
         ],
      },
   ];
};

export default getDashboardRoutes;
