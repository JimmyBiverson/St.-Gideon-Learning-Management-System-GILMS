<?php

namespace Modules\Course\Services;

use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Course\Models\CourseReview;

class CourseReviewService extends MediaService
{
    public function totalReviews(string $courseId): array
    {
        $reviews = CourseReview::ofCourse($courseId)
            ->select('rating')
            ->get();

        $totalReviews = $reviews->count();
        $ratingCounts = [
            5 => 0,
            4 => 0,
            3 => 0,
            2 => 0,
            1 => 0,
        ];

        // Count reviews for each rating
        foreach ($reviews as $review) {
            $rating = max(1, min(5, $review->rating)); // Ensure rating is between 1-5
            $ratingCounts[$rating]++;
        }

        // Calculate percentages
        $ratingDistribution = [
            ['stars' => 5, 'percentage' => $totalReviews ? ($ratingCounts[5] / $totalReviews) * 100 : 0],
            ['stars' => 4, 'percentage' => $totalReviews ? ($ratingCounts[4] / $totalReviews) * 100 : 0],
            ['stars' => 3, 'percentage' => $totalReviews ? ($ratingCounts[3] / $totalReviews) * 100 : 0],
            ['stars' => 2, 'percentage' => $totalReviews ? ($ratingCounts[2] / $totalReviews) * 100 : 0],
            ['stars' => 1, 'percentage' => $totalReviews ? ($ratingCounts[1] / $totalReviews) * 100 : 0],
        ];

        return [
            'total_reviews' => $totalReviews,
            'rating_distribution' => $ratingDistribution,
        ];
    }

    public function getReviews(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('reviews_page', $data) ? intval($data['reviews_page']) : 1;
        $perPage = array_key_exists('reviews_per_page', $data) ? intval($data['reviews_per_page']) : 10;

        $reviews = CourseReview::searchWhen('review', $data, 'reviews_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->ofCourse($data['course_id']);

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $reviews->paginate($perPage, ['*'], 'reviews_page', $pageNumber);
        }

        return $reviews->get();
    }

    public function userReview(string $courseId, string $userId): ?CourseReview
    {
        return CourseReview::ofCourse($courseId)->ofUser($userId)->first();
    }

    public function createReview(array $data): CourseReview
    {
        return CourseReview::create($data);
    }

    public function updateReview(string $id, array $data): bool
    {
        return CourseReview::findOrFail($id)->update($data);
    }

    public function deleteReview(string $id): void
    {
        CourseReview::findOrFail($id)->delete();
    }
}
