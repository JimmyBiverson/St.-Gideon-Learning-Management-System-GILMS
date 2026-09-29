<?php

namespace Modules\Course\Http\Controllers;

use App\Enums\ExpiryLimitType;
use App\Enums\LevelType;
use App\Enums\PricingType;
use App\Enums\StatusType;
use App\Http\Controllers\Controller;
use App\Services\InstructorService;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Course\Actions\GenerateCourseMetaTagsAction;
use Modules\Course\Http\Requests\StoreCourseRequest;
use Modules\Course\Http\Requests\UpdateCourseRequest;
use Modules\Course\Http\Requests\UpdateCourseStatusRequest;
use Modules\Course\Services\AssignmentSubmissionService;
use Modules\Course\Services\CourseCategoryService;
use Modules\Course\Services\CoursePlayerService;
use Modules\Course\Services\CourseReviewService;
use Modules\Course\Services\CourseSectionService;
use Modules\Course\Services\CourseService;
use Modules\Course\Services\CourseWishlistService;
use Modules\Course\Services\ZoomLiveService;

class CourseController extends Controller
{
    public function __construct(
        protected CourseService $courseService,
        protected ZoomLiveService $zoomLiveService,
        protected CourseCategoryService $categoryService,
        protected InstructorService $instructorService,
        protected CourseSectionService $courseSectionService,
        protected CoursePlayerService $coursePlayerService,
        protected CourseWishlistService $wishlistService,
        protected CourseReviewService $reviewService,
        protected AssignmentSubmissionService $submissionService,
        protected GenerateCourseMetaTagsAction $metaTagsAction,
        protected SettingsService $settingsService,
    ) {}

    public function index(Request $request)
    {
        $statuses = StatusType::cases();
        $courses = $this->courseService->getCourses(
            [
                ...$request->all(),
                'paginate' => true,
                'instructor_id' => isAdmin() ? null : Auth::user()?->instructor_id,
                'assignments_count' => true,
                'select' => 'id,title,status,price,mode,course_category_id,course_category_child_id,instructor_id',
                'relations' => [
                    'instructor:id,user_id',
                    'instructor.user:id,name,email',
                    'course_category:id,title',
                    'course_category_child:id,title',
                ],
            ]
        );

        return Inertia::render('Course/dashboard/index', compact('courses', 'statuses'));
    }

