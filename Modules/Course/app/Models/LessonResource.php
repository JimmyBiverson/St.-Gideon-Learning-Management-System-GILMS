<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $resource
 * @property int $section_lesson_id
 */
class LessonResource extends Model
{
    protected $fillable = [
        'title',
        'type',
        'resource',
        'section_lesson_id',
    ];

    public function section_lesson()
    {
        return $this->belongsTo(SectionLesson::class);
    }

    // ==================== Query Scopes ====================

    public function scopeOfLesson(Builder $query, int $lessonId): Builder
    {
        return $query->where('section_lesson_id', $lessonId);
    }

    public function scopeFiles(Builder $query): Builder
    {
        return $query->where('type', 'file');
    }

    public function scopeLinks(Builder $query): Builder
    {
        return $query->where('type', 'link');
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with('section_lesson');
    }
}
