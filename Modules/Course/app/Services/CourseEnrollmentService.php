<?php

namespace Modules\Course\Services;

use App\Services\MediaService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Models\SectionQuiz;

class CourseEnrollmentService extends MediaService
{
    public function getEnrollmentById(int $id): ?CourseEnrollment
    {
        return CourseEnrollment::withRelatedData()->find($id);
    }

    public function getEnrollmentByCourseId(int $courseId, int $userId): ?CourseEnrollment
    {
        return CourseEnrollment::ofCourse($courseId)->ofUser($userId)->first();
    }

    public function getEnrollments(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('course_enrollments_page', $data) ? intval($data['course_enrollments_page']) : 1;
        $perPage = array_key_exists('course_enrollments_per_page', $data) ? intval($data['course_enrollments_per_page']) : 10;

        $enrollments = CourseEnrollment::when(array_key_exists('course_enrollments_search', $data), function ($query) use ($data) {
            return $query->whereHas('user', function ($user) use ($data) {
                $user->where('name', 'LIKE', '%'.$data['course_enrollments_search'].'%');
            });
        })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('user_id', $data), function ($query) use ($data) {
                return $query->ofUser($data['user_id']);
            })
            ->when(array_key_exists('instructor_id', $data), function ($query) use ($data) {
                return $query->byInstructor($data['instructor_id']);
            });

        if (array_key_exists('pagination', $data) && $data['pagination']) {
            return $enrollments->paginate($perPage, ['*'], 'course_enrollments_page', $pageNumber);
        }

        return $enrollments->get();
    }

    public function createCourseEnroll(array $data): CourseEnrollment
    {
        return DB::transaction(function () use ($data) {
            $courseId = $data['course_id'];
            $course = Course::findOrFail($data['course_id']);
            $courseSectionService = app(CourseSectionService::class);

            // Calculate expiry date based on duration from enrollment time
            $expiryDate = null;
            if ($course->expiry_type !== 'lifetime' && $course->expiry_duration) {
                // Parse duration string (e.g., "3 months", "1 year")
                $duration = $course->expiry_duration;
                $now = Carbon::now();

                // Extract number and unit from duration string
                if (preg_match('/^(\d+)\s+(month|months|year|years)$/i', $duration, $matches)) {
                    $value = (int) $matches[1];
                    $unit = strtolower($matches[2]);

                    // Add duration to current time
                    if (str_contains($unit, 'month')) {
                        $expiryDate = $now->addMonths($value)->format('Y-m-d H:i:s');
                    } elseif (str_contains($unit, 'year')) {
                        $expiryDate = $now->addYears($value)->format('Y-m-d H:i:s');
                    }
                }
            }

            $enrollment = CourseEnrollment::create([
                ...$data,
                'entry_date' => now(),
                'expiry_date' => $expiryDate,
            ]);

            $lessons = SectionLesson::ofCourse($courseId);
            if ($lessons->exists()) {
                $courseSectionService->initWatchHistory($courseId, 'lesson', $data['user_id']);

                return $enrollment;
            }

            $quizzes = SectionQuiz::ofCourse($courseId);
            if ($quizzes->exists()) {
                $courseSectionService->initWatchHistory($courseId, 'quiz', $data['user_id']);

                return $enrollment;
            }

            return $enrollment;
        }, 5);
    }

    public function deleteEnrollment(string $id): void
    {
        $enrollment = CourseEnrollment::findOrFail($id);
        $enrollment->delete();
    }
}
