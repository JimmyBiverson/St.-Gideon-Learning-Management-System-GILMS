<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property CourseAssignment $assignment
 * @property User $student
 * @property User $grader
 * @property float|null $marks_obtained
 */
class AssignmentSubmission extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'attachment_type',
        'attachment_path',
        'comment',
        'submitted_at',
        'marks_obtained',
        'instructor_feedback',
        'status',
        'attempt_number',
        'is_late',
        'course_assignment_id',
        'user_id',
        'grader_id',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'is_late' => 'boolean',
        'marks_obtained' => 'decimal:2',
    ];

    // Relationships
    public function assignment()
    {
        return $this->belongsTo(CourseAssignment::class, 'course_assignment_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function grader()
    {
        return $this->belongsTo(User::class, 'grader_id');
    }

    // ==================== Query Scopes ====================

    public function scopeGraded(Builder $query): Builder
    {
        return $query->where('status', 'graded');
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    public function scopeByStudent(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeOfAssignment(Builder $query, int $assignmentId): Builder
    {
        return $query->where('course_assignment_id', $assignmentId);
    }
}
