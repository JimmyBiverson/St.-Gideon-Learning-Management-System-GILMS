<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseForum extends Model
{
    protected $fillable = [
        'title',
        'description',
        'likes',
        'dislikes',
        'user_id',
        'course_id',
        'section_lesson_id',
    ];

    protected $casts = [
        'likes' => 'array',
        'dislikes' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function section_lesson(): BelongsTo
    {
        return $this->belongsTo(SectionLesson::class);
    }

    public function replies()
    {
        return $this->hasMany(CourseForumReply::class);
    }

    // ==================== Query Scopes ====================

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeOfLesson(Builder $query, int $lessonId): Builder
    {
        return $query->where('section_lesson_id', $lessonId);
    }

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['user', 'course', 'section_lesson', 'replies'])->withCount('replies');
    }
}
