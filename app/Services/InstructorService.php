<?php

namespace App\Services;

use App\Models\Instructor;
use App\Models\User;
use App\Notifications\InstructorApprovalNotification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InstructorService extends MediaService
{
    public function getInstructorById(string $id): ?Instructor
    {
        return Instructor::with(['user'])->find($id);
    }

    public function getInstructorByUserId(string|int|null $userId): ?Instructor
    {
        return Instructor::byUserId($userId)->first();
    }

    public function getInstructors(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('instructors_page', $data) ? intval($data['instructors_page']) : 1;
        $perPage = array_key_exists('instructors_per_page', $data) ? intval($data['instructors_per_page']) : 10;

        $instructors = Instructor::when(! (array_key_exists('admin', $data) && $data['admin']), function ($query) {
            return $query->whereHas('user', function ($query) {
                $query->where('role', '!=', 'admin');
            });
        })
            ->when(array_key_exists('instructors_search', $data), function ($query) use ($data) {
                return $query->whereHas('user', function ($q) use ($data) {
                    $q->where('name', 'LIKE', '%'.$data['instructors_search'].'%')
                        ->orWhere('email', 'LIKE', '%'.$data['instructors_search'].'%');
                });
            })
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('courses_count', $data) && $data['courses_count'], function ($query) {
                return $query->withCount('courses');
            })
            ->when(array_key_exists('status', $data), function ($query) use ($data) {
                if (is_array($data['status'])) {
                    return $query->whereIn('status', $data['status']);
                }

                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('reviews_count', $data) && $data['reviews_count'], function ($query) {
                return $query->selectRaw('(SELECT COUNT(*) FROM course_reviews
                  INNER JOIN courses ON course_reviews.course_id = courses.id
                  WHERE courses.instructor_id = instructors.id) as reviews_count');
            })
            ->when(array_key_exists('average_rating', $data) && $data['average_rating'], function ($query) {
                return $query->selectRaw('(SELECT AVG(rating) FROM course_reviews
                  INNER JOIN courses ON course_reviews.course_id = courses.id
                  WHERE courses.instructor_id = instructors.id) as average_rating');
            })
            ->when(array_key_exists('enrollments_count', $data) && $data['enrollments_count'], function ($query) {
                return $query->selectRaw('(SELECT COUNT(DISTINCT course_enrollments.user_id) FROM course_enrollments
                  INNER JOIN courses ON course_enrollments.course_id = courses.id
                  WHERE courses.instructor_id = instructors.id) as enrollments_count');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $instructors->paginate($perPage, ['*'], 'instructors_page', $pageNumber);
        }

        return $instructors->get();
    }

    public function getInstructorProfile(string $id): Instructor
    {
        return Instructor::where('id', $id)
            ->with([
                'user',
                'courses' => function ($query) {
                    $query->approved()
                        ->with('sections.section_lessons')
                        ->withCount('enrollments')
                        ->withCount('reviews')
                        ->withAvg('reviews as average_rating', 'rating');
                },
                'exams' => function ($query) {
                    $query->withCount('enrollments')
                        ->withCount('reviews')
                        ->withAvg('reviews as average_rating', 'rating');
                },
            ])
            ->withCount(['courses', 'exams'])
            ->selectRaw('(SELECT COUNT(*) FROM course_reviews 
            INNER JOIN courses ON course_reviews.course_id = courses.id 
            WHERE courses.instructor_id = instructors.id) as reviews_count')
            ->selectRaw('(SELECT AVG(rating) FROM course_reviews 
            INNER JOIN courses ON course_reviews.course_id = courses.id 
            WHERE courses.instructor_id = instructors.id) as average_rating')
            ->selectRaw('(SELECT COUNT(DISTINCT user_id) FROM course_enrollments
            INNER JOIN courses ON course_enrollments.course_id = courses.id
            WHERE courses.instructor_id = instructors.id) as enrollments_count')
            ->selectRaw('(SELECT COUNT(*) FROM exams WHERE exams.instructor_id = instructors.id) as total_exam_count')
            ->selectRaw('(SELECT COUNT(DISTINCT exam_enrollments.user_id) FROM exam_enrollments
            INNER JOIN exams ON exam_enrollments.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_students_count')
            ->selectRaw('(SELECT COUNT(*) FROM exam_reviews
            INNER JOIN exams ON exam_reviews.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_reviews_count')
            ->selectRaw('(SELECT AVG(rating) FROM exam_reviews
            INNER JOIN exams ON exam_reviews.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_average_rating')
            ->first();
    }

    public function getInstructorWithStatistics(string $id): Instructor
    {
        return Instructor::where('id', $id)
            ->with(['user'])
            ->withCount(['courses', 'exams'])
            ->selectRaw('(SELECT COUNT(*) FROM course_reviews 
            INNER JOIN courses ON course_reviews.course_id = courses.id 
            WHERE courses.instructor_id = instructors.id) as reviews_count')
            ->selectRaw('(SELECT AVG(rating) FROM course_reviews 
            INNER JOIN courses ON course_reviews.course_id = courses.id 
            WHERE courses.instructor_id = instructors.id) as average_rating')
            ->selectRaw('(SELECT COUNT(DISTINCT user_id) FROM course_enrollments
            INNER JOIN courses ON course_enrollments.course_id = courses.id
            WHERE courses.instructor_id = instructors.id) as enrollments_count')
            ->selectRaw('(SELECT COUNT(*) FROM exams WHERE exams.instructor_id = instructors.id) as total_exam_count')
            ->selectRaw('(SELECT COUNT(DISTINCT exam_enrollments.user_id) FROM exam_enrollments
            INNER JOIN exams ON exam_enrollments.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_instructors_count')
            ->selectRaw('(SELECT COUNT(*) FROM exam_reviews
            INNER JOIN exams ON exam_reviews.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_reviews_count')
            ->selectRaw('(SELECT AVG(rating) FROM exam_reviews
            INNER JOIN exams ON exam_reviews.exam_id = exams.id
            WHERE exams.instructor_id = instructors.id) as total_exam_average_rating')
            ->first();
    }

    public function createInstructor(array $data): Instructor
    {
        $user = User::findOrFail($data['user_id']);

        $instructor = Instructor::create([
            ...$data,
            'skills' => json_encode($data['skills']),
            'resume' => $this->addNewDeletePrev($user, $data['resume'], 'resume'),
        ]);

        $user->update(['instructor_id' => $instructor->id]);

        if (Auth::user()->role !== 'admin') {
            $admin = User::where('role', 'admin')->first();
            $admin->notify(new InstructorApprovalNotification([
                'status' => 'pending',
            ]));
        } else {
            $instructor->update(['status' => 'approved']);
            $user->update(['role' => 'instructor']);
        }

        return $instructor;
    }

    public function updateInstructor(array $data, string $id): Instructor
    {
        $user = Auth::user();
        $instructor = Instructor::findOrFail($id);

        if (array_key_exists('resume', $data) && $data['resume']) {
            $data['resume'] = $this->addNewDeletePrev($instructor->user, $data['resume'], 'resume');
        }

        if (array_key_exists('skills', $data) && is_array($data['skills'])) {
            $data['skills'] = json_encode($data['skills']);
        }

        $filteredData = array_filter($data, function ($value) {
            return $value !== null;
        });

        if ($user->role !== 'admin') {
            $instructor->update([...$filteredData, 'status' => 'pending']);

            $admin = User::where('role', 'admin')->first();
            $admin->notify(new InstructorApprovalNotification([
                'status' => $instructor->status,
            ]));
        }

        $instructor->update($filteredData);

        return $instructor;
    }

    public function updateUserRole(array $data, Instructor $instructor): void
    {
        $user = User::findOrFail($instructor->user_id);

        if ($instructor->status === 'approved') {
            $user->update(['role' => 'instructor']);
        }

        $user->notify(new InstructorApprovalNotification([
            'status' => $instructor->status,
            'feedback' => $data['feedback'],
        ]));
    }

    public function deleteInstructor(Instructor $instructor): void
    {
        DB::transaction(function () use ($instructor) {
            $admin = User::where('role', 'admin')->first();

            $instructor->courses()->update([
                'instructor_id' => $admin->instructor_id,
            ]);

            User::findOrFail($instructor->user_id)->update([
                'role' => 'student',
                'instructor_id' => null,
            ]);

            $instructor->delete();
        }, 5);
    }
}
