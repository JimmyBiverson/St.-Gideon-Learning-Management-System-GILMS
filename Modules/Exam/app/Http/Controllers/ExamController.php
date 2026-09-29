<?php

namespace Modules\Exam\Http\Controllers;

use App\Enums\LevelType;
use App\Enums\PricingType;
use App\Http\Controllers\Controller;
use App\Services\InstructorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Exam\Http\Requests\ExamRequest;
use Modules\Exam\Http\Requests\UpdateExamRequest;
use Modules\Exam\Models\Exam;
use Modules\Exam\Services\ExamAttemptService;
use Modules\Exam\Services\ExamCategoryService;
use Modules\Exam\Services\ExamEnrollmentService;
use Modules\Exam\Services\ExamReviewService;
use Modules\Exam\Services\ExamService;
use Modules\Exam\Services\ExamWishlistService;

class ExamController extends Controller
{
    public function __construct(
        protected ExamService $exam,
        protected ExamReviewService $examReview,
        protected ExamCategoryService $examCategory,
        protected ExamEnrollmentService $examEnrollment,
        protected ExamWishlistService $examWishlist,
        protected ExamAttemptService $examAttempt,
        protected InstructorService $instructor,
    ) {}

    /**
     * Display a listing of exams
     */
    public function index(Request $request): Response
    {
        $exams = $this->exam->getAllExams(array_merge(
            $request->all(),
            [
                'paginate' => true,
                'instructor_id' => isAdmin() ? null : Auth::user()?->instructor_id,
                'relations' => ['instructor:id,user_id', 'instructor.user:id,name,email', 'exam_category:id,title'],
                'select' => 'id,title,slug,status,price,level,discount_price,instructor_id,exam_category_id,pricing_type',
                'enrollments_count' => true,
                'attempts_count' => true,
            ]
        ));

        return Inertia::render('Exam/dashboard/exams/index', compact('exams'));
    }

    /**
     * Display exams by category (public page, similar to courses)
     */
    public function category_exams(Request $request, string $slug): Response
    {
        $levels = LevelType::cases();
        $prices = PricingType::cases();
        $category = $slug !== 'all' ? $this->examCategory->getCategoryBySlug($slug) : null;
        $wishlists = $this->examWishlist->getWishlists(['select' => 'id,exam_id']);
        $categories = $this->examCategory->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title,slug',
        ]));
        $exams = $this->exam->getAllExams([
            ...$request->all(),
            'exams_per_page' => 12,
            'category' => $category ? $category->id : 'all',
            'status' => 'published',
            'reviews_count' => true,
            'average_rating' => true,
            'enrollments_count' => true,
            'select' => 'id,title,slug,price,pricing_type,discount_price,thumbnail',
            'paginate' => true,
        ]);
        $metadata = $this->exam->getCategoryExamsMetadata($category, $exams);

        return Inertia::render('Exam/exams/index', [
            'levels' => $levels,
            'prices' => $prices,
            'exams' => $exams,
            'category' => $category,
            'categories' => $categories,
            'wishlists' => $wishlists,
        ])->withViewData($metadata);
    }

    /**
     * Show the form for creating a new exam
     */
    public function create(Request $request): Response
    {
        $categories = $this->examCategory->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title',
        ]));
        $instructors = $this->instructor->getInstructors([
            'status' => 'approved',
            'relations' => ['user:id,name'],
        ]);

        return Inertia::render('Exam/dashboard/exams/create', compact('categories', 'instructors'));
    }

    /**
     * Store a newly created exam
     */
    public function store(ExamRequest $request)
    {
        $this->exam->createExam($request->validated());

        return redirect()
            ->route('exams.index')
            ->with('success', 'Exam created successfully.');
    }

    /**
     * Show single exam details (public page)
     */
    public function show(Request $request, string $slug, string $id): Response|RedirectResponse
    {
        // validate slug
        if (empty($slug)) {
            return redirect()->back();
        }

        $tab = $request->tab ?? 'overview';

        // Get exam details
        $exam = $this->exam->getGuestExamById($id);
        $enrollment = $this->examEnrollment->getExamEnrollment(['exam_id' => $exam->id, 'select' => 'id']);
        $instructor = $this->instructor->getInstructorWithStatistics($exam->instructor_id);

        $reviews = $tab === 'reviews' ? $this->examReview->getReviews(array_merge($request->all(), [
            'select' => 'id,user_id,rating,review,created_at',
            'relations' => ['user:id,name,photo'],
            'exam_id' => $exam->id,
            'paginate' => true,
        ])) : null;
        $reviewsStatistics = $tab === 'reviews' ? $this->examReview->getExamRatingStatistics($exam->id) : null;

        $metadata = $this->exam->getExamPreviewMetadata($exam);
        $wishlist = $this->examWishlist->getExamWishlist(['exam_id' => $exam->id, 'select' => 'id']);

        return Inertia::render('Exam/exams/show', [
            'tab' => $tab,
            'exam' => $exam,
            'enrollment' => $enrollment,
            'reviews' => $reviews,
            'wishlist' => $wishlist,
            'reviewsStatistics' => $reviewsStatistics,
            'instructor' => $instructor,
        ])->withViewData($metadata);
    }

    /**
     * Show the form for editing the exam
     */
    public function edit(Request $request, Exam $exam): Response
    {
        $tab = $request->tab;

        // Load exam with relationships (only columns used by the frontend)
        $exam->load([
            'instructor:id,user_id',
            'instructor.user:id,name',
            'faqs:id,exam_id,question,answer',
            'requirements:id,exam_id,requirement',
            'outcomes:id,exam_id,outcome',
            'resources:id,exam_id,title,type,resource',
            'questions:id,exam_id,title,description,marks,question_type,options,sort',
            'questions.question_options:id,exam_question_id,option_text,is_correct,sort',
        ]);

        // Get categories and instructors
        $categories = $this->examCategory->getCategories(array_merge($request->all(), [
            'default' => false,
            'select' => 'id,title,slug',
        ]));
        $instructors = isAdmin() ? $this->instructor->getInstructors([
            'status' => 'approved',
            'relations' => ['user:id,name'],
        ]) : null;

        // Get attempts with pagination if on attempts tab
        $attempt = null;
        $attempts = null;
        if ($request->tab == 'attempts') {
            $attempts = $this->examAttempt->getExamAttempts(array_merge($request->all(), [
                'exam_id' => $exam->id,
                'paginate' => true,
                'relations' => ['user:id,name,email'],
            ]));
            if ($request->review) {
                $attempt = $this->examAttempt->getExamAttempt((int) $request->review, [
                    'relations' => [
                        'attempt_answers:id,exam_attempt_id,exam_question_id,answer_data,is_correct,marks_obtained',
                        'attempt_answers.exam_question:id,title,description,marks,question_type,options',
                        'attempt_answers.exam_question.question_options:id,exam_question_id,option_text,is_correct',
                    ],
                ]);
            }
        }

        return Inertia::render('Exam/dashboard/exams/update', [
            'tab' => $tab,
            'exam' => $exam,
            'attempt' => $attempt,
            'attempts' => $attempts,
            'categories' => $categories,
            'instructors' => $instructors,
        ]);
    }

    /**
     * Update the specified exam
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $this->exam->updateExam($exam, $request->validated());

        return back()->with('success', 'Exam '.$request->tab.' updated successfully');
    }

    /**
     * Remove the specified exam
     */
    public function destroy(Exam $exam)
    {
        $this->exam->deleteExam($exam);

        return redirect()
            ->route('exams.index')
            ->with('success', 'Exam deleted successfully.');
    }
}
