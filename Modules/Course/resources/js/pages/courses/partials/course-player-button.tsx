import CheckoutItem from '@/components/checkout-item';
import { Button } from '@/components/ui/button';
import playerRoutes from '@/routes/course';
import { store as storeEnrollment } from '@/routes/course-enrollments';
import {
   store as storeWishlist,
   destroy as destroyWishlist,
} from '@/routes/course-wishlists';
import { Link, router, usePage } from '@inertiajs/react';

// Separate component for the play button to reduce duplication
const EnabledPlayButton = ({
   watchHistory,
}: {
   watchHistory: WatchHistory;
}) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { frontend } = translate;

   return (
      <Button size="lg" className="w-full" asChild>
         <Link
            href={playerRoutes.play.start({
               type: watchHistory.current_watching_type,
               watch_history: watchHistory.id as number,
               lesson_id: watchHistory.current_watching_id,
            })}
         >
            {frontend.play_course}
         </Link>
      </Button>
   );
};

// Disabled play button component
const DisabledPlayButton = () => {
   const { auth, course, approvalStatus, translate } =
      usePage<CourseDetailsProps>().props;
   const { frontend } = translate;
   const approve_able = approvalStatus.approve_able;

   return approve_able ? (
      <>
         {auth.user.role === 'instructor' ? (
            course.instructor_id === auth.user.instructor_id ? (
               <Button
                  size="lg"
                  className="w-full"
                  onClick={() =>
                     router.post(playerRoutes.play.init(), {
                        course_id: course.id,
                     })
                  }
               >
                  {frontend.play_course}
               </Button>
            ) : (
               <EnrollmentButton />
            )
         ) : (
            <Button
               size="lg"
               className="w-full"
               onClick={() =>
                  router.post(playerRoutes.play.init(), {
                     course_id: course.id,
                  })
               }
            >
               {frontend.play_course}
            </Button>
         )}
      </>
   ) : (
      <Button disabled size="lg" className="w-full">
         {frontend.course_player}
      </Button>
   );
};

// Enrollment/Buy button component
const EnrollmentButton = () => {
   const { auth, course, translate, wishlists } =
      usePage<CourseDetailsProps>().props;
   const { frontend } = translate;

   const enrollmentHandler = (course: Course) => {
      router.post(storeEnrollment(), {
         user_id: auth.user?.id,
         course_id: course.id,
         enrollment_type: 'free',
      });
   };

   const isWishlisted = wishlists.find(
      (wishlist) => wishlist.course_id === course.id,
   );

   const handleWishlist = () => {
      if (isWishlisted) {
         router.delete(destroyWishlist({ course_wishlist: isWishlisted.id }));
      } else {
         router.post(storeWishlist(), {
            user_id: auth.user?.id,
            course_id: course.id,
         });
      }
   };

   return (
      <>
         <Button
            className="w-full px-1 sm:px-3"
            variant="outline"
            size="lg"
            onClick={handleWishlist}
         >
            {isWishlisted
               ? frontend.remove_from_wishlist
               : frontend.add_to_wishlist}
         </Button>

         {course.pricing_type === 'free' ? (
            <Button
               size="lg"
               className="w-full"
               onClick={() => enrollmentHandler(course)}
            >
               {frontend.enroll_now}
            </Button>
         ) : (
            <CheckoutItem item="course" item_id={course.id}>
               <Button size="lg" className="w-full">
                  {frontend.buy_now}
               </Button>
            </CheckoutItem>
         )}
      </>
   );
};

const EnrollOrPlayerButton = () => {
   const { auth, enrollment, watchHistory } =
      usePage<CourseDetailsProps>().props;

   // Compute access conditions - improves readability
   const isEnrolled = !!enrollment;
   const hasWatchHistory = !!watchHistory;
   const isAdminOrInstructor =
      auth.user && ['admin', 'instructor'].includes(auth.user.role);
   const canPlay = hasWatchHistory && (isAdminOrInstructor || isEnrolled);

   // Render the appropriate button based on conditions
   if (canPlay) {
      return <EnabledPlayButton watchHistory={watchHistory} />;
   } else if (isAdminOrInstructor) {
      return <DisabledPlayButton />;
   } else {
      return <EnrollmentButton />;
   }
};

export default EnrollOrPlayerButton;
