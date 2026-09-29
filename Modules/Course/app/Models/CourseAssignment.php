<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property Collection<int, AssignmentSubmission> $submissions
 * @property int $total_mark
 */
class CourseAssignment extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'total_mark',
        'pass_mark',
        'retake',
        'summary',
        'deadline',
        'late_submission',
        'late_total_mark',
        'late_deadline',
        'course_id',
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'late_submission' => 'boolean',
        'late_deadline' => 'datetime',
    ];

    // Relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function submissions()
    {
        return $this->hasMany(AssignmentSubmission::class);
    }

    // ==================== Query Scopes ====================

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('deadline', '>', now());
    }

    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('deadline', '<=', now());
    }

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }
}
