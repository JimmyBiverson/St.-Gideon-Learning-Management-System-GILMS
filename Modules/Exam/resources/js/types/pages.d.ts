interface ExamUpdateProps extends SharedData {
   tab?: string;
   exam: Exam;
   attempt: ExamAttempt | null;
   attempts: Pagination<ExamAttempt>;
   categories: ExamCategory[];
   instructors: Instructor[] | null;
}

interface ExamsIndexProps extends SharedData {
   levels: string[];
   prices: string[];
   category?: ExamCategory;
   categoryChild?: ExamCategoryChild;
   exams: Pagination<Exam>;
   categories: ExamCategory[];
   wishlists?: ExamWishlist[];
}
