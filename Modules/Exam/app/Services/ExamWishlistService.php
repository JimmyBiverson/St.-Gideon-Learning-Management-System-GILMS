<?php

namespace Modules\Exam\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Exam\Models\ExamWishlist;

class ExamWishlistService
{
    public function getExamWishlist(array $data): ?ExamWishlist
    {
        $user = auth()->user();

        if ($user) {
            return ExamWishlist::where('user_id', $user->id)
                ->where('exam_id', $data['exam_id'])
                ->when(array_key_exists('select', $data), function ($query) use ($data) {
                    $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                    return $query->select($columns);
                })
                ->first();
        }

        return null;
    }

    public function getWishlists(array $data, bool $paginate = false): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('exams_page', $data) ? intval($data['exams_page']) : 1;
        $perPage = array_key_exists('exams_per_page', $data) ? intval($data['exams_per_page']) : (array_key_exists('exam_per_page', $data) ? intval($data['exam_per_page']) : 10);

        $query = ExamWishlist::when(array_key_exists('user_id', $data), function ($query) use ($data) {
            return $query->where('user_id', $data['user_id'] ? $data['user_id'] : 0);
        }, function ($query) {
            $user = auth()->user();

            return $query->where('user_id', $user ? $user->id : 0);
        })
            ->select('id', 'exam_id', 'user_id')
            ->with([
                'exam' => function ($query) {
                    $query->select('id', 'slug', 'thumbnail', 'title', 'level', 'short_description', 'duration_hours', 'duration_minutes', 'pricing_type', 'discount', 'discount_price', 'price', 'instructor_id')
                        ->with(['instructor:id,user_id', 'instructor.user:id,name'])
                        ->withCount('reviews')
                        ->withCount('enrollments')
                        ->withAvg('reviews as average_rating', 'rating');
                },
            ]);

        if ((array_key_exists('paginate', $data) && $data['paginate']) || $paginate) {
            return $query->paginate($perPage, ['*'], 'exams_page', $pageNumber);
        }

        return $query->get();
    }

    public function createWishlist(array $data): ExamWishlist
    {
        return ExamWishlist::create($data);
    }

    public function deleteWishlist(string $id): bool
    {
        return ExamWishlist::findOrFail($id)->delete();
    }
}
