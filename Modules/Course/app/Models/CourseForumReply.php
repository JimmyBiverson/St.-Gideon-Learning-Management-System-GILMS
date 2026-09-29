<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseForumReply extends Model
{
    protected $fillable = [
        'description',
        'user_id',
        'course_forum_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course_forum(): BelongsTo
    {
        return $this->belongsTo(CourseForum::class);
    }

    // ==================== Query Scopes ====================

    public function scopeOfForum(Builder $query, int $forumId): Builder
    {
        return $query->where('course_forum_id', $forumId);
    }

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['user', 'course_forum']);
    }
}
