<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseReview extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'review',
        'rating',
        'likes',
        'dislikes',
        'user_id',
        'course_id',
    ];

    protected $casts = [
        'likes' => 'array',
        'dislikes' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter reviews by minimum rating
     */
    public function scopeMinRating(Builder $query, int $rating): Builder
    {
        return $query->where('rating', '>=', $rating);
    }

    /**
     * Scope to filter reviews by exact rating
     */
    public function scopeOfRating(Builder $query, int $rating): Builder
    {
        return $query->where('rating', $rating);
    }

    /**
     * Scope to filter excellent reviews (5 stars)
     */
    public function scopeExcellent(Builder $query): Builder
    {
        return $query->where('rating', 5);
    }

    /**
     * Scope to filter good reviews (4+ stars)
     */
    public function scopeGood(Builder $query): Builder
    {
        return $query->where('rating', '>=', 4);
    }

    /**
     * Scope to filter poor reviews (2 or less)
     */
    public function scopePoor(Builder $query): Builder
    {
        return $query->where('rating', '<=', 2);
    }

    /**
     * Scope to filter enrollments by user
     */
    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to filter enrollments by course
     */
    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    /**
     * Scope to order by most helpful (most likes)
     */
    public function scopeMostHelpful(Builder $query): Builder
    {
        return $query->orderByRaw('JSON_LENGTH(likes) DESC');
    }
}
