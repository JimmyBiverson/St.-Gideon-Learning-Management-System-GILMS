<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property User $user
 * @property Course $course
 */
class CourseEnrollment extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'enrollment_type',
        'entry_date',
        'expiry_date',
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
     * Scope to filter lifetime enrollments
     */
    public function scopeLifetime(Builder $query): Builder
    {
        return $query->where('enrollment_type', 'lifetime');
    }

    /**
     * Scope to filter time-limited enrollments
     */
    public function scopeLimitedTime(Builder $query): Builder
    {
        return $query->where('enrollment_type', '!=', 'lifetime');
    }

    /**
     * Scope to filter active enrollments
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where(function ($q) {
            $q->where('enrollment_type', 'lifetime')
                ->orWhere(function ($subQ) {
                    $subQ->whereNotNull('expiry_date')
                        ->where('expiry_date', '>', now());
                });
        });
    }

    /**
     * Scope to filter expired enrollments
     */
    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('enrollment_type', '!=', 'lifetime')
            ->where(function ($q) {
                $q->whereNull('expiry_date')
                    ->orWhere('expiry_date', '<=', now());
            });
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
     * Scope to filter enrollments by instructor (via course)
     */
    public function scopeByInstructor(Builder $query, int $instructorId): Builder
    {
        return $query->whereHas('course', function (Builder $q) use ($instructorId) {
            $q->where('instructor_id', $instructorId);
        });
    }

    /**
     * Scope to eager load related data for enrollments
     */
    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['course', 'user']);
    }

    /**
     * Scope to search enrollments
     */
    public function scopeSearch(Builder $query, string $column, string $term): Builder
    {
        return $query->where($column, 'LIKE', '%'.$term.'%');
    }
}