    public function category_courses(Request $request, string $categoryId, ?string $categoryChildId = null)
    {
        $user = Auth::user() ? Auth::user() : null;

        $levels = LevelType::cases();
        $prices = PricingType::cases();
        $category = $this->categoryService->getCategoryBySlug($categoryId);
        $categoryChild = $this->categoryService->getCategoryChildBySlug($categoryChildId);
        $wishlists = $this->wishlistService->getWishlists(['user_id' => $user ? $user->id : null]);
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title,slug',
            'relations' => 'category_children:id,title,slug,course_category_id',
        ]));
        $courses = $this->courseService->getCourses([
            ...$request->all(),
            'courses_per_page' => 12,
            'category' => $category ? $category->id : 'all',
            'category_child' => $categoryChild ? $categoryChild->id : 'all',
            'mode' => 'public',
            'status' => 'approved',
            'reviews_count' => true,
            'average_rating' => true,
            'lessons_duration' => true,
            'enrollments_count' => true,
            'select' => 'id,title,slug,price,discount,discount_price,thumbnail,pricing_type',
            'paginate' => true,
        ]);

        // Generate meta tags using action class
        $metaTags = $this->metaTagsAction->forCourseListing($courses, $category, $categoryChild);

        return Inertia::render('Course/courses/index', compact(
            'levels',
            'prices',
            'courses',
            'categories',
            'category',
            'categoryChild',
            'wishlists'
        ))->withViewData($metaTags);
    }

    public function create(Request $request)
    {
        $labels = LevelType::cases();
        $prices = PricingType::cases();
        $expiries = ExpiryLimitType::cases();
        $instructors = $this->instructorService->getInstructors([
            'admin' => isAdmin(),
            'status' => 'approved',
            'relations' => ['user:id,name'],
        ]);
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title',
            'relations' => 'category_children:id,title,course_category_id',
        ]));

        $user = $request->user();
        $aiInstructorId = $user?->instructor_id;
        if (! $aiInstructorId && $user) {
            $aiInstructorId = $this->instructorService->getInstructorByUserId($user->id)?->id;
        }

        return Inertia::render('Course/dashboard/create', compact(
            'labels',
            'prices',
            'expiries',
            'categories',
            'instructors',
            'aiInstructorId'
        ));
    }

    public function store(StoreCourseRequest $request)
    {
        $this->courseService->createCourse($request->validated());

        return redirect(route('courses.index'))->with('success', 'Course added successfully');
    }

    public function show(Request $request, $slug, $id)
    {
        // validate slug
        if (empty($slug)) {
            return redirect()->back();
        }

        // course details
        $course = $this->courseService->getGuestCourseById($id);
        $enrollment = $this->courseService->getCourseEnrollment(['course_id' => $course->id, 'select' => 'id']);

        if ($course->mode === 'private') {
            $user = Auth::user();
            if (! $user) {
                return redirect()->route('login.index');
            }

            $isEnrolledStudent = $user->role === 'student' && (bool) $enrollment;
            $isInstructorOwner = $user->role === 'instructor' && $course->instructor?->user_id === $user->id;

            if (! isAdmin() && ! $isInstructorOwner && ! $isEnrolledStudent) {
                return Inertia::render('404');
            }
        }

        $wishlists = $this->wishlistService->getWishlists(['select' => 'id,course_id']);
        $watchHistory = $this->coursePlayerService->getWatchHistory(['course_id' => $course->id, 'select' => 'id,current_watching_type,current_watching_id']);
        $reviews = $this->reviewService->getReviews(array_merge($request->all(), [
            'select' => 'id,user_id,rating,review,created_at',
            'relations' => ['user:id,name,photo'],
            'course_id' => $course->id,
            'paginate' => true,
        ]));
        $totalReviews = $this->reviewService->totalReviews($course->id);
        $approvalStatus = $this->courseService->validateCourseForApproval($course);

        if ($course->exists()) {
            // Generate meta tags using action class
            $metaTags = $this->metaTagsAction->forSingleCourse($course);

            return Inertia::render(
                'Course/courses/show',
                [
                    'course' => $course,
                    'enrollment' => $enrollment,
                    'watchHistory' => $watchHistory,
                    'approvalStatus' => $approvalStatus,
                    'wishlists' => $wishlists,
                    'reviews' => $reviews,
                    'totalReviews' => $totalReviews,
                ]
            )->withViewData($metaTags);
        } else {
            return redirect()->back();
        }
    }

    public function edit(Request $request, string $id)
    {
        $tab = $request->tab;
        $assignment = $request->assignment;

        $labels = LevelType::cases();
        $prices = PricingType::cases();
        $expiries = ExpiryLimitType::cases();
        $statuses = StatusType::cases();
        $zoomConfig = $this->zoomLiveService->zoomConfig;
        $course = $this->courseService->getEditCourseById($id);
        $watchHistory = $this->coursePlayerService->getWatchHistory([
            'course_id' => $course->id,
            'select' => 'id,current_watching_type,current_watching_id',
        ]);
        $instructors = isAdmin() ? $this->instructorService->getInstructors([
            'status' => 'approved',
            'relations' => ['user:id,name'],
        ]) : null;
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title',
            'relations' => 'category_children:id,title,course_category_id',
        ]));
        $approvalStatus = $this->courseService->validateCourseForApproval($course);

        $storageSetting = $this->settingsService->getSetting(['type' => 'storage']);
        $storageDriver = $storageSetting ? ($storageSetting['fields']['storage_driver'] ?? 'local') : 'local';
        $videoProvider = $storageDriver === 'bunny' ? 'bunny' : 'default';

        $submissions = null;
        if ($assignment) {
            $submissions = $this->submissionService->getSubmissions(array_merge($request->all(), [
                'course_assignment_id' => $assignment,
                'relations' => ['assignment', 'student', 'grader'],
                'paginate' => true,
            ]));
        }

        return Inertia::render(
            'Course/dashboard/update',
            [
                'tab' => $tab,
                'assignment' => $assignment,
                'prices' => $prices,
                'videoProvider' => $videoProvider,
                'course' => $course,
                'statuses' => $statuses,
                'labels' => $labels,
                'expiries' => $expiries,
                'categories' => $categories,
                'assignments' => $course->assignments,
                'submissions' => $submissions,
                'watchHistory' => $watchHistory,
                'approvalStatus' => $approvalStatus,
                'zoomConfig' => $zoomConfig,
                'instructors' => $instructors,
            ]
        );
    }

    public function update(UpdateCourseRequest $request, $id)
    {
        $this->courseService->updateCourse($id, $request->validated());

        return back()->with('success', "Course $request->tab updated successfully");
    }

    public function status(UpdateCourseStatusRequest $request, $id)
    {
        $this->courseService->updateCourse($id, [...$request->validated(), 'tab' => 'status']);

        return back()->with('success', 'Course status changed successfully');
    }

    public function destroy($id)
    {
        $this->courseService->deleteCourse($id);

        return redirect(route('courses.index'))->with('success', 'Course deleted successfully');
    }
}
