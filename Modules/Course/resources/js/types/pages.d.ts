interface CoursesIndexProps extends SharedData {
   levels: string[];
   prices: string[];
   expiries: string[];
   category?: CourseCategory;
   categoryChild?: CourseCategoryChild;
   courses: Pagination<Course>;
   categories: CourseCategory[];
   wishlists: CourseWishlist[];
}

interface CourseCreateProps extends SharedData {
   labels: string[];
   prices: string[];
   expiries: string[];
   categories: CourseCategory[];
   instructors: Instructor[];
   /** Resolved instructor id for AI config (matches admin fallback via user_id). */
   aiInstructorId?: number | null;
}

interface CourseUpdateProps extends SharedData {
   tab?: string;
   assignment?: string;
   course: Course;
   prices: string[];
   videoProvider: 'default' | 'bunny';
   lastSectionSort: number;
   lastLessonSort: number;
   statuses: Course['status'][];
   labels: string[];
   expiries: string[];
   categories: CourseCategory[];
   submissions: Pagination<AssignmentSubmission>;
   watchHistory: WatchHistory | null;
   approvalStatus: CourseApprovalValidation;
   zoomConfig: ZoomConfigFields;
   assignments: CourseAssignment[];
   instructors: Instructor[] | null;
}

interface CourseDetailsProps extends SharedData {
   course: Course;
   enrollment: CourseEnrollment;
   watchHistory: WatchHistory | null;
   approvalStatus: CourseApprovalValidation;
   wishlists: CourseWishlist[];
   reviews: Pagination<CourseReview>;
   totalReviews: CourseTotalReview;
}
