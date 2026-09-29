<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'total_lessons',
        'completed_lessons',
        'progress_percentage',
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

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('progress_percentage', '>=', 100);
    }

    public function scopeInProgress(Builder $query): Builder
    {
        return $query->where('progress_percentage', '<', 100)->where('progress_percentage', '>', 0);
    }

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['user', 'course']);
    }
}
