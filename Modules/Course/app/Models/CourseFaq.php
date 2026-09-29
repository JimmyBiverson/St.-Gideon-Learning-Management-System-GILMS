<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseFaq extends Model
{
    protected $fillable = [
        'course_id',
        'question',
        'answer',
        'sort',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId)->orderBy('sort');
    }
}
