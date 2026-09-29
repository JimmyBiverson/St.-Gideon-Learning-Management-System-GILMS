<?php

namespace Modules\Exam\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Exam\Models\ExamReview;

class ExamReviewService
{
    public function createReview(array $data): ExamReview
    {
        return ExamReview::create($data);
    }

    public function updateReview(string $id, array $data): ExamReview
    {
        $review = ExamReview::findOrFail($id);
        $review->update($data);

        return $review;
    }

    public function deleteReview(string $id): bool
    {
        return ExamReview::findOrFail($id)->delete();
    }

    public function getReviews(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('reviews_page', $data) ? intval($data['reviews_page']) : 1;
        $perPage = array_key_exists('reviews_per_page', $data) ? intval($data['reviews_per_page']) : 10;

        $reviews = ExamReview::where('exam_id', $data['exam_id'])
            ->when(array_key_exists('reviews_search', $data), function ($query) use ($data) {
                return $query->where('review', 'LIKE', '%'.$data['reviews_search'].'%');
            })
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->orderBy('created_at', 'desc');

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $reviews->paginate($perPage, ['*'], 'reviews_page', $pageNumber);
        }

        return $reviews->get();
    }

    public function getExamRatingStatistics(string $exam_id): array
    {
        $reviews = ExamReview::where('exam_id', $exam_id)
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
}
