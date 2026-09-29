<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property Collection<int, SectionLesson> $section_lessons
 * @property Collection<int, SectionQuiz> $section_quizzes
 * @property int $section_lessons_count
 * @property int $section_quizzes_count
 */
class CourseSection extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'sort',
        'title',
        'course_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $maxSort = self::max('sort');
            $model->sort = $maxSort ? (int) $maxSort + 1 : 1;
        });

        static::deleting(function ($section) {
            $section->section_lessons->each(function ($lesson) {
                $lesson->delete();
            });
        });
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('sort', 'asc');
        });
    }

    // Relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function section_lessons()
    {
        return $this->hasMany(SectionLesson::class);
    }

    public function section_quizzes()
    {
        return $this->hasMany(SectionQuiz::class)->orderBy('created_at', 'desc');
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter sections for specific course
     */
    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    /**
     * Scope to filter sections with lessons
     */
    public function scopeWithLessons(Builder $query): Builder
    {
        return $query->whereHas('section_lessons');
    }

    /**
     * Scope to filter sections with quizzes
     */
    public function scopeWithQuizzes(Builder $query): Builder
    {
        return $query->whereHas('section_quizzes');
    }

    /**
     * Scope to order by sort value
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort', 'asc');
    }

    /**
     * Scope to search sections by title
     */
    public function scopeSearch(Builder $query, string $searchTerm): Builder
    {
        return $query->where('title', 'LIKE', '%'.$searchTerm.'%');
    }

    /**
     * Scope to load commonly used relationships
     */
    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['section_lessons', 'section_quizzes'])
            ->withCount('section_lessons')
            ->withCount('section_quizzes');
    }
}
