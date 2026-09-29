<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Modules\Certification\Services\CertificationService;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseAssignment;
use Modules\Course\Models\CourseCart;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\CourseLiveClass;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\SectionQuiz;
use Modules\Course\Services\CourseEnrollmentService;
use Modules\Course\Services\CoursePlayerService;
use Modules\Course\Services\CourseWishlistService;
use Modules\Exam\Services\ExamAttemptService;
use Modules\Exam\Services\ExamEnrollmentService;
use Modules\Exam\Services\ExamResourceService;
use Modules\Exam\Services\ExamWishlistService;
use Modules\Store\Services\ProductOrderService;

class StudentService extends MediaService
{
    public function __construct(
        private InstructorService $instructor,
        private CourseEnrollmentService $courseEnrollment,
        private CoursePlayerService $coursePlayer,
        private CourseWishlistService $courseWishlist,
        private ExamWishlistService $examWishlist,
        private ExamResourceService $examResource,
        private ExamEnrollmentService $examEnrollment,
        private ExamAttemptService $examAttempt,
        private CertificationService $certificate,
        private ProductOrderService $productOrder,
    ) {}

    public function getCartCount(): int
    {
        $user = Auth::user();

        return CourseCart::ofUser($user->id)->count();
    }

    public function getStudentData(?string $tab = 'courses'): array
    {
        $props = [];
        $user = Auth::user();
        $instructor = $this->instructor->getInstructorByUserId($user->id);
        $props['instructor'] = $instructor;

        switch ($tab) {
            case 'courses':
                $enrollments = $this->courseEnrollment->getEnrollments([
                    'user_id' => $user->id,
                    'select' => 'id,course_id,user_id',
                    'relations' => [
                        'course:id,title,thumbnail,instructor_id',
                        'course.instructor:id,user_id',
                        'course.instructor.user:id,name,photo',
                        'course.sections:id,course_id',
                        'course.sections.section_lessons:id,course_section_id',
                        'course.sections.section_quizzes:id,course_section_id',
                    ],
                ]);

                foreach ($enrollments as $enrollment) {
                    $watch_history = $this->coursePlayer->getWatchHistory([
                        'course_id' => $enrollment->course_id,
                        'select' => 'id,course_id,completed_watching',
                    ]);
                    $completion = $this->coursePlayer->calculateCompletion($enrollment->course, $watch_history);
                    $enrollment->watch_history = $watch_history;
                    $enrollment->completion = $completion;
                }

                $props['courseEnrollments'] = $enrollments;
                break;

            case 'exams':
                $enrollments = $this->examEnrollment->getEnrollments([
                    'user_id' => $user->id,
                    'select' => 'id,exam_id,user_id',
                    'relations' => [
                        'exam:id,title,thumbnail,level,short_description,instructor_id',
                        'exam.instructor:id,user_id',
                        'exam.instructor.user:id,name',
                    ],
                ]);
                $props['examEnrollments'] = $enrollments;
                break;

            case 'products':
                $props['productOrders'] = $this->productOrder->getOrders([
                    'user_id' => $user->id,
                    'relations' => [
                        'product:id,title,slug,thumbnail',
                        'instructor:id,user_id',
                        'instructor.user:id,name',
                    ],
                ]);
                break;

                // average_rating,reviews_count,enrollments_count,lessons_duration,
                // enrollments_count,average_rating,reviews_count
            case 'wishlist':
                $courseWishlists = $this->courseWishlist->getWishlists(['user_id' => $user->id]);
                $examWishlists = $this->examWishlist->getWishlists(['user_id' => $user->id]);
                $props['courseWishlists'] = $courseWishlists;
                $props['examWishlists'] = $examWishlists;
                break;

            default:
                break;
        }

        return $props;
    }

    public function updateProfile(array $data, string $id): User
    {
        $user = User::findOrFail($id);

        if (array_key_exists('photo', $data) && $data['photo']) {
            $data['photo'] = $this->addNewDeletePrev($user, $data['photo'], 'profile');
        }

        $filteredData = array_filter($data, function ($value) {
            return $value !== null;
        });

        $user->update($filteredData);

        return $user;
    }

    public function getEnrolledCourse(string $id, User $user): Course
    {
        $enrollment = CourseEnrollment::ofUser($user->id)
            ->ofCourse($id)
            ->first();

        if (! $enrollment) {
            throw new \Exception('You are not enrolled in this course');
        }

        return Course::query()
            ->with(['instructor:id,user_id', 'instructor.user:id,name,photo'])
            ->findOrFail($id);
    }

    public function getCourseModules(string $course_id)
    {
        return CourseSection::ofCourse($course_id)
            ->with([
                'section_lessons',
                'section_quizzes',
            ])->get();
    }

    public function getCourseLiveClasses(string $course_id)
    {
        return CourseLiveClass::ofCourse($course_id)->get();
    }

    public function getCourseAssignments(string $course_id, User $user)
    {
        return CourseAssignment::ofCourse($course_id)
            ->with([
                'submissions' => function ($query) use ($user) {
                    $query->byStudent($user->id);
                },
            ])
            ->get();
    }

    public function getCourseSectionQuizzes(string $course_id, User $user)
    {
        return CourseSection::ofCourse($course_id)
            ->with([
                'section_quizzes' => function ($quiz) use ($user) {
                    $quiz->with([
                        'quiz_submissions' => function ($query) use ($user) {
                            $query->ofUser($user->id);
                        },
                        'quiz_questions' => function ($question) use ($user) {
                            $question->with(['answers' => function ($answer) use ($user) {
                                $answer->ofUser($user->id);
                            }]);
                        },
                    ]);
                },
            ])
            ->whereHas('section_quizzes')
            ->get();
    }

