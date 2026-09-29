<?php

namespace Modules\Course\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Course\Models\CourseWishlist;

class CourseWishlistService
{
    public function createWishlist(array $data): CourseWishlist
    {
        return CourseWishlist::create($data);
    }

    public function getWishlists(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('courses_page', $data) ? intval($data['courses_page']) : 1;
        $perPage = array_key_exists('courses_per_page', $data) ? intval($data['courses_per_page']) : 10;

        $query = CourseWishlist::when(array_key_exists('user_id', $data), function ($query) use ($data) {
            return $query->ofUser($data['user_id'] ? $data['user_id'] : 0);
        }, function ($query) {
            $user = Auth::user();

            return $query->ofUser($user ? $user->id : 0);
        })
            ->select('id', 'course_id', 'user_id')
            ->with([
                'course' => function ($query) {
                    $query->select('id', 'slug', 'thumbnail', 'title', 'pricing_type', 'discount', 'discount_price', 'price')
                        ->withCount('reviews')
                        ->withCount('enrollments')
                        ->withAvg('reviews as average_rating', 'rating')
                        ->addSelect(DB::raw('(SELECT SUM(TIME_TO_SEC(`duration`)) FROM `section_lessons` WHERE `section_lessons`.`course_id` = `courses`.`id`) as lessons_duration'));
                },
            ]);

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $query->paginate($perPage, ['*'], 'courses_page', $pageNumber);
        }

        return $query->get();
    }

    public function deleteWishlist(string $id): void
    {
        CourseWishlist::findOrFail($id)->delete();
    }
}
