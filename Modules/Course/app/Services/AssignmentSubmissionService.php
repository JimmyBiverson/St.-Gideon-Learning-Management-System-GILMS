<?php

namespace Modules\Course\Services;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Models\AssignmentSubmission;
use Modules\Course\Models\CourseAssignment;

class AssignmentSubmissionService extends CourseSectionService
{
    public function getSubmissions(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('assignment_submissions_page', $data) ? intval($data['assignment_submissions_page']) : 1;
        $perPage = array_key_exists('assignment_submissions_per_page', $data) ? intval($data['assignment_submissions_per_page']) : 10;

        $submissions = AssignmentSubmission::ofAssignment($data['course_assignment_id'])
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('assignment_submissions_search', $data) && $data['assignment_submissions_search'], function ($query) use ($data) {
                return $query->whereHas('student', function ($q) use ($data) {
                    $q->where('name', 'LIKE', '%'.$data['assignment_submissions_search'].'%')
                        ->orWhere('email', 'LIKE', '%'.$data['assignment_submissions_search'].'%');
                });
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $submissions->paginate($perPage, ['*'], 'assignment_submissions_page', $pageNumber);
        }

        return $submissions->get();
    }

    public function submitAssignment(array $data): AssignmentSubmission
    {
        $user = Auth::user();
        $assignment = CourseAssignment::findOrFail($data['course_assignment_id']);

        // Check if submission is late
        $isLate = false;
        if ($assignment->deadline && Carbon::now()->isAfter($assignment->deadline)) {
            $isLate = true;
        }

        // Check attempt number for this user
        $attemptNumber = AssignmentSubmission::ofAssignment($assignment->id)
            ->byStudent($user->id)
            ->max('attempt_number') ?? 0;
        $attemptNumber++;

        return AssignmentSubmission::create([
            ...$data,
            'user_id' => $user->id,
            'is_late' => $isLate,
            'submitted_at' => Carbon::now(),
            'attempt_number' => $attemptNumber,
        ]);
    }

    public function gradeSubmission(array $data, string $id): bool
    {
        $user = Auth::user();
        $submission = AssignmentSubmission::findOrFail($id);

        return $submission->update([...$data, 'grader_id' => $user->id]);
    }

    public function getStudentSubmissions(string $assignmentId, string $userId)
    {
        return AssignmentSubmission::ofAssignment($assignmentId)
            ->byStudent($userId)
            ->with(['assignment', 'grader'])
            ->orderBy('attempt_number', 'desc')
            ->get();
    }

    public function getSubmissionById(string $id)
    {
        return AssignmentSubmission::with([
            'assignment',
            'student',
            'grader',
        ])
            ->findOrFail($id);
    }
}