    public function getCourseLessonResources(string $course_id)
    {
        return CourseSection::ofCourse($course_id)
            ->whereHas('section_lessons', function ($query) {
                $query->whereHas('resources');
            })
            ->with([
                'section_lessons' => function ($lesson) {
                    $lesson->whereHas('resources')
                        ->select([
                            'id',
                            'title',
                            'course_id',
                            'course_section_id',
                        ])
                        ->with(['resources']);
                },
            ])
            ->get();
    }

    public function getEnrolledCourseOverview(string $course_id, string $tab, User $user): array
    {
        return [
            'modules' => $tab === 'modules' ? $this->getCourseModules($course_id) : null,
            'live_classes' => $tab === 'live_classes' ? $this->getCourseLiveClasses($course_id) : null,
            'assignments' => $tab === 'assignments' ? $this->getCourseAssignments($course_id, $user) : null,
            'quizzes' => $tab === 'quizzes' ? $this->getCourseSectionQuizzes($course_id, $user) : null,
            'resources' => $tab === 'resources' ? $this->getCourseLessonResources($course_id) : null,
            'certificateTemplate' => $tab === 'certificate' ? $this->certificate->getActiveCertificateTemplate('course') : null,
            'marksheetTemplate' => $tab === 'certificate' ? $this->certificate->getActiveMarksheetTemplate('course') : null,
            'studentMarks' => $tab === 'certificate' ? $this->calculateStudentMarks($course_id, $user->id) : null,
        ];
    }

    public function calculateStudentMarks(string $course_id, string $user_id): array
    {
        // Calculate Assignment Marks
        $assignments = CourseAssignment::ofCourse($course_id)
            ->with(['submissions' => function ($query) use ($user_id) {
                $query->byStudent($user_id)
                    ->where('status', 'graded'); // Only count graded submissions
            }])
            ->get();

        $totalAssignmentMarks = 0;
        $obtainedAssignmentMarks = 0;

        foreach ($assignments as $assignment) {
            $totalAssignmentMarks += $assignment->total_mark;

            // Get the best submission (highest marks)
            $bestSubmission = $assignment->submissions->sortByDesc('marks_obtained')->first();
            if ($bestSubmission) {
                $obtainedAssignmentMarks += $bestSubmission->marks_obtained;
            }
        }

        $assignmentPercentage = $totalAssignmentMarks > 0
            ? round(($obtainedAssignmentMarks / $totalAssignmentMarks) * 100, 2)
            : 0;

        // Calculate Quiz Marks
        $quizzes = SectionQuiz::ofCourse($course_id)
            ->with(['quiz_submissions' => function ($query) use ($user_id) {
                $query->ofUser($user_id);
            }])
            ->get();

        $totalQuizMarks = 0;
        $obtainedQuizMarks = 0;

        foreach ($quizzes as $quiz) {
            $totalQuizMarks += $quiz->total_mark;

            // Get the best submission (highest total_marks)
            $bestSubmission = $quiz->quiz_submissions->sortByDesc('total_marks')->first();
            if ($bestSubmission) {
                $obtainedQuizMarks += $bestSubmission->total_marks;
            }
        }

        $quizPercentage = $totalQuizMarks > 0
            ? round(($obtainedQuizMarks / $totalQuizMarks) * 100, 2)
            : 0;

        // Calculate Overall Percentage
        $overallPercentage = 0;
        $hasAssignments = $totalAssignmentMarks > 0;
        $hasQuizzes = $totalQuizMarks > 0;

        if ($hasAssignments && $hasQuizzes) {
            // If both exist, average them
            $overallPercentage = round(($assignmentPercentage + $quizPercentage) / 2, 2);
        } elseif ($hasAssignments) {
            $overallPercentage = $assignmentPercentage;
        } elseif ($hasQuizzes) {
            $overallPercentage = $quizPercentage;
        }

        // Determine Grade
        $grade = calculateGrade($overallPercentage);

        return [
            'assignment' => [
                'total' => $totalAssignmentMarks,
                'obtained' => $obtainedAssignmentMarks,
                'percentage' => $assignmentPercentage,
            ],
            'quiz' => [
                'total' => $totalQuizMarks,
                'obtained' => $obtainedQuizMarks,
                'percentage' => $quizPercentage,
            ],
            'overall' => [
                'percentage' => $overallPercentage,
                'grade' => $grade,
            ],
        ];
    }

    public function getEnrolledExamTabProps(string $exam_id, string $tab, User $user): array
    {
        $data = [
            'result' => null,
            'resources' => null,
            'certificateTemplate' => null,
            'marksheetTemplate' => null,
            'studentMarks' => null,
        ];

        if ($tab === 'certificate') {
            $data['certificateTemplate'] = $this->certificate->getActiveCertificateTemplate('exam');
            $data['marksheetTemplate'] = $this->certificate->getActiveMarksheetTemplate('exam');
            $data['studentMarks'] = $this->examEnrollment->calculateStudentExamMarks($exam_id, $user->id);
        }

        // if ($tab === 'resources') {
        //    $data['resources'] = $this->examResource->getExamResources($exam_id);
        // }

        return $data;
    }
}
