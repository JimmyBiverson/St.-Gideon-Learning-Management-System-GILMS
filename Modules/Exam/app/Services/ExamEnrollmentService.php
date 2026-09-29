<?php

namespace Modules\Exam\Services;

use App\Models\User;
use App\Services\MediaService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamAttempt;
use Modules\Exam\Models\ExamEnrollment;

class ExamEnrollmentService extends MediaService
{
    public function getEnrollmentById(int $id): ?ExamEnrollment
    {
        return ExamEnrollment::with(['user', 'exam'])->find($id);
    }

    public function getExamEnrollment(array $data): ?ExamEnrollment
    {
        $user = Auth::user();
        if ($user) {
            return ExamEnrollment::where('exam_id', $data['exam_id'])
                ->where('user_id', $user->id)
                ->when(array_key_exists('select', $data), function ($query) use ($data) {
                    $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                    return $query->select($columns);
                })
                ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                    return $query->with($data['relations']);
                })
                ->first();
        } else {
            return null;
        }
    }

    public function getEnrollments(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('exam_enrollments_page', $data) ? intval($data['exam_enrollments_page']) : 1;
        $perPage = array_key_exists('exam_enrollments_per_page', $data) ? intval($data['exam_enrollments_per_page']) : 10;

        $enrollments = ExamEnrollment::searchWhen('name', $data, 'exam_enrollments_search')
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('instructor_id', $data), function ($query) use ($data) {
                return $query->byInstructor($data['instructor_id']);
            })
            ->when(array_key_exists('user_id', $data), function ($query) use ($data) {
                return $query->ofUser($data['user_id']);
            });

        if (array_key_exists('pagination', $data) && $data['pagination']) {
            return $enrollments->paginate($perPage, ['*'], 'exam_enrollments_page', $pageNumber);
        }

        return $enrollments->get();
    }

    public function createExamEnroll(array $data): ExamEnrollment
    {
        return DB::transaction(function () use ($data) {
            $examId = $data['exam_id'];
            $exam = Exam::findOrFail($examId);
            $enrollmentType = $data['enrollment_type'] ?? ($exam->expiry_type ?? 'lifetime');

            // Calculate expiry date based on duration from enrollment time
            $expiryDate = null;
            if ($exam->expiry_type !== 'lifetime' && $exam->expiry_duration) {
                // Parse duration string (e.g., "3 months", "1 year")
                $duration = $exam->expiry_duration;
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

            return ExamEnrollment::create([
                'user_id' => $data['user_id'],
                'exam_id' => $examId,
                'enrollment_type' => $enrollmentType,
                'entry_date' => Carbon::now(),
                'expiry_date' => $expiryDate,
            ]);
        }, 5);
    }

    public function deleteEnrollment(string $id): void
    {
        $enrollment = ExamEnrollment::findOrFail($id);
        $enrollment->delete();
    }

    public function getEnrollmentProgress(ExamEnrollment $enrollment): array
    {
        $exam = $enrollment->exam;
        /** @var User $user */
        $user = $enrollment->user;

        $attempts = $exam->attempts()
            ->where('user_id', $user->id)
            ->get();

        $completedAttempts = $attempts->where('status', 'completed')->count();
        $bestScore = $attempts->where('status', 'completed')->max('obtained_marks') ?? 0;
        $hasPassed = $attempts->where('is_passed', true)->count() > 0;

        return [
            'enrollment' => $enrollment,
            'is_active' => $enrollment->isActive(),
            'attempts_used' => $attempts->count(),
            'attempts_remaining' => max(0, $exam->max_attempts - $attempts->count()),
            'completed_attempts' => $completedAttempts,
            'best_score' => $bestScore,
            'has_passed' => $hasPassed,
        ];
    }

    public function getEnrolledExam(string $id, User $user, array $data = []): Exam
    {
        $enrollment = ExamEnrollment::where('user_id', $user->id)
            ->where('exam_id', $id)
            ->first();

        if (! $enrollment) {
            throw new \Exception('You are not enrolled in this exam');
        }

        return Exam::when(array_key_exists('select', $data), function ($query) use ($data) {
            $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

            return $query->select($columns);
        })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            }, function ($query) {
                return $query->with(['instructor:id,user_id', 'instructor.user:id,name,photo']);
            })
            ->findOrFail($id);
    }

    public function calculateStudentExamMarks(string $exam_id, string $user_id): array
    {
        $attempts = ExamAttempt::where('exam_id', $exam_id)
            ->where('user_id', $user_id)
            ->where('status', 'completed')
            ->get();

        if ($attempts->isEmpty()) {
            return [
                'total_attempts' => 0,
                'best_percentage' => 0,
                'best_marks' => 0,
                'total_marks' => 0,
                'is_passed' => false,
                'grade' => 'N/A',
            ];
        }

        $bestAttempt = $attempts->sortByDesc('obtained_marks')->first();
        $exam = Exam::findOrFail($exam_id);

        $grade = calculateGrade($bestAttempt->percentage);

        return [
            'total_attempts' => $attempts->count(),
            'best_percentage' => round($bestAttempt->percentage, 2),
            'best_marks' => (float) $bestAttempt->obtained_marks,
            'total_marks' => (float) ($exam->total_marks ?? $bestAttempt->total_marks),
            'is_passed' => $bestAttempt->is_passed,
            'grade' => $grade,
        ];
    }
}
