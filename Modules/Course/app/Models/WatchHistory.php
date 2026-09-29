<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $user_id
 * @property int $course_id
 * @property int|null $current_section_id
 * @property int|string|null $current_watching_id
 * @property string|null $current_watching_type
 * @property int|string|null $next_watching_id
 * @property string|null $next_watching_type
 * @property int|string|null $prev_watching_id
 * @property array|null $completed_watching
 * @property string|null $completion_date
 */
class WatchHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'current_section_id',
        'current_watching_id',
        'current_watching_type',
        'next_watching_id',
        'next_watching_type',
        'completed_watching',
        'completion_date',
    ];

    protected $casts = [
        'completed_watching' => 'array',
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

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->whereNotNull('completion_date');
    }
}
